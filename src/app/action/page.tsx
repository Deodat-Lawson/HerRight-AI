'use client';

import { scenarios } from '@/data/scenarios';
import { useLanguage } from '@/lib/LanguageContext';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Phone, AlertTriangle } from 'lucide-react';

export default function ActionPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white py-8 px-4 border-b border-gray-200">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {isZh ? '如果遇到这种情况怎么办' : 'What To Do If...'}
          </h1>
          <p className="text-lg text-gray-600">
            {isZh ? '一步步指导，帮助你采取行动' : 'Step-by-step guide to help you take action'}
          </p>
        </div>
      </header>

      {/* Scenarios List */}
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Scenario Header */}
            <button
              onClick={() => setExpandedId(expandedId === scenario.id ? null : scenario.id)}
              className="w-full flex items-center gap-4 p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-3xl">{scenario.icon}</span>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">
                  {isZh ? scenario.titleZh : scenario.titleEn}
                </h2>
              </div>
              {expandedId === scenario.id ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {/* Steps */}
            {expandedId === scenario.id && (
              <div className="px-6 pb-6 border-t border-gray-100">
                <ol className="mt-4 space-y-4">
                  {scenario.steps.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-700 font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-gray-700 leading-relaxed">
                          {isZh ? step.zh : step.en}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                {/* Emergency Contact */}
                <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-100">
                  <div className="flex items-center gap-2 text-red-700 font-medium mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    {isZh ? '需要立即帮助？' : 'Need immediate help?'}
                  </div>
                  <a
                    href="tel:911"
                    className="flex items-center gap-2 text-red-600 hover:text-red-800"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="font-bold">911</span>
                    <span className="text-sm">({isZh ? '紧急情况' : 'Emergency'})</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
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