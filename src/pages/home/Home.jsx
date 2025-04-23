// import { useSelector } from "react-redux";
// import {
//   LayoutDashboard,
//   ShoppingCart,
//   CreditCard,
//   Users,
//   Package,
//   Truck,
//   Briefcase,
//   DollarSign,
//   FileText,
//   Settings,
//   Car,
//   Microchip,
// } from "lucide-react";
// import Sidebar, {
//   SidebarItem,
// } from "../../components/globalComponent/sidebar/Sidebar";
// import SidebarDropDown from "../../components/globalComponent/sidebar/SidebarDropDown";
// import Navbar from "../../components/globalComponent/navbar/Navbar";
// import AddCustomer from "../customer/AddCustomer";
// import AddProduct from "../products/AddProduct";
// import AddSupplier from "../supplier/AddSupplier";
// import Overview from "../dashboard/Overview";
// import ProductList from "../products/ProductList";
// import CustomerList from "../customer/CustomerList";
// import AddEmployee from "../employee/AddEmployee";
// import EmployeeList from "../employee/EmployeeList";
// import CreateBill from "../bill/CreateBill";
// import BillList from "../bill/BillList";
// import CreateCategory from "../category/CreateCategory";
// import StoreInformationView from "../store/StoreInformationView";
// import OrdersManagement from "../online/OrdersManagement";
// import OrderDetails from "../online/OrderDetails";
// import StockList from "../stocks/StockList";
// import SmartTrolley from "../trolly/SmartTrolly";
// import CartAnimation from "../loginPage/CartAnimation";

// function HomePage() {
//   const selectedMenu = useSelector(
//     (state) => state.menu?.selectedMenu || "Dashboard"
//   );
//   const renderPage = () => {
//     switch (selectedMenu) {
//       case "Add Customer":
//         return <AddCustomer />;
//       case "Add Product":
//         return <AddProduct />;
//       case "Overview":
//         return <Overview />;
//       case "Add Supplier":
//         return <AddSupplier />;
//       case "Product List":
//         return <ProductList />;
//       case "Customer List":
//         return <CustomerList />;
//       case "Add Employee":
//         return <AddEmployee />;
//       case "Employee List":
//         return <EmployeeList />;
//       case "Create Bill":
//         return <CreateBill />;
//       case "Bill List":
//         return <BillList />;
//       case "Categories":
//         return <CreateCategory />;
//       case "Store Information":
//         return <StoreInformationView />;
//       case "Orders Management":
//         return <OrdersManagement />;
//       case "Order Details":
//         return <OrderDetails />;
//       case "Stock List":
//         return <StockList />;
//       case "Trolly":
//         return <SmartTrolley />;
//       default:
//         return (
//           <h1 className="text-2xl font-bold">Welcome to {selectedMenu} Page</h1>
//         );
//     }
//   };

//   return (
//     <div className="flex h-screen text-black bg-gradient-to-b from-black via-gray-900 to-black">
//       {/* Sidebar */}
//       <Sidebar>
//         <SidebarDropDown
//           icon={<LayoutDashboard size={20} />}
//           text="Dashboard"
//           subItems={[
//             {
//               icon: <FileText size={18} />,
//               text: "Overview",
//               onClick: () => handleMenuClick("Overview"),
//             },
//             // { icon: <FileText size={18} />, text: "Sales Summary" },
//             // { icon: <FileText size={18} />, text: "Store Performance" },
//           ]}
//         />

//         <SidebarDropDown
//           icon={<ShoppingCart size={20} />}
//           text="Sales & Transactions"
//           subItems={[
//             // { icon: <CreditCard size={18} />, text: "Create Sale" },
//             // { icon: <FileText size={18} />, text: "Sales History" },
//             // { icon: <FileText size={18} />, text: "Returns & Refunds" },
//             // { icon: <FileText size={18} />, text: "Bills & Receipts" },
//             { icon: <FileText size={18} />, text: "Create Bill" },
//             {
//               icon: <FileText size={18} />,
//               text: "Bill List",
//               onClick: () => handleMenuClick("Add Bill"),
//             },
//             // { icon: <FileText size={18} />, text: "Receipts" },
//             // { icon: <FileText size={18} />, text: "Transactions" },
//             // {
//             //   icon: <FileText size={18} />,
//             //   text: "Orders Management",
//             //   onClick: () => handleMenuClick("Orders Management"),
//             // },
//             // {
//             //   icon: <FileText size={18} />,
//             //   text: "Order Details",
//             //   onClick: () => handleMenuClick("Order Details"),
//             // },
//           ]}
//         />
//         <SidebarDropDown
//           icon={<Users size={20} />}
//           text="Customers & Loyalty"
//           subItems={[
//             {
//               icon: <FileText size={18} />,
//               text: "Add Customer",
//               onClick: () => handleMenuClick("Add Customer"),
//             },
//             {
//               icon: <FileText size={18} />,
//               text: "Customer List",
//               onClick: () => handleMenuClick("Customer List"),
//             },
//             // {
//             //   icon: <FileText size={18} />,
//             //   text: "Customer Transactions",
//             //   onClick: () => handleMenuClick("Customer Transactions"),
//             // },
//             // {
//             //   icon: <FileText size={18} />,
//             //   text: "Loyalty Program",
//             //   onClick: () => handleMenuClick("Loyalty Program"),
//             // },
//           ]}
//         />

//         <SidebarDropDown
//           icon={<Package size={20} />}
//           text="Products & Inventory"
//           subItems={[
//             {
//               icon: <FileText size={18} />,
//               text: "Add Product",
//               onClick: () => handleMenuClick("Add Product"),
//             },
//             {
//               icon: <FileText size={18} />,
//               text: "Product List",
//               onClick: () => handleMenuClick("Product List"),
//             },
//             {
//               icon: <FileText size={18} />,
//               text: "Categories",
//               onClick: () => handleMenuClick("Add Category"),
//             },
//             // { icon: <FileText size={18} />, text: "Promotions & Discounts" },
//             // { icon: <FileText size={18} />, text: "Stock & Inventory" },
//             { icon: <FileText size={18} />, text: "Stock List" },
//             // { icon: <FileText size={18} />, text: "Adjust Inventory" },
//           ]}
//         />

//         {/* <SidebarDropDown
//           icon={<Truck size={20} />}
//           text="Suppliers & Purchases"
//           subItems={[
//             {
//               icon: <FileText size={18} />,
//               text: "Add Supplier",
//               onClick: () => handleMenuClick("Add Supplier"),
//             },
//             { icon: <FileText size={18} />, text: "Supplier List" },
//             { icon: <FileText size={18} />, text: "Supplier Transactions" },
//           ]}
//         /> */}

//         <SidebarDropDown
//           icon={<Briefcase size={20} />}
//           text="Employees & Users"
//           subItems={[
//             { icon: <FileText size={18} />, text: "Add Employee" },
//             { icon: <FileText size={18} />, text: "Employee List" },
//             // { icon: <FileText size={18} />, text: "Salesmen" },
//             // { icon: <FileText size={18} />, text: "Shifts & Attendance" },
//           ]}
//         />

//         {/* <SidebarDropDown
//           icon={<DollarSign size={20} />}
//           text="Expenses & Taxes"
//           subItems={[
//             { icon: <FileText size={18} />, text: "Add Expense" },
//             { icon: <FileText size={18} />, text: "Expense List" },
//             { icon: <FileText size={18} />, text: "Manage Taxes" },
//           ]}
//         />

//         <SidebarDropDown
//           icon={<FileText size={20} />}
//           text="Reports & Logs"
//           subItems={[
//             { icon: <FileText size={18} />, text: "Sales Reports" },
//             { icon: <FileText size={18} />, text: "Inventory Reports" },
//             { icon: <FileText size={18} />, text: "Expense Reports" },
//             { icon: <FileText size={18} />, text: "Tax Reports" },
//             { icon: <FileText size={18} />, text: "Audit Logs" },
//           ]}
//         /> */}

//         <SidebarDropDown
//           icon={<Settings size={20} />}
//           text="Settings & Store Management"
//           subItems={[
//             { icon: <FileText size={18} />, text: "Store Information" },
//             // { icon: <FileText size={18} />, text: "Roles & Permissions" },
//             // { icon: <FileText size={18} />, text: "Notification Settings" },
//           ]}
//         />

//         <SidebarDropDown
//           icon={<Microchip size={20} />}
//           text="Smart Trolly"
//           subItems={[
//             {
//               icon: <FileText size={18} />,
//               text: "Trolly",
//               onClick: () => handleMenuClick("Trolly"),
//             },
//           ]}
//         />
//       </Sidebar>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Navbar - Fixed at the top */}
//         <Navbar />

//         {/* Main Content Area */}
//         <main className="p-6 pt-20  text-white min-h-screen overflow-y-auto">
//           {renderPage()} {/* Dynamically render the selected page */}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default HomePage;
"use client";

import { useSelector } from "react-redux";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  Briefcase,
  FileText,
  Settings,
  MicroscopeIcon as Microchip,
} from "lucide-react";
import { useState, useEffect } from "react";
import Sidebar from "../../components/globalComponent/sidebar/Sidebar";
import SidebarDropDown from "../../components/globalComponent/sidebar/SidebarDropDown";
import Navbar from "../../components/globalComponent/navbar/Navbar";
import AddCustomer from "../customer/AddCustomer";
import AddProduct from "../products/AddProduct";
import AddSupplier from "../supplier/AddSupplier";
import Overview from "../dashboard/Overview";
import ProductList from "../products/ProductList";
import CustomerList from "../customer/CustomerList";
import AddEmployee from "../employee/AddEmployee";
import EmployeeList from "../employee/EmployeeList";
import CreateBill from "../bill/CreateBill";
import BillList from "../bill/BillList";
import CreateCategory from "../category/CreateCategory";
import StoreInformationView from "../store/StoreInformationView";
import OrdersManagement from "../online/OrdersManagement";
import OrderDetails from "../online/OrderDetails";
import StockList from "../stocks/StockList";
import SmartTrolley from "../trolly/SmartTrolly";
import { useTheme } from "../../context/themeContext";

function HomePage() {
  const selectedMenu = useSelector(
    (state) => state.menu?.selectedMenu || "Dashboard"
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme } = useTheme();

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderPage = () => {
    switch (selectedMenu) {
      case "Add Customer":
        return <AddCustomer />;
      case "Add Product":
        return <AddProduct />;
      case "Overview":
        return <Overview />;
      case "Add Supplier":
        return <AddSupplier />;
      case "Product List":
        return <ProductList />;
      case "Customer List":
        return <CustomerList />;
      case "Add Employee":
        return <AddEmployee />;
      case "Employee List":
        return <EmployeeList />;
      case "Create Bill":
        return <CreateBill />;
      case "Bill List":
        return <BillList />;
      case "Categories":
        return <CreateCategory />;
      case "Store Information":
        return <StoreInformationView />;
      case "Orders Management":
        return <OrdersManagement />;
      case "Order Details":
        return <OrderDetails />;
      case "Stock List":
        return <StockList />;
      case "Trolly":
        return <SmartTrolley />;
      default:
        return <Overview />;
    }
  };

  return (
    <div
      className={`flex h-screen ${
        theme === "light" ? "bg-gray-50" : "bg-gray-900"
      } transition-colors duration-200`}
    >
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen}>
        <SidebarDropDown
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          subItems={[
            {
              icon: <FileText size={18} />,
              text: "Overview",
              path: "/",
            },
          ]}
        />

        <SidebarDropDown
          icon={<ShoppingCart size={20} />}
          text="Sales & Transactions"
          subItems={[
            { icon: <FileText size={18} />, text: "Create Bill", path: "/" },
            {
              icon: <FileText size={18} />,
              text: "Bill List",
              path: "/",
            },
          ]}
        />
        <SidebarDropDown
          icon={<Users size={20} />}
          text="Customers & Loyalty"
          subItems={[
            {
              icon: <FileText size={18} />,
              text: "Add Customer",
              path: "/",
            },
            {
              icon: <FileText size={18} />,
              text: "Customer List",
              path: "/",
            },
          ]}
        />

        <SidebarDropDown
          icon={<Package size={20} />}
          text="Products & Inventory"
          subItems={[
            {
              icon: <FileText size={18} />,
              text: "Add Product",
              path: "/",
            },
            {
              icon: <FileText size={18} />,
              text: "Product List",
              path: "/",
            },
            {
              icon: <FileText size={18} />,
              text: "Categories",
              path: "/",
            },
            { icon: <FileText size={18} />, text: "Stock List", path: "/" },
          ]}
        />

        <SidebarDropDown
          icon={<Briefcase size={20} />}
          text="Employees & Users"
          subItems={[
            { icon: <FileText size={18} />, text: "Add Employee", path: "/" },
            { icon: <FileText size={18} />, text: "Employee List", path: "/" },
          ]}
        />

        <SidebarDropDown
          icon={<Settings size={20} />}
          text="Settings & Store Management"
          subItems={[
            {
              icon: <FileText size={18} />,
              text: "Store Information",
              path: "/",
            },
          ]}
        />

        <SidebarDropDown
          icon={<Microchip size={20} />}
          text="Smart Trolly"
          subItems={[
            {
              icon: <FileText size={18} />,
              text: "Trolly",
              path: "/",
            },
          ]}
        />
      </Sidebar>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "ml-20"
        }`}
      >
        {/* Navbar - Fixed at the top */}
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main Content Area */}
        <main
          className={`p-6 pt-20 min-h-screen overflow-y-auto ${
            theme === "light"
              ? "bg-gray-50 text-gray-800"
              : "bg-gray-900 text-white"
          }`}
        >
          {renderPage()} {/* Dynamically render the selected page */}
        </main>
      </div>
    </div>
  );
}

export default HomePage;
