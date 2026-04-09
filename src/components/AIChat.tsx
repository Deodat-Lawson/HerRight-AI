'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Send, Shield, Phone, AlertTriangle, Scale, ExternalLink, Lock as LockIcon, Square, Sparkles, MapPin, ArrowLeft, Trash2, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { useCity } from '@/lib/CityContext';
import { lookupRights, lookupResources, getRelevantSourceUrl } from '@/lib/chatContext';
import { parseChatMessage, type Citation } from '@/lib/citationParser';
import { majorCities } from '@/data/canadaResources';
import ReferencesSidebar from './ReferencesSidebar';
import { doQuickExit } from './QuickExit';

type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  displayContent?: string;
  citations?: Citation[];
  rightIds?: string[];
  resourceIds?: string[];
  pending?: boolean;
  triggeredUnsafe?: boolean;
}

const DANGER_RE = /不安全|危险|被打|家暴|紧急|911|害怕|威胁|help me|not safe|danger|emergency|abuse|hitting|attacked/i;
const FALLBACK_RESOURCE_IDS = ['emergency', 'canada-crisis', '211-national'];
const STORAGE_KEY = 'herright-chat-current';


export default function AIChat() {
  const { isZh, isHant, language } = useLanguage();
  const { selectedCity, selectedProvinceCode, hasSelectedLocation, clearLocation, setLocation } = useCity();
  const searchParams = useSearchParams();
  const pendingAskRef = useRef<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isUnsafe, setIsUnsafe] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [confirmingClear, setConfirmingClear] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const stickToBottomRef = useRef(true);
  // Global citation registry: cardId → stable session-wide index
  const citationMapRef = useRef<Map<string, number>>(new Map());
  const didRestoreRef = useRef(false);

  // Restore chat from localStorage on mount
  useEffect(() => {
    if (didRestoreRef.current) return;
    didRestoreRef.current = true;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data.messages) && data.messages.length > 0) {
          setMessages(data.messages);
          if (data.isUnsafe) setIsUnsafe(true);
          // Restore city if it was saved with the conversation
          if (data.city && data.provinceCode && !hasSelectedLocation) {
            setLocation(data.city, data.province ?? '', data.provinceCode);
          }
          return; // skip clearing location — we have a conversation to resume
        }
      }
    } catch {}
    // No saved conversation — clear location so city picker appears
    clearLocation();

    // Check for ?ask= query param (linked from /rights or /resources)
    const askParam = searchParams.get('ask');
    if (askParam) {
      pendingAskRef.current = askParam;
      // Clean the URL so it doesn't re-fire on refresh
      window.history.replaceState(null, '', '/chat');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist messages to localStorage whenever they change
  useEffect(() => {
    if (!didRestoreRef.current) return;
    if (messages.length === 0) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    // Only persist serialisable fields (strip pending placeholders with no content)
    const toSave = messages
      .filter(m => m.content)
      .map(({ id, role, content, displayContent, citations, rightIds, resourceIds }) => ({
        id, role, content, displayContent, citations, rightIds, resourceIds,
      }));
    const data = {
      messages: toSave,
      city: selectedCity,
      province: selectedProvinceCode,
      provinceCode: selectedProvinceCode,
      isUnsafe,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [messages, selectedCity, selectedProvinceCode, isUnsafe]);

  // Start a brand-new conversation — clears localStorage + resets all state
  const handleNewConversation = useCallback(() => {
    if (isStreaming) abortRef.current?.abort();
    localStorage.removeItem(STORAGE_KEY);
    setMessages([]);
    setInput('');
    setIsUnsafe(false);
    setIsStreaming(false);
    setConfirmingClear(false);
    citationMapRef.current.clear();
    clearLocation();
  }, [isStreaming, clearLocation]);

  // Wipe all traces — current conversation + any saved sessions
  const handleClearAllData = useCallback(() => {
    if (isStreaming) abortRef.current?.abort();
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('herright-saved-sessions');
    setMessages([]);
    setInput('');
    setIsUnsafe(false);
    setIsStreaming(false);
    setConfirmingClear(false);
    citationMapRef.current.clear();
    clearLocation();
  }, [isStreaming, clearLocation]);

  const getText = useCallback(
    (zh: string, zhHant: string, en: string) => (isHant ? zhHant : isZh ? zh : en),
    [isHant, isZh]
  );

  // Remap per-message citation indices to global session-wide indices.
  // If a card was cited before, reuse its global number.
  const applyGlobalIndices = useCallback((citations: Citation[], displayText: string) => {
    const map = citationMapRef.current;
    const remapped: Citation[] = [];
    let newDisplay = displayText;

    for (const cite of citations) {
      if (!map.has(cite.cardId)) {
        map.set(cite.cardId, map.size + 1);
      }
      const globalIdx = map.get(cite.cardId)!;
      // Replace [localN] with [globalN] in display text
      if (cite.index !== globalIdx) {
        // Use regex to replace the specific [N] token (only first occurrence for this cite)
        newDisplay = newDisplay.replace(`[${cite.index}]`, `[${globalIdx}]`);
      }
      remapped.push({ ...cite, index: globalIdx });
    }

    return { citations: remapped, displayText: newDisplay };
  }, []);

  const welcomeMessage = useMemo<Message>(
    () => ({
      id: 'welcome',
      role: 'assistant',
      content: getText(
        '你好，我在这里陪你。👋 告诉我发生了什么——对话完全保密。',
        '你好，我在這裡陪你。👋 告訴我發生了什麼——對話完全保密。',
        "Hi, I'm here for you. 👋 Tell me what's going on — this is completely confidential."
      ),
    }),
    [getText]
  );

  const displayedMessages = useMemo(() => [welcomeMessage, ...messages], [welcomeMessage, messages]);

  // Starter prompts — restore the rights / resources / feelings entry points the homepage cards
  // used to provide. They lower the cost of starting (no blank-page anxiety) and signal what the
  // bot can actually help with. Hidden after the first user message.
  const starterPrompts = useMemo(
    () => [
      {
        icon: Scale,
        label: getText('我想了解我的权利', '我想了解我的權利', 'I want to know my rights'),
        prompt: getText(
          '我是新移民，离婚后我的PR身份和孩子怎么办？',
          '我是新移民，離婚後我的PR身份和孩子怎麼辦？',
          "I'm a new immigrant. What happens to my PR status and my children if I divorce?"
        ),
      },
      {
        icon: Phone,
        label: getText('我需要找人帮忙', '我需要找人幫忙', 'I need to find help'),
        prompt: getText(
          '我需要附近的庇护所和免费法律援助',
          '我需要附近的庇護所和免費法律援助',
          'I need a shelter and free legal aid near me'
        ),
      },
      {
        icon: Shield,
        label: getText('他控制我的钱和证件', '他控制我的錢和證件', 'He controls my money and ID'),
        prompt: getText(
          '我老公拿走了我的护照和银行卡，不让我出门，我该怎么办？',
          '我老公拿走了我的護照和銀行卡，不讓我出門，我該怎麼辦？',
          "My husband took my passport and bank card and won't let me leave the house. What can I do?"
        ),
      },
      {
        icon: Sparkles,
        label: getText('我只想有人听我说', '我只想有人聽我說', 'I just need someone to listen'),
        prompt: getText(
          '我感到很孤独，不知道还能跟谁说',
          '我感到很孤獨，不知道還能跟誰說',
          "I feel really alone and I don't know who else to talk to"
        ),
      },
    ],
    [getText]
  );

  // Smart auto-scroll: only follow new content if the user is near the bottom.
  // Don't yank them back if they've scrolled up to read.
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const onScroll = () => {
      const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
      stickToBottomRef.current = distance < 80;
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Don't auto-scroll on first paint — keep the welcome message and
    // starter prompts in view. Only follow new content once a real
    // conversation has begun.
    if (messages.length === 0) return;
    if (stickToBottomRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [displayedMessages, messages.length]);

  // Shift+Esc quick exit is handled globally by QuickExit.tsx

  const sendPrompt = async (prompt: string) => {
    if (!prompt.trim() || isStreaming) return;
    const trimmed = prompt.trim();
    setInput('');

    const isDanger = DANGER_RE.test(trimmed);
    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: trimmed, triggeredUnsafe: isDanger || undefined };
    const assistantId = `a-${Date.now()}`;
    const placeholder: Message = { id: assistantId, role: 'assistant', content: '', pending: true };

    if (isDanger) setIsUnsafe(true);
    stickToBottomRef.current = true;

    const history = [...messages, userMsg];
    setMessages([...history, placeholder]);
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
          language,
          city: selectedCity,
          provinceCode: selectedProvinceCode,
        }),
      });

      if (!res.ok || !res.body) throw new Error('Request failed');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const streaming = parseChatMessage(acc, { streaming: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: acc, displayContent: streaming.displayText, citations: streaming.citations, rightIds: streaming.rightIds, resourceIds: streaming.resourceIds, pending: false } : m))
        );
      }

      const final = parseChatMessage(acc, { streaming: false });
      const global = applyGlobalIndices(final.citations, final.displayText);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: acc, displayContent: global.displayText, citations: global.citations, rightIds: final.rightIds, resourceIds: final.resourceIds, pending: false } : m
        )
      );
    } catch (err) {
      const aborted = (err as Error)?.name === 'AbortError';
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? aborted
              ? { ...m, pending: false, content: m.content || getText('（已停止）', '（已停止）', '(stopped)') }
              : {
                  ...m,
                  pending: false,
                  content: getText(
                    '我现在连接遇到了问题。如果你需要紧急帮助，请使用下面的热线。',
                    '我現在連線遇到問題。如果你需要緊急幫助，請使用下面的熱線。',
                    "I'm having trouble connecting right now. If you need urgent help, please use the hotlines below."
                  ),
                  resourceIds: FALLBACK_RESOURCE_IDS,
                  citations: applyGlobalIndices(
                    FALLBACK_RESOURCE_IDS.map((id, i) => ({ index: i + 1, cardId: id, type: 'resource' as const })),
                    ''
                  ).citations,
                }
            : m
        )
      );
    } finally {
      abortRef.current = null;
      setIsStreaming(false);
    }
  };

  // Auto-send ?ask= prompt from /rights or /resources deep-links.
  // Runs after first render when sendPrompt is ready.
  const pendingFiredRef = useRef(false);
  useEffect(() => {
    if (pendingFiredRef.current || !pendingAskRef.current) return;
    pendingFiredRef.current = true;
    const prompt = pendingAskRef.current;
    pendingAskRef.current = null;
    // Small delay so localStorage restore + state init settles
    const t = setTimeout(() => sendPrompt(prompt), 150);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = () => sendPrompt(input);
  const handleStop = () => abortRef.current?.abort();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showStarters = messages.length === 0;

  return (
    <div className="relative flex h-[100dvh] overflow-hidden bg-gradient-to-b from-rose-100 via-rose-50 to-white">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl" />
      </div>

      {/* Main chat column */}
      <div className="flex flex-col flex-1 min-w-0">
      {/* Header — leaves room for the global LanguageToggle (top-left, fixed)
          and global QuickExit (top-right, fixed) so they don't overlap. */}
      <header className="bg-white/80 backdrop-blur-md border-b border-rose-100 py-3 pl-28 pr-32 md:pl-32 md:pr-36 flex items-center justify-between gap-2">
        {/* Left: Exit Chat — navigates home, conversation stays saved */}
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-all"
          aria-label={getText('退出聊天', '退出聊天', 'Exit chat')}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{getText('退出', '退出', 'Exit')}</span>
        </Link>

        {/* Center: Title */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-sm flex-shrink-0">
            <Shield className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="min-w-0 text-center">
            <div className="font-bold text-sm bg-gradient-to-r from-rose-700 to-red-600 bg-clip-text text-transparent truncate">
              {getText('HerRight 助手', 'HerRight 助手', 'HerRight Assistant')}
            </div>
            {hasSelectedLocation && selectedCity && (
              <div className="text-[11px] text-rose-600 truncate">📍 {selectedCity}</div>
            )}
          </div>
        </div>

        {/* Right: Clear conversation (with inline confirmation) */}
        <div className="flex items-center gap-1.5 relative">
          {messages.length > 0 && !confirmingClear && (
            <button
              onClick={() => setConfirmingClear(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-rose-50 text-gray-600 hover:text-rose-700 transition-all"
              aria-label={getText('清除对话', '清除對話', 'Clear conversation')}
              title={getText('清除对话，开始新聊天', '清除對話，開始新聊天', 'Clear chat and start new')}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Inline confirmation — lightweight, not a scary modal */}
          {confirmingClear && (
            <div className="flex items-center gap-1.5 animate-in fade-in slide-in-from-right-2 duration-200">
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {getText('清除对话？', '清除對話？', 'Clear chat?')}
              </span>
              <button
                onClick={handleNewConversation}
                className="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-100 hover:bg-red-200 text-red-700 transition-colors"
              >
                {getText('清除', '清除', 'Clear')}
              </button>
              <button
                onClick={() => setConfirmingClear(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
                aria-label={getText('取消', '取消', 'Cancel')}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Messages */}
      <div
        ref={scrollContainerRef}
        className="flex-1 min-h-0 overflow-y-auto px-4 py-5 space-y-4"
        aria-live="polite"
        aria-atomic="false"
      >
        {displayedMessages.map((msg) => (
          <div key={msg.id}>
            <MessageBubble msg={msg} isHant={isHant} isZh={isZh} provinceCode={selectedProvinceCode} getText={getText} />
            {msg.triggeredUnsafe && (
              <div className="flex justify-start mt-3">
                <div className="max-w-[88%] rounded-2xl rounded-bl-md border-2 border-red-500 bg-red-50 p-4 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <p className="font-bold text-red-700">
                      {getText('如果你现在不安全', '如果你現在不安全', 'If you are not safe right now')}
                    </p>
                  </div>
                  <p className="text-sm text-red-800 mb-3">
                    {getText(
                      '立即拨打 911。你不是一个人。',
                      '立即撥打 911。你不是一個人。',
                      'Call 911 immediately. You are not alone.'
                    )}
                  </p>
                  <div className="flex gap-2">
                    <a
                      href="tel:911"
                      className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      {getText('拨打 911', '撥打 911', 'Call 911')}
                    </a>
                    <button
                      onClick={doQuickExit}
                      className="flex items-center justify-center gap-2 px-5 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded-xl transition-colors"
                    >
                      <X className="w-5 h-5" />
                      {getText('安全离开', '安全離開', 'Exit safely')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* City picker — shown once when no location is set */}
        {showStarters && !hasSelectedLocation && (
          <CityPicker getText={getText} />
        )}

        {/* Starter prompts — appear once, vanish after first user message */}
        {showStarters && (
          <div className="max-w-2xl mx-auto pt-2">
            <p className="text-xs font-semibold text-rose-500 uppercase tracking-wider mb-2 px-1">
              {getText('你可以试着问…', '你可以試著問…', 'You can try asking…')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {starterPrompts.map((s, i) => {
                const Icon = s.icon;
                return (
                  <button
                    key={i}
                    onClick={() => sendPrompt(s.prompt)}
                    className="flex items-center gap-3 text-left p-3 bg-white/80 backdrop-blur border border-rose-200 hover:border-rose-400 hover:bg-white hover:shadow-md rounded-2xl transition-all active:scale-[0.98]"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-rose-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-800 leading-snug">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white/85 backdrop-blur-md border-t border-rose-100 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={getText(
                  '告诉我发生了什么…',
                  '告訴我發生了什麼…',
                  "Tell me what's happening…"
                )}
                className="w-full bg-white border-2 border-rose-200 rounded-full px-5 py-3.5 text-base focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-200 placeholder:text-rose-300 transition-all"
                aria-label={getText('输入消息', '輸入訊息', 'Type a message')}
              />
            </div>
            {isStreaming ? (
              <button
                onClick={handleStop}
                className="p-3.5 bg-white border-2 border-rose-300 text-rose-600 rounded-full shadow-sm hover:bg-rose-50 active:scale-95 transition-all"
                aria-label={getText('停止', '停止', 'Stop')}
                title={getText('停止生成', '停止生成', 'Stop generating')}
              >
                <Square className="w-5 h-5" fill="currentColor" />
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-3.5 bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-full shadow-md shadow-rose-500/30 hover:shadow-lg hover:shadow-rose-500/40 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all"
                aria-label={getText('发送', '發送', 'Send')}
              >
                <Send className="w-5 h-5" />
              </button>
            )}
          </div>
          {/* Quick-nav to rights & resources */}
          <div className="flex items-center justify-center gap-2 mt-2.5">
            <Link
              href="/rights"
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-full border border-rose-200 transition-colors"
            >
              <Scale className="w-3 h-3" />
              {getText('浏览权利', '瀏覽權利', 'Browse rights')}
            </Link>
            <Link
              href="/resources"
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-full border border-rose-200 transition-colors"
            >
              <Phone className="w-3 h-3" />
              {getText('浏览资源', '瀏覽資源', 'Browse resources')}
            </Link>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-1.5 text-[11px] text-rose-400">
            <LockIcon className="w-3 h-3 flex-shrink-0" />
            <span>
              {getText(
                '保密 · 仅保存在本地 · 不是法律建议',
                '保密 · 僅保存在本地 · 不是法律建議',
                'Confidential · Saved locally only · Not legal advice'
              )}
            </span>
            {messages.length > 0 && (
              <>
                <span className="text-rose-300">·</span>
                <button
                  onClick={handleClearAllData}
                  className="text-rose-400 hover:text-red-600 underline underline-offset-2 transition-colors"
                >
                  {getText('清除所有记录', '清除所有記錄', 'Clear all data')}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      </div>

      {/* Desktop references sidebar */}
      <ReferencesSidebar
        messages={displayedMessages}
        isZh={isZh}
        isHant={isHant}
        provinceCode={selectedProvinceCode}
        getText={getText}
      />
    </div>
  );
}

interface BubbleProps {
  msg: Message;
  isHant: boolean;
  isZh: boolean;
  provinceCode?: string | null;
  getText: (zh: string, zhHant: string, en: string) => string;
}

function renderProseWithCitations(text: string, msgId: string, isUser: boolean) {
  const parts = text.split(/(\[\d+\])/g);
  return parts.map((part, i) => {
    const chipMatch = part.match(/^\[(\d+)\]$/);
    if (chipMatch) {
      const n = chipMatch[1];
      return (
        <button
          key={i}
          role="doc-noteref"
          aria-label={`Reference ${n}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(`cite-${msgId}-${n}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }}
          className={`inline-flex items-center justify-center mx-0.5 px-1.5 py-0 text-[11px] font-bold rounded-full align-super cursor-pointer transition-colors focus:outline-none focus:ring-2 ${
            isUser
              ? 'bg-white/30 text-white hover:bg-white/50 focus:ring-white/50'
              : 'bg-rose-100 text-rose-700 hover:bg-rose-200 focus:ring-rose-400'
          }`}
        >
          {n}
        </button>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function MessageBubble({ msg, isHant, isZh, provinceCode: selectedProvinceCode, getText }: BubbleProps) {
  const isUser = msg.role === 'user';
  const allCitations = msg.citations ?? [];
  // Deduplicate citations by cardId for the card list (keep first occurrence)
  const seen = new Set<string>();
  const citations = allCitations.filter(c => {
    if (seen.has(c.cardId)) return false;
    seen.add(c.cardId);
    return true;
  });
  const rights = msg.rightIds ? lookupRights(msg.rightIds) : [];
  const resources = msg.resourceIds ? lookupResources(msg.resourceIds) : [];
  const displayText = msg.displayContent ?? msg.content;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[88%] flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-br-md shadow-md shadow-rose-500/20'
              : 'bg-white/90 backdrop-blur text-gray-800 rounded-bl-md shadow-sm border border-rose-100'
          }`}
        >
          {msg.pending && !msg.content ? (
            <TypingDots />
          ) : (
            <p className="whitespace-pre-wrap text-base leading-relaxed">
              {citations.length > 0
                ? renderProseWithCitations(displayText, msg.id, isUser)
                : displayText}
            </p>
          )}
        </div>

        {/* Compact numbered citation cards — mobile/tablet only (sidebar handles desktop) */}
        {citations.length > 0 && (
          <div className="space-y-1.5 w-full lg:hidden" role="list" aria-label="References">
            {citations.map((cite, i) => {
              if (cite.type === 'right') {
                const r = rights.find(r => r.id === cite.cardId);
                if (!r) return null;
                const title = isHant ? r.titleHant ?? r.titleZh : isZh ? r.titleZh : r.titleEn;
                const source = isHant ? r.sourceHant ?? r.sourceZh : isZh ? r.sourceZh : r.sourceEn;
                const lawUrl = getRelevantSourceUrl(r, selectedProvinceCode);
                return (
                  <div
                    key={i}
                    id={`cite-${msg.id}-${cite.index}`}
                    role="doc-endnote"
                    className="flex items-center gap-2.5 p-2.5 bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-xl hover:border-rose-400 transition-colors cursor-pointer"
                    onClick={() => window.location.href = `/rights/${r.id}`}
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center">
                      {cite.index}
                    </span>
                    <Scale className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{title}</p>
                      <p className="text-[11px] text-rose-700/70 truncate">{source}</p>
                    </div>
                    {lawUrl && (
                      <a
                        href={lawUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={getText('查看法律原文', '查看法律原文', 'View law')}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                );
              } else {
                const r = resources.find(r => r.id === cite.cardId);
                if (!r) return null;
                const name = (isZh || isHant) ? r.nameZh : r.nameEn;
                const desc = (isZh || isHant) ? r.descriptionZh : r.descriptionEn;
                return (
                  <div
                    key={i}
                    id={`cite-${msg.id}-${cite.index}`}
                    role="doc-endnote"
                    className="bg-white border border-rose-200 rounded-xl overflow-hidden hover:border-rose-300 transition-colors"
                  >
                    {/* Card body */}
                    <div className="p-3">
                      <div className="flex items-start gap-2.5">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center mt-0.5">
                          {cite.index}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 leading-snug">{name}</p>
                          {r.city && (
                            <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {r.city}
                              {r.hours && <span> · {r.hours}</span>}
                            </p>
                          )}
                          {desc && (
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{desc}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Action row */}
                    <div className="flex border-t border-rose-100 divide-x divide-rose-100">
                      <a
                        href={`tel:${r.phone.replace(/[^0-9+]/g, '')}`}
                        aria-label={getText('拨打电话', '撥打電話', `Call ${name}`)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-rose-700 hover:bg-rose-50 active:bg-rose-100 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {r.phone}
                      </a>
                      <a
                        href={`/resources#${r.id}`}
                        aria-label={getText('查看详情', '查看詳情', `View ${name} details`)}
                        className="flex items-center justify-center gap-1 px-4 py-2.5 text-xs font-medium text-gray-600 hover:bg-gray-50 active:bg-gray-100 hover:text-rose-700 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {getText('详情', '詳情', 'Details')}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function CityPicker({ getText }: { getText: (zh: string, zhHant: string, en: string) => string }) {
  const { setLocation } = useCity();
  const [expanded, setExpanded] = useState(false);

  // Group cities by province
  const provinces = useMemo(() => {
    const map = new Map<string, typeof majorCities>();
    for (const c of majorCities) {
      const list = map.get(c.province) ?? [];
      list.push(c);
      map.set(c.province, list);
    }
    return Array.from(map.entries());
  }, []);

  // Show top cities when collapsed
  const topCities = useMemo(
    () => ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton'],
    []
  );
  const topCityData = majorCities.filter(c => topCities.includes(c.city));

  const handleSelect = (city: typeof majorCities[number]) => {
    setLocation(city.city, city.province, city.provinceCode);
  };

  return (
    <div className="flex justify-start">
      <div className="max-w-[88%] flex flex-col gap-2 items-start">
        <div className="bg-white/90 backdrop-blur text-gray-800 rounded-2xl rounded-bl-md shadow-sm border border-rose-100 px-4 py-3">
          <p className="text-base leading-relaxed flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
            {getText(
              '你在哪个城市？这样我可以推荐你附近的资源。',
              '你在哪個城市？這樣我可以推薦你附近的資源。',
              'Which city are you in? This helps me find resources near you.'
            )}
          </p>
        </div>

        <div className="w-full">
          {/* Quick picks — major cities */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {topCityData.map((c) => (
              <button
                key={c.city}
                onClick={() => handleSelect(c)}
                className="px-3 py-1.5 text-sm font-medium bg-white border border-rose-200 hover:border-rose-400 hover:bg-rose-50 text-gray-800 rounded-full transition-all active:scale-95"
              >
                {c.city}
              </button>
            ))}
          </div>

          {/* Expand to see all cities */}
          {!expanded ? (
            <button
              onClick={() => setExpanded(true)}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium px-1"
            >
              {getText('其他城市 →', '其他城市 →', 'More cities →')}
            </button>
          ) : (
            <div className="bg-white/90 backdrop-blur border border-rose-100 rounded-xl p-3 space-y-3 max-h-60 overflow-y-auto">
              {provinces.map(([province, cities]) => (
                <div key={province}>
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">{province}</p>
                  <div className="flex flex-wrap gap-1">
                    {cities.map((c) => (
                      <button
                        key={c.city}
                        onClick={() => handleSelect(c)}
                        className="px-2.5 py-1 text-xs font-medium bg-gray-50 hover:bg-rose-50 border border-gray-200 hover:border-rose-300 text-gray-700 rounded-full transition-colors"
                      >
                        {c.city}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-1 items-center py-1" aria-label="thinking">
      <span className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}
