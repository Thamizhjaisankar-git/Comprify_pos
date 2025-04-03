import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import config from "../../config";
import { p } from "framer-motion/client";

export default function BillPage() {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [activeTab, setActiveTab] = useState("pos");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBills(activeTab);
  }, [activeTab]);

  const fetchBills = async (type) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.serverApi}/pos/bill/store/${type}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBills(response.data.bills || []);
    } catch (error) {
      console.error("Error fetching bills:", error);
      setBills([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Billing History</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Tabs for POS and App Bills */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("pos")}
              className={`px-4 py-2 rounded ${
                activeTab === "pos"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              POS Bills
            </button>
            <button
              onClick={() => setActiveTab("app")}
              className={`px-4 py-2 rounded ${
                activeTab === "app"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              App Bills
            </button>
          </div>

          {/* Bill List */}
          <div className="bg-white shadow rounded-lg p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 text-left">Bill Number</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr key={bill._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-gray-700">{bill.bill_number}</td>
                    <td className="p-3 text-gray-700">
                      {new Date(bill.placed_at).toLocaleDateString()}
                    </td>
                    <td className="p-3 font-semibold text-gray-700">
                      ₹{bill.final_amount.toFixed(2)}
                    </td>
                    <td
                      className={`p-3 font-medium ${
                        bill.payment_status === "paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {bill.payment_status}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => setSelectedBill(bill)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        View Bill
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Dialog for Viewing Bill */}
      <Dialog.Root
        open={!!selectedBill}
        onOpenChange={() => setSelectedBill(null)}
      >
        {selectedBill && (
          <BillModal
            bill={selectedBill}
            setBills={setBills}
            bills={bills}
            tab={activeTab}
          />
        )}
      </Dialog.Root>
    </div>
  );
}

function BillModal({ bill, setBills, bills, tab }) {
  const [orderStatus, setOrderStatus] = useState(bill.order_status);
  const token = localStorage.getItem("token");

  const orderStatusOptions = ["pending", "shipped", "delivered"];

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await axios.put(
        `${config.serverApi}/pos/bill/update-status`,
        { billId: bill._id, newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        // Update Local State
        setOrderStatus(newStatus);

        // Update the bill in the main list (in BillPage)
        setBills((prevBills) =>
          prevBills.map((b) =>
            b._id === bill._id ? { ...b, order_status: newStatus } : b
          )
        );

        alert("Order status updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to update order status.");
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96">
        <Dialog.Title className="text-xl font-bold mb-2">
          Bill Details
        </Dialog.Title>
        <Dialog.Description className="text-gray-600 mb-4">
          Bill Number: {bill.bill_number}
        </Dialog.Description>

        <div className="border-t pt-4">
          <p>
            <strong>Date:</strong>{" "}
            {new Date(bill.placed_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Total:</strong> ₹{bill.final_amount.toFixed(2)}
          </p>
          <p>
            <strong>Status:</strong> {bill.payment_status}
          </p>
          <p>
            <strong>Order Status:</strong> {orderStatus}
          </p>

          {/* Edit Order Status */}
          {tab == "app" && (
            <div className="mt-2">
              <label className="block font-semibold">Edit Order Status:</label>
              <select
                value={orderStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full p-2 mt-1 border rounded"
              >
                {orderStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          )}

          {bill.payment_methods.map((payment, index) => (
            <p key={index}>
              <strong>Method and Cash:</strong> {payment.method} - ₹
              {payment.amount.toFixed(2)}
            </p>
          ))}
        </div>

        {/* Order Items */}
        <h3 className="font-semibold mt-4">Items:</h3>
        <ul className="mt-2 space-y-2">
          {bill.order_items.map((item, index) => (
            <li
              key={index}
              className="flex justify-between bg-gray-100 p-2 rounded"
            >
              <span>
                {item.product.product_name} × {item.quantity}
              </span>
              <span>₹{item.total_price.toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <Dialog.Close className="mt-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
          Close
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
