import { Product, InvestmentProduct, AdPlan } from "@/types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    sellerId: "seller1",
    name: "무선 이어폰 CP-Buds",
    description: "노이즈 캔슬링을 지원하는 무선 이어폰입니다.",
    category: "전자기기",
    priceKrw: 89000,
    thumbnailUrl: "https://placehold.co/400x400?text=CP-Buds",
    imageUrls: ["https://placehold.co/800x800?text=CP-Buds"],
    stock: 120,
    rating: 4.6,
    reviewCount: 32,
    chnRewardRate: 0.02,
    isAdBoosted: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "p2",
    sellerId: "seller2",
    name: "캠핑 감성 텀블러",
    description: "보온보냉이 되는 캠핑용 텀블러입니다.",
    category: "생활용품",
    priceKrw: 25000,
    thumbnailUrl: "https://placehold.co/400x400?text=Tumbler",
    imageUrls: ["https://placehold.co/800x800?text=Tumbler"],
    stock: 300,
    rating: 4.8,
    reviewCount: 51,
    chnRewardRate: 0.02,
    isAdBoosted: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "p3",
    sellerId: "seller1",
    name: "미니멀 백팩",
    description: "심플한 디자인의 데일리 백팩입니다.",
    category: "패션잡화",
    priceKrw: 59000,
    thumbnailUrl: "https://placehold.co/400x400?text=Backpack",
    imageUrls: ["https://placehold.co/800x800?text=Backpack"],
    stock: 80,
    rating: 4.4,
    reviewCount: 18,
    chnRewardRate: 0.03,
    isAdBoosted: false,
    createdAt: new Date().toISOString(),
  },
];

export const MOCK_INVESTMENT_PRODUCTS: InvestmentProduct[] = [
  { id: "inv1", name: "7일 단기 예치", lockupDays: 7, expectedYieldRate: 0.01, minAmountChn: 10 },
  { id: "inv2", name: "30일 표준 예치", lockupDays: 30, expectedYieldRate: 0.05, minAmountChn: 50 },
  { id: "inv3", name: "90일 장기 예치", lockupDays: 90, expectedYieldRate: 0.15, minAmountChn: 100 },
];

export const MOCK_AD_PLANS: AdPlan[] = [
  { id: "ad1", label: "3일 부스트", durationDays: 3, costChn: 30, exposureMultiplier: 1.5 },
  { id: "ad2", label: "7일 프리미엄", durationDays: 7, costChn: 60, exposureMultiplier: 2.0 },
];