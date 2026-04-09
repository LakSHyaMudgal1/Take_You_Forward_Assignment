"use client";

import { useState, useEffect, useCallback } from "react";
import type { Note, MonthNotes } from "@/types/calendar";
import { getMonthKey } from "@/lib/utils";

const STORAGE_KEY = "wall-calendar-notes";

export function useNotes(year: number, month: number) {
  const [allNotes, setAllNotes] = useState<MonthNotes>({});
  const monthKey = getMonthKey(year, month);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setAllNotes(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = useCallback((updated: MonthNotes) => {
    setAllNotes(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
  }, []);

  const currentNotes = allNotes[monthKey] ?? [];

  const addNote = useCallback((content: string, rangeStart?: string, rangeEnd?: string) => {
    const note: Note = {
      id: crypto.randomUUID(),
      content,
      createdAt: new Date().toISOString(),
      rangeStart,
      rangeEnd,
    };
    const updated = {
      ...allNotes,
      [monthKey]: [...currentNotes, note],
    };
    persist(updated);
  }, [allNotes, monthKey, currentNotes, persist]);

  const deleteNote = useCallback((id: string) => {
    const updated = {
      ...allNotes,
      [monthKey]: currentNotes.filter((n) => n.id !== id),
    };
    persist(updated);
  }, [allNotes, monthKey, currentNotes, persist]);

  const updateNote = useCallback((id: string, content: string) => {
    const updated = {
      ...allNotes,
      [monthKey]: currentNotes.map((n) => n.id === id ? { ...n, content } : n),
    };
    persist(updated);
  }, [allNotes, monthKey, currentNotes, persist]);

  return { notes: currentNotes, addNote, deleteNote, updateNote };
}
