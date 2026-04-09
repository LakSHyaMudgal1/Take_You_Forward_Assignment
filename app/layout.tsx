import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wall Calendar",
  description: "Interactive wall calendar with date range selection and notes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
