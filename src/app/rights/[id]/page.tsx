'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Scale, ChevronLeft, ChevronRight } from 'lucide-react';
import { rightsCards, JURISDICTION_LABELS, type Jurisdiction } from '@/data/rights';
import { useLanguage } from '@/lib/LanguageContext';

const ORDER: Jurisdiction[] = [
  'federal', 'AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT',
];

export default function RightDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { isZh, isHant } = useLanguage();
  const cardIndex = rightsCards.findIndex((r) => r.id === id);
  const card = rightsCards[cardIndex];
  if (!card) notFound();

  const prevCard = cardIndex > 0 ? rightsCards[cardIndex - 1] : null;
  const nextCard = cardIndex < rightsCards.length - 1 ? rightsCards[cardIndex + 1] : null;

  const getText = (zh: string, zhHant: string, en: string) => {
    if (isHant) return zhHant;
    if (isZh) return zh;
    return en;
  };

  const title = isHant ? card.titleHant ?? card.titleZh : isZh ? card.titleZh : card.titleEn;
  const content = isHant ? card.contentHant ?? card.contentZh : isZh ? card.contentZh : card.contentEn;
  const sources = (card.sources ?? []).slice().sort(
    (a, b) => ORDER.indexOf(a.jurisdiction) - ORDER.indexOf(b.jurisdiction)
  );

  // Group sources by jurisdiction type
  const federalSources = sources.filter(s => s.jurisdiction === 'federal');
  const provincialSources = sources.filter(s => s.jurisdiction !== 'federal');

  return (
    <div className="min-h-[100dvh] bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link
            href="/rights"
            className="flex items-center gap-1.5 text-sm text-rose-600 hover:text-rose-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {getText('所有权利', '所有權利', 'All Rights')}
          </Link>
          <div className="flex items-center gap-1">
            {prevCard && (
              <Link
                href={`/rights/${prevCard.id}`}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label={getText('上一条', '上一條', 'Previous')}
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
            )}
            <span className="text-xs text-gray-400 tabular-nums">
              {cardIndex + 1}/{rightsCards.length}
            </span>
            {nextCard && (
              <Link
                href={`/rights/${nextCard.id}`}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label={getText('下一条', '下一條', 'Next')}
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="md:grid md:grid-cols-5 md:gap-8">
          {/* Left: card content */}
          <article className="md:col-span-2 mb-6 md:mb-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 md:sticky md:top-20">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Scale className="w-6 h-6 text-red-600" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 pt-1">{title}</h1>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">{content}</p>
            </div>
          </article>

          {/* Right: legal sources */}
          <section className="md:col-span-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
              <Scale className="w-3.5 h-3.5" />
              {getText(
                `法律来源（${sources.length}）`,
                `法律來源（${sources.length}）`,
                `Legal sources (${sources.length})`
              )}
            </h2>

            {sources.length === 0 ? (
              <p className="text-sm text-gray-500 italic px-1">
                {getText(
                  '此卡片暂无详细引用。',
                  '此卡片暫無詳細引用。',
                  'No detailed citations indexed for this card yet.'
                )}
              </p>
            ) : (
              <div className="space-y-4">
                {/* Federal sources */}
                {federalSources.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-2 px-1">
                      {getText('联邦法律', '聯邦法律', 'Federal Law')}
                    </h3>
                    <div className="space-y-2">
                      {federalSources.map((s, i) => (
                        <SourceCard key={`federal-${i}`} source={s} isZh={isZh} isHant={isHant} getText={getText} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Provincial sources */}
                {provincialSources.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-2 px-1">
                      {getText('各省/地区法律', '各省/地區法律', 'Provincial / Territorial Law')}
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                      {provincialSources.map((s, i) => (
                        <SourceCard key={`${s.jurisdiction}-${i}`} source={s} isZh={isZh} isHant={isHant} getText={getText} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-center mt-5">
              <p className="text-xs text-amber-800">
                {getText(
                  '引用为时间点参考，非法律意见。请在依赖前与持牌律师核实。',
                  '引用為時間點參考，非法律意見。請在依賴前與持牌律師核實。',
                  'Citations are point-in-time references, not legal advice. Verify with a licensed lawyer before relying on them.'
                )}
              </p>
            </div>
          </section>
        </div>

        {/* Prev/Next navigation at bottom */}
        <div className="flex items-stretch gap-3 mt-8 pt-5 border-t border-gray-200">
          {prevCard ? (
            <Link
              href={`/rights/${prevCard.id}`}
              className="flex-1 p-4 bg-white rounded-xl border border-gray-100 hover:border-rose-200 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <ChevronLeft className="w-3 h-3" />
                {getText('上一条', '上一條', 'Previous')}
              </span>
              <p className="text-sm font-medium text-gray-900 group-hover:text-rose-700 mt-1 line-clamp-1">
                {isHant ? prevCard.titleHant ?? prevCard.titleZh : isZh ? prevCard.titleZh : prevCard.titleEn}
              </p>
            </Link>
          ) : <div className="flex-1" />}
          {nextCard ? (
            <Link
              href={`/rights/${nextCard.id}`}
              className="flex-1 p-4 bg-white rounded-xl border border-gray-100 hover:border-rose-200 hover:shadow-sm transition-all text-right group"
            >
              <span className="text-xs text-gray-400 flex items-center gap-1 justify-end">
                {getText('下一条', '下一條', 'Next')}
                <ChevronRight className="w-3 h-3" />
              </span>
              <p className="text-sm font-medium text-gray-900 group-hover:text-rose-700 mt-1 line-clamp-1">
                {isHant ? nextCard.titleHant ?? nextCard.titleZh : isZh ? nextCard.titleZh : nextCard.titleEn}
              </p>
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </main>
    </div>
  );
}

function SourceCard({
  source,
  isZh,
  isHant,
  getText,
}: {
  source: { jurisdiction: Jurisdiction; citation: string; url?: string };
  isZh: boolean;
  isHant: boolean;
  getText: (zh: string, zhHant: string, en: string) => string;
}) {
  const label = isZh || isHant
    ? JURISDICTION_LABELS[source.jurisdiction].zh
    : JURISDICTION_LABELS[source.jurisdiction].en;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:border-rose-200 transition-colors">
      <div className="flex items-center justify-between gap-3 mb-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
          {label}
        </span>
        {source.url && (
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-rose-600 hover:underline flex items-center gap-1 flex-shrink-0"
          >
            {getText('查看原文', '查看原文', 'View source')}
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
      <p className="text-sm text-gray-800 leading-relaxed">{source.citation}</p>
    </div>
  );
}
