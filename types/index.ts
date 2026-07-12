export interface User {
  id: string;
  nickname: string;
  role: "user" | "admin";
  createdAt: string;
  avatarUrl?: string;
}

export interface Wallet {
  userId: string;
  krwBalance: number;
  chnBalance: number;
  updatedAt: string;
}

export interface Product {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  category: string;
  priceKrw: number;
  thumbnailUrl: string;
  imageUrls: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  chnRewardRate: number;
  isAdBoosted: boolean;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  optionLabel?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalKrw: number;
  paymentMethod: "KRW" | "CHN";
  status: "paid" | "reviewed";
  createdAt: string;
}

export type TransactionType =
  | "CHARGE"
  | "EXCHANGE_BUY"
  | "EXCHANGE_SELL"
  | "PURCHASE"
  | "TOKENOMICS_SPLIT"
  | "REVIEW_REWARD"
  | "INVEST_DEPOSIT"
  | "INVEST_RETURN"
  | "AD_PAYMENT"
  | "BURN";

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amountKrw?: number;
  amountChn?: number;
  relatedOrderId?: string;
  memo?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  orderId: string;
  productId: string;
  userId: string;
  rating: number;
  content: string;
  imageUrl?: string;
  rewardChn: number;
  createdAt: string;
}

export interface InvestmentProduct {
  id: string;
  name: string;
  lockupDays: number;
  expectedYieldRate: number;
  minAmountChn: number;
}

export interface Investment {
  id: string;
  userId: string;
  productId: string;
  principalChn: number;
  startedAt: string;
  maturesAt: string;
  status: "active" | "matured" | "withdrawn";
}

export interface AdPlan {
  id: string;
  label: string;
  durationDays: number;
  costChn: number;
  exposureMultiplier: number;
}

export interface Advertisement {
  id: string;
  productId: string;
  sellerId: string;
  planId: string;
  startedAt: string;
  endsAt: string;
  status: "active" | "ended";
}

export interface TokenomicsConfig {
  sellerRate: number;
  companyRate: number;
  reserveRate: number;
  burnRate: number;
}

export interface MarketConfig {
  reviewRewardChn: number;
  priceVolatility: number;
  investDefaultYield: number;
}

export interface SystemState {
  tokenomicsConfig: TokenomicsConfig;
  marketConfig: MarketConfig;
  totalCirculatingChn: number;
  totalBurnedChn: number;
  totalReserveChn: number;
  totalCompanyRevenueKrw: number;
  lastResetAt: string;
}