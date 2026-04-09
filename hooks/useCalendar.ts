"use client";

import { useState, useCallback } from "react";
import type { CalendarDate, DateRange, SelectionState } from "@/types/calendar";
import { compareDates } from "@/lib/utils";

export function useCalendar() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [selectionState, setSelectionState] = useState<SelectionState>("idle");
  const [isAnimating, setIsAnimating] = useState(false);
  const [animDir, setAnimDir] = useState<"next" | "prev">("next");

  const navigate = useCallback((dir: "next" | "prev") => {
    setAnimDir(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setViewMonth((m) => {
        if (dir === "next") {
          if (m === 11) { setViewYear((y) => y + 1); return 0; }
          return m + 1;
        } else {
          if (m === 0) { setViewYear((y) => y - 1); return 11; }
          return m - 1;
        }
      });
      setIsAnimating(false);
    }, 300);
  }, []);

  const handleDateClick = useCallback((date: CalendarDate) => {
    if (selectionState === "idle" || selectionState === "range-selected") {
      setRange({ start: date, end: null });
      setSelectionState("start-selected");
    } else if (selectionState === "start-selected") {
      if (range.start && compareDates(date, range.start) < 0) {
        setRange({ start: date, end: range.start });
      } else {
        setRange((r) => ({ ...r, end: date }));
      }
      setSelectionState("range-selected");
    }
  }, [selectionState, range.start]);

  const clearSelection = useCallback(() => {
    setRange({ start: null, end: null });
    setSelectionState("idle");
  }, []);

  const goToToday = useCallback(() => {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
  }, []);

  return {
    viewYear, viewMonth,
    range, selectionState,
    isAnimating, animDir,
    navigate, handleDateClick, clearSelection, goToToday,
    today: { year: today.getFullYear(), month: today.getMonth(), day: today.getDate() },
  };
}
