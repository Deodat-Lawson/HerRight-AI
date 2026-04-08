'use client';

import Link from 'next/link';
import { Shield, FileText, MapPin, Lock, Phone, X, MessageCircle, PhoneOff } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useState, useEffect } from 'react';

export default function Home() {
  const { isZh, isHant } = useLanguage();
  const [emergencyMode, setEmergencyMode] = useState(false);

  const handleEmergencyClick = () => {
    setEmergencyMode(true);
  };

  const exitEmergencyMode = () => {
    setEmergencyMode(false);
  };

  // Handle escape key to exit emergency mode
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') exitEmergencyMode();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const getText = (zh: string, zhHant: string, en: string) => {
    if (isHant) return zhHant;
    if (isZh) return zh;
    return en;
  };

  return (
    <div className={`min-h-screen ${emergencyMode ? 'bg-white' : 'bg-gradient-to-b from-red-50 to-white'}`}>
      {/* Protective red vignette — sweeps in from edges on activation,
          then settles into a calm inset glow for the duration. */}
      {emergencyMode && (
        <div
          className="fixed inset-0 z-[55] pointer-events-none animate-emergency-vignette-in"
          aria-hidden="true"
        />
      )}

      {/* Persistent red fade at top — breathes gently while active */}
      {emergencyMode && (
        <div
          className="fixed top-0 left-0 right-0 h-32 z-[60] pointer-events-none bg-gradient-to-b from-red-600/30 to-transparent animate-emergency-breathe"
          aria-hidden="true"
        />
      )}

      {/* Emergency Mode — full screen takeover */}
      {emergencyMode && (
        <div className="fixed inset-0 z-50 bg-white overflow-auto animate-emergency-content-in">
          {/* Minimal header */}
          <header className="py-4 px-4 sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
            <div className="max-w-lg mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-emergency-dot-glow" />
                <span className="text-sm font-medium text-gray-500">
                  {getText('安全模式', '安全模式', 'Safe mode')}
                </span>
              </div>
              <button
                onClick={exitEmergencyMode}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
                aria-label={getText('退出', '退出', 'Exit')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </header>

          <main className="max-w-lg mx-auto px-4 pb-12 space-y-5">
            {/* Silent text — the safest first action */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">
                {getText('最安全的方式', '最安全的方式', 'Safest option')}
              </p>
              <a
                href="sms:686868&body=START"
                className="flex items-center gap-4 w-full p-5 bg-gray-900 text-white rounded-2xl shadow-lg active:scale-[0.98] transition-transform"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-lg">
                    {getText('发短信求助', '發短信求助', 'Text for help')}
                  </div>
                  <div className="text-sm text-gray-300">
                    {getText('发送 START 到 686868', '發送 START 到 686868', 'Send START to 686868')}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {getText('无声 · 保密 · 24/7', '無聲 · 保密 · 24/7', 'Silent · Confidential · 24/7')}
                  </div>
                </div>
              </a>
            </div>

            {/* 911 — when you can talk */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">
                {getText('如果可以打电话', '如果可以打電話', 'If you can talk')}
              </p>
              <a
                href="tel:911"
                className="flex items-center gap-4 w-full p-5 bg-red-600 text-white rounded-2xl shadow-lg active:scale-[0.98] transition-transform"
              >
                <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-lg">
                    {getText('拨打 911', '撥打 911', 'Call 911')}
                  </div>
                  <div className="text-sm text-red-100">
                    {getText('警察、救护车、消防', '警察、救護車、消防', 'Police, ambulance, fire')}
                  </div>
                </div>
              </a>
              {/* Can't talk tip */}
              <div className="mt-2 flex items-start gap-2 px-2">
                <PhoneOff className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500">
                  {getText(
                    '不能说话？拨打 911 后保持通话不挂断，调度员会追踪位置并派人来。',
                    '不能說話？撥打 911 後保持通話不掛斷，調度員會追蹤位置並派人來。',
                    "Can't talk? Call 911 and stay on the line silently. They'll trace your location and send help."
                  )}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* More help options */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-500">
                {getText('更多帮助', '更多幫助', 'More help')}
              </p>

              <a
                href="tel:1-833-456-4566"
                className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl active:scale-[0.98] transition-transform"
              >
                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900">
                    {getText('危机热线', '危機熱線', 'Crisis Helpline')}
                  </div>
                  <div className="text-sm text-gray-500">1-833-456-4566</div>
                </div>
                <span className="text-xs text-gray-400">24/7</span>
              </a>

              <a
                href="tel:1-877-336-2433"
                className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl active:scale-[0.98] transition-transform"
              >
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900">
                    {getText('妇女庇护所', '婦女庇護所', "Women's Shelter")}
                  </div>
                  <div className="text-sm text-gray-500">1-877-336-2433</div>
                </div>
                <span className="text-xs text-gray-400">
                  {getText('安全住所', '安全住所', 'Safe housing')}
                </span>
              </a>
            </div>

            {/* If you need to leave RIGHT NOW */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <p className="font-semibold text-gray-900 text-sm">
                {getText('如果你现在要离开，带上：', '如果你現在要離開，帶上：', 'If you are leaving now, grab:')}
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-red-100 rounded text-red-600 flex items-center justify-center text-xs font-bold">1</span>
                  {getText('手机和充电器', '手機和充電器', 'Phone + charger')}
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-red-100 rounded text-red-600 flex items-center justify-center text-xs font-bold">2</span>
                  {getText('身份证件', '身份證件', 'ID / passport')}
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-red-100 rounded text-red-600 flex items-center justify-center text-xs font-bold">3</span>
                  {getText('孩子的证件', '孩子的證件', "Kids' documents")}
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-red-100 rounded text-red-600 flex items-center justify-center text-xs font-bold">4</span>
                  {getText('现金或银行卡', '現金或銀行卡', 'Cash or cards')}
                </div>
              </div>
              <p className="text-xs text-gray-400">
                {getText('去最近的朋友家、警察局或庇护所', '去最近的朋友家、警察局或庇護所', 'Go to nearest friend, police station, or shelter')}
              </p>
            </div>

            {/* Privacy footer */}
            <div className="text-center text-xs text-gray-400 pt-2 pb-4">
              <Lock className="w-3.5 h-3.5 inline mr-1" />
              {getText('按 Esc 快速退出 · 不保存任何记录', '按 Esc 快速退出 · 不保存任何記錄', 'Press Esc to exit · Nothing is saved')}
            </div>
          </main>
        </div>
      )}

      {/* Normal Page Content — dissolves out (fade + blur + scale) when
          emergency mode activates, so the user feels the public surface
          receding rather than snapping away. */}
      <div
        className={
          emergencyMode
            ? 'animate-emergency-dissolve-out pointer-events-none'
            : 'transition-opacity duration-300'
        }
      >
        <section className="py-16 px-4 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {getText('你拥有权利。我们帮你了解它们。', '你擁有權利。我們幫你了解它們。', 'You have rights. We help you understand them.')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              {getText('加拿大华人女性法律权益指南', '加拿大華人女性法律權益指南', 'A guide to legal rights for Chinese immigrant women in Canada')}
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
              <Lock className="w-4 h-4" />
              <span>{getText('您的访问完全保密', '您的訪問完全保密', 'Your visit is completely confidential')}</span>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16">
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Not Safe - Emergency */}
            <button
              onClick={handleEmergencyClick}
              className="flex items-center justify-center gap-4 w-full py-6 px-6 bg-red-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-red-700 transition-all hover:scale-[1.02] md:py-8 group"
            >
              <Shield className="w-8 h-8 group-hover:animate-bounce" />
              <div className="text-left">
                <div className="text-xl">{getText('我现在不安全', '我现在不安全', "I'm not safe right now")}</div>
                <div className="text-sm font-normal text-red-100">{getText('获得紧急帮助', '獲得緊急幫助', 'Get emergency help')}</div>
              </div>
            </button>

            {/* Know Your Rights */}
            <Link
              href="/rights"
              className="flex items-center justify-center gap-4 w-full py-6 px-6 bg-white border-2 border-red-600 text-red-700 rounded-xl font-bold text-lg shadow-md hover:bg-red-50 transition-all hover:scale-[1.02] md:py-8"
            >
              <FileText className="w-8 h-8" />
              <div className="text-left">
                <div className="text-xl">{getText('我想了解我的权利', '我想了解我的權利', 'I want to know my rights')}</div>
                <div className="text-sm font-normal text-gray-500">{getText('粉碎误区，了解真相', '粉碎誤區，了解真相', 'Bust myths, know the truth')}</div>
              </div>
            </Link>

            {/* Find Help */}
            <Link
              href="/resources"
              className="flex items-center justify-center gap-4 w-full py-6 px-6 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg shadow-md hover:bg-gray-50 transition-all hover:scale-[1.02] md:py-8"
            >
              <MapPin className="w-8 h-8" />
              <div className="text-left">
                <div className="text-xl">{getText('我需要找人帮忙', '我需要找人幫忙', 'I need to find help near me')}</div>
                <div className="text-sm font-normal text-gray-500">{getText('经验证的免费资源', '經驗證的免費資源', 'Verified free resources')}</div>
              </div>
            </Link>

            {/* AI Chat */}
            <Link
              href="/chat"
              className="flex items-center justify-center gap-4 w-full py-5 px-6 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl font-bold text-lg shadow-sm hover:bg-red-100 transition-all hover:scale-[1.02] md:py-6"
            >
              <MessageCircle className="w-7 h-7" />
              <div className="text-left">
                <div className="text-xl">{getText('和AI助手聊聊', '和AI助手聊聊', 'Chat with AI Assistant')}</div>
                <div className="text-sm font-normal text-red-600">{getText('用中文提问，获得即时帮助', '用中文提問，獲得即時幫助', 'Ask in Chinese, get instant help')}</div>
              </div>
            </Link>
          </div>
        </section>

        <section className="px-4 pb-12">
          <div className="max-w-2xl mx-auto text-center text-sm text-gray-500">
            <p className="leading-relaxed">
              {getText('关闭此页面后，没有人知道您来过这里。我们不收集任何个人数据。', '關閉此頁面後，沒有人知道您來過這裡。我們不收集任何個人數據。', 'After closing this page, no one will know you were here. We do not collect any personal data.')}
            </p>
          </div>
        </section>
      </div>

    </div>
  );
}
