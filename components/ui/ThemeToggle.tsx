"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === "dark" || (!stored && prefersDark);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="relative w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <motion.div
        animate={{ x: dark ? 24 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center text-xs"
      >
        {dark ? "🌙" : "☀️"}
      </motion.div>
    </button>
  );
}
