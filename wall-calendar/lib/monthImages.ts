import type { MonthImage } from "@/types/calendar";

// picsum.photos with fixed IDs — verified landscape photos, always available
export const MONTH_IMAGES: MonthImage[] = [
  { url: "https://picsum.photos/id/1015/1200/400", alt: "January",   credit: "Picsum" },
  { url: "https://picsum.photos/id/1018/1200/400", alt: "February",  credit: "Picsum" },
  { url: "https://picsum.photos/id/1019/1200/400", alt: "March",     credit: "Picsum" },
  { url: "https://picsum.photos/id/1022/1200/400", alt: "April",     credit: "Picsum" },
  { url: "https://picsum.photos/id/1023/1200/400", alt: "May",       credit: "Picsum" },
  { url: "https://picsum.photos/id/1028/1200/400", alt: "June",      credit: "Picsum" },
  { url: "https://picsum.photos/id/1033/1200/400", alt: "July",      credit: "Picsum" },
  { url: "https://picsum.photos/id/1036/1200/400", alt: "August",    credit: "Picsum" },
  { url: "https://picsum.photos/id/1039/1200/400", alt: "September", credit: "Picsum" },
  { url: "https://picsum.photos/id/1043/1200/400", alt: "October",   credit: "Picsum" },
  { url: "https://picsum.photos/id/1047/1200/400", alt: "November",  credit: "Picsum" },
  { url: "https://picsum.photos/id/1050/1200/400", alt: "December",  credit: "Picsum" },
];

export function getMonthImage(month: number): MonthImage {
  return MONTH_IMAGES[month] ?? MONTH_IMAGES[0];
}
