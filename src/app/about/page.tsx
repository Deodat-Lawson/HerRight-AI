'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { Shield, Mail, AlertCircle } from 'lucide-react';

export default function AboutPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white py-8 px-4 border-b border-gray-200">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {isZh ? '关于我们' : 'About'}
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Mission */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {isZh ? '我们的使命' : 'Our Mission'}
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '我们相信每位华人女性都应该了解自己在加拿大的权利，无论她的移民身份、语言能力或财务状况如何。这个网站旨在提供准确、易懂的法律信息，帮助你在艰难的处境中做出知情的决定。'
              : 'We believe every Chinese immigrant woman in Canada should know her rights, regardless of her immigration status, language ability, or financial situation. This website aims to provide accurate, easy-to-understand legal information to help you make informed decisions in difficult situations.'}
          </p>
        </section>

        {/* Privacy */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {isZh ? '隐私保护' : 'Privacy'}
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '我们不收集、存储或分享任何个人数据。本网站不使用追踪器、分析工具或第三方脚本。你的访问完全保密。关闭此页面后，没有人知道你来过这里。'
              : 'We do not collect, store, or share any personal data. This website does not use trackers, analytics, or third-party scripts. Your visit is completely confidential. After closing this page, no one will know you were here.'}
          </p>
        </section>

        {/* Disclaimer */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {isZh ? '免责声明' : 'Disclaimer'}
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '本网页提供的信息仅供参考，不构成法律意见。法律情况各不相同，如果您需要法律帮助，请咨询持牌律师或联系法律援助机构。'
              : 'The information provided on this website is for reference only and does not constitute legal advice. Legal situations vary. If you need legal help, please consult a licensed lawyer or contact a legal aid organization.'}
          </p>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {isZh ? '联系我们' : 'Contact Us'}
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isZh
              ? '如果你有任何问题、建议，或者你是律师或社工希望转介客户，欢迎联系我们。'
              : 'If you have any questions or suggestions, or if you are a lawyer or social worker looking to refer clients, please contact us.'}
          </p>
          <a
            href="mailto:christinabao263@gmail.com"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <Mail className="w-4 h-4" />
            <span className="font-medium">christinabao263@gmail.com</span>
          </a>
        </section>
      </main>

      {/* Disclaimer */}
      <footer className="px-4 py-8 text-center">
        <p className="text-sm text-gray-400">
          {isZh
            ? '本页面仅供参考，不构成法律意见'
            : 'This page is for reference only, not legal advice'}
        </p>
      </footer>
    </div>
  );
}