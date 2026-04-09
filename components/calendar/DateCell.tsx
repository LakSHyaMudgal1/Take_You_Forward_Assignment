"use client";

import { motion } from "framer-motion";
import { cn, isSameDate, isInRange } from "@/lib/utils";
import { getHolidayForDate } from "@/lib/holidays";
import type { CalendarDate, DateRange } from "@/types/calendar";

interface Props {
  date: CalendarDate;
  today: CalendarDate;
  range: DateRange;
  onClick: (date: CalendarDate) => void;
  isCurrentMonth: boolean;
}

export function DateCell({ date, today, range, onClick, isCurrentMonth }: Props) {
  const isToday = isSameDate(date, today);
  const isStart = isSameDate(date, range.start);
  const isEnd = isSameDate(date, range.end);
  const inRange = isInRange(date, range.start, range.end);
  const holiday = getHolidayForDate(date.month, date.day);
  const isWeekend = new Date(date.year, date.month, date.day).getDay() % 6 === 0;

  const isRangeEdge = isStart || isEnd;
  const isSingleDay = isStart && isSameDate(range.start, range.end);

  return (
    <motion.button
      whileHover={{ scale: isCurrentMonth ? 1.08 : 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={() => isCurrentMonth && onClick(date)}
      disabled={!isCurrentMonth}
      aria-label={`${date.day} ${isToday ? "(today)" : ""}${holiday ? ` - ${holiday.name}` : ""}`}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-xl transition-colors duration-150",
        "h-10 w-full text-sm font-medium select-none",
        isCurrentMonth ? "cursor-pointer" : "cursor-default opacity-25",
        // Range background
        inRange && !isRangeEdge && "bg-indigo-100 dark:bg-indigo-900/40 rounded-none",
        isStart && range.end && "rounded-r-none",
        isEnd && range.start && !isSingleDay && "rounded-l-none",
        // Edge styles
        isRangeEdge && "bg-indigo-600 dark:bg-indigo-500 text-white shadow-md",
        // Today
        isToday && !isRangeEdge && "ring-2 ring-indigo-500 dark:ring-indigo-400 ring-offset-1 dark:ring-offset-slate-900",
        // Weekend
        isWeekend && !isRangeEdge && isCurrentMonth && "text-rose-500 dark:text-rose-400",
        // Default
        !isRangeEdge && !inRange && isCurrentMonth && "hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200",
      )}
    >
      <span className={cn(
        "relative z-10 leading-none",
        isToday && !isRangeEdge && "font-bold",
      )}>
        {date.day}
      </span>
      {holiday && (
        <span className="absolute bottom-0.5 text-[8px] leading-none" title={holiday.name}>
          {holiday.emoji}
        </span>
      )}
    </motion.button>
  );
}
