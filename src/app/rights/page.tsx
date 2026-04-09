'use client';

import { rightsCards, RightsCard } from '@/data/rights';
import { useLanguage } from '@/lib/LanguageContext';
import { Share2, Scale, ChevronRight, ArrowLeft, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

function parseFocusedIds(hash: string): Set<string> {
  return new Set(
    hash
      .replace(/^#/, '')
      .split(/[#,]/)
      .map((s) => s.trim())
      .filter(Boolean)
  );
}

export default function RightsPage() {
  const { isZh, isHant } = useLanguage();
  const [focused, setFocused] = useState<Set<string>>(new Set());
  const [fromChat, setFromChat] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const apply = () => {
      const ids = parseFocusedIds(window.location.hash);
      setFocused(ids);
      setFromChat(ids.size > 0);
      const first = [...ids][0];
      if (first && !scrolledRef.current) {
        scrolledRef.current = true;
        requestAnimationFrame(() => {
          const el = document.getElementById(first);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      }
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  const getText = (zh: string, zhHant: string, en: string) => {
    if (isHant) return zhHant;
    if (isZh) return zh;
    return en;
  };

  const handleShare = (card: RightsCard) => {
    const title = isHant
      ? card.titleHant || card.titleZh
      : (isZh ? card.titleZh : card.titleEn);
    const content = isHant
      ? card.contentHant || card.contentZh
      : (isZh ? card.contentZh : card.contentEn);
    const text = `${title}\n\n${content}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        alert(getText('已复制到剪贴板，可以分享到微信', '已複製到剪貼板，可以分享到微信', 'Copied to clipboard'));
      }).catch(() => {
        window.open('weixin://', '_blank');
      });
    } else {
      window.open('weixin://', '_blank');
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-gray-50">
      {/* Header — pr-32 leaves room for the global QuickExit button (fixed top-right) */}
      <header className="bg-white py-4 pl-4 pr-32 md:pr-36 border-b border-gray-200 flex-shrink-0">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                href={fromChat ? '/chat' : '/'}
                className="flex items-center gap-1 text-sm text-rose-600 hover:text-rose-700 flex-shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                {fromChat
                  ? getText('返回聊天', '返回聊天', 'Back to chat')
                  : getText('返回首页', '返回首頁', 'Home')}
              </Link>
              <div className="min-w-0">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {getText('了解你的权利', '了解你的權利', 'Know Your Rights')}
                </h1>
                <p className="text-sm text-gray-600">
                  {getText('粉碎误区，了解真相', '粉碎誤區，了解真相', 'Bust myths, know the truth')}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 flex-shrink-0">
              <Scale className="w-4 h-4" />
              <span>{rightsCards.length} {getText('条权利', '條權利', 'rights')}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 min-h-0 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rightsCards.map((card) => {
              const isFocused = focused.has(card.id);
              const title = isHant
                ? card.titleHant || card.titleZh
                : (isZh ? card.titleZh : card.titleEn);
              const content = isHant
                ? card.contentHant || card.contentZh
                : (isZh ? card.contentZh : card.contentEn);
              const source = isHant
                ? card.sourceHant || card.sourceZh
                : (isZh ? card.sourceZh : card.sourceEn);

              return (
                <article
                  key={card.id}
                  id={card.id}
                  className={`bg-white rounded-2xl shadow-sm border p-5 scroll-mt-24 transition-all ${
                    isFocused
                      ? 'border-red-400 ring-2 ring-red-400 shadow-lg shadow-red-100 animate-pulse-once'
                      : 'border-gray-100 hover:border-rose-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                      isFocused ? 'bg-red-100' : 'bg-rose-50'
                    }`}>
                      <Scale className={`w-5 h-5 ${isFocused ? 'text-red-600' : 'text-rose-600'}`} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 pt-1.5">
                      {title}
                    </h2>
                  </div>

                  <p className="text-gray-600 leading-relaxed text-sm line-clamp-3 mb-3">
                    {content}
                  </p>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-400 truncate flex-1">
                      {getText('来源：', '來源：', 'Source: ')}{source}
                    </p>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Link
                        href={`/chat?ask=${encodeURIComponent(isHant ? (card.titleHant || card.titleZh) : isZh ? card.titleZh : card.titleEn)}`}
                        className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{getText('聊天咨询', '聊天諮詢', 'Ask in chat')}</span>
                      </Link>
                      <button
                        onClick={() => handleShare(card)}
                        className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{getText('分享', '分享', 'Share')}</span>
                      </button>
                      {card.sources && card.sources.length > 0 && (
                        <Link
                          href={`/rights/${card.id}`}
                          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          {getText(
                            `${card.sources.length} 条来源`,
                            `${card.sources.length} 條來源`,
                            `${card.sources.length} source${card.sources.length === 1 ? '' : 's'}`
                          )}
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-center mt-5">
            <p className="text-xs text-amber-800">
              {getText('本页面仅供参考，不构成法律意见。如需法律帮助，请咨询持牌律师。', '本頁面僅供參考，不構成法律意見。如需法律幫助，請諮詢持牌律師。', 'This page is for reference only, not legal advice. Consult a licensed lawyer for legal help.')}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
