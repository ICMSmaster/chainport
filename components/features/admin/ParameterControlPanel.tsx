"use client";

import { useSystemStore } from "@/store/systemStore";
import { Slider } from "@/components/ui/slider";

// Slider의 onValueChange 값이 배열로 올 수도, 숫자 하나로 올 수도 있어
// 안전하게 첫 번째 숫자만 꺼내는 도우미 함수입니다.
function firstValue(v: number | readonly number[]): number {
  return Array.isArray(v) ? v[0] : (v as number);
}

export function ParameterControlPanel() {
  const { tokenomicsConfig, marketConfig, updateTokenomicsConfig, updateMarketConfig } = useSystemStore();

  const sellerPct = Math.round(tokenomicsConfig.sellerRate * 100);
  const companyPct = Math.round(tokenomicsConfig.companyRate * 100);
  const reservePct = Math.round(tokenomicsConfig.reserveRate * 100);
  const burnPct = Math.max(0, 100 - sellerPct - companyPct - reservePct);

  const handleRateChange = (key: "sellerRate" | "companyRate" | "reserveRate", newPct: number) => {
    const others =
      key === "sellerRate" ? companyPct + reservePct :
      key === "companyRate" ? sellerPct + reservePct :
      sellerPct + companyPct;
    const clamped = Math.min(newPct, 100 - others);
    updateTokenomicsConfig({ [key]: clamped / 100 } as Partial<typeof tokenomicsConfig>);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4">결제 시 토크노믹스 분배 비율</h3>
        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>판매자 지급</span>
              <span className="font-medium">{sellerPct}%</span>
            </div>
            <Slider
              value={[sellerPct]}
              max={100}
              step={1}
              onValueChange={(v) => handleRateChange("sellerRate", firstValue(v))}
            />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>회사 수익</span>
              <span className="font-medium">{companyPct}%</span>
            </div>
            <Slider
              value={[companyPct]}
              max={100}
              step={1}
              onValueChange={(v) => handleRateChange("companyRate", firstValue(v))}
            />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>준비금 적립</span>
              <span className="font-medium">{reservePct}%</span>
            </div>
            <Slider
              value={[reservePct]}
              max={100}
              step={1}
              onValueChange={(v) => handleRateChange("reserveRate", firstValue(v))}
            />
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-sm flex justify-between">
            <span>토큰 소각 비율 (자동 계산)</span>
            <span className="font-medium">{burnPct}%</span>
          </div>
          <p className="text-xs text-muted-foreground">
            변경 사항은 저장 버튼 없이 <strong>즉시</strong> 다음 결제부터 반영됩니다.
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">기타 운영 파라미터</h3>
        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>리뷰 작성 보상량</span>
              <span className="font-medium">{marketConfig.reviewRewardChn} CHN</span>
            </div>
            <Slider
              value={[marketConfig.reviewRewardChn]}
              max={50}
              step={1}
              onValueChange={(v) => updateMarketConfig({ reviewRewardChn: firstValue(v) })}
            />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>거래소 시세 변동성</span>
              <span className="font-medium">{marketConfig.priceVolatility}</span>
            </div>
            <Slider
              value={[marketConfig.priceVolatility]}
              max={30}
              step={1}
              onValueChange={(v) => updateMarketConfig({ priceVolatility: firstValue(v) })}
            />
            <p className="text-xs text-muted-foreground mt-1">
              값이 클수록 거래소 페이지에서 시세가 더 크게 출렁입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}