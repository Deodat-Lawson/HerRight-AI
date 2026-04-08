export type Language = 'zh' | 'zh-Hant' | 'en';

export interface Translation {
  [key: string]: {
    zh: string;
    'zh-Hant': string;
    en: string;
  };
}

export const translations: Translation = {
  // Navigation
  'nav.home': { zh: '首頁', 'zh-Hant': '首頁', en: 'Home' },
  'nav.rights': { zh: '了解權利', 'zh-Hant': '了解權利', en: 'Know Your Rights' },
  'nav.action': { zh: '如何應對', 'zh-Hant': '如何應對', en: 'What To Do If...' },
  'nav.chat': { zh: 'AI助手', 'zh-Hant': 'AI助手', en: 'AI Assistant' },
  'nav.resources': { zh: '尋找幫助', 'zh-Hant': '尋找幫助', en: 'Find Help' },
  'nav.about': { zh: '關於我們', 'zh-Hant': '關於我們', en: 'About' },

  // Home page
  'home.headline': { zh: '你擁有權利。我們幫你了解它們。', 'zh-Hant': '你擁有權利。我們幫你了解它們。', en: 'You have rights. We help you understand them.' },
  'home.subheadline': { zh: '加拿大華人女性法律權益指南', 'zh-Hant': '加拿大華人女性法律權益指南', en: 'A guide to legal rights for Chinese immigrant women in Canada' },
  'home.button.notSafe': { zh: '我不安全', 'zh-Hant': '我不安全', en: "I'm not safe right now" },
  'home.button.rights': { zh: '我想了解我的權利', 'zh-Hant': '我想了解我的權利', en: 'I want to know my rights' },
  'home.button.help': { zh: '我需要找人幫忙', 'zh-Hant': '我需要找人幫忙', en: 'I need to find help near me' },
  'home.confidentiality': { zh: '您的訪問是保密的。', 'zh-Hant': '您的訪問是保密的。', en: 'Your visit is confidential.' },
  'home.quickExit': { zh: '快速退出', 'zh-Hant': '快速退出', en: 'Quick Exit' },

  // Emergency
  'emergency.title': { zh: '緊急幫助', 'zh-Hant': '緊急幫助', en: 'EMERGENCY' },
  'emergency.subtitle': { zh: '你不是一個人。我們在這裡幫助你。', 'zh-Hant': '你不是一個人。我們在這裡幫助你。', en: "You're not alone. We're here to help." },
  'emergency.call911': { zh: '立即撥打 911', 'zh-Hant': '立即拨打 911', en: 'CALL 911 NOW' },
  'emergency.emergency': { zh: '緊急情況', 'zh-Hant': '紧急情况', en: 'Emergency' },
  'emergency.crisisLine': { zh: '危機熱線', 'zh-Hant': '危机热线', en: 'Crisis Line' },
  'emergency.support24': { zh: '24/7 支援', 'zh-Hant': '24/7 支援', en: '24/7 Support' },
  'emergency.womensShelter': { zh: '女性庇護所', 'zh-Hant': '女性庇护所', en: "Women's Shelters" },
  'emergency.safeConfidential': { zh: '安全保密', 'zh-Hant': '安全保密', en: 'Safe & Confidential' },
  'emergency.ifCantSpeak': { zh: '如果你不能說話', 'zh-Hant': '如果你不能说话', en: "If you can't speak" },
  'emergency.stayOnLine': { zh: '拨打 911 後保持通話', 'zh-Hant': '拨打 911 后保持通话', en: 'Stay on the line after calling 911' },
  'emergency.tapKey': { zh: '按任何鍵表示你需要幫助', 'zh-Hant': '按任何键表示你需要帮助', en: 'Tap any key to signal you need help' },
  'emergency.text911': { zh: '如果安全，可以發短信到 911', 'zh-Hant': '如果安全，可以发短信到 911', en: 'If safe, text 911 if you cannot speak' },
  'emergency.secure': { zh: '這個頁面是安全的。沒有追蹤器。', 'zh-Hant': '这个页面是安全的。没有追踪器。', en: 'This page is secure. No trackers.' },
  'emergency.pressEscape': { zh: '按 Escape 鍵退出', 'zh-Hant': '按 Escape 键退出', en: 'Press Escape to exit' },
  'emergency.return': { zh: '返回', 'zh-Hant': '返回', en: 'Return' },

  // Rights page
  'rights.title': { zh: '了解你的權利', 'zh-Hant': '了解你的權利', en: 'Know Your Rights' },
  'rights.subtitle': { zh: '粉碎誤區，了解真相', 'zh-Hant': '粉碎误区，了解真相', en: 'Bust myths, know the truth' },
  'rights.share': { zh: '分享', 'zh-Hant': '分享', en: 'Share' },
  'rights.shareWechat': { zh: '分享到微信', 'zh-Hant': '分享到微信', en: 'Share to WeChat' },
  'rights.source': { zh: '來源', 'zh-Hant': '来源', en: 'Source' },
  'rights.copied': { zh: '已複製到剪貼板', 'zh-Hant': '已复制到剪贴板', en: 'Copied to clipboard' },

  // Action page
  'action.title': { zh: '如果遇到這種情況怎麼辦', 'zh-Hant': '如果遇到这种情况怎么办', en: 'What To Do If...' },
  'action.subtitle': { zh: '一步步指導，幫助你採取行動', 'zh-Hant': '一步步指导，帮助你采取行动', en: 'Step-by-step guide to help you take action' },
  'action.step': { zh: '第', 'zh-Hant': '第', en: 'Step' },
  'action.safety': { zh: '確保當前安全', 'zh-Hant': '确保当前安全', en: 'Make sure you are safe right now' },
  'action.evidence': { zh: '保存證據', 'zh-Hant': '保存证据', en: 'Save the evidence' },
  'action.legalHelp': { zh: '獲取免費法律幫助', 'zh-Hant': '获取免费法律帮助', en: 'Get free legal help' },
  'action.bank': { zh: '開設自己的銀行帳戶', 'zh-Hant': '开设自己的银行账户', en: 'Open your own bank account' },
  'action.organization': { zh: '尋找華人婦女組織', 'zh-Hant': '寻找华人妇女组织', en: 'Find a Chinese-speaking women\'s organization' },

  // Resources page
  'resources.title': { zh: '尋找附近的幫助', 'zh-Hant': '寻找附近的帮助', en: 'Find Help Near Me' },
  'resources.subtitle': { zh: '經驗證的免費資源', 'zh-Hant': '经验证的免费资源', en: 'Verified free resources' },
  'resources.selectCity': { zh: '選擇你的城市', 'zh-Hant': '选择你的城市', en: 'Select your city' },
  'resources.selectCityPlaceholder': { zh: '選擇城市...', 'zh-Hant': '选择城市...', en: 'Select a city...' },
  'resources.showing': { zh: '顯示城市的資源', 'zh-Hant': '显示城市的资源', en: 'Showing resources for' },
  'resources.noResults': { zh: '沒有找到資源', 'zh-Hant': '没有找到资源', en: 'No resources found' },
  'resources.tapToCall': { zh: '點擊撥打', 'zh-Hant': '点击拨打', en: 'Tap to call' },
  'resources.openMaps': { zh: '打開地圖', 'zh-Hant': '打开地图', en: 'Open maps' },
  'resources.hours': { zh: '服務時間', 'zh-Hant': '服务时间', en: 'Hours' },
  'resources.filterAll': { zh: '全部', 'zh-Hant': '全部', en: 'All' },
  'resources.filterLegal': { zh: '法律援助', 'zh-Hant': '法律援助', en: 'Legal Aid' },
  'resources.filterShelter': { zh: '婦女庇護所', 'zh-Hant': '妇女庇护所', en: 'Shelter' },
  'resources.filterMental': { zh: '心理健康', 'zh-Hant': '心理健康', en: 'Mental Health' },
  'resources.filterMulticultural': { zh: '多元文化服務', 'zh-Hant': '多元文化服务', en: 'Multicultural' },
  'resources.languages': { zh: '語言', 'zh-Hant': '语言', en: 'Languages' },
  'resources.call': { zh: '撥打', 'zh-Hant': '拨打', en: 'Call' },
  'resources.directions': { zh: '導航', 'zh-Hant': '导航', en: 'Directions' },

  // Chat page
  'chat.title': { zh: 'AI助手', 'zh-Hant': 'AI助手', en: 'AI Assistant' },
  'chat.subtitle': { zh: '用中文提問，獲得即時幫助', 'zh-Hant': '用中文提问，获得即时帮助', en: 'Ask in Chinese, get instant help' },
  'chat.placeholder': { zh: '輸入你的問題...', 'zh-Hant': '输入你的问题...', en: 'Enter your question...' },
  'chat.send': { zh: '發送', 'zh-Hant': '发送', en: 'Send' },
  'chat.thinking': { zh: '思考中...', 'zh-Hant': '思考中...', en: 'Thinking...' },
  'chat.findHotline': { zh: '尋找熱線', 'zh-Hant': '寻找热线', en: 'Find Hotline' },

  // About page
  'about.title': { zh: '關於我們', 'zh-Hant': '关于我们', en: 'About' },
  'about.mission': { zh: '我們的使命', 'zh-Hant': '我们的使命', en: 'Our Mission' },
  'about.missionText': { zh: '我們相信每位華人女性都應該了解自己在加拿大的權利，無論她的移民身份、語言能力或財務狀況如何。這個網站旨在提供準確、易懂的法律資訊，幫助你在艱難的處境中做出知情的決定。', 'zh-Hant': '我们相信每位华人女性都应该了解自己在加拿大的权利，无论她的移民身份、语言能力或财务状况如何。这个网站旨在提供准确、易懂的法律信息，帮助你在艰难的处境中做出知情的决定。', en: 'We believe every Chinese immigrant woman in Canada should know her rights, regardless of her immigration status, language ability, or financial situation. This website aims to provide accurate, easy-to-understand legal information to help you make informed decisions in difficult situations.' },
  'about.privacy': { zh: '隱私保護', 'zh-Hant': '隐私保护', en: 'Privacy' },
  'about.privacyText': { zh: '我們不收集、儲存或分享任何個人資料。本網站不使用追蹤器、分析工具或第三方腳本。你的訪問完全保密。', 'zh-Hant': '我们不收集、存储或分享任何个人资料。本网站不使用追踪器、分析工具或第三方脚本。你的访问完全保密。', en: 'We do not collect, store, or share any personal data. This website does not use trackers, analytics, or third-party scripts. Your visit is completely confidential.' },
  'about.disclaimer': { zh: '免責聲明', 'zh-Hant': '免责声明', en: 'Disclaimer' },
  'about.disclaimerText': { zh: '本網站提供的資訊僅供參考，不構成法律意見。如需法律幫助，請諮詢持牌律師或法律援助機構。', 'zh-Hant': '本網站提供的資訊僅供參考，不構成法律意見。如需法律幫助，請諮詢持牌律師或法律援助機構。', en: 'The information provided on this website is for reference only and does not constitute legal advice. If you need legal help, please consult a licensed lawyer or legal aid organization.' },
  'about.contact': { zh: '聯繫我們', 'zh-Hant': '联系我们', en: 'Contact Us' },
  'about.contactEmail': { zh: '郵箱', 'zh-Hant': '邮箱', en: 'Email' },
  'about.notLegalAdvice': { zh: '本頁面僅供參考，不構成法律意見', 'zh-Hant': '本页面仅供参考，不构成法律意见', en: 'This page is for reference only, not legal advice' },

  // Common
  'common.loading': { zh: '載入中...', 'zh-Hant': '载入中...', en: 'Loading...' },
  'common.error': { zh: '發生錯誤', 'zh-Hant': '发生错误', en: 'An error occurred' },
  'common.retry': { zh: '重試', 'zh-Hant': '重试', en: 'Retry' },
  'common.close': { zh: '關閉', 'zh-Hant': '关闭', en: 'Close' },
  'common.back': { zh: '返回', 'zh-Hant': '返回', en: 'Back' },
};

export function useTranslation(lang: Language) {
  return (key: string): string => {
    return translations[key]?.[lang] || translations[key]?.en || key;
  };
}
