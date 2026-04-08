'use client';

import { ReactNode } from 'react';
import QuickExit from './QuickExit';
import LanguageToggle from './LanguageToggle';
import Footer from './Footer';
import { CityProvider } from '@/lib/CityContext';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <CityProvider>
      <QuickExit />
      <LanguageToggle />
      <main className="min-h-screen pb-16">
        {children}
      </main>
      <Footer />
    </CityProvider>
  );
}