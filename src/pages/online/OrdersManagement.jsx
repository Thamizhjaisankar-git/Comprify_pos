// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const dummyOrders = [
//   {
//     id: "ORD001",
//     customer_name: "John Doe",
//     total_amount: 2500,
//     payment_status: "Completed",
//     products: [
//       { name: "Laptop", price: 2000, quantity: 1 },
//       { name: "Mouse", price: 500, quantity: 1 }
//     ]
//   },
//   {
//     id: "ORD002",
//     customer_name: "Alice Smith",
//     total_amount: 1800,
//     payment_status: "Pending",
//     products: [
//       { name: "Keyboard", price: 800, quantity: 1 },
//       { name: "Monitor", price: 1000, quantity: 1 }
//     ]
//   },
//   {
//     id: "ORD003",
//     customer_name: "Michael Johnson",
//     total_amount: 3200,
//     payment_status: "Failed",
//     products: [
//       { name: "Smartphone", price: 3200, quantity: 1 }
//     ]
//   }
// ];

// const OrdersManagement = () => {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const currencySymbol = "₹"; // Can be dynamically set

//   // Load orders from local storage
//   useEffect(() => {
//     try {
//       const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
//       if (storedOrders.length === 0) {
//         localStorage.setItem("orders", JSON.stringify(dummyOrders));
//         setOrders(dummyOrders);
//       } else {
//         setOrders(storedOrders);
//       }
//     } catch (error) {
//       console.error("Error parsing orders from localStorage:", error);
//       localStorage.setItem("orders", JSON.stringify(dummyOrders));
//       setOrders(dummyOrders);
//     }
//   }, []);

//   const handleViewOrder = (orderId) => {
//     localStorage.setItem("ordersManagement_selectedOrder", orderId);
//     navigate("/order-details");
//   };

//   return (
//     <div className="p-6 bg-gray-900 text-white min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">Orders Management</h1>

//       {orders.length === 0 ? (
//         <p className="text-center text-lg">No Orders Found.</p>
//       ) : (
//         <div className="bg-gray-800 p-4 rounded-lg shadow-md">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-gray-700">
//                 <th className="p-2">Order ID</th>
//                 <th className="p-2">Customer</th>
//                 <th className="p-2">Total</th>
//                 <th className="p-2">Status</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order.id} className="border-b border-gray-700">
//                   <td className="p-2">{order.id}</td>
//                   <td className="p-2">{order.customer_name}</td>
//                   <td className="p-2">{currencySymbol}{order.total_amount}</td>
//                   <td className="p-2">
//                     <span
//                       className={`px-2 py-1 rounded ${
//                         order.payment_status === "Completed"
//                           ? "bg-green-500"
//                           : order.payment_status === "Pending"
//                           ? "bg-yellow-500"
//                           : "bg-red-500"
//                       }`}
//                     >
//                       {order.payment_status}
//                     </span>
//                   </td>
//                   <td className="p-2">
//                     <button
//                       onClick={() => handleViewOrder(order.id)}
//                       className="bg-blue-500 px-3 py-1 rounded"
//                       aria-label={`View order ${order.id}`}
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrdersManagement;
"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Eye,
  Package,
  ArrowUpDown,
  CreditCard,
} from "lucide-react";
import { useViewMode } from "../../context/viewContext";
import { useTheme } from "../../context/themeContext";

const dummyOrders = [
  {
    id: "ORD001",
    customer_name: "John Doe",
    total_amount: 2500,
    payment_status: "Completed",
    products: [
      { name: "Laptop", price: 2000, quantity: 1 },
      { name: "Mouse", price: 500, quantity: 1 },
    ],
  },
  {
    id: "ORD002",
    customer_name: "Alice Smith",
    total_amount: 1800,
    payment_status: "Pending",
    products: [
      { name: "Keyboard", price: 800, quantity: 1 },
      { name: "Monitor", price: 1000, quantity: 1 },
    ],
  },
  {
    id: "ORD003",
    customer_name: "Michael Johnson",
    total_amount: 3200,
    payment_status: "Failed",
    products: [{ name: "Smartphone", price: 3200, quantity: 1 }],
  },
];

const OrdersManagement = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [isLoading, setIsLoading] = useState(true);
  const currencySymbol = "₹";
  const { viewMode, toggleViewMode } = useViewMode();
  const { theme } = useTheme();

  // Load orders from local storage
  useEffect(() => {
    setIsLoading(true);
    try {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      if (storedOrders.length === 0) {
        localStorage.setItem("orders", JSON.stringify(dummyOrders));
        setOrders(dummyOrders);
        setFilteredOrders(dummyOrders);
      } else {
        setOrders(storedOrders);
        setFilteredOrders(storedOrders);
      }
    } catch (error) {
      console.error("Error parsing orders from localStorage:", error);
      localStorage.setItem("orders", JSON.stringify(dummyOrders));
      setOrders(dummyOrders);
      setFilteredOrders(dummyOrders);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter orders based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.payment_status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  // Handle sorting
  const requestSort = (key) => {
    let direction = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });

    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setFilteredOrders(sortedOrders);
  };

  const handleViewOrder = (orderId) => {
    localStorage.setItem("ordersManagement_selectedOrder", orderId);
    navigate("/order-details");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Orders Management</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-modern pl-10 pr-4 py-2 w-full md:w-64"
            />
          </div>

          {/* View Toggle */}
          <button
            onClick={toggleViewMode}
            className="btn-modern-outline flex items-center gap-2"
          >
            {viewMode === "grid" ? (
              <>
                <Filter size={18} />
                <span>List View</span>
              </>
            ) : (
              <>
                <Filter size={18} />
                <span>Grid View</span>
              </>
            )}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-card rounded-xl shadow p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <Package size={32} className="text-muted-foreground" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2">No Orders Found</h2>
          <p className="text-muted-foreground">
            There are no orders matching your search criteria.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid-view">
          {filteredOrders.map((order) => (
            <div key={order.id} className="modern-card">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
                      order.payment_status
                    )}`}
                  >
                    {order.payment_status}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-muted-foreground">
                      Order ID:
                    </span>
                    <span className="font-mono bg-muted px-2 py-0.5 rounded text-xs">
                      {order.id}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">
                    {order.customer_name}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <CreditCard className="h-4 w-4" />
                  <span className="font-semibold">
                    {currencySymbol}
                    {order.total_amount}
                  </span>
                </div>

                <button
                  onClick={() => handleViewOrder(order.id)}
                  className="btn-modern w-full flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  View Order
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table-modern">
              <thead>
                <tr>
                  <th
                    onClick={() => requestSort("id")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-1">
                      Order ID
                      <ArrowUpDown size={14} />
                    </div>
                  </th>
                  <th
                    onClick={() => requestSort("customer_name")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-1">
                      Customer
                      <ArrowUpDown size={14} />
                    </div>
                  </th>
                  <th
                    onClick={() => requestSort("total_amount")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-1">
                      Total
                      <ArrowUpDown size={14} />
                    </div>
                  </th>
                  <th
                    onClick={() => requestSort("payment_status")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-1">
                      Status
                      <ArrowUpDown size={14} />
                    </div>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <span className="font-mono bg-muted px-2 py-0.5 rounded text-xs">
                        {order.id}
                      </span>
                    </td>
                    <td>{order.customer_name}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <CreditCard
                          size={14}
                          className="text-muted-foreground"
                        />
                        {currencySymbol}
                        {order.total_amount}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.payment_status
                        )}`}
                      >
                        {order.payment_status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleViewOrder(order.id)}
                        className="btn-modern py-1 px-3 text-sm flex items-center gap-1"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;
