'use client';

import { createContext, useContext, useSyncExternalStore, ReactNode } from 'react';

type Language = 'zh' | 'zh-Hant' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isZh: boolean;
  isHant: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'herright-language';
const CHANGE_EVENT = 'herright-languagechange';

function getSnapshot(): Language {
  const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
  return saved ?? 'zh';
}

function getServerSnapshot(): Language {
  return 'zh';
}

function subscribe(callback: () => void): () => void {
  window.addEventListener('storage', callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLanguage = (lang: Language) => {
    localStorage.setItem(STORAGE_KEY, lang);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      isZh: language === 'zh',
      isHant: language === 'zh-Hant'
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
