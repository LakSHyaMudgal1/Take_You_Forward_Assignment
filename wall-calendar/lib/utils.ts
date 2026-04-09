import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CalendarDate } from "@/types/calendar";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toDateKey(d: CalendarDate): string {
  return `${d.year}-${String(d.month + 1).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;
}

export function fromDateKey(key: string): CalendarDate {
  const [year, month, day] = key.split("-").map(Number);
  return { year, month: month - 1, day };
}

export function isSameDate(a: CalendarDate | null, b: CalendarDate | null): boolean {
  if (!a || !b) return false;
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

export function compareDates(a: CalendarDate, b: CalendarDate): number {
  if (a.year !== b.year) return a.year - b.year;
  if (a.month !== b.month) return a.month - b.month;
  return a.day - b.day;
}

export function isInRange(date: CalendarDate, start: CalendarDate | null, end: CalendarDate | null): boolean {
  if (!start || !end) return false;
  const [s, e] = compareDates(start, end) <= 0 ? [start, end] : [end, start];
  return compareDates(date, s) >= 0 && compareDates(date, e) <= 0;
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function getMonthKey(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

export function formatDateDisplay(d: CalendarDate): string {
  const date = new Date(d.year, d.month, d.day);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
