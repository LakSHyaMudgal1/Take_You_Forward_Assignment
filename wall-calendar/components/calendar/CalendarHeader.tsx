"use client";

import { motion } from "framer-motion";
import { MONTH_NAMES } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface Props {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onClear: () => void;
  hasSelection: boolean;
}

export function CalendarHeader({ year, month, onPrev, onNext, onToday, onClear, hasSelection }: Props) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700/60">
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onPrev}
          aria-label="Previous month"
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>

        <motion.div
          key={`${year}-${month}`}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-center min-w-[140px]"
        >
          <span className="text-base font-semibold text-slate-800 dark:text-slate-100">
            {MONTH_NAMES[month]} {year}
          </span>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          aria-label="Next month"
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToday}
          className="text-xs px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
        >
          Today
        </button>
        {hasSelection && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onClear}
            className="text-xs px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-500 dark:text-rose-400 font-medium hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors"
          >
            Clear
          </motion.button>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
}
