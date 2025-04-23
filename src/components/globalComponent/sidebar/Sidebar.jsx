// import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
// import logo from "../../../assets/Logo1.png";
// import profile from "../../../assets/profile.png";
// import { createContext, useContext, useState } from "react";

// export const SidebarContext = createContext();

// export default function Sidebar({ children }) {
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <aside className="h-[calc(100vh-4rem)] mt-16 z-50 relative ">
//       <nav
//         className={`sidebar h-full flex flex-col bg-blue-300 border-r shadow-sm transition-all ${
//           expanded
//             ? "expanded overflow-y-auto max-h-[calc(100vh-4rem)]"
//             : "overflow-visible"
//         }`}
//       >
//         {/* Sidebar Header */}
//         <div className="p-3 flex justify-between items-center">
//           <img
//             src={logo}
//             className={`rounded-full object-cover transition-all ${
//               expanded ? "w-36 h-7 opacity-100" : "w-0 h-0 opacity-0 scale-0"
//             }`}
//             alt="Logo"
//           />
//           <button
//             onClick={() => setExpanded((curr) => !curr)}
//             className="p-2 rounded-lg bg-gray-300 hover:bg-gray-400"
//           >
//             {expanded ? <ChevronFirst /> : <ChevronLast />}
//           </button>
//         </div>

//         {/* Sidebar Items */}
//         <SidebarContext.Provider value={{ expanded }}>
//           <ul className="flex-1 px-2 space-y-0.5 ">{children}</ul>
//         </SidebarContext.Provider>

//         {/* Profile Section */}
//         <div className="border-t flex items-center p-2">
//           <img src={profile} className="w-10 h-10 rounded-full" alt="Profile" />
//           <div
//             className={`overflow-hidden transition-all ${
//               expanded ? "w-40 ml-3" : "w-0 opacity-0 scale-0"
//             }`}
//           >
//             <p className="font-semibold text-sm">
//               <strong>Comprify,</strong>
//               <i> A product by WebGI</i>
//             </p>
//             <span className="text-xs text-gray-600">
//               webgi215.official@gmail.com
//             </span>
//           </div>
//           {expanded && (
//             <MoreVertical size={20} className="ml-auto cursor-pointer" />
//           )}
//         </div>
//       </nav>
//     </aside>
//   );
// }

// export function SidebarItem({ icon, text, active, alert }) {
//   const { expanded } = useContext(SidebarContext);

//   return (
//     <li
//       className={`relative flex items-center px-3 py-1.5 rounded-md cursor-pointer transition-colors group ${
//         active
//           ? "bg-indigo-200 text-indigo-800"
//           : "hover:bg-indigo-50 text-gray-800 "
//       }`}
//     >
//       {icon}
//       <span
//         className={`overflow-hidden whitespace-nowrap transition-all  ${
//           expanded ? "w-auto ml-3" : "w-0 opacity-0 scale-0"
//         }`}
//       >
//         {text}
//       </span>
//       {alert && (
//         <div
//           className={`absolute right-2 w-2 h-2 rounded-full bg-red-500 ${
//             expanded ? "" : "top-2"
//           }`}
//         />
//       )}

//       {/* Tooltip when collapsed */}
//       {!expanded && (
//         <span className="absolute left-14 bg-indigo-100 text-indigo-800 text-xs rounded px-2 py-1 opacity-0 transition-opacity group-hover:opacity-100">
//           {text}
//         </span>
//       )}
//     </li>
//   );
// }
"use client";

import { ChevronFirst, ChevronLast } from "lucide-react";
import logo from "../../../assets/Logo1.png";
import profile from "../../../assets/profile.png";
import { createContext, useContext, useState, useEffect } from "react";
import { useTheme } from "../../../context/themeContext";

export const SidebarContext = createContext();

export default function Sidebar({ children, isOpen, setIsOpen }) {
  const [expanded, setExpanded] = useState(false);
  const { theme } = useTheme();

  // Update expanded state when isOpen changes
  useEffect(() => {
    setExpanded(isOpen);
  }, [isOpen]);

  // Handle toggle and notify parent
  const handleToggle = () => {
    const newState = !expanded;
    setExpanded(newState);
    if (setIsOpen) setIsOpen(newState);
  };

  return (
    <aside
      className={`h-[calc(100vh-4rem)] mt-16 z-40 fixed left-0 transition-all duration-300 ${
        expanded ? "w-64" : "w-20"
      }`}
    >
      <nav
        className={`sidebar h-full flex flex-col border-r shadow-sm transition-all ${
          expanded
            ? "expanded overflow-y-auto max-h-[calc(100vh-4rem)]"
            : "overflow-visible"
        } ${
          theme === "light"
            ? "bg-white text-gray-800 border-gray-200"
            : "bg-gray-800 text-white border-gray-700"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-3 flex justify-between items-center">
          <img
            src={logo || "/placeholder.svg"}
            className={`rounded-full object-cover transition-all ${
              expanded ? "w-36 h-7 opacity-100" : "w-0 h-0 opacity-0 scale-0"
            }`}
            alt="Logo"
          />
          <button
            onClick={handleToggle}
            className={`p-2 rounded-lg ${
              theme === "light"
                ? "bg-gray-200 hover:bg-gray-300"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Sidebar Items */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-2 space-y-0.5 ">{children}</ul>
        </SidebarContext.Provider>

        {/* Profile Section */}
        <div
          className={`border-t flex items-center p-2 ${
            theme === "light" ? "border-gray-200" : "border-gray-700"
          }`}
        >
          <img
            src={profile || "/placeholder.svg"}
            className="w-10 h-10 rounded-full"
            alt="Profile"
          />
          <div
            className={`overflow-hidden transition-all ${
              expanded ? "w-40 ml-3" : "w-0 opacity-0 scale-0"
            }`}
          >
            <p className="font-semibold text-sm">
              <strong>Comprify,</strong>
              <i
                className={
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }
              >
                {" "}
                A product by WebGI
              </i>
            </p>
            <span
              className={`text-xs ${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              webgi215.official@gmail.com
            </span>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);
  const { theme } = useTheme();

  return (
    <li
      className={`relative flex items-center px-3 py-1.5 rounded-md cursor-pointer transition-colors group ${
        active
          ? theme === "light"
            ? "bg-blue-100 text-blue-800"
            : "bg-blue-900 bg-opacity-50 text-blue-200"
          : theme === "light"
          ? "hover:bg-gray-100 text-gray-800"
          : "hover:bg-gray-700 text-gray-200"
      }`}
    >
      {icon}
      <span
        className={`overflow-hidden whitespace-nowrap transition-all  ${
          expanded ? "w-auto ml-3" : "w-0 opacity-0 scale-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded-full bg-red-500 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {/* Tooltip when collapsed */}
      {!expanded && (
        <span
          className={`absolute left-14 z-50 px-2 py-1 text-xs rounded opacity-0 transition-opacity group-hover:opacity-100 ${
            theme === "light"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {text}
        </span>
      )}
    </li>
  );
}
