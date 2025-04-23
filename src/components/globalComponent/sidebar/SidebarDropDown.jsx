// import { useState, useContext, useEffect } from "react";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import { SidebarContext } from "./Sidebar"; // Import SidebarContext
// import { useDispatch } from "react-redux";
// import { setSelectedMenu } from "../../../redux/menuSlice"; // Import Redux action
// import { Link } from "react-router-dom";

// export default function SidebarDropDown({ icon, text, subItems = [] }) {
//     const { expanded } = useContext(SidebarContext); // Get sidebar state
//     const [open, setOpen] = useState(false);  // Controls submenu in expanded mode
//     const [hover, setHover] = useState(false); // Controls submenu in collapsed mode
//     const dispatch = useDispatch(); // Redux dispatcher

//     // Close submenu when sidebar collapses
//     useEffect(() => {
//         if (!expanded) setOpen(false);
//     }, [expanded]);

//     return (
//         <div
//             className="relative cursor-pointer"
//             onMouseEnter={() => !expanded && setHover(true)} // Open submenu on hover when collapsed
//             onMouseLeave={() => !expanded && setHover(false)} // Close submenu when leaving hover
//         >
//             {/* Main Sidebar Item */}
//             <div
//                 className={`relative flex items-center py-2 px-4 my-4 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-800
//                     ${expanded ? "justify-start" : "justify-center py-2 px-2"}`}  // Adjust padding when collapsed
//                 onClick={() => expanded && setOpen(!open)}
//             >
//                 {icon}
//                 <span className={`ml-3 flex-1 transition-all ${expanded ? "w-auto" : "hidden"}`}>
//                     {text}
//                 </span>
//                 {expanded && (open ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
//             </div>

//             {/* Submenu (Expands inside when expanded, Slides out on hover when collapsed) */}
//             {(open && expanded) || (!expanded && hover) ? (
//                 <ul
//                 className={`absolute bg-white border border-gray-200 rounded-md shadow-md transition-all overflow-hidden ${
//                     expanded
//                         ? "relative w-full ml-0 border-none shadow-none bg-transparent px-5"  // Inside sidebar when expanded
//                         : "left-full border-5 top-0 ml-4 w-40 bg-white shadow-lg" // Outside when collapsed
//                 }`}
//             >
//                 {subItems.map((item, index) => (
//                     <li key={index} onClick={() => dispatch(setSelectedMenu(item.text))}>
//                         <Link
//                             to={item.path} // Use the path provided in subItems
//                             className="flex items-center py-2 px-3 text-sm text-gray-800 hover:bg-indigo-50 rounded-md transition-colors"
//                         >
//                             {item.icon}
//                             <span className="ml-3">{item.text}</span>
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//             ) : null}
//         </div>
//     );
// }
"use client";

import { useState, useContext, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { SidebarContext } from "./Sidebar"; // Import SidebarContext
import { useDispatch } from "react-redux";
import { setSelectedMenu } from "../../../redux/menuSlice"; // Import Redux action
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/themeContext";

export default function SidebarDropDown({ icon, text, subItems = [] }) {
  const { expanded } = useContext(SidebarContext); // Get sidebar state
  const [open, setOpen] = useState(false); // Controls submenu in expanded mode
  const [hover, setHover] = useState(false); // Controls submenu in collapsed mode
  const dispatch = useDispatch(); // Redux dispatcher
  const { theme } = useTheme();

  // Close submenu when sidebar collapses
  useEffect(() => {
    if (!expanded) setOpen(false);
  }, [expanded]);

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => !expanded && setHover(true)} // Open submenu on hover when collapsed
      onMouseLeave={() => !expanded && setHover(false)} // Close submenu when leaving hover
    >
      {/* Main Sidebar Item */}
      <div
        className={`relative flex items-center py-2 px-4 my-4 font-medium rounded-md cursor-pointer transition-colors group 
                    ${expanded ? "justify-start" : "justify-center py-2 px-2"} 
                    ${
                      theme === "light"
                        ? "hover:bg-gray-100 text-gray-800"
                        : "hover:bg-gray-700 text-gray-200"
                    }`}
        onClick={() => expanded && setOpen(!open)}
      >
        {icon}
        <span
          className={`ml-3 flex-1 transition-all ${
            expanded ? "w-auto" : "hidden"
          }`}
        >
          {text}
        </span>
        {expanded &&
          (open ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
      </div>

      {/* Submenu (Expands inside when expanded, Slides out on hover when collapsed) */}
      {(open && expanded) || (!expanded && hover) ? (
        <ul
          className={`absolute transition-all overflow-hidden ${
            expanded
              ? "relative w-full ml-0 border-none shadow-none bg-transparent px-5" // Inside sidebar when expanded
              : `left-full border-5 top-0 ml-4 w-40 shadow-lg rounded-md z-50 ${
                  theme === "light"
                    ? "bg-white border border-gray-200"
                    : "bg-gray-800 border border-gray-700"
                }`
          }`}
        >
          {subItems.map((item, index) => (
            <li
              key={index}
              onClick={() => dispatch(setSelectedMenu(item.text))}
            >
              <Link
                to={item.path} // Use the path provided in subItems
                className={`flex items-center py-2 px-3 text-sm rounded-md transition-colors ${
                  theme === "light"
                    ? "text-gray-800 hover:bg-gray-100"
                    : "text-gray-200 hover:bg-gray-700"
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
