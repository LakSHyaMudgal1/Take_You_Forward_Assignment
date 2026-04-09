import type { Holiday } from "@/types/calendar";

export const HOLIDAYS: Holiday[] = [
  { date: "01-01", name: "New Year's Day", emoji: "🎆" },
  { date: "02-14", name: "Valentine's Day", emoji: "❤️" },
  { date: "03-17", name: "St. Patrick's Day", emoji: "🍀" },
  { date: "04-01", name: "April Fools' Day", emoji: "🃏" },
  { date: "05-05", name: "Cinco de Mayo", emoji: "🌮" },
  { date: "07-04", name: "Independence Day", emoji: "🎇" },
  { date: "10-31", name: "Halloween", emoji: "🎃" },
  { date: "11-11", name: "Veterans Day", emoji: "🎖️" },
  { date: "12-25", name: "Christmas Day", emoji: "🎄" },
  { date: "12-31", name: "New Year's Eve", emoji: "🥂" },
];

export function getHolidayForDate(month: number, day: number): Holiday | undefined {
  const key = `${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return HOLIDAYS.find((h) => h.date === key);
}
