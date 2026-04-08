'use client';

import { rightsCards, RightsCard } from '@/data/rights';
import { useLanguage } from '@/lib/LanguageContext';
import { Share2, Scale } from 'lucide-react';

export default function RightsPage() {
  const { isZh, isHant } = useLanguage();

  const getText = (zh: string, zhHant: string, en: string) => {
    if (isHant) return zhHant;
    if (isZh) return zh;
    return en;
  };

  const handleShare = (card: RightsCard) => {
    const title = isHant
      ? card.titleHant || card.titleZh
      : (isZh ? card.titleZh : card.titleEn);
    const content = isHant
      ? card.contentHant || card.contentZh
      : (isZh ? card.contentZh : card.contentEn);
    const text = `${title}\n\n${content}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        alert(getText('已复制到剪贴板，可以分享到微信', '已複製到剪貼板，可以分享到微信', 'Copied to clipboard'));
      }).catch(() => {
        window.open('weixin://', '_blank');
      });
    } else {
      window.open('weixin://', '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white py-8 px-4 border-b border-gray-200">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {getText('了解你的权利', '了解你的權利', 'Know Your Rights')}
          </h1>
          <p className="text-lg text-gray-600">
            {getText('粉碎误区，了解真相', '粉碎誤區，了解真相', 'Bust myths, know the truth')}
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-5">
        {rightsCards.map((card) => (
          <article
            key={card.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Scale className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                  {isHant
                    ? card.titleHant || card.titleZh
                    : (isZh ? card.titleZh : card.titleEn)}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
                  {isHant
                    ? card.contentHant || card.contentZh
                    : (isZh ? card.contentZh : card.contentEn)}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">
                    {getText('来源：', '來源：', 'Source: ')}
                    {isHant
                      ? card.sourceHant || card.sourceZh
                      : (isZh ? card.sourceZh : card.sourceEn)}
                  </p>
                  <button
                    onClick={() => handleShare(card)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{getText('分享', '分享', 'Share')}</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </main>

      <footer className="px-4 py-8 text-center">
        <div className="max-w-lg mx-auto bg-amber-50 border border-amber-100 rounded-xl p-4">
          <p className="text-sm text-amber-800">
            ⚠️ {getText('本页面仅供参考，不构成法律意见。如需法律帮助，请咨询持牌律师。', '本頁面僅供參考，不構成法律意見。如需法律幫助，請諮詢持牌律師。', 'This page is for reference only, not legal advice. Consult a licensed lawyer for legal help.')}
          </p>
        </div>
      </footer>
    </div>
  );
}