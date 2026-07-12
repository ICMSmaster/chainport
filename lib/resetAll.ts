const STORAGE_KEYS = [
  "chainport-user",
  "chainport-wallet",
  "chainport-order",
  "chainport-review",
  "chainport-invest",
  "chainport-ad",
  "chainport-ledger",
  "chainport-system",
];

// 시연 중 데이터가 꼬였을 때, 모든 저장 데이터를 지우고 처음 상태로 되돌립니다.
export function resetAllData() {
  STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
  window.location.href = "/";
}