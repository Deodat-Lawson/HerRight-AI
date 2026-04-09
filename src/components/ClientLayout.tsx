'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import QuickExit from './QuickExit';
import LanguageToggle from './LanguageToggle';
import Footer from './Footer';
import { CityProvider } from '@/lib/CityContext';

// Full-viewport pages manage their own scroll — skip outer wrapper and Footer.
const FULL_SCREEN_PATHS = ['/chat', '/rights', '/resources'];

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isFullScreen = FULL_SCREEN_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'));

  return (
    <CityProvider>
      <QuickExit />
      <LanguageToggle />
      {isFullScreen ? (
        <>{children}</>
      ) : (
        <>
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </>
      )}
    </CityProvider>
  );
}