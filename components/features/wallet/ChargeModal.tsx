"use client";

import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { processCharge } from "@/lib/tokenomics";

const QUICK_AMOUNTS = [10000, 50000, 100000, 500000];

export function ChargeModal() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const handleCharge = () => {
    const value = Number(amount);
    if (!value || value <= 0) return;
    processCharge(value);
    setAmount("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>충전하기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>KRW 충전 (가상)</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="charge-amount">충전 금액 (원)</Label>
            <Input
              id="charge-amount"
              type="number"
              placeholder="예: 100000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {QUICK_AMOUNTS.map((a) => (
              <Button key={a} variant="outline" size="sm" onClick={() => setAmount(String(a))}>
                +{a.toLocaleString()}원
              </Button>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full" onClick={handleCharge}>
            충전 완료
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}