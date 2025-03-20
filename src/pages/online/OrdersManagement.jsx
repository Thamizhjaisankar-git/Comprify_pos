import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyOrders = [
  {
    id: "ORD001",
    customer_name: "John Doe",
    total_amount: 2500,
    payment_status: "Completed",
    products: [
      { name: "Laptop", price: 2000, quantity: 1 },
      { name: "Mouse", price: 500, quantity: 1 }
    ]
  },
  {
    id: "ORD002",
    customer_name: "Alice Smith",
    total_amount: 1800,
    payment_status: "Pending",
    products: [
      { name: "Keyboard", price: 800, quantity: 1 },
      { name: "Monitor", price: 1000, quantity: 1 }
    ]
  },
  {
    id: "ORD003",
    customer_name: "Michael Johnson",
    total_amount: 3200,
    payment_status: "Failed",
    products: [
      { name: "Smartphone", price: 3200, quantity: 1 }
    ]
  }
];

const OrdersManagement = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const currencySymbol = "₹"; // Can be dynamically set

  // Load orders from local storage
  useEffect(() => {
    try {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      if (storedOrders.length === 0) {
        localStorage.setItem("orders", JSON.stringify(dummyOrders));
        setOrders(dummyOrders);
      } else {
        setOrders(storedOrders);
      }
    } catch (error) {
      console.error("Error parsing orders from localStorage:", error);
      localStorage.setItem("orders", JSON.stringify(dummyOrders));
      setOrders(dummyOrders);
    }
  }, []);

  const handleViewOrder = (orderId) => {
    localStorage.setItem("ordersManagement_selectedOrder", orderId);
    navigate("/order-details");
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Orders Management</h1>

      {orders.length === 0 ? (
        <p className="text-center text-lg">No Orders Found.</p>
      ) : (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-2">Order ID</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Total</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-700">
                  <td className="p-2">{order.id}</td>
                  <td className="p-2">{order.customer_name}</td>
                  <td className="p-2">{currencySymbol}{order.total_amount}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded ${
                        order.payment_status === "Completed"
                          ? "bg-green-500"
                          : order.payment_status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order.payment_status}
                    </span>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleViewOrder(order.id)}
                      className="bg-blue-500 px-3 py-1 rounded"
                      aria-label={`View order ${order.id}`}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;