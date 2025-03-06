import { LayoutDashboard, Home, StickyNote, Layers, Flag, Calendar, LifeBuoy, Settings, FileText } from "lucide-react";
import Sidebar, { SidebarItem } from "../../components/globalComponent/sidebar/Sidebar";
import SidebarDropDown from "../../components/globalComponent/sidebar/SidebarDropDown"; 
import Navbar from "../../components/globalComponent/navbar/Navbar";

function Dashboard() {
  return (
    <div className="flex h-screen text-black bg-gradient-to-b from-black via-gray-900 to-black ">
      {/* Sidebar */}
      <Sidebar>
        <SidebarItem icon={<Home size={20} />} text="Home" />
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />

        {/* Dropdown for Projects */}
        <SidebarDropDown 
          icon={<StickyNote size={20} />} 
          text="Projects"
          subItems={[
            { icon: <FileText size={18} />, text: "Project 1" },
            { icon: <FileText size={18} />, text: "Project 2" },
            { icon: <FileText size={18} />, text: "Project 3" }
          ]}
        />

        <SidebarItem icon={<Calendar size={20} />} text="Calendar" />
        <SidebarItem icon={<Layers size={20} />} text="Tasks" />
        <SidebarItem icon={<Flag size={20} />} text="Reporting" />
        <hr className="my-3" />
        <SidebarItem icon={<Settings size={20} />} text="Settings" />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        {/* Navbar - Fixed at the top */}
        <Navbar />

        {/* Main Content Area */}
        <main className="p-6 pt-20 text-white">
          <h1 className="text-2xl font-bold">Dashboard Content</h1>
          <p>Welcome to the dashboard. Add your content here.</p>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
