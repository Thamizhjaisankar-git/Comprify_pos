import { Menu, Search, User } from "lucide-react";
import profile from "../../../assets/profile.png";

export default function Navbar() {
    return (
        <nav className="bg-blue-300 shadow-md fixed top-0 left-0 w-full h-16 flex items-center px-4 md:px-6 lg:px-8 justify-between z-50">
            
            {/* Left Section - Menu */}
            <div className="flex items-center">
                <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                    <Menu size={24} className="text-gray-700" />
                </button>
            </div>

            {/* Middle Section - Fixed Search Bar */}
            <div className="flex-grow flex justify-center px-2">
                <div className="relative w-40 sm:w-52 md:w-72 lg:w-96">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-100 text-sm"
                    />
                </div>
            </div>

            {/* Right Section - User Icon & Profile */}
            <div className="flex items-center gap-4">
                <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                    <User size={20} className="text-gray-700" />
                </button>
                <div className="flex items-center gap-2 cursor-pointer">
                    <img src={profile} className="w-10 h-10 rounded-full" alt="User Profile" />
                    <span className="hidden lg:block font-medium">Comprify</span>
                </div>
            </div>

        </nav>
    );
}
