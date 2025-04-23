// Create a theme toggle component
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/themeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-colors duration-200 ease-in-out"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-gray-800 dark:text-white" />
      ) : (
        <Sun className="h-5 w-5 text-gray-800 dark:text-white" />
      )}
    </button>
  );
}
