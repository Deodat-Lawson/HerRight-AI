import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "HerRight - 加拿大华人女性法律权益指南",
  description: "帮助加拿大华人女性了解自己的法律权利，提供法律援助、庇护所和资源链接",
  keywords: "华人女性, 法律权益, 加拿大, 家庭法, 移民, 法律援助",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className="min-h-screen bg-white">
        <LanguageProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
