import { useSelector } from "react-redux";
import { LayoutDashboard, ShoppingCart, CreditCard, Users, Package, Truck, Briefcase, DollarSign, FileText, Settings } from "lucide-react";
import Sidebar, { SidebarItem } from "../../components/globalComponent/sidebar/Sidebar";
import SidebarDropDown from "../../components/globalComponent/sidebar/SidebarDropDown"; 
import Navbar from "../../components/globalComponent/navbar/Navbar";

function HomePage() {
  const selectedMenu = useSelector((state) => state.menu?.selectedMenu || "Dashboard");


  return (
    <div className="flex h-screen text-black bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Sidebar */}
      <Sidebar>
        <SidebarDropDown 
          icon={<LayoutDashboard size={20} />} 
          text="Dashboard"
          subItems={[
            { icon: <FileText size={18} />, text: "Overview" },
            { icon: <FileText size={18} />, text: "Sales Summary" },
            { icon: <FileText size={18} />, text: "Store Performance" }
          ]}
        />

        <SidebarDropDown 
          icon={<ShoppingCart size={20} />} 
          text="Sales & Transactions"
          subItems={[
            { icon: <CreditCard size={18} />, text: "Create Sale" },
            { icon: <FileText size={18} />, text: "Sales History" },
            { icon: <FileText size={18} />, text: "Returns & Refunds" },
            { icon: <FileText size={18} />, text: "Bills & Receipts" },
            { icon: <FileText size={18} />, text: "Create Bill" },
            { icon: <FileText size={18} />, text: "Bill List" },
            { icon: <FileText size={18} />, text: "Receipts" },
            { icon: <FileText size={18} />, text: "Transactions" }
          ]}
        />

        <SidebarDropDown 
          icon={<Users size={20} />} 
          text="Customers & Loyalty"
          subItems={[
            { icon: <FileText size={18} />, text: "Add Customer" },
            { icon: <FileText size={18} />, text: "Customer List" },
            { icon: <FileText size={18} />, text: "Customer Transactions" },
            { icon: <FileText size={18} />, text: "Loyalty Program" }
          ]}
        />

        <SidebarDropDown 
          icon={<Package size={20} />} 
          text="Products & Inventory"
          subItems={[
            { icon: <FileText size={18} />, text: "Add Product" },
            { icon: <FileText size={18} />, text: "Product List" },
            { icon: <FileText size={18} />, text: "Categories" },
            { icon: <FileText size={18} />, text: "Promotions & Discounts" },
            { icon: <FileText size={18} />, text: "Stock & Inventory" },
            { icon: <FileText size={18} />, text: "Stock List" },
            { icon: <FileText size={18} />, text: "Adjust Inventory" }
          ]}
        />

        <SidebarDropDown 
          icon={<Truck size={20} />} 
          text="Suppliers & Purchases"
          subItems={[
            { icon: <FileText size={18} />, text: "Add Supplier" },
            { icon: <FileText size={18} />, text: "Supplier List" },
            { icon: <FileText size={18} />, text: "Supplier Transactions" }
          ]}
        />

        <SidebarDropDown 
          icon={<Briefcase size={20} />} 
          text="Employees & Users"
          subItems={[
            { icon: <FileText size={18} />, text: "Add Employee" },
            { icon: <FileText size={18} />, text: "Employee List" },
            { icon: <FileText size={18} />, text: "Salesmen" },
            { icon: <FileText size={18} />, text: "Shifts & Attendance" }
          ]}
        />

        <SidebarDropDown 
          icon={<DollarSign size={20} />} 
          text="Expenses & Taxes"
          subItems={[
            { icon: <FileText size={18} />, text: "Add Expense" },
            { icon: <FileText size={18} />, text: "Expense List" },
            { icon: <FileText size={18} />, text: "Manage Taxes" }
          ]}
        />

        <SidebarDropDown 
          icon={<FileText size={20} />} 
          text="Reports & Logs"
          subItems={[
            { icon: <FileText size={18} />, text: "Sales Reports" },
            { icon: <FileText size={18} />, text: "Inventory Reports" },
            { icon: <FileText size={18} />, text: "Expense Reports" },
            { icon: <FileText size={18} />, text: "Tax Reports" },
            { icon: <FileText size={18} />, text: "Audit Logs" }
          ]}
        />

        <SidebarDropDown 
          icon={<Settings size={20} />} 
          text="Settings & Store Management"
          subItems={[
            { icon: <FileText size={18} />, text: "Store Information" },
            { icon: <FileText size={18} />, text: "Roles & Permissions" },
            { icon: <FileText size={18} />, text: "Notification Settings" }
          ]}
        />
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar - Fixed at the top */}
        <Navbar />

        {/* Main Content Area */}
        <main className="p-6 pt-20 text-white">
          <h1 className="text-2xl font-bold">{selectedMenu ? `${selectedMenu} Page` : "Home Page"}</h1>
          <p>{selectedMenu ? `Displaying content for ${selectedMenu}.` : "Welcome to the Home Page. Select an option from the sidebar."}</p>
        </main>
      </div>
    </div>
  );
}

export default HomePage;
