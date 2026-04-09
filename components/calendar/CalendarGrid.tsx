"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DateCell } from "./DateCell";
import { getDaysInMonth, getFirstDayOfMonth, DAY_NAMES } from "@/lib/utils";
import type { CalendarDate, DateRange } from "@/types/calendar";

interface Props {
  year: number;
  month: number;
  today: CalendarDate;
  range: DateRange;
  onDateClick: (date: CalendarDate) => void;
  animDir: "next" | "prev";
  isAnimating: boolean;
}

export function CalendarGrid({ year, month, today, range, onDateClick, animDir, isAnimating }: Props) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Previous month fill
  const prevMonthDays = getDaysInMonth(year, month === 0 ? 11 : month - 1);
  const prevYear = month === 0 ? year - 1 : year;
  const prevMonth = month === 0 ? 11 : month - 1;
  const nextYear = month === 11 ? year + 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;

  const cells: { date: CalendarDate; isCurrentMonth: boolean }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ date: { year: prevYear, month: prevMonth, day: prevMonthDays - i }, isCurrentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: { year, month, day: d }, isCurrentMonth: true });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ date: { year: nextYear, month: nextMonth, day: d }, isCurrentMonth: false });
  }

  const variants = {
    enter: { x: animDir === "next" ? 40 : -40, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: animDir === "next" ? -40 : 40, opacity: 0 },
  };

  return (
    <div className="px-4 pb-4">
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_NAMES.map((d, i) => (
          <div
            key={d}
            className={`text-center text-xs font-semibold tracking-wider py-2 ${
              i === 0 || i === 6 ? "text-rose-400 dark:text-rose-400" : "text-slate-400 dark:text-slate-500"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${year}-${month}`}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, ease: "easeInOut" }}
          className="grid grid-cols-7 gap-y-1"
        >
          {cells.map(({ date, isCurrentMonth }, idx) => (
            <DateCell
              key={idx}
              date={date}
              today={today}
              range={range}
              onClick={onDateClick}
              isCurrentMonth={isCurrentMonth}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
