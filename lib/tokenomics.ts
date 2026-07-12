import { useWalletStore } from "@/store/walletStore";
import { useLedgerStore } from "@/store/ledgerStore";
import { useSystemStore } from "@/store/systemStore";
import { useMarketStore } from "@/store/marketStore";
import { useOrderStore } from "@/store/orderStore";
import { useUserStore } from "@/store/userStore";
import { CartItem, Order, Product } from "@/types";

export interface TokenomicsSplit {
  seller: number;
  company: number;
  reserve: number;
  burn: number;
}

export interface PurchaseResult {
  order: Order;
  totalKrw: number;
  totalChn: number;
  split: TokenomicsSplit;
}

// 장바구니 아이템들의 총 결제 금액(KRW)을 계산합니다.
export function calcTotalKrw(items: CartItem[], products: Product[]): number {
  return items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.priceKrw * item.quantity : 0);
  }, 0);
}

// 실제 결제를 처리하는 함수입니다.
// 1) 지갑에서 금액을 차감하고
// 2) 주문을 생성하고
// 3) 결제 거래를 원장에 기록하고
// 4) 95/3/1/1 비율로 자동 분배하여 각각 원장에 기록합니다.
export function processPurchase(
  items: CartItem[],
  products: Product[],
  paymentMethod: "KRW" | "CHN"
): PurchaseResult {
  const wallet = useWalletStore.getState();
  const ledger = useLedgerStore.getState();
  const system = useSystemStore.getState();
  const market = useMarketStore.getState();
  const orderStore = useOrderStore.getState();
  const user = useUserStore.getState();

  const totalKrw = calcTotalKrw(items, products);
  const totalChn = totalKrw / market.currentPrice; // KRW를 현재 시세로 CHN 환산

  // 1) 잔액 차감
  if (paymentMethod === "KRW") {
    wallet.deductKrw(totalKrw);
  } else {
    wallet.deductChn(totalChn);
  }

  const userId = user.currentUser.id;
  const orderId = `order_${Date.now()}`;
  const now = new Date().toISOString();

  // 2) 주문 생성
  const newOrder: Order = {
    id: orderId,
    userId,
    items,
    totalKrw,
    paymentMethod,
    status: "paid",
    createdAt: now,
  };
  orderStore.addOrder(newOrder);

  // 3) 결제 거래 원장 기록
  ledger.record({
    id: `tx_${Date.now()}_purchase`,
    userId,
    type: "PURCHASE",
    amountKrw: paymentMethod === "KRW" ? totalKrw : undefined,
    amountChn: paymentMethod === "CHN" ? totalChn : undefined,
    relatedOrderId: orderId,
    memo: "상품 구매 결제",
    createdAt: now,
  });

  // 4) 95/3/1/1 분배 계산 (관리자 설정값 사용)
  const { sellerRate, companyRate, reserveRate } = system.tokenomicsConfig;
  const seller = totalChn * sellerRate;
  const company = totalChn * companyRate;
  const reserve = totalChn * reserveRate;
  // 소각량은 나머지로 계산 → 부동소수점 오차가 있어도 합계가 항상 totalChn과 정확히 일치합니다.
  const burn = totalChn - seller - company - reserve;

  const splitEntries: { type: "TOKENOMICS_SPLIT" | "BURN"; amount: number; memo: string }[] = [
    { type: "TOKENOMICS_SPLIT", amount: seller, memo: "판매자 지급" },
    { type: "TOKENOMICS_SPLIT", amount: company, memo: "회사 수익" },
    { type: "TOKENOMICS_SPLIT", amount: reserve, memo: "준비금 적립" },
    { type: "BURN", amount: burn, memo: "토큰 소각" },
  ];

  splitEntries.forEach((entry, idx) => {
    ledger.record({
      id: `tx_${Date.now()}_split_${idx}`,
      userId: "SYSTEM",
      type: entry.type,
      amountChn: entry.amount,
      relatedOrderId: orderId,
      memo: entry.memo,
      createdAt: now,
    });
  });

  // 5) 장바구니 비우기
  orderStore.clearCart();

  return { order: newOrder, totalKrw, totalChn, split: { seller, company, reserve, burn } };
}