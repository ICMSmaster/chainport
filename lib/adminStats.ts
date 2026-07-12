import { Transaction, Order, Product } from "@/types";

export interface TokenomicsTotals {
  totalPurchaseKrw: number;
  totalPurchaseChn: number;
  sellerPayout: number;
  companyRevenue: number;
  reserveAccumulated: number;
  burned: number;
  transactionCount: number;
}

// 원장(Ledger) 전체를 집계해서 관리자 대시보드에 필요한 숫자들을 계산합니다.
// 이 함수가 바로 "Transaction이 Single Source of Truth"라는 설계 원칙을 구현하는 부분입니다.
export function computeTokenomicsTotals(transactions: Transaction[]): TokenomicsTotals {
  let totalPurchaseKrw = 0;
  let totalPurchaseChn = 0;
  let sellerPayout = 0;
  let companyRevenue = 0;
  let reserveAccumulated = 0;
  let burned = 0;

  transactions.forEach((tx) => {
    if (tx.type === "PURCHASE") {
      totalPurchaseKrw += tx.amountKrw ?? 0;
      totalPurchaseChn += tx.amountChn ?? 0;
    }
    if (tx.type === "TOKENOMICS_SPLIT") {
      if (tx.memo === "판매자 지급") sellerPayout += tx.amountChn ?? 0;
      if (tx.memo === "회사 수익") companyRevenue += tx.amountChn ?? 0;
      if (tx.memo === "준비금 적립") reserveAccumulated += tx.amountChn ?? 0;
    }
    if (tx.type === "BURN") {
      burned += tx.amountChn ?? 0;
    }
  });

  return {
    totalPurchaseKrw,
    totalPurchaseChn,
    sellerPayout,
    companyRevenue,
    reserveAccumulated,
    burned,
    transactionCount: transactions.length,
  };
}

// 시간 순서대로 판매자/회사/준비금/소각이 누적되어온 흐름을 계산합니다 (추세 차트용).
export function computeTrendData(transactions: Transaction[]) {
  const sorted = [...transactions]
    .filter((tx) => tx.type === "TOKENOMICS_SPLIT" || tx.type === "BURN")
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  let seller = 0;
  let company = 0;
  let reserve = 0;
  let burn = 0;

  return sorted.map((tx, idx) => {
    const amt = tx.amountChn ?? 0;
    if (tx.type === "TOKENOMICS_SPLIT") {
      if (tx.memo === "판매자 지급") seller += amt;
      if (tx.memo === "회사 수익") company += amt;
      if (tx.memo === "준비금 적립") reserve += amt;
    }
    if (tx.type === "BURN") burn += amt;

    return {
      index: idx + 1,
      판매자: Number(seller.toFixed(2)),
      회사: Number(company.toFixed(2)),
      준비금: Number(reserve.toFixed(2)),
      소각: Number(burn.toFixed(2)),
    };
  });
}

export interface SellerStat {
  sellerId: string;
  productCount: number;
  totalSalesKrw: number;
}

// 상품의 sellerId를 기준으로 판매자별 누적 판매액을 계산합니다 (실제 회원 시스템이 없으므로 간이 집계입니다).
export function computeSellerStats(orders: Order[], products: Product[]): SellerStat[] {
  const sellerIds = Array.from(new Set(products.map((p) => p.sellerId)));

  return sellerIds.map((sellerId) => {
    const sellerProducts = products.filter((p) => p.sellerId === sellerId);
    const productIds = new Set(sellerProducts.map((p) => p.id));

    let totalSalesKrw = 0;
    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (productIds.has(item.productId)) {
          const product = products.find((p) => p.id === item.productId);
          if (product) totalSalesKrw += product.priceKrw * item.quantity;
        }
      });
    });

    return { sellerId, productCount: sellerProducts.length, totalSalesKrw };
  });
}