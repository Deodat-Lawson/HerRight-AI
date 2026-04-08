'use client';

import { resources as localResources, Resource } from '@/data/resources';
import { canadaResources, CanadaResource, majorCities } from '@/data/canadaResources';
import { useLanguage } from '@/lib/LanguageContext';
import { useCity } from '@/lib/CityContext';
import { useState } from 'react';
import { Phone, MapPin, Languages, Globe } from 'lucide-react';

type FilterType = 'all' | 'legal' | 'shelter' | 'lawyer' | 'mental' | 'settlement';

export default function ResourcesPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const { selectedCity, selectedProvince, setLocation, hasSelectedLocation } = useCity();
  const [filter, setFilter] = useState<FilterType>('all');
  const [cityFilter, setCityFilter] = useState<string>(selectedCity ?? '');
  const [prevSelectedCity, setPrevSelectedCity] = useState(selectedCity);
  const showNational = true;

  // Sync city filter when context city changes (e.g. after hydration from localStorage)
  if (selectedCity !== prevSelectedCity) {
    setPrevSelectedCity(selectedCity);
    if (selectedCity && !cityFilter) {
      setCityFilter(selectedCity);
    }
  }

  const handleCityChange = (city: string) => {
    setCityFilter(city);
    if (city) {
      const cityInfo = majorCities.find(c => c.city === city);
      if (cityInfo) {
        setLocation(cityInfo.city, cityInfo.province, cityInfo.provinceCode);
      }
    }
  };

  // Get resources based on city filter or selected city
  const getFilteredResources = () => {
    let filtered: (Resource | CanadaResource)[] = [];

    // Add local Vancouver resources
    const localFiltered = localResources.filter(r =>
      filter === 'all' || r.type === filter
    );
    filtered = [...localFiltered];

    // Add Canada resources
    if (cityFilter || showNational) {
      let canadaFiltered = canadaResources;

      if (cityFilter) {
        canadaFiltered = canadaResources.filter(r =>
          r.city.toLowerCase() === cityFilter.toLowerCase()
        );
      }

      // Always include national resources
      const national = canadaResources.filter(r => r.isNational);

      // Combine and dedupe
      const combined = [...national, ...canadaFiltered];

      filtered = [...filtered, ...combined].filter(r =>
        filter === 'all' || r.type === filter
      );
    }

    // Unique by phone
    const seen = new Set();
    return filtered.filter(r => {
      const key = r.phone;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const filteredResources = getFilteredResources();

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white py-8 px-4 border-b border-gray-200">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {isZh ? '寻找附近的帮助' : 'Find Help Near Me'}
          </h1>
          <p className="text-lg text-gray-600">
            {isZh ? '经验证的免费资源' : 'Verified free resources'}
          </p>
        </div>
      </header>

      {/* City Filter */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl p-4 border shadow-sm">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <Globe className="w-4 h-4" />
            {isZh ? '选择你的城市' : 'Select your city'}
          </label>
          <select
            value={cityFilter}
            onChange={(e) => handleCityChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">{isZh ? '选择城市...' : 'Select a city...'}</option>
            {majorCities.map(({ city }) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          {hasSelectedLocation && (
            <div className="mt-3 p-2 bg-green-50 text-green-700 text-sm rounded-lg flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {isZh ? `显示 ${selectedCity}，${selectedProvince} 的资源` : `Showing resources for ${selectedCity}, ${selectedProvince}`}
            </div>
          )}
        </div>
      </div>

      {/* Type Filters */}
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex flex-wrap gap-2">
          {(['all', 'crisis', 'legal', 'shelter', 'mental', 'multicultural'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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

      {/* Resources List */}
      <main className="max-w-3xl mx-auto px-4 pb-8 space-y-4 mt-6">
        {filteredResources.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>{isZh ? '没有找到资源。请选择其他城市或筛选条件。' : 'No resources found. Try a different city or filter.'}</p>
          </div>
        ) : (
          filteredResources.map((resource) => (
            <article
              key={resource.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
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
                </div>
              </div>
            </article>
          ))
        )}
      </main>

      {/* Disclaimer */}
      <footer className="px-4 py-8 text-center">
        <p className="text-sm text-gray-400">
          {isZh
            ? '本页面仅供参考，不构成法律意见。如需法律帮助，请咨询持牌律师。'
            : 'This page is for reference only, not legal advice. Consult a licensed lawyer for legal help.'}
        </p>
      </footer>
    </div>
  );
}