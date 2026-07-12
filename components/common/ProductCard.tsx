"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
          <img
            src={product.thumbnailUrl}
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
          <CardContent className="p-4 space-y-1">
            {product.isAdBoosted && <Badge variant="secondary">광고</Badge>}
            <p className="font-medium line-clamp-1">{product.name}</p>
            <p className="text-lg font-bold">{product.priceKrw.toLocaleString()}원</p>
            <p className="text-xs text-muted-foreground">
              ⭐ {product.rating} ({product.reviewCount}) · CHN 보상 {Math.round(product.chnRewardRate * 100)}%
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}