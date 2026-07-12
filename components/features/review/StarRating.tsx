"use client";

import { Star } from "lucide-react";

export function StarRating({
  value,
  onChange,
  readOnly = false,
}: {
  value: number;
  onChange?: (v: number) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(n)}
          className={readOnly ? "cursor-default" : "cursor-pointer"}
        >
          <Star
            size={22}
            fill={n <= value ? "#E0A93A" : "none"}
            color={n <= value ? "#E0A93A" : "#CBD5E1"}
          />
        </button>
      ))}
    </div>
  );
}