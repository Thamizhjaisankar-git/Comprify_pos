"use client";

// Create a new view context file for grid/list view toggle
import { createContext, useContext, useState } from "react";

const ViewContext = createContext(null);

export const ViewProvider = ({ children }) => {
  const [viewMode, setViewMode] = useState(() => {
    // Check if view mode is stored in localStorage
    const savedViewMode = localStorage.getItem("comprify-view-mode");
    return savedViewMode || "grid"; // Default to grid view
  });

  // Toggle between grid and list views
  const toggleViewMode = () => {
    setViewMode((prevMode) => {
      const newMode = prevMode === "grid" ? "list" : "grid";
      localStorage.setItem("comprify-view-mode", newMode);
      return newMode;
    });
  };

  return (
    <ViewContext.Provider value={{ viewMode, toggleViewMode }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useViewMode = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useViewMode must be used within a ViewProvider");
  }
  return context;
};
