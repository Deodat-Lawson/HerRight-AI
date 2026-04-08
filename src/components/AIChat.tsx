'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { Send, Shield, Phone, Search, AlertTriangle, Heart, Scale, Home } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { useCity } from '@/lib/CityContext';
import { canadaResources } from '@/data/canadaResources';

type MessageRole = 'user' | 'assistant';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  phoneNumber?: string;
  type?: 'hotline' | 'info';
}

// Crisis hotlines data
const crisisHotlines = [
  {
    id: '911',
    nameZh: '紧急求助',
    nameEn: 'Emergency',
    phone: '911',
    icon: AlertTriangle,
    color: 'red',
    always: true
  },
  {
    id: 'crisis',
    nameZh: '加拿大危机热线',
    nameEn: 'Canada Crisis Line',
    phone: '1-833-456-4566',
    icon: Heart,
    color: 'pink',
    always: true
  },
  {
    id: '211',
    nameZh: '211 社区服务',
    nameEn: '211 Community',
    phone: '211',
    icon: Phone,
    color: 'blue',
    always: true
  },
  {
    id: 'shelter',
    nameZh: '女性庇护所热线',
    nameEn: "Women's Shelters",
    phone: '1-877-336-2433',
    icon: Home,
    color: 'purple',
    always: true
  },
  {
    id: 'legal',
    nameZh: '法律援助热线',
    nameEn: 'Legal Aid',
    phone: '1-866-577-2525',
    icon: Scale,
    color: 'green',
    always: true
  }
];

// Province-specific crisis lines
const provinceCrisisLines: Record<string, { phone: string; nameZh: string; nameEn: string }> = {
  BC: { phone: '310-6789', nameZh: 'BC危机热线', nameEn: 'BC Crisis Line' },
  ON: { phone: '1-866-531-2600', nameZh: '安省危机热线', nameEn: 'Ontario Crisis Line' },
  QC: { phone: '1-866-277-3553', nameZh: '魁省危机热线', nameEn: 'Quebec Crisis Line' },
  AB: { phone: '1-800-784-2433', nameZh: '亚省危机热线', nameEn: 'Alberta Crisis Line' },
  MB: { phone: '1-877-435-2240', nameZh: '曼省危机热线', nameEn: 'Manitoba Crisis Line' },
  SK: { phone: '1-800-667-7530', nameZh: '萨省危机热线', nameEn: 'Saskatchewan Crisis Line' },
  NS: { phone: '1-888-429-8167', nameZh: '新省危机热线', nameEn: 'Nova Scotia Crisis Line' },
  NB: { phone: '1-800-667-5000', nameZh: '纽省危机热线', nameEn: 'New Brunswick Crisis Line' },
  PE: { phone: '1-800-218-2885', nameZh: '爱德华王子岛热线', nameEn: 'PEI Crisis Line' },
  NL: { phone: '1-888-737-2000', nameZh: '纽芬兰危机热线', nameEn: 'Newfoundland Crisis Line' },
};

// RAG-like search: Find relevant hotlines based on query
function searchHotlines(query: string, city: string | null, provinceCode: string | null): Message[] {
  const lowerQuery = query.toLowerCase();
  const results: Message[] = [];

  // Emergency keywords
  if (/不安全|危险|被打|家暴|紧急|911|害怕|威胁|help me|not safe|danger|emergency|abuse|hitting|attacked/.test(lowerQuery)) {
    results.push({
      id: '1',
      role: 'assistant',
      content: '请立即拨打 911！',
      phoneNumber: '911',
      type: 'hotline'
    });
    results.push({
      id: '2',
      role: 'assistant',
      content: '加拿大危机热线 24小时支持',
      phoneNumber: '1-833-456-4566',
      type: 'hotline'
    });
    if (provinceCode && provinceCrisisLines[provinceCode]) {
      const line = provinceCrisisLines[provinceCode];
      results.push({
        id: '3',
        role: 'assistant',
        content: `${line.nameZh}`,
        phoneNumber: line.phone,
        type: 'hotline'
      });
    }
    return results;
  }

  // Crisis/mental health
  if (/自杀|抑郁|绝望|想死|crisis|depression|suicide|mental health|心理|焦虑/.test(lowerQuery)) {
    results.push({
      id: '4',
      role: 'assistant',
      content: '请拨打危机热线获得即时支持',
      phoneNumber: '1-833-456-4566',
      type: 'hotline'
    });
    if (provinceCode && provinceCrisisLines[provinceCode]) {
      const line = provinceCrisisLines[provinceCode];
      results.push({
        id: '5',
        role: 'assistant',
        content: `${line.nameZh}`,
        phoneNumber: line.phone,
        type: 'hotline'
      });
    }
    return results;
  }

  // Shelter/housing
  if (/庇护|住所|shelter|住处|无家可归|homeless|安全的地方|收留/.test(lowerQuery)) {
    results.push({
      id: '6',
      role: 'assistant',
      content: '女性庇护所热线',
      phoneNumber: '1-877-336-2433',
      type: 'hotline'
    });
    results.push({
      id: '7',
      role: 'assistant',
      content: '211 可以帮你找到附近的庇护所',
      phoneNumber: '211',
      type: 'hotline'
    });

    // City-specific shelters
    if (city) {
      const cityShelters = canadaResources.filter(r => r.type === 'shelter' && r.city.toLowerCase() === city.toLowerCase());
      cityShelters.slice(0, 2).forEach((shelter, i) => {
        results.push({
          id: `8-${i}`,
          role: 'assistant',
          content: `${shelter.nameZh}`,
          phoneNumber: shelter.phone,
          type: 'hotline'
        });
      });
    }
    return results;
  }

  // Legal help
  if (/律师|法律援助|打官司|legal aid|lawyer|法律帮助/.test(lowerQuery)) {
    results.push({
      id: '9',
      role: 'assistant',
      content: '法律援助热线',
      phoneNumber: '1-866-577-2525',
      type: 'hotline'
    });
    results.push({
      id: '10',
      role: 'assistant',
      content: '211 可以转接到当地法律资源',
      phoneNumber: '211',
      type: 'hotline'
    });
    return results;
  }

  // Rights questions
  if (/权利|我的权利|了解权利|pr|永久居民|离婚|财产分割|孩子|监护|rights/.test(lowerQuery)) {
    return [{
      id: '11',
      role: 'assistant',
      content: '了解你的权利',
      type: 'info'
    }];
  }

  // Default - show all important hotlines
  results.push({
    id: '12',
    role: 'assistant',
    content: '常用求助热线',
    type: 'info'
  });
  crisisHotlines.forEach(h => {
    results.push({
      id: h.id,
      role: 'assistant',
      content: h.nameZh,
      phoneNumber: h.phone,
      type: 'hotline'
    });
  });

  if (provinceCode && provinceCrisisLines[provinceCode]) {
    const line = provinceCrisisLines[provinceCode];
    results.push({
      id: 'province',
      role: 'assistant',
      content: `${line.nameZh} (你所在省份)`,
      phoneNumber: line.phone,
      type: 'hotline'
    });
  }

  return results;
}

// Generate contextual response
function generateResponse(
  query: string,
  isZh: boolean,
  isHant: boolean,
  city: string | null
): string {
  const lowerQuery = query.toLowerCase();

  if (/权利|了解我的权利|我的权利是什么|know.*rights/.test(lowerQuery)) {
    return isHant
      ? '你擁有以下基本權利：\n• 離婚不會影響你的永久居民身份\n• 婚姻財產通常平均分配\n• 未經你同意，孩子不能被帶離加拿大\n• 可以申請人身保護令\n\n想知道更多嗎？'
      : isZh
      ? '你拥有以下基本权利：\n• 离婚不会影响你的永久居民身份\n• 婚姻财产通常平均分配\n• 未经你同意，孩子不能被带离加拿大\n• 可以申请人身保护令\n\n想知道更多吗？'
      : 'Your basic rights include:\n• Divorce won\'t affect your PR status\n• Marital property is usually split 50/50\n• Children cannot leave Canada without your consent\n• You can apply for protection orders\n\nWant to know more?';
  }

  if (/不安全|危险|被打|家暴|紧急|911|害怕|威胁|help me|not safe|danger|emergency|abuse/.test(lowerQuery)) {
    return isHant
      ? '如果你現在不安全，請立即撥打 911。\n\n你也可以：\n• 聯繫女性庇護所熱線：1-877-336-2433\n• 撥打 211 獲取即時幫助'
      : isZh
      ? '如果你现在不安全，请立即拨打 911。\n\n你也可以：\n• 联系女性庇护所热线：1-877-336-2433\n• 拨打 211 获取即时帮助'
      : 'If you\'re not safe, call 911 now.\n\nYou can also:\n• Women\'s shelter hotline: 1-877-336-2433\n• Call 211 for immediate help';
  }

  if (/谢谢|thank/.test(lowerQuery)) {
    return isHant
      ? '不用謝！我在這裡隨時幫助你。'
      : isZh
      ? '不用谢！我在这里随时帮助你。'
      : 'You\'re welcome! I\'m here to help anytime.';
  }

  // Default contextual help
  if (city) {
    return isHant
      ? `根據你在 ${city} 的位置，建議你：\n\n如果你需要即時幫助，請點擊上方的熱線電話。\n\n你想了解哪方面的幫助？`
      : isZh
      ? `根据你在 ${city} 的位置，建议你：\n\n如果你需要即时帮助，请点击上方的热线电话。\n\n你想了解哪方面的帮助？`
      : `Based on your location in ${city}:\n\nClick the hotline numbers above if you need immediate help.\n\nWhat would you like help with?`;
  }

  return isHant
    ? '請告訴我你在哪個城市，或者直接點擊上方的熱線電話獲得幫助。'
    : isZh
    ? '请告诉我你在哪个城市，或者直接点击上方的热线电话获得帮助。'
    : 'Tell me your city, or click a hotline above for help.';
}

export default function AIChat() {
  const { isZh, isHant } = useLanguage();
  const { selectedCity, selectedProvinceCode, hasSelectedLocation } = useCity();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [searchedHotlines, setSearchedHotlines] = useState<Message[] | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const welcomeMessage = useMemo<Message>(() => ({
    id: 'welcome',
    role: 'assistant',
    content: isHant
      ? '你好！👋\n\n我是你的AI助手。你可以：\n\n• 點擊上方按鈕快速訪問權利信息和資源\n• 或者直接告訴我你需要什麼幫助\n\n你的對話完全保密。'
      : isZh
      ? '你好！👋\n\n我是你的AI助手。你可以：\n\n• 点击上方按钮快速访问权利信息和资源\n• 或者直接告诉我你需要什么帮助\n\n你的对话完全保密。'
      : 'Hi! 👋\n\nI\'m your AI assistant. You can:\n\n• Click the buttons above for quick access to rights info and resources\n• Or tell me directly what help you need\n\nYour conversation is completely confidential.',
    type: 'info'
  }), [isZh, isHant]);

  const displayedMessages = useMemo(() => [welcomeMessage, ...messages], [welcomeMessage, messages]);

  const cityHotlines = useMemo<Message[]>(() => {
    if (hasSelectedLocation && selectedCity) {
      return searchHotlines('', selectedCity, selectedProvinceCode);
    }
    return [];
  }, [hasSelectedLocation, selectedCity, selectedProvinceCode]);

  const hotlineResults = searchedHotlines ?? cityHotlines;

  const getText = (zh: string, zhHant: string, en: string) => {
    if (isHant) return zhHant;
    if (isZh) return zh;
    return en;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedMessages, hotlineResults]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMsg]);

    // Search for relevant hotlines
    const results = searchHotlines(input.trim(), selectedCity, selectedProvinceCode);
    setSearchedHotlines(results);

    // Generate contextual response
    const response = generateResponse(input.trim(), isZh, isHant, selectedCity);

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      type: 'info'
    };

    setMessages(prev => [...prev, assistantMsg]);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-red-600" />
          <span className="font-semibold text-gray-900">
            {getText('AI助手', 'AI助手', 'AI Assistant')}
          </span>
        </div>
        {hasSelectedLocation && selectedCity && (
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {selectedCity}
          </span>
        )}
      </header>

      {/* Quick Search Actions - Combined & Redesigned */}
      <div className="bg-white border-b px-4 py-4">
        <div className="max-w-2xl mx-auto space-y-3">
          <Link
            href="/rights"
            className="flex items-center gap-4 w-full p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl hover:border-red-300 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Scale className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-gray-900">
                {getText('了解我的权利', '了解我的權利', 'Know My Rights')}
              </p>
              <p className="text-sm text-gray-600">
                {getText('粉碎误区，了解真相', '粉碎誤區，了解真相', 'Bust myths, know the truth')}
              </p>
            </div>
            <div className="text-red-600 group-hover:translate-x-1 transition-transform">
              →
            </div>
          </Link>

          <Link
            href="/resources"
            className="flex items-center gap-4 w-full p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-gray-900">
                {getText('我需要找人帮忙', '我需要找人幫忙', 'I need to find help')}
              </p>
              <p className="text-sm text-gray-600">
                {getText('经验证的免费资源', '經驗證的免費資源', 'Verified free resources')}
              </p>
            </div>
            <div className="text-blue-600 group-hover:translate-x-1 transition-transform">
              →
            </div>
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {displayedMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-red-600 text-white rounded-br-sm'
                  : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t px-4 py-3">
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={getText('搜索热线或提问...', '搜索熱線或提問...', 'Search hotlines or ask...')}
              className="w-full border rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Privacy Note */}
        <p className="text-center text-xs text-gray-400 mt-2">
          {getText('🔒 对话保密，不保存任何记录', '🔒 對話保密，不保存任何記錄', '🔒 Confidential conversation, no records saved')}
        </p>
      </div>
    </div>
  );
}