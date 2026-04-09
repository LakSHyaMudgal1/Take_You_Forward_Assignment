"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getMonthImage } from "@/lib/monthImages";
import { MONTH_NAMES } from "@/lib/utils";

interface Props {
  month: number;
  year: number;
}

export function ImageSection({ month, year }: Props) {
  const image = getMonthImage(month);

  return (
    <div className="relative w-full overflow-hidden rounded-t-2xl" style={{ height: "220px" }}>
      {/* Spiral binding holes */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-around px-8 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="w-5 h-7 -mt-1 rounded-b-full bg-slate-300 dark:bg-slate-600 shadow-inner border border-slate-400/40 dark:border-slate-500/40"
          />
        ))}
      </div>

      {/* Spiral wire SVG */}
      <div className="absolute top-5 left-0 right-0 z-10 h-3 pointer-events-none">
        <svg width="100%" height="12" preserveAspectRatio="none" className="opacity-50">
          <path
            d={Array.from({ length: 20 }, (_, i) => {
              const x1 = (i / 20) * 100;
              const x2 = ((i + 0.5) / 20) * 100;
              const x3 = ((i + 1) / 20) * 100;
              return `M ${x1}% 6 Q ${x2}% 0 ${x3}% 6`;
            }).join(" ")}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Hero image with crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${year}-${month}`}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Month / Year label */}
      <div className="absolute bottom-4 left-5 z-10">
        <motion.p
          key={`year-${year}-${month}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          className="text-white/70 text-xs font-medium tracking-widest uppercase"
        >
          {year}
        </motion.p>
        <motion.h2
          key={`title-${year}-${month}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
          className="text-white text-3xl font-bold tracking-tight drop-shadow-lg"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {MONTH_NAMES[month]}
        </motion.h2>
        <motion.p
          key={`monument-${year}-${month}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.35 }}
          className="text-white/60 text-xs mt-0.5 tracking-wide"
        >
          {image.alt.split("—")[1]?.trim() ?? image.alt}
        </motion.p>
      </div>
    </div>
  );
}
