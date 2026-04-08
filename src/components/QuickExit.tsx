'use client';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function QuickExit() {
  const router = useRouter();
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const handleQuickExit = () => {
    // Close current tab
    window.close();

    // Open benign site in new tab as fallback
    // Using Google Recipes as a benign site
    window.open('https://www.google.com/search?q=简单食谱', '_blank');

    // Also try to navigate to a benign page in current tab
    router.push('https://www.google.com/search?q=天气');
  };

  return (
    <button
      onClick={handleQuickExit}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium shadow-lg hover:bg-red-700 transition-colors md:top-6 md:right-6"
      aria-label={isZh ? '快速退出 - 按Escape键也可以退出' : 'Quick Exit - Press Escape to exit'}
    >
      <X className="w-4 h-4" />
      <span className="md:hidden">退出</span>
      <span className="hidden md:inline">快速退出</span>
    </button>
  );
}