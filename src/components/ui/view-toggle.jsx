// Create a view toggle component
"use client";

import { Grid, List } from "lucide-react";
import { useViewMode } from "../../context/viewContext";

export function ViewToggle() {
  const { viewMode, toggleViewMode } = useViewMode();

  return (
    <button
      onClick={toggleViewMode}
      className="p-2 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-colors duration-200 ease-in-out"
      aria-label="Toggle view mode"
    >
      {viewMode === "grid" ? (
        <List className="h-5 w-5 text-gray-800 dark:text-white" />
      ) : (
        <Grid className="h-5 w-5 text-gray-800 dark:text-white" />
      )}
    </button>
  );
}
