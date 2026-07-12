import Link from "next/link";

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
  return (
    <div>
      <header style={{ borderBottom: "1px solid #eee", padding: "16px 24px", display: "flex", gap: 20, alignItems: "center" }}>
        <strong style={{ color: "#1B4D8F" }}>CHAINPORT</strong>
        <nav style={{ display: "flex", gap: 14 }}>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} style={{ fontSize: 14 }}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/admin" style={{ marginLeft: "auto", fontSize: 13, color: "#999" }}>
          관리자
        </Link>
      </header>
      <main style={{ padding: 24 }}>{children}</main>
    </div>
  );
}