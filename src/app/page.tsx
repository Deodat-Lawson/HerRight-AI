'use client';

import Link from 'next/link';
import { Shield, Lock, Phone, X, MessageCircle, PhoneOff, Volume2, VolumeX, Heart, Hand, MapPin, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const { isZh, isHant } = useLanguage();
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [heartbeatMuted, setHeartbeatMuted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const heartbeatTimerRef = useRef<number | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

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

  // Heartbeat audio — synthesized lub-dub at ~120bpm.
  // Fades in over 1s so it never startles. Mute is one tap away.
  useEffect(() => {
    const stop = () => {
      if (heartbeatTimerRef.current) {
        window.clearInterval(heartbeatTimerRef.current);
        heartbeatTimerRef.current = null;
      }
    };

    if (!emergencyMode || heartbeatMuted) {
      stop();
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
        masterGainRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      }
      return;
    }

    const Ctx: typeof AudioContext | undefined =
      window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new Ctx();
      masterGainRef.current = audioCtxRef.current.createGain();
      masterGainRef.current.gain.value = 0;
      masterGainRef.current.connect(audioCtxRef.current.destination);
    }
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current!;
    if (ctx.state === 'suspended') ctx.resume();

    // Fade master in
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 1.0);

    const playBeat = (when: number, gain: number, freq: number) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      g.gain.setValueAtTime(0, when);
      g.gain.linearRampToValueAtTime(gain, when + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, when + 0.18);
      osc.connect(g).connect(master);
      osc.start(when);
      osc.stop(when + 0.22);
    };

    const playLubDub = () => {
      const t = ctx.currentTime;
      playBeat(t, 0.9, 58);          // lub — lower, stronger
      playBeat(t + 0.16, 0.65, 70);  // dub — slightly higher, softer
    };

    playLubDub();
    heartbeatTimerRef.current = window.setInterval(playLubDub, 1000);

    return stop;
  }, [emergencyMode, heartbeatMuted]);

  // Tear down audio context when leaving emergency mode entirely
  useEffect(() => {
    if (!emergencyMode && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      audioCtxRef.current = null;
      masterGainRef.current = null;
      ctx.close().catch(() => {});
    }
  }, [emergencyMode]);

  const getText = (zh: string, zhHant: string, en: string) => {
    if (isHant) return zhHant;
    if (isZh) return zh;
    return en;
  };

  return (
    <div className={`min-h-[100dvh] overflow-auto ${emergencyMode ? 'bg-white' : 'bg-gradient-to-b from-rose-100 via-rose-50 to-white'}`}>
      {/* Soft decorative background blobs */}
      {!emergencyMode && (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -right-24 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl" />
        </div>
      )}
      {/* Protective red vignette — sweeps in from edges on activation,
          then settles into a calm inset glow for the duration. */}
      {emergencyMode && (
        <div
          className="fixed inset-0 z-[55] pointer-events-none animate-emergency-vignette-in"
          aria-hidden="true"
        />
      )}

      {/* Heartbeat vignette — pulses in sync with the audio lub-dub.
          Inset only, so the calm interior stays readable. */}
      {emergencyMode && (
        <div
          className="fixed inset-0 z-[58] pointer-events-none animate-emergency-heartbeat"
          aria-hidden="true"
        />
      )}

      {/* Persistent red fade at top — breathes gently while active */}
      {emergencyMode && (
        <div
          className="fixed top-0 left-0 right-0 h-32 z-[60] pointer-events-none bg-gradient-to-b from-red-600/35 to-transparent animate-emergency-breathe"
          aria-hidden="true"
        />
      )}

      {/* Emergency Mode — full screen takeover */}
      {emergencyMode && (
        <div className="fixed inset-0 z-50 bg-white overflow-auto animate-emergency-content-in">
          {/* Sticky header — status, mute, exit */}
          <header className="py-3 px-4 sm:px-6 sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-red-100">
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-emergency-dot-glow" />
                <span className="text-sm font-semibold text-gray-700">
                  {getText('安全模式', '安全模式', 'Safe mode')}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setHeartbeatMuted(m => !m)}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  aria-label={heartbeatMuted ? getText('开启声音', '開啟聲音', 'Unmute') : getText('静音', '靜音', 'Mute')}
                >
                  {heartbeatMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{heartbeatMuted ? getText('静音', '靜音', 'Muted') : getText('声音', '聲音', 'Sound')}</span>
                </button>
                <button
                  onClick={exitEmergencyMode}
                  className="p-2 text-gray-500 hover:text-gray-800 rounded-full transition-colors"
                  aria-label={getText('退出', '退出', 'Exit')}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </header>

          <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-8 space-y-5">
            {/* Grounding line — one breath, one truth */}
            <div className="flex items-start gap-3 px-1">
              <Heart className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-base text-gray-800 leading-relaxed">
                {getText(
                  '深呼吸。你不是一个人。你被相信，这不是你的错。',
                  '深呼吸。你不是一個人。你被相信，這不是你的錯。',
                  "Breathe. You are not alone. You are believed. This is not your fault."
                )}
              </p>
            </div>

            {/* Honest acknowledgment — name the fear most apps refuse to */}
            <div className="bg-gray-900 text-white rounded-2xl p-5 space-y-3">
              <p className="text-base leading-relaxed">
                {getText(
                  '我们知道：警察来了又走，事情可能反而更糟。你最了解你的处境。',
                  '我們知道：警察來了又走，事情可能反而更糟。你最了解你的處境。',
                  'We know: police come, police leave, and things can get worse after. You know your situation best.'
                )}
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                {getText(
                  '下面有几条路。从最安静的开始。你不必选第一条。',
                  '下面有幾條路。從最安靜的開始。你不必選第一條。',
                  'Here are several paths — quietest first. You do not have to pick the loud one.'
                )}
              </p>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-5 md:items-start space-y-5 md:space-y-0">
            {/* PATH 1 — Get help without anyone knowing */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <EyeOff className="w-4 h-4 text-gray-500" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  {getText('1. 不被发现地求助', '1. 不被發現地求助', '1. Get help without him knowing')}
                </h2>
              </div>

              {/* Signal for Help — invented in Canada, very real */}
              <div className="bg-white border-2 border-rose-200 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Hand className="w-6 h-6 text-rose-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 mb-1">
                      {getText('“求助手势” (Signal for Help)', '"求助手勢" (Signal for Help)', 'The Signal for Help')}
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {getText(
                        '在视频通话或当面：手心朝外，把拇指收进掌心，然后四指弯下来盖住拇指。一个无声的手势，对方就懂。加拿大女性基金会发明，全世界都在传。',
                        '在視訊通話或當面：手心朝外，把拇指收進掌心，然後四指彎下來蓋住拇指。一個無聲的手勢，對方就懂。加拿大女性基金會發明，全世界都在傳。',
                        'On a video call or in person: palm out, tuck your thumb in, then fold fingers down over it. A silent gesture — they will understand. Created by the Canadian Women\'s Foundation; recognized worldwide.'
                      )}
                    </p>
                    <a
                      href="https://canadianwomen.org/signal-for-help/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-rose-600 font-semibold mt-2 inline-block"
                    >
                      {getText('看一下这个手势 →', '看一下這個手勢 →', 'See the gesture →')}
                    </a>
                  </div>
                </div>
              </div>

              {/* Pre-arranged code with a friend */}
              <div className="bg-white border-2 border-rose-200 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-rose-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 mb-1">
                      {getText('给一个朋友发一个“暗号”', '給一個朋友發一個"暗號"', 'Send a friend a code word')}
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {getText(
                        '今天就告诉一个你信任的人：“如果我发‘红汤’这两个字，请直接报警/来接我，不要先回我。” 一个普通的词，他看不出来。',
                        '今天就告訴一個你信任的人："如果我發\'紅湯\'這兩個字，請直接報警/來接我，不要先回我。" 一個普通的詞，他看不出來。',
                        'Today, tell one person you trust: "If I ever text the words \'red soup,\' call the police for me / come get me. Don\'t reply first." A normal-looking word he won\'t catch.'
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* ShelterSafe — anonymous map */}
              <a
                href="https://www.sheltersafe.ca/"
                target="_blank"
                rel="noreferrer"
                className="block bg-white border-2 border-rose-200 hover:border-rose-400 rounded-2xl p-4 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-rose-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 mb-1">
                      ShelterSafe.ca
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {getText(
                        '加拿大庇护所匿名地图。不需要名字，不需要电话。你可以直接走进去——他们会保密、藏起你的位置，没人会知道你在哪里。',
                        '加拿大庇護所匿名地圖。不需要名字，不需要電話。你可以直接走進去——他們會保密、藏起你的位置，沒人會知道你在哪裡。',
                        'Anonymous map of every shelter in Canada. No name, no phone needed. You can walk in — they will keep your location secret. No one will know where you went.'
                      )}
                    </p>
                  </div>
                </div>
              </a>
            </section>

            {/* PATH 2 — Talk to someone, no police involved */}
            <section className="space-y-3 pt-2">
              <div className="flex items-center gap-2 px-1">
                <Heart className="w-4 h-4 text-gray-500" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  {getText('2. 和人说话，不报警', '2. 和人說話，不報警', '2. Talk to someone — no police')}
                </h2>
              </div>

              {/* Text crisis line */}
              <a
                href="sms:686868&body=CONNECT"
                className="block bg-white border-2 border-purple-200 hover:border-purple-400 rounded-2xl p-4 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900">
                      {getText('发短信 — 不出声', '發短信 — 不出聲', 'Text — make no sound')}
                    </p>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {getText(
                        '发 CONNECT 到 686868 · Kids Help Phone · 24/7 · 中文可用',
                        '發 CONNECT 到 686868 · Kids Help Phone · 24/7 · 中文可用',
                        'Text CONNECT to 686868 · Kids Help Phone · 24/7 · Chinese available'
                      )}
                    </p>
                  </div>
                </div>
              </a>

              {/* Shelter line */}
              <a
                href="tel:1-866-863-0511"
                className="block bg-white border-2 border-purple-200 hover:border-purple-400 rounded-2xl p-4 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900">
                      {getText('庇护所直线 (ON: Assaulted Women\'s Helpline)', '庇護所直線 (ON: Assaulted Women\'s Helpline)', "Shelter line (ON: Assaulted Women's Helpline)")}
                    </p>
                    <p className="text-sm text-gray-600 mt-0.5 font-mono">1-866-863-0511 · 24/7</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {getText(
                        '提供 200+ 种语言翻译，包括普通话和粤语。他们不报警——除非你想。',
                        '提供 200+ 種語言翻譯，包括普通話和粵語。他們不報警——除非你想。',
                        '200+ languages including Mandarin & Cantonese. They will not call police unless you want them to.'
                      )}
                    </p>
                  </div>
                </div>
              </a>

              {/* 211 */}
              <a
                href="tel:211"
                className="block bg-white border-2 border-purple-200 hover:border-purple-400 rounded-2xl p-4 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900">
                      {getText('拨 211 — 加拿大社会服务接线', '撥 211 — 加拿大社會服務接線', 'Dial 211 — Canada social services')}
                    </p>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {getText(
                        '不是警察。他们帮你找住处、食物、法律援助、翻译——保密。',
                        '不是警察。他們幫你找住處、食物、法律援助、翻譯——保密。',
                        'Not police. They connect you to housing, food, legal aid, interpreters — confidential.'
                      )}
                    </p>
                  </div>
                </div>
              </a>
            </section>

            {/* PATH 3 — Quiet exit (move at your own pace) */}
            <section className="space-y-3 pt-2">
              <div className="flex items-center gap-2 px-1">
                <Eye className="w-4 h-4 text-gray-500" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  {getText('3. 慢慢地、安全地离开', '3. 慢慢地、安全地離開', '3. Leave slowly, on your terms')}
                </h2>
              </div>
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 space-y-3">
                <p className="text-sm text-gray-800 leading-relaxed">
                  {getText(
                    '不需要今晚就走。统计上，最危险的时刻就是离开的那一刻——所以提前计划反而更安全。',
                    '不需要今晚就走。統計上，最危險的時刻就是離開的那一刻——所以提前計劃反而更安全。',
                    "You don't have to leave tonight. Statistically, the moment of leaving is the most dangerous — so planning ahead makes leaving safer."
                  )}
                </p>
                <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5 marker:text-rose-400">
                  <li>
                    {getText(
                      '把一个“逃跑包”藏在朋友家或工作的储物柜里，不在你家里。',
                      '把一個"逃跑包"藏在朋友家或工作的儲物櫃裡，不在你家裡。',
                      "Hide a 'go-bag' at a friend's place or your work locker — not at home."
                    )}
                  </li>
                  <li>
                    {getText(
                      '把重要证件拍照，发到一个只有你能登录的邮箱。',
                      '把重要證件拍照，發到一個只有你能登錄的郵箱。',
                      'Photograph your documents, email them to an account only you can log into.'
                    )}
                  </li>
                  <li>
                    {getText(
                      '开一个他不知道的银行账户，每周存一点点。',
                      '開一個他不知道的銀行賬戶，每週存一點點。',
                      "Open a bank account he doesn't know about. Put away a little each week."
                    )}
                  </li>
                  <li>
                    {getText(
                      '在他上班、出门的时候离开。不要在吵架后、不要在他喝酒时。',
                      '在他上班、出門的時候離開。不要在吵架後、不要在他喝酒時。',
                      "Leave while he's at work or out — not after a fight, not while he's drinking."
                    )}
                  </li>
                  <li>
                    {getText(
                      '走之前删除浏览器历史。或者用手机的“无痕模式”看这个网站。',
                      '走之前刪除瀏覽器歷史。或者用手機的"無痕模式"看這個網站。',
                      "Clear your browser history before leaving — or use 'private/incognito' mode to read this site."
                    )}
                  </li>
                </ul>
              </div>
            </section>

            {/* PATH 4 — 911, but on your terms */}
            <section className="space-y-3 pt-2">
              <div className="flex items-center gap-2 px-1">
                <Phone className="w-4 h-4 text-gray-500" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  {getText('4. 如果现在就有生命危险', '4. 如果現在就有生命危險', '4. If your life is in danger right now')}
                </h2>
              </div>

              <a
                href="tel:911"
                className="flex items-center gap-4 w-full p-5 bg-red-600 text-white rounded-2xl shadow-lg active:scale-[0.98] transition-transform"
              >
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-2xl leading-tight">
                    {getText('拨 911', '撥 911', 'Call 911')}
                  </div>
                  <div className="text-sm text-red-100 mt-0.5">
                    {getText('当你被锁在房间、被掐住、有武器时', '當你被鎖在房間、被掐住、有武器時', 'When you are locked in, choked, or there is a weapon')}
                  </div>
                </div>
              </a>

              {/* The "what if it gets worse after" reality check */}
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 space-y-2">
                <p className="font-bold text-amber-900 text-sm">
                  {getText(
                    '“警察走了之后他会更生气怎么办？”',
                    '"警察走了之後他會更生氣怎麼辦？"',
                    '"What if he\'s angrier after the police leave?"'
                  )}
                </p>
                <p className="text-sm text-amber-900 leading-relaxed">
                  {getText(
                    '这是真实的恐惧。当警察来时你可以告诉他们：“我不想他今晚回来这里。” 在加拿大，警察可以当场开 “紧急保护令”，把他从家里带走 24-72 小时。你也可以请求他们送你去庇护所——直接从家里到一个他不知道的地址。',
                    '這是真實的恐懼。當警察來時你可以告訴他們："我不想他今晚回來這裡。" 在加拿大，警察可以當場開 "緊急保護令"，把他從家裡帶走 24-72 小時。你也可以請求他們送你去庇護所——直接從家裡到一個他不知道的地址。',
                    'This fear is real. When police come, you can say: "I don\'t want him back here tonight." In Canada, police can issue an Emergency Protection Order on the spot — removing him from the home for 24–72 hours. You can also ask them to drive you straight to a shelter, to an address he won\'t know.'
                  )}
                </p>
              </div>

              {/* Dispatcher script */}
              <details className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 group">
                <summary className="font-semibold text-rose-900 text-sm cursor-pointer list-none flex items-center justify-between">
                  <span>{getText('打 911 时该说什么 →', '打 911 時該說什麼 →', 'What to say on the 911 call →')}</span>
                  <span className="text-xs text-rose-500 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="mt-3 text-sm text-gray-800 space-y-2 leading-relaxed">
                  <p>1. {getText('“我需要警察。我在 [地址]。”', '"我需要警察。我在 [地址]。"', '"I need police. My address is ___."')}</p>
                  <p>2. {getText('“我不安全。请不要开警笛。”', '"我不安全。請不要開警笛。"', '"I\'m not safe. Please come without sirens."')}</p>
                  <p>3. {getText('“我需要中文翻译。”', '"我需要中文翻譯。"', '"I need a Mandarin/Cantonese interpreter." (free)')}</p>
                  <p>4. {getText('“我希望他被带走，并送我去庇护所。”', '"我希望他被帶走，並送我去庇護所。"', '"I want him removed and to be driven to a shelter."')}</p>
                  <p className="text-xs text-rose-700 pt-2">
                    {getText(
                      '不能说话？仍然拨号——保持通话不挂断，敲击话筒，调度员会追踪你的位置。',
                      '不能說話？仍然撥號——保持通話不掛斷，敲擊話筒，調度員會追蹤你的位置。',
                      "Can't speak? Still dial. Stay on the line, tap the phone — they will trace your location."
                    )}
                  </p>
                </div>
              </details>

              {/* The big myths — folded smaller */}
              <details className="bg-white border border-gray-200 rounded-2xl p-4 group">
                <summary className="font-semibold text-gray-700 text-sm cursor-pointer list-none flex items-center justify-between">
                  <span>{getText('关于 911 的常见担心 →', '關於 911 的常見擔心 →', 'Common fears about 911 →')}</span>
                  <span className="text-xs text-gray-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  <p><strong>{getText('驱逐？', '驅逐？', 'Deportation?')}</strong> {getText('警察不查移民身份。', '警察不查移民身份。', 'Police do not check immigration status.')}</p>
                  <p><strong>{getText('失去孩子？', '失去孩子？', 'Lose your kids?')}</strong> {getText('保护他们反而帮助监护权。', '保護他們反而幫助監護權。', 'Protecting them helps custody, not hurts.')}</p>
                  <p><strong>{getText('费用？', '費用？', 'Cost?')}</strong> {getText('911、救护车的紧急救治、庇护所——全部免费。', '911、救護車的緊急救治、庇護所——全部免費。', '911, emergency care, shelters — all free.')}</p>
                  <p><strong>{getText('我不想他被抓？', '我不想他被抓？', "Don't want him arrested?")}</strong> {getText('告诉调度员“请让他离开就好”——不一定要逮捕。', '告訴調度員"請讓他離開就好"——不一定要逮捕。', 'Tell dispatch "just have him leave" — arrest isn\'t the only outcome.')}</p>
                </div>
              </details>
            </section>

            </div>
            {/* If you are leaving — compact bag list */}
            <details className="bg-gray-50 rounded-xl p-4 group">
              <summary className="font-bold text-gray-900 text-base cursor-pointer list-none flex items-center justify-between">
                <span>{getText('如果你现在要离开 →', '如果你現在要離開 →', 'If you are leaving now →')}</span>
                <span className="text-xs text-gray-400 group-open:hidden">{getText('展开', '展開', 'open')}</span>
              </summary>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-red-100 rounded text-red-600 flex items-center justify-center text-xs font-bold">1</span>
                  {getText('手机 + 充电器', '手機 + 充電器', 'Phone + charger')}
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-red-100 rounded text-red-600 flex items-center justify-center text-xs font-bold">2</span>
                  {getText('身份证 / 护照', '身份證 / 護照', 'ID / passport')}
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-red-100 rounded text-red-600 flex items-center justify-center text-xs font-bold">3</span>
                  {getText('孩子的证件', '孩子的證件', "Kids' documents")}
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-red-100 rounded text-red-600 flex items-center justify-center text-xs font-bold">4</span>
                  {getText('现金 / 银行卡', '現金 / 銀行卡', 'Cash / cards')}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                {getText('去朋友家、警察局或庇护所。', '去朋友家、警察局或庇護所。', 'Go to a friend, police station, or shelter.')}
              </p>
            </details>

            {/* Privacy footer */}
            <div className="text-center text-xs text-gray-400">
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
            ? 'animate-emergency-dissolve-out pointer-events-none h-full'
            : 'h-full transition-opacity duration-300'
        }
      >
        <div className="min-h-[100dvh] flex flex-col justify-center px-4 py-6">
          <div className="max-w-2xl w-full mx-auto flex flex-col gap-6">
            {/* Hero */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur border border-rose-200 text-rose-700 text-xs font-medium mb-4 shadow-sm">
                <Lock className="w-3 h-3" />
                {getText('保密 · 免费 · 24/7', '保密 · 免費 · 24/7', 'Confidential · Free · 24/7')}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-3">
                <span className="bg-gradient-to-r from-rose-700 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  {getText('你拥有权利。', '你擁有權利。', 'You have rights.')}
                </span>
                <br />
                <span className="text-gray-900">
                  {getText('我们帮你了解它们。', '我們幫你了解它們。', 'We help you understand them.')}
                </span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto">
                {getText('加拿大华人女性法律权益指南', '加拿大華人女性法律權益指南', 'A guide to legal rights for Chinese immigrant women in Canada')}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleEmergencyClick}
                className="relative overflow-hidden flex items-center justify-center gap-4 w-full py-5 px-6 bg-gradient-to-br from-red-600 to-rose-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40 transition-all hover:scale-[1.02] group ring-1 ring-red-500/30"
              >
                <Shield className="w-8 h-8 group-hover:animate-bounce" />
                <div className="text-left">
                  <div className="text-xl">{getText('我现在不安全', '我现在不安全', "I'm not safe right now")}</div>
                  <div className="text-sm font-normal text-red-100">{getText('获得紧急帮助', '獲得緊急幫助', 'Get emergency help')}</div>
                </div>
              </button>

              <Link
                href="/chat"
                className="flex items-center justify-center gap-4 w-full py-5 px-6 bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-200 text-rose-700 rounded-2xl font-bold text-lg shadow-sm hover:shadow-md hover:border-rose-400 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-7 h-7" />
                <div className="text-left">
                  <div className="text-xl">{getText('和AI助手聊聊', '和AI助手聊聊', 'Chat with AI Assistant')}</div>
                  <div className="text-sm font-normal text-red-600">{getText('用中文提问，获得即时帮助', '用中文提問，獲得即時幫助', 'Ask in Chinese, get instant help')}</div>
                </div>
              </Link>
            </div>

            {/* Privacy footer */}
            <p className="text-center text-xs text-gray-500 leading-relaxed max-w-md mx-auto">
              {getText('关闭此页面后，没有人知道您来过这里。我们不收集任何个人数据。', '關閉此頁面後，沒有人知道您來過這裡。我們不收集任何個人數據。', 'After closing this page, no one will know you were here. We do not collect any personal data.')}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
