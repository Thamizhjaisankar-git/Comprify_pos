import { useState, useContext, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { SidebarContext } from "./Sidebar"; // Import SidebarContext

export default function SidebarDropDown({ icon, text, subItems = [] }) {
    const { expanded } = useContext(SidebarContext); // Get sidebar state
    const [open, setOpen] = useState(false);  // Controls submenu in expanded mode
    const [hover, setHover] = useState(false); // Controls submenu in collapsed mode

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
                className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-800 `} 
                onClick={() => expanded && setOpen(!open)} // Click to open only when expanded
            >
                {icon}
                <span className={`ml-3 flex-1 transition-all ${expanded ? "w-auto" : "w-0 overflow-hidden"}`}>
                    {text}
                </span>
                {expanded && (open ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
            </div>

            {/* Submenu (Expands inside when expanded, Slides out on hover when collapsed) */}
            {(open && expanded) || (!expanded && hover) ? (
                <ul 
                    className={`absolute bg-white border border-gray-200 rounded-md shadow-md transition-all overflow-hidden ${
                        expanded 
                            ? "relative w-full ml-0 border-none shadow-none bg-transparent px-5"  // Inside sidebar when expanded
                            : "left-full border-5 top-0 ml-4 w-40" // Outside when collapsed
                    }`}
                >
                    {subItems.map((item, index) => (
                        <li key={index} className="flex items-center py-2 px-3 text-sm text-gray-800 hover:bg-indigo-50 rounded-md transition-colors">
                            {item.icon}
                            <span className="ml-3">{item.text}</span>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}
