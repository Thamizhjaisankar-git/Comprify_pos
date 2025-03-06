import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import logo from "../../../assets/Logo1.png";
import profile from "../../../assets/profile.png";
import { createContext, useContext, useState } from "react";

export const SidebarContext = createContext();

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <aside className="h-[calc(100vh-4rem)] mt-16 z-50 relative">
            <nav className="h-full flex flex-col bg-blue-300 border-r shadow-sm transition-all">
                {/* Sidebar Header */}
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img 
                        src={logo} 
                        className={`rounded-full object-cover transition-all ${expanded ? "w-40 h-7 opacity-100" : "w-0 h-0 opacity-0 scale-0"}`} 
                        alt="Logo"
                    />
                    <button 
                        onClick={() => setExpanded((curr) => !curr)} 
                        className="p-1.5 rounded-lg bg-gray-300 hover:bg-gray-400"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                {/* Sidebar Items */}
                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-2">{children}</ul>
                </SidebarContext.Provider>

                {/* Profile Section */}
                <div className="border-t flex p-3">
                    <img src={profile} className="w-12 h-12 rounded-full" alt="Profile" />
                    <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0 opacity-0 scale-0"} `}>
                        <div className="leading-4">
                            <h4 className="font-semibold">Comprify</h4>
                            <span className="text-xs text-gray-600">comprifyofficial@gmail.com</span>
                        </div>
                        <MoreVertical size={20} />
                    </div>
                </div>
            </nav>
        </aside>
    );
}

export function SidebarItem({ icon, text, active, alert }) {
    const { expanded } = useContext(SidebarContext);

    return (
        <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-800"}`}>
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0 opacity-0 scale-0"}`}>{text}</span>
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />
            )}

            {/* Tooltip when collapsed */}
            {!expanded && (
                <div className="absolute left-full whitespace-nowrap rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                    {text}
                </div>
            )}
        </li>
    );
}
