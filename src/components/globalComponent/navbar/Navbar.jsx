// // import { Menu, Search, User } from "lucide-react";
// // import profile from "../../../assets/profile.png";

// // export default function Navbar() {
// //     return (
// //         <nav className="bg-blue-300 shadow-md fixed top-0 left-0 w-full h-16 flex items-center px-4 md:px-6 lg:px-8 justify-between z-50">

// //             {/* Left Section - Menu */}
// //             <div className="flex items-center">
// //             <div className="flex items-center gap-2 cursor-pointer">
// //                     <img src={profile} className="w-10 h-10 rounded-full bg-transparent" alt="User Profile" />
// //                     <span className=" font-medium">Comprify</span>
// //                 </div>
// //             </div>

// //             {/* Middle Section - Fixed Search Bar */}
// //             <div className="flex-grow flex justify-center px-2">
// //                 <div className="relative w-40 sm:w-52 md:w-72 lg:w-96">
// //                     <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
// //                     <input
// //                         type="text"
// //                         placeholder="Search..."
// //                         className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-100 text-sm"
// //                     />
// //                 </div>
// //             </div>

// //             {/* Right Section - User Icon & Profile */}
// //             <div className="flex items-center gap-4">
// //                 <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
// //                     <User size={20} className="text-gray-700" />
// //                 </button>
// //             </div>

// //         </nav>
// //     );
// // }

// import { Search, User, ChevronDown } from "lucide-react";
// import profile from "../../../assets/profile.png";
// import { useState, useEffect } from "react";

// export default function Navbar() {
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [userEmail, setUserEmail] = useState(""); // Fix: Add userEmail state

//     useEffect(() => {
//         const email = localStorage.getItem("userEmail"); // Get email from localStorage
//         if (email) setUserEmail(email);
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem("token"); // Remove authentication token
//         localStorage.removeItem("userEmail"); // Remove email from storage
//         window.location.reload(); // Refresh to redirect to login page (or handle navigation)
//     };

//     return (
//         <nav className="bg-blue-300 shadow-md fixed top-0 left-0 w-full h-16 flex items-center px-4 md:px-6 lg:px-8 justify-between z-50">

//             {/* Left Section - Menu */}
//             <div className="flex items-center">
//                 <div className="flex items-center gap-2 cursor-pointer">
//                     <img src={profile} className="w-10 h-10 rounded-full bg-transparent" alt="User Profile" />
//                     <span className="font-medium">Comprify</span>
//                 </div>
//             </div>

//             {/* Middle Section - Fixed Search Bar */}
//             <div className="flex-grow flex justify-center px-2">
//                 <div className="relative w-40 sm:w-52 md:w-72 lg:w-96">
//                     <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
//                     <input
//                         type="text"
//                         placeholder="Search..."
//                         className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-100 text-sm"
//                     />
//                 </div>
//             </div>

//             {/* Right Section - User Dropdown */}
//             <div
//     className="relative group"
//     // onMouseEnter={() => setDropdownOpen(true)}
//     // onMouseLeave={() => setDropdownOpen(false)}
//     onClick={() => setDropdownOpen(!dropdownOpen)}
// >
//     <button className="flex items-center gap-3 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-300 cursor-pointer">
//     <User size={20} className="text-gray-700" />
//         <div className="text-left">
//             <span className="text-sm font-medium text-gray-900">{userEmail || "Guest"}</span>
//             <p className="text-xs text-black">Admin</p> {/* You can dynamically change role */}
//         </div>
//         <ChevronDown size={16} className="text-gray-700" />
//     </button>

//     {/* Dropdown Menu */}
//     {dropdownOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 border border-gray-200">
//             <button
//                 onClick={handleLogout}
//                 className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 cursor-pointer"
//             >
//                 Logout
//             </button>
//         </div>
//     )}
// </div>

//         </nav>
//     );
// }
"use client";

import { Search, User, ChevronDown, MenuIcon } from "lucide-react";
import profile from "../../../assets/profile.png";
import { useState, useEffect } from "react";
import { ThemeToggle } from "../../ui/theme-toggle";
import { useTheme } from "../../../context/themeContext";

export default function Navbar({ toggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    window.location.reload();
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-16 flex items-center px-4 md:px-6 lg:px-8 justify-between z-50 shadow-md ${
        theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-white"
      } transition-colors duration-200`}
    >
      {/* Left Section - Menu */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-opacity-20 hover:bg-gray-500"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={profile || "/placeholder.svg"}
            className="w-10 h-10 rounded-full bg-transparent"
            alt="User Profile"
          />
          <span className="font-medium hidden md:block">Comprify</span>
        </div>
      </div>

      {/* Middle Section - Fixed Search Bar */}
      <div className="flex-grow flex justify-center px-2">
        <div className="relative w-40 sm:w-52 md:w-72 lg:w-96">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            className={`w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              theme === "light"
                ? "bg-gray-100 text-gray-800 border-gray-300"
                : "bg-gray-700 text-white border-gray-600"
            } text-sm`}
          />
        </div>
      </div>

      {/* Right Section - User Dropdown */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        <div
          className="relative group"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <button
            className={`flex items-center gap-3 p-2 rounded-lg transition duration-300 cursor-pointer ${
              theme === "light"
                ? "bg-gray-100 hover:bg-gray-200"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <User
              size={20}
              className={theme === "light" ? "text-gray-700" : "text-gray-300"}
            />
            <div className="text-left hidden md:block">
              <span className="text-sm font-medium">
                {userEmail || "Guest"}
              </span>
              <p className="text-xs">Admin</p>
            </div>
            <ChevronDown
              size={16}
              className={theme === "light" ? "text-gray-700" : "text-gray-300"}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              className={`absolute right-0 mt-2 w-48 rounded-lg py-2 border shadow-lg ${
                theme === "light"
                  ? "bg-white border-gray-200 text-gray-800"
                  : "bg-gray-800 border-gray-700 text-white"
              }`}
            >
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-opacity-10 hover:bg-red-500 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
