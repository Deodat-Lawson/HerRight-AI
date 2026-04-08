'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 left-4 z-40 flex items-center gap-1 px-1 py-1 bg-white/90 rounded-lg shadow-md">
      <button
        onClick={() => setLanguage('zh')}
        className={`px-2 py-1 rounded-md text-sm font-medium transition-all ${
          language === 'zh'
            ? 'bg-red-600 text-white scale-105'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="简体中文"
      >
        简
      </button>
      <button
        onClick={() => setLanguage('zh-Hant')}
        className={`px-2 py-1 rounded-md text-sm font-medium transition-all ${
          language === 'zh-Hant'
            ? 'bg-red-600 text-white scale-105'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="繁體中文"
      >
        繁
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded-md text-sm font-medium transition-all ${
          language === 'en'
            ? 'bg-red-600 text-white scale-105'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="English"
      >
        EN
      </button>
    </div>
  );
}
