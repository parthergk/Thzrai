"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className=" w-[70px] h-[30px] rounded-sm bg-white dark:bg-neutral-800" />
    );
  }

  return (
    <button
      className=" flex gap-2 sm:gap-3 p-1 rounded-sm shadow-md bg-white dark:bg-neutral-800 dark:shadow-neutral-950 border border-neutral-200 dark:border-neutral-700/60 hover:shadow-lg hover:bg-neutral-50/60 transition-all duration-200 hover:scale-105"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-5 w-5 sm:h-6 sm:w-6 p-1 bg-neutral-800 text-white rounded-sm" />
      <Moon className="h-5 w-5 sm:h-6 sm:w-6 p-1 bg-white text-neutral-800 rounded-sm" />
    </button>
  );
}
