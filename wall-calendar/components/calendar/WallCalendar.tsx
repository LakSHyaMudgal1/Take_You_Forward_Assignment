"use client";

import { motion } from "framer-motion";
import { ImageSection } from "./ImageSection";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import { NotesPanel } from "./NotesPanel";
import { useCalendar } from "@/hooks/useCalendar";
import { useNotes } from "@/hooks/useNotes";
import { formatDateDisplay, toDateKey } from "@/lib/utils";

export function WallCalendar() {
  const {
    viewYear, viewMonth,
    range, selectionState,
    isAnimating, animDir,
    navigate, handleDateClick, clearSelection, goToToday,
    today,
  } = useCalendar();

  const { notes, addNote, deleteNote, updateNote } = useNotes(viewYear, viewMonth);

  const hasSelection = range.start !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center p-4 md:p-8 transition-colors duration-300">
      {/* Selection hint */}
      {selectionState === "start-selected" && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-indigo-600 text-white text-sm px-4 py-2 rounded-full shadow-lg"
        >
          Now click an end date
        </motion.div>
      )}

      {/* Calendar card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-calendar dark:shadow-calendar-dark"
        style={{ perspective: "1200px" }}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left: Calendar */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Hero image with spiral */}
            <ImageSection month={viewMonth} year={viewYear} />

            {/* Navigation header */}
            <CalendarHeader
              year={viewYear}
              month={viewMonth}
              onPrev={() => navigate("prev")}
              onNext={() => navigate("next")}
              onToday={goToToday}
              onClear={clearSelection}
              hasSelection={hasSelection}
            />

            {/* Grid */}
            <div className="flex-1">
              <CalendarGrid
                year={viewYear}
                month={viewMonth}
                today={today}
                range={range}
                onDateClick={handleDateClick}
                animDir={animDir}
                isAnimating={isAnimating}
              />
            </div>

            {/* Range display */}
            {hasSelection && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 pb-4"
              >
                <div className="rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40 px-4 py-3 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-indigo-400 dark:text-indigo-500 font-medium mb-0.5">Selected Range</p>
                    <p className="text-sm text-indigo-700 dark:text-indigo-300 font-medium truncate">
                      {formatDateDisplay(range.start!)}
                      {range.end && toDateKey(range.start!) !== toDateKey(range.end) ? ` → ${formatDateDisplay(range.end)}` : ""}
                    </p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                </div>
              </motion.div>
            )}

            {/* Legend */}
            <div className="px-4 pb-4 flex flex-wrap gap-3 text-xs text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full ring-2 ring-indigo-500 inline-block" /> Today
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" /> Selected
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-indigo-100 dark:bg-indigo-900/40 inline-block" /> Range
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-rose-400">●</span> Weekend
              </span>
              <span className="flex items-center gap-1.5">
                🎉 Holiday
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px bg-slate-100 dark:bg-slate-700/60 my-4" />
          <div className="lg:hidden h-px bg-slate-100 dark:bg-slate-700/60 mx-4" />

          {/* Right: Notes */}
          <div className="w-full lg:w-80 flex flex-col min-h-[400px] lg:min-h-0">
            <NotesPanel
              notes={notes}
              range={range}
              onAdd={addNote}
              onDelete={deleteNote}
              onUpdate={updateNote}
              month={viewMonth}
              year={viewYear}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
