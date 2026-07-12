import Link from "next/link";

const NAV = [
  { href: "/admin", label: "개요" },
  { href: "/admin/tokenomics", label: "토크노믹스" },
  { href: "/admin/users", label: "사용자" },
  { href: "/admin/transactions", label: "거래내역" },
  { href: "/admin/settings", label: "파라미터 설정" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: 200, borderRight: "1px solid #eee", padding: 20, minHeight: "100vh" }}>
        <strong style={{ color: "#1B4D8F" }}>관리자</strong>
        <nav style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} style={{ fontSize: 14 }}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main style={{ padding: 24, flex: 1 }}>{children}</main>
    </div>
  );
}