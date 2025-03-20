import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currencySymbol = "₹"; // Can be dynamically set

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
      <div className="p-6 bg-gray-900 text-white min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Order Details</h1>
        <p className="text-lg">Loading order details...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-6 bg-gray-900 text-white min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Order Details</h1>
        <p className="text-lg">No orders found.</p>
        <button
          onClick={() => navigate("/orders-management")}
          className="mt-4 bg-blue-500 px-4 py-2 rounded"
          aria-label="Back to Orders"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      {/* Display All Orders */}
      {orders.map((order) => (
        <div key={order.id} className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Order ID: {order.id}</h2>

          {/* Order Summary */}
          <div className="mb-4">
            <p className="text-lg">
              <strong>Customer Name:</strong> {order.customer_name}
            </p>
            <p className="text-lg">
              <strong>Total Amount:</strong> {currencySymbol}
              {order.total_amount}
            </p>
            <p className="text-lg">
              <strong>Payment Status:</strong>{" "}
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
            </p>
          </div>

          {/* Products List */}
          <h3 className="text-xl font-semibold mb-2">Products</h3>
          <div className="bg-gray-700 p-3 rounded-lg">
            {order.products && order.products.length > 0 ? (
              <ul>
                {order.products.map((product, index) => (
                  <li key={index} className="border-b border-gray-600 py-2">
                    <strong>{product.name}</strong> - {currencySymbol}
                    {product.price} x {product.quantity}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products found for this order.</p>
            )}
          </div>
        </div>
      ))}

      {/* Back Button */}
      <button
        onClick={() => navigate("/orders-management")}
        className="mt-6 bg-blue-500 px-4 py-2 rounded"
        aria-label="Back to Orders"
      >
        Back to Orders
      </button>
    </div>
  );
};

export default OrderDetails;