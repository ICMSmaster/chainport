"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminGate } from "@/components/features/admin/AdminGate";
import { clearAdminAuthenticated } from "@/lib/adminAuth";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut } from "lucide-react";

const NAV = [
  { href: "/admin", label: "개요" },
  { href: "/admin/products", label: "상품관리" },
  { href: "/admin/tokenomics", label: "토크노믹스" },
  { href: "/admin/users", label: "사용자" },
  { href: "/admin/transactions", label: "거래내역" },
  { href: "/admin/settings", label: "파라미터 설정" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    clearAdminAuthenticated();
    router.push("/");
  };

  return (
    <AdminGate>
      <div style={{ display: "flex" }}>
        <aside style={{ width: 220, borderRight: "1px solid #eee", padding: 20, minHeight: "100vh" }} className="flex flex-col">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-black mb-6">
            <ArrowLeft size={16} />
            사이트로 돌아가기
          </Link>

          <strong style={{ color: "#1B4D8F" }}>관리자</strong>
          <nav className="flex flex-col gap-2 mt-4">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm py-1">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6">
            <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
              <LogOut size={14} className="mr-2" />
              로그아웃
            </Button>
          </div>
        </aside>
        <main style={{ padding: 24, flex: 1 }}>{children}</main>
      </div>
    </AdminGate>
  );
}