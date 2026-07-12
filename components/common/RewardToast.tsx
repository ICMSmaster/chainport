"use client";

import { AnimatePresence, motion } from "framer-motion";

export function RewardToast({ amount }: { amount: number | null }) {
  return (
    <AnimatePresence>
      {amount !== null && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-6 py-3 rounded-full shadow-lg font-medium z-50"
        >
          🎉 +{amount} CHN 획득!
        </motion.div>
      )}
    </AnimatePresence>
  );
}