'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <footer className="mt-auto py-6 px-4 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto text-center text-sm text-gray-500">
        <p className="mb-2">
          {isZh ? '© 2024 HerRight. 保留所有权利。' : '© 2024 HerRight. All rights reserved.'}
        </p>
        <p className="text-xs text-gray-400">
          {isZh ? '本页面仅供参考，不构成法律意见。' : 'This page is for reference only, not legal advice.'}
        </p>
        <nav className="mt-4 flex justify-center gap-4 text-xs">
          <Link href="/about" className="text-gray-500 hover:text-red-600">
            {isZh ? '关于我们' : 'About'}
          </Link>
          <Link href="/about#privacy" className="text-gray-500 hover:text-red-600">
            {isZh ? '隐私政策' : 'Privacy'}
          </Link>
        </nav>
      </div>
    </footer>
  );
}