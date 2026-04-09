'use client';

import { canadaResources, CanadaResource, majorCities } from '@/data/canadaResources';
import { useLanguage } from '@/lib/LanguageContext';
import { useCity } from '@/lib/CityContext';
import { useEffect, useState, useRef } from 'react';
import { Phone, MapPin, Languages, Globe, ArrowLeft, MessageCircle } from 'lucide-react';
import Link from 'next/link';

type FilterType = 'all' | CanadaResource['type'];

// Parse hash like "#vancouver-shelter" or "#vancouver-shelter,211-national".
function parseFocusedIds(hash: string): Set<string> {
  return new Set(
    hash.replace(/^#/, '').split(/[#,]/).map((s) => s.trim()).filter(Boolean)
  );
}

export default function ResourcesPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const { selectedCity, selectedProvince, setLocation, hasSelectedLocation } = useCity();
  const [focused, setFocused] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<FilterType>('all');
  const [cityFilter, setCityFilter] = useState<string>(selectedCity ?? '');
  const [prevSelectedCity, setPrevSelectedCity] = useState(selectedCity);
  const scrolledRef = useRef(false);

  // When arriving via hash, auto-set city filter to match the linked resource
  // so the resource is visible in the list.
  useEffect(() => {
    const apply = () => {
      const ids = parseFocusedIds(window.location.hash);
      setFocused(ids);

      if (ids.size > 0 && !scrolledRef.current) {
        // Find the first focused resource and set city filter to its city
        const firstId = [...ids][0];
        const target = canadaResources.find(r => r.id === firstId);
        if (target && !target.isNational) {
          setCityFilter(target.city);
          // Also reset type filter if current filter would hide this resource
          setFilter(prev => (prev !== 'all' && prev !== target.type) ? 'all' : prev);
        }

        scrolledRef.current = true;
        // Wait for re-render with correct filters, then scroll
        setTimeout(() => {
          const el = document.getElementById(firstId);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  // Sync city filter when context city changes (e.g. after hydration from localStorage)
  if (selectedCity !== prevSelectedCity) {
    setPrevSelectedCity(selectedCity);
    if (selectedCity && !cityFilter) {
      setCityFilter(selectedCity);
    }
  }

  // Clear hash + focused highlight when user actively changes filters
  const clearHash = () => {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
      setFocused(new Set());
    }
  };

  const handleCityChange = (city: string) => {
    clearHash();
    setCityFilter(city);
    if (city) {
      const cityInfo = majorCities.find(c => c.city === city);
      if (cityInfo) {
        setLocation(cityInfo.city, cityInfo.province, cityInfo.provinceCode);
      }
    }
  };

  const handleFilterChange = (f: FilterType) => {
    clearHash();
    setFilter(f);
  };

  // Build the filtered resource list from canadaResources (the comprehensive source).
  const filteredResources = (() => {
    // Start with city-filtered or all resources
    let pool: CanadaResource[];
    if (cityFilter) {
      // City-specific + national
      pool = canadaResources.filter(
        r => r.city.toLowerCase() === cityFilter.toLowerCase() || r.isNational
      );
    } else {
      // No city selected — show everything
      pool = [...canadaResources];
    }

    // Apply type filter
    if (filter !== 'all') {
      pool = pool.filter(r => r.type === filter);
    }

    // Always include focused (hash-linked) resources even if they'd be filtered out
    if (focused.size > 0) {
      const focusedResources = canadaResources.filter(r => focused.has(r.id));
      const poolIds = new Set(pool.map(r => r.id));
      for (const r of focusedResources) {
        if (!poolIds.has(r.id)) pool.push(r);
      }
    }

    // Sort: national last, focused first, then alphabetical by city
    pool.sort((a, b) => {
      const aFocused = focused.has(a.id) ? 0 : 1;
      const bFocused = focused.has(b.id) ? 0 : 1;
      if (aFocused !== bFocused) return aFocused - bFocused;
      const aNat = a.isNational ? 1 : 0;
      const bNat = b.isNational ? 1 : 0;
      if (aNat !== bNat) return aNat - bNat;
      return a.city.localeCompare(b.city);
    });

    return pool;
  })();

  const getTypeLabel = (type: string) => {
    const labels: Record<string, { zh: string; en: string }> = {
      legal: { zh: '法律援助', en: 'Legal Aid' },
      shelter: { zh: '妇女庇护所', en: 'Shelter' },
      lawyer: { zh: '律师', en: 'Lawyer' },
      mental: { zh: '心理健康', en: 'Mental Health' },
      settlement: { zh: '移民服务', en: 'Settlement' },
      crisis: { zh: '危机热线', en: 'Crisis Line' },
      immigration: { zh: '移民服务', en: 'Immigration' },
      multicultural: { zh: '多元文化服务', en: 'Multicultural' },
      police: { zh: '警察', en: 'Police' },
    };
    return isZh ? labels[type]?.zh || type : labels[type]?.en || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      legal: 'bg-blue-100 text-blue-700',
      shelter: 'bg-purple-100 text-purple-700',
      lawyer: 'bg-green-100 text-green-700',
      mental: 'bg-orange-100 text-orange-700',
      settlement: 'bg-teal-100 text-teal-700',
      crisis: 'bg-red-100 text-red-700',
      immigration: 'bg-cyan-100 text-cyan-700',
      multicultural: 'bg-pink-100 text-pink-700',
      police: 'bg-gray-100 text-gray-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-gray-50">
      {/* Header + filters — pr-32 leaves room for global QuickExit button */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 pr-32 md:pr-36">
        <div className="max-w-3xl mx-auto px-4 py-3 space-y-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1 text-sm text-rose-600 hover:text-rose-700 flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              {isZh ? '返回' : 'Home'}
            </Link>
            <div className="min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {isZh ? '寻找附近的帮助' : 'Find Help Near Me'}
              </h1>
              <p className="text-sm text-gray-600">
                {isZh ? '经验证的免费资源' : 'Verified free resources'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <select
              value={cityFilter}
              onChange={(e) => handleCityChange(e.target.value)}
              className="flex-1 px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">{isZh ? '选择城市...' : 'Select a city...'}</option>
              {majorCities.map(({ city }) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {hasSelectedLocation && (
              <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full whitespace-nowrap">
                <MapPin className="w-3 h-3" />
                {selectedCity}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(['all', 'crisis', 'legal', 'shelter', 'mental', 'multicultural', 'immigration', 'police'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filter === f
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {f === 'all' ? (isZh ? '全部' : 'All') : getTypeLabel(f)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources List — only scroll area */}
      <main className="flex-1 min-h-0 overflow-y-auto max-w-3xl w-full mx-auto px-4 py-4 space-y-3">
        {filteredResources.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>{isZh ? '没有找到资源。请选择其他城市或筛选条件。' : 'No resources found. Try a different city or filter.'}</p>
          </div>
        ) : (
          filteredResources.map((resource) => (
            <article
              key={resource.id}
              id={resource.id}
              className={`bg-white rounded-2xl shadow-sm border p-5 scroll-mt-24 transition-all ${
                focused.has(resource.id)
                  ? 'border-red-400 ring-2 ring-red-400 shadow-lg'
                  : 'border-gray-100'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h2 className="text-lg font-bold text-gray-900">
                      {isZh ? resource.nameZh : resource.nameEn}
                    </h2>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(resource.type)}`}>
                      {getTypeLabel(resource.type)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {isZh ? resource.descriptionZh : resource.descriptionEn}
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    {/* Phone */}
                    <a
                      href={`tel:${resource.phone}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="font-medium">{resource.phone}</span>
                      <span className="text-xs text-gray-400">
                        ({isZh ? '点击拨打' : 'Tap to call'})
                      </span>
                    </a>

                    {/* Address (if available) */}
                    {'address' in resource && resource.address && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
                      >
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{resource.address}</span>
                        <span className="text-xs text-gray-400">
                          ({isZh ? '打开地图' : 'Open maps'})
                        </span>
                      </a>
                    )}

                    {/* Languages */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Languages className="w-4 h-4" />
                      <span>{resource.languages.join(', ')}</span>
                    </div>

                    {/* Hours */}
                    {'hours' in resource && resource.hours && (
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">{isZh ? '服务时间' : 'Hours'}:</span> {resource.hours}
                      </div>
                    )}
                  </div>

                  {/* Ask in chat */}
                  <Link
                    href={`/chat?ask=${encodeURIComponent(isZh ? `告诉我更多关于 ${resource.nameZh} 的信息` : `Tell me more about ${resource.nameEn}`)}`}
                    className="flex items-center gap-1.5 mt-4 pt-3 border-t border-gray-100 text-xs font-medium text-rose-600 hover:text-rose-700 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    {isZh ? '在聊天中询问' : 'Ask about this in chat'}
                  </Link>
                </div>
              </div>
            </article>
          ))
        )}
        <p className="text-center text-xs text-gray-400 pt-2">
          {isZh
            ? '本页面仅供参考，不构成法律意见。如需法律帮助，请咨询持牌律师。'
            : 'This page is for reference only, not legal advice. Consult a licensed lawyer for legal help.'}
        </p>
      </main>
    </div>
  );
}