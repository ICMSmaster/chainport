import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CHAINPORT",
  description: "가상화폐(CHN) 기반 토큰 이코노미 시뮬레이션 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}