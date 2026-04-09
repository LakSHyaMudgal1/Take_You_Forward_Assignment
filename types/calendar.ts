export interface CalendarDate {
  year: number;
  month: number; // 0-indexed
  day: number;
}

export interface DateRange {
  start: CalendarDate | null;
  end: CalendarDate | null;
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  rangeStart?: string; // ISO date string
  rangeEnd?: string;   // ISO date string
}

export interface MonthNotes {
  [monthKey: string]: Note[]; // key: "YYYY-MM"
}

export interface Holiday {
  date: string; // "MM-DD"
  name: string;
  emoji: string;
}

export type SelectionState = "idle" | "start-selected" | "range-selected";

export interface MonthImage {
  url: string;
  alt: string;
  credit?: string;
}
