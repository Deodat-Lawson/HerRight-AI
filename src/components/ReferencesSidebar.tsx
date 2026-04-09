'use client';

import { useMemo } from 'react';
import { Scale, Phone, ExternalLink, MapPin, ChevronRight } from 'lucide-react';
import { lookupRights, lookupResources, getRelevantSourceUrl } from '@/lib/chatContext';
import type { Citation } from '@/lib/citationParser';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
  rightIds?: string[];
  resourceIds?: string[];
}

interface ReferencesSidebarProps {
  messages: Message[];
  isZh: boolean;
  isHant: boolean;
  provinceCode?: string | null;
  getText: (zh: string, zhHant: string, en: string) => string;
}

export default function ReferencesSidebar({ messages, isZh, isHant, provinceCode, getText }: ReferencesSidebarProps) {
  const { rightIds, resourceIds, indexMap } = useMemo(() => {
    const seen = new Set<string>();
    const rIds: string[] = [];
    const resIds: string[] = [];
    const iMap = new Map<string, number>();

    for (const msg of messages) {
      if (!msg.citations) continue;
      for (const cite of msg.citations) {
        if (!seen.has(cite.cardId)) {
          seen.add(cite.cardId);
          iMap.set(cite.cardId, cite.index);
          if (cite.type === 'right') rIds.push(cite.cardId);
          else resIds.push(cite.cardId);
        }
      }
    }
    return { rightIds: rIds, resourceIds: resIds, indexMap: iMap };
  }, [messages]);

  const rights = lookupRights(rightIds);
  const resources = lookupResources(resourceIds);

  if (rights.length === 0 && resources.length === 0) {
    return (
      <aside
        aria-label={getText('参考', '參考', 'References')}
        className="hidden lg:flex flex-col w-80 border-l border-rose-100 bg-white/90 backdrop-blur"
      >
        <h2 className="px-4 py-3 text-sm font-bold text-rose-700 border-b border-rose-100 sticky top-0 bg-white/95 backdrop-blur z-10">
          {getText('本次对话参考', '本次對話參考', 'Session References')}
        </h2>
        <div className="flex-1 flex items-center justify-center p-6">
          <p className="text-sm text-gray-400 text-center">
            {getText(
              '聊天中引用的权利和资源会出现在这里',
              '聊天中引用的權利和資源會出現在這裡',
              'Rights and resources cited in chat will appear here'
            )}
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label={getText('参考', '參考', 'References')}
      className="hidden lg:flex flex-col w-80 border-l border-rose-100 bg-white/90 backdrop-blur overflow-y-auto"
    >
      <h2 className="px-4 py-3 text-sm font-bold text-rose-700 border-b border-rose-100 sticky top-0 bg-white/95 backdrop-blur z-10">
        {getText('本次对话参考', '本次對話參考', 'Session References')}
      </h2>

      {rights.length > 0 && (
        <section className="px-3 pt-3 pb-1">
          <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1 flex items-center gap-1.5">
            <Scale className="w-3 h-3" />
            {getText('法律权利', '法律權利', 'Legal Rights')}
          </h3>
          <div className="space-y-1">
            {rights.map((r) => {
              const title = isHant ? r.titleHant ?? r.titleZh : isZh ? r.titleZh : r.titleEn;
              const source = isHant ? r.sourceHant ?? r.sourceZh : isZh ? r.sourceZh : r.sourceEn;
              const lawUrl = getRelevantSourceUrl(r, provinceCode);
              const idx = indexMap.get(r.id);
              return (
                <div key={r.id} className="px-3 py-2 rounded-lg hover:bg-rose-50 transition-colors group">
                  <a href={`/rights/${r.id}`} className="flex items-start gap-2">
                    {idx && (
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold flex items-center justify-center mt-0.5">
                        {idx}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-rose-700 truncate">{title}</p>
                      <p className="text-[11px] text-gray-500 truncate">{source}</p>
                    </div>
                  </a>
                  {lawUrl && (
                    <a
                      href={lawUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 mt-1 text-[11px] text-rose-600 hover:underline ml-7"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {getText('查看法律原文', '查看法律原文', 'View law')}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {resources.length > 0 && (
        <section className="px-3 pt-3 pb-1">
          <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1 flex items-center gap-1.5">
            <Phone className="w-3 h-3" />
            {getText('资源', '資源', 'Resources')}
          </h3>
          <div className="space-y-1.5">
            {resources.map((r) => {
              const name = (isZh || isHant) ? r.nameZh : r.nameEn;
              const idx = indexMap.get(r.id);
              return (
                <div key={r.id} className="rounded-lg border border-rose-100 overflow-hidden hover:border-rose-200 transition-colors">
                  <div className="px-3 py-2">
                    <div className="flex items-start gap-2">
                      {idx && (
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold flex items-center justify-center mt-0.5">
                          {idx}
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
                        {r.city && (
                          <p className="text-[10px] text-gray-400 flex items-center gap-0.5 mt-0.5">
                            <MapPin className="w-2.5 h-2.5" />
                            {r.city}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t border-rose-50 divide-x divide-rose-50">
                    <a
                      href={`tel:${r.phone.replace(/[^0-9+]/g, '')}`}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[11px] font-medium text-rose-700 hover:bg-rose-50 transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      {r.phone}
                    </a>
                    <a
                      href={`/resources#${r.id}`}
                      className="flex items-center justify-center gap-0.5 px-3 py-1.5 text-[11px] font-medium text-gray-500 hover:bg-gray-50 hover:text-rose-700 transition-colors"
                    >
                      {getText('详情', '詳情', 'Details')}
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </aside>
  );
}
