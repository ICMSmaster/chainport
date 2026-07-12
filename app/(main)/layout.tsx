"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV = [
  { href: "/", label: "홈" },
  { href: "/products", label: "상품목록" },
  { href: "/cart", label: "장바구니" },
  { href: "/wallet", label: "Wallet" },
  { href: "/market", label: "거래소" },
  { href: "/invest", label: "투자센터" },
  { href: "/ads", label: "광고센터" },
  { href: "/reviews", label: "리뷰센터" },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <header className="border-b px-4 sm:px-6 py-4 flex items-center gap-4">
        <strong style={{ color: "#1B4D8F" }}>CHAINPORT</strong>

        {/* 데스크탑 메뉴: 화면이 넓을 때만 보임 */}
        <nav className="hidden md:flex gap-4">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/admin" className="ml-auto hidden md:block text-xs text-gray-400">
          관리자
        </Link>

        {/* 모바일 햄버거 버튼: 화면이 좁을 때만 보임 */}
        <button className="ml-auto md:hidden" onClick={() => setOpen(true)}>
          <Menu size={22} />
        </button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right">
            <nav className="flex flex-col gap-1 mt-10">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base py-3 border-b"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/admin"
                className="text-base py-3 text-gray-400"
                onClick={() => setOpen(false)}
              >
                관리자
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <main className="p-4 sm:p-6">{children}</main>
    </div>
  );
}