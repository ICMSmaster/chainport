"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ADMIN_PASSWORD, isAdminAuthenticated, setAdminAuthenticated } from "@/lib/adminAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setAuthenticated(isAdminAuthenticated());
    setChecked(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAdminAuthenticated();
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!checked) return null;

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
        <Link
          href="/"
          className="absolute top-6 left-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-black"
        >
          <ArrowLeft size={16} />
          홈으로 돌아가기
        </Link>

        <form onSubmit={handleSubmit} className="border rounded-2xl p-8 w-full max-w-sm space-y-4 bg-white shadow-sm">
          <h1 className="text-xl font-bold text-center">관리자 로그인</h1>
          <p className="text-sm text-muted-foreground text-center">
            관리자 대시보드는 비밀번호 확인 후 이용할 수 있습니다.
          </p>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {error && <p className="text-sm text-red-500">비밀번호가 올바르지 않습니다.</p>}
          <Button type="submit" className="w-full">
            입장하기
          </Button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}