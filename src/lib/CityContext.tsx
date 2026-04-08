'use client';

import { createContext, useContext, useSyncExternalStore, ReactNode } from 'react';

interface CityContextType {
  selectedCity: string | null;
  selectedProvince: string | null;
  selectedProvinceCode: string | null;
  setLocation: (city: string, province: string, provinceCode: string) => void;
  clearLocation: () => void;
  hasSelectedLocation: boolean;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

const CITY_KEY = 'herright-city';
const PROVINCE_KEY = 'herright-province';
const PROVINCE_CODE_KEY = 'herright-province-code';
const CHANGE_EVENT = 'herright-citychange';

function getCitySnapshot(): string | null {
  return localStorage.getItem(CITY_KEY);
}

function getProvinceSnapshot(): string | null {
  return localStorage.getItem(PROVINCE_KEY);
}

function getProvinceCodeSnapshot(): string | null {
  return localStorage.getItem(PROVINCE_CODE_KEY);
}

function getServerSnapshot(): null {
  return null;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener('storage', callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

export function CityProvider({ children }: { children: ReactNode }) {
  const selectedCity = useSyncExternalStore(subscribe, getCitySnapshot, getServerSnapshot);
  const selectedProvince = useSyncExternalStore(subscribe, getProvinceSnapshot, getServerSnapshot);
  const selectedProvinceCode = useSyncExternalStore(subscribe, getProvinceCodeSnapshot, getServerSnapshot);

  const setLocation = (city: string, province: string, provinceCode: string) => {
    localStorage.setItem(CITY_KEY, city);
    localStorage.setItem(PROVINCE_KEY, province);
    localStorage.setItem(PROVINCE_CODE_KEY, provinceCode);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  const clearLocation = () => {
    localStorage.removeItem(CITY_KEY);
    localStorage.removeItem(PROVINCE_KEY);
    localStorage.removeItem(PROVINCE_CODE_KEY);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return (
    <CityContext.Provider
      value={{
        selectedCity,
        selectedProvince,
        selectedProvinceCode,
        setLocation,
        clearLocation,
        hasSelectedLocation: !!selectedCity && !!selectedProvince,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
}
