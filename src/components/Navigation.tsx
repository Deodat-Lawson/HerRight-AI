'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { MessageCircle } from 'lucide-react';

const navItems = [
  { href: '/rights', key: 'nav.rights' },
  { href: '/action', key: 'nav.action' },
  { href: '/chat', key: 'nav.chat' },
  { href: '/resources', key: 'nav.resources' },
  { href: '/about', key: 'nav.about' },
];

export default function Navigation() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="text-lg font-bold text-red-600">
            HerRight
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-red-50 text-red-700 font-medium'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.key === 'nav.chat' && <MessageCircle className="w-4 h-4" />}
                  {isZh
                    ? item.key.replace('nav.', '').charAt(0).toUpperCase() +
                      item.key.replace('nav.', '').slice(1)
                    : item.key.replace('nav.', '').replace(/([A-Z])/g, ' $1').trim()}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu indicator */}
          <div className="md:hidden text-xs text-gray-500">
            {navItems.find((item) => pathname === item.href)?.key.replace('nav.', '') || ''}
          </div>
        </div>
      </div>
    </nav>
  );
}
