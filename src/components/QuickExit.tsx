'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

// Innocent search queries that look like normal browsing
const COVER_SEARCHES = [
  'easy dinner recipes',
  'weather this week',
  'best hiking trails near me',
  'how to grow tomatoes',
  'top movies 2025',
  'yoga stretches for beginners',
  'chocolate chip cookie recipe',
  'how to fold a fitted sheet',
  'best books to read',
  'indoor plant care tips',
];

export function doQuickExit() {
  const query = COVER_SEARCHES[Math.floor(Math.random() * COVER_SEARCHES.length)];
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

  // Also clear any localStorage traces
  try {
    localStorage.removeItem('herright-chat-current');
    localStorage.removeItem('herright-saved-sessions');
  } catch {}

  // Overwrite every history entry we can with the cover URL,
  // then replace the current entry so back button leads to Google too.
  const histLen = window.history.length;
  for (let i = 0; i < histLen + 5; i++) {
    try { window.history.pushState(null, '', window.location.href); } catch {}
  }

  // Replace the current (and all pushed) entries by navigating away.
  // location.replace does NOT create a new history entry.
  window.location.replace(url);
}

export default function QuickExit() {
  const { isZh, isHant } = useLanguage();

  const getText = (zh: string, zhHant: string, en: string) =>
    isHant ? zhHant : isZh ? zh : en;

  // Shift+Esc = quick exit from anywhere
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && e.shiftKey) doQuickExit();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <button
      onClick={doQuickExit}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium shadow-lg hover:bg-red-700 transition-colors md:top-6 md:right-6"
      aria-label={getText(
        '快速退出 - 按Shift+Escape键也可以退出',
        '快速退出 - 按Shift+Escape鍵也可以退出',
        'Quick Exit - Press Shift+Escape to exit'
      )}
    >
      <X className="w-4 h-4" />
      <span className="md:hidden">{getText('退出', '退出', 'Exit')}</span>
      <span className="hidden md:inline">{getText('快速退出', '快速退出', 'Quick Exit')}</span>
    </button>
  );
}
