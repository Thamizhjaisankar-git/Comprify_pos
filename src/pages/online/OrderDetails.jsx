// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const OrderDetails = () => {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const currencySymbol = "₹"; // Can be dynamically set

//   useEffect(() => {
//     const fetchOrders = () => {
//       try {
//         // Fetch orders from localStorage
//         const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
//         console.log("Fetched orders from localStorage:", storedOrders); // Debug log
//         setOrders(storedOrders);
//       } catch (error) {
//         console.error("Error fetching orders from localStorage:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="p-6 bg-gray-900 text-white min-h-screen">
//         <h1 className="text-3xl font-bold mb-6">Order Details</h1>
//         <p className="text-lg">Loading order details...</p>
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="p-6 bg-gray-900 text-white min-h-screen">
//         <h1 className="text-3xl font-bold mb-6">Order Details</h1>
//         <p className="text-lg">No orders found.</p>
//         <button
//           onClick={() => navigate("/orders-management")}
//           className="mt-4 bg-blue-500 px-4 py-2 rounded"
//           aria-label="Back to Orders"
//         >
//           Back to Orders
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-900 text-white min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">Order Details</h1>

//       {/* Display All Orders */}
//       {orders.map((order) => (
//         <div key={order.id} className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
//           <h2 className="text-2xl font-semibold mb-4">Order ID: {order.id}</h2>

//           {/* Order Summary */}
//           <div className="mb-4">
//             <p className="text-lg">
//               <strong>Customer Name:</strong> {order.customer_name}
//             </p>
//             <p className="text-lg">
//               <strong>Total Amount:</strong> {currencySymbol}
//               {order.total_amount}
//             </p>
//             <p className="text-lg">
//               <strong>Payment Status:</strong>{" "}
//               <span
//                 className={`px-2 py-1 rounded ${
//                   order.payment_status === "Completed"
//                     ? "bg-green-500"
//                     : order.payment_status === "Pending"
//                     ? "bg-yellow-500"
//                     : "bg-red-500"
//                 }`}
//               >
//                 {order.payment_status}
//               </span>
//             </p>
//           </div>

//           {/* Products List */}
//           <h3 className="text-xl font-semibold mb-2">Products</h3>
//           <div className="bg-gray-700 p-3 rounded-lg">
//             {order.products && order.products.length > 0 ? (
//               <ul>
//                 {order.products.map((product, index) => (
//                   <li key={index} className="border-b border-gray-600 py-2">
//                     <strong>{product.name}</strong> - {currencySymbol}
//                     {product.price} x {product.quantity}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No products found for this order.</p>
//             )}
//           </div>
//         </div>
//       ))}

//       {/* Back Button */}
//       <button
//         onClick={() => navigate("/orders-management")}
//         className="mt-6 bg-blue-500 px-4 py-2 rounded"
//         aria-label="Back to Orders"
//       >
//         Back to Orders
//       </button>
//     </div>
//   );
// };

// export default OrderDetails;
"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Calendar,
  CreditCard,
  User,
  ShoppingBag,
} from "lucide-react";
import { useTheme } from "../../context/themeContext";

const OrderDetails = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currencySymbol = "₹"; // Can be dynamically set
  const { theme } = useTheme();

  useEffect(() => {
    const fetchOrders = () => {
      try {
        // Fetch orders from localStorage
        const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        console.log("Fetched orders from localStorage:", storedOrders); // Debug log
        setOrders(storedOrders);
      } catch (error) {
        console.error("Error fetching orders from localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-6 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Order Details</h1>
          <button
            onClick={() => navigate("/orders-management")}
            className="btn-modern-outline flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </button>
        </div>

        <div className="bg-card rounded-xl shadow p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <Package size={32} className="text-muted-foreground" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2">No Orders Found</h2>
          <p className="text-muted-foreground mb-6">
            There are no orders to display at this time.
          </p>
          <button
            onClick={() => navigate("/orders-management")}
            className="btn-modern"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Order Details</h1>
        <button
          onClick={() => navigate("/orders-management")}
          className="btn-modern-outline flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </button>
      </div>

      {/* Display All Orders */}
      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-card rounded-xl shadow overflow-hidden"
          >
            <div className="p-6 border-b border-border">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Order ID:
                    </span>
                    <span className="font-mono bg-muted px-2 py-1 rounded text-sm">
                      {order.id}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold">{order.customer_name}</h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full">
                    <Calendar size={16} className="text-muted-foreground" />
                    <span className="text-sm">Today</span>
                  </div>

                  <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full">
                    <CreditCard size={16} className="text-muted-foreground" />
                    <span className="text-sm">
                      {currencySymbol}
                      {order.total_amount}
                    </span>
                  </div>

                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                      order.payment_status === "Completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : order.payment_status === "Pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    <span className="text-sm font-medium">
                      {order.payment_status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ShoppingBag size={18} />
                Order Items
              </h3>

              {order.products && order.products.length > 0 ? (
                <div className="space-y-4">
                  {order.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-muted rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                          <Package size={20} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Qty: {product.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {currencySymbol}
                          {product.price}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Total: {currencySymbol}
                          {(product.price * product.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between border-t border-border pt-4 mt-4">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="font-bold text-lg">
                      {currencySymbol}
                      {order.total_amount}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No products found for this order.
                </p>
              )}
            </div>

            <div className="bg-muted/30 p-4 border-t border-border">
              <div className="flex items-center gap-2">
                <User size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Customer: {order.customer_name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
