"use client";

import { useEffect, useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useProductStore } from "@/store/productStore";
import { resizeImageFile } from "@/lib/imageResize";

const CATEGORY_OPTIONS = ["전자기기", "생활용품", "패션잡화", "식품", "기타"];

interface ProductFormProps {
  mode: "add" | "edit";
  product?: Product;
  triggerLabel: string;
  triggerVariant?: "default" | "outline";
}

export function ProductForm({ mode, product, triggerLabel, triggerVariant = "default" }: ProductFormProps) {
  const [open, setOpen] = useState(false);
  const addProduct = useProductStore((s) => s.addProduct);
  const updateProduct = useProductStore((s) => s.updateProduct);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [priceKrw, setPriceKrw] = useState("");
  const [stock, setStock] = useState("");
  const [chnRewardRate, setChnRewardRate] = useState("2");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  // 모달을 열 때, 수정 모드라면 기존 상품 값을 채워넣습니다.
  useEffect(() => {
    if (!open) return;
    if (mode === "edit" && product) {
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setPriceKrw(String(product.priceKrw));
      setStock(String(product.stock));
      setChnRewardRate(String(Math.round(product.chnRewardRate * 100)));
      setImageUrl(product.thumbnailUrl);
    } else {
      setName("");
      setDescription("");
      setCategory(CATEGORY_OPTIONS[0]);
      setPriceKrw("");
      setStock("");
      setChnRewardRate("2");
      setImageUrl("");
    }
  }, [open, mode, product]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const dataUrl = await resizeImageFile(file);
      setImageUrl(dataUrl);
    } catch {
      alert("이미지를 불러오지 못했습니다. 다른 파일로 시도해주세요.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    if (!name.trim() || !priceKrw || !stock) {
      alert("상품명, 가격, 재고는 필수 입력입니다.");
      return;
    }

    const payload = {
      name: name.trim(),
      description: description.trim(),
      category,
      priceKrw: Number(priceKrw),
      stock: Number(stock),
      chnRewardRate: Number(chnRewardRate) / 100,
      thumbnailUrl: imageUrl || "https://placehold.co/400x400?text=No+Image",
      imageUrls: [imageUrl || "https://placehold.co/800x800?text=No+Image"],
    };

    if (mode === "add") {
      addProduct({
        id: `p_${Date.now()}`,
        sellerId: "seller1",
        rating: 0,
        reviewCount: 0,
        isAdBoosted: false,
        createdAt: new Date().toISOString(),
        ...payload,
      });
    } else if (product) {
      updateProduct(product.id, payload);
    }

    setOpen(false);
  };

  return (
    <>
      <Button variant={triggerVariant} onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{mode === "add" ? "상품 추가" : "상품 수정"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>상품명</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="예: 무선 이어폰" />
            </div>

            <div className="space-y-2">
              <Label>설명</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="상품 설명을 입력하세요"
              />
            </div>

            <div className="space-y-2">
              <Label>카테고리</Label>
              <select
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>가격 (원)</Label>
                <Input type="number" value={priceKrw} onChange={(e) => setPriceKrw(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>재고 수량</Label>
                <Input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>CHN 보상률 (%)</Label>
              <Input type="number" value={chnRewardRate} onChange={(e) => setChnRewardRate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>상품 이미지</Label>
              <Input
                placeholder="이미지 URL을 붙여넣으세요 (예: https://...)"
                value={imageUrl.startsWith("data:") ? "" : imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">또는 내 컴퓨터에서 사진 선택:</p>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              {uploading && <p className="text-xs text-muted-foreground">이미지 처리 중...</p>}
              {imageUrl && (
                <img src={imageUrl} alt="미리보기" className="w-24 h-24 object-cover rounded-lg border mt-2" />
              )}
            </div>
          </div>

          <DialogFooter>
            <Button className="w-full" onClick={handleSubmit}>
              {mode === "add" ? "상품 등록" : "수정 완료"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}