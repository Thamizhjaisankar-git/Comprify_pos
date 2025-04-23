// import { useState, useEffect } from "react";
// import * as Dialog from "@radix-ui/react-dialog";
// import axios from "axios";
// import config from "../../config";
// import { p } from "framer-motion/client";

// export default function BillPage() {
//   const [bills, setBills] = useState([]);
//   const [selectedBill, setSelectedBill] = useState(null);
//   const [activeTab, setActiveTab] = useState("pos");
//   const token = localStorage.getItem("token");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchBills(activeTab);
//   }, [activeTab]);

//   const fetchBills = async (type) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `${config.serverApi}/pos/bill/store/${type}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setBills(response.data.bills || []);
//     } catch (error) {
//       console.error("Error fetching bills:", error);
//       setBills([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Billing History</h1>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           {/* Tabs for POS and App Bills */}
//           <div className="flex gap-4 mb-6">
//             <button
//               onClick={() => setActiveTab("pos")}
//               className={`px-4 py-2 rounded ${
//                 activeTab === "pos"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-700 text-gray-300"
//               }`}
//             >
//               POS Bills
//             </button>
//             <button
//               onClick={() => setActiveTab("app")}
//               className={`px-4 py-2 rounded ${
//                 activeTab === "app"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-700 text-gray-300"
//               }`}
//             >
//               App Bills
//             </button>
//           </div>

//           {/* Bill List */}
//           <div className="bg-white shadow rounded-lg p-4">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-200 text-gray-700">
//                   <th className="p-3 text-left">Bill Number</th>
//                   <th className="p-3 text-left">Date</th>
//                   <th className="p-3 text-left">Amount</th>
//                   <th className="p-3 text-left">Status</th>
//                   <th className="p-3 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {bills.map((bill) => (
//                   <tr key={bill._id} className="border-b hover:bg-gray-50">
//                     <td className="p-3 text-gray-700">{bill.bill_number}</td>
//                     <td className="p-3 text-gray-700">
//                       {new Date(bill.placed_at).toLocaleDateString()}
//                     </td>
//                     <td className="p-3 font-semibold text-gray-700">
//                       ₹{bill.final_amount.toFixed(2)}
//                     </td>
//                     <td
//                       className={`p-3 font-medium ${
//                         bill.payment_status === "paid"
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {bill.payment_status}
//                     </td>
//                     <td className="p-3">
//                       <button
//                         onClick={() => setSelectedBill(bill)}
//                         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                       >
//                         View Bill
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}

//       {/* Dialog for Viewing Bill */}
//       <Dialog.Root
//         open={!!selectedBill}
//         onOpenChange={() => setSelectedBill(null)}
//       >
//         {selectedBill && (
//           <BillModal
//             bill={selectedBill}
//             setBills={setBills}
//             bills={bills}
//             tab={activeTab}
//           />
//         )}
//       </Dialog.Root>
//     </div>
//   );
// }

// function BillModal({ bill, setBills, bills, tab }) {
//   const [orderStatus, setOrderStatus] = useState(bill.order_status);
//   const token = localStorage.getItem("token");

//   const orderStatusOptions = ["pending", "shipped", "delivered"];

//   const handleStatusChange = async (newStatus) => {
//     try {
//       const response = await axios.put(
//         `${config.serverApi}/pos/bill/update-status`,
//         { billId: bill._id, newStatus },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.status === 200) {
//         // Update Local State
//         setOrderStatus(newStatus);

//         // Update the bill in the main list (in BillPage)
//         setBills((prevBills) =>
//           prevBills.map((b) =>
//             b._id === bill._id ? { ...b, order_status: newStatus } : b
//           )
//         );

//         alert("Order status updated successfully!");
//       }
//     } catch (error) {
//       console.error("Failed to update order status:", error);
//       alert("Failed to update order status.");
//     }
//   };

//   return (
//     <Dialog.Portal>
//       <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
//       <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96">
//         <Dialog.Title className="text-xl font-bold mb-2">
//           Bill Details
//         </Dialog.Title>
//         <Dialog.Description className="text-gray-600 mb-4">
//           Bill Number: {bill.bill_number}
//         </Dialog.Description>

//         <div className="border-t pt-4">
//           <p>
//             <strong>Date:</strong>{" "}
//             {new Date(bill.placed_at).toLocaleDateString()}
//           </p>
//           <p>
//             <strong>Total:</strong> ₹{bill.final_amount.toFixed(2)}
//           </p>
//           <p>
//             <strong>Status:</strong> {bill.payment_status}
//           </p>
//           <p>
//             <strong>Order Status:</strong> {orderStatus}
//           </p>

//           {/* Edit Order Status */}
//           {tab == "app" && (
//             <div className="mt-2">
//               <label className="block font-semibold">Edit Order Status:</label>
//               <select
//                 value={orderStatus}
//                 onChange={(e) => handleStatusChange(e.target.value)}
//                 className="w-full p-2 mt-1 border rounded"
//               >
//                 {orderStatusOptions.map((status) => (
//                   <option key={status} value={status}>
//                     {status}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {bill.payment_methods.map((payment, index) => (
//             <p key={index}>
//               <strong>Method and Cash:</strong> {payment.method} - ₹
//               {payment.amount.toFixed(2)}
//             </p>
//           ))}
//         </div>

//         {/* Order Items */}
//         <h3 className="font-semibold mt-4">Items:</h3>
//         <ul className="mt-2 space-y-2">
//           {bill.order_items.map((item, index) => (
//             <li
//               key={index}
//               className="flex justify-between bg-gray-100 p-2 rounded"
//             >
//               <span>
//                 {item.product.product_name} × {item.quantity}
//               </span>
//               <span>₹{item.total_price.toFixed(2)}</span>
//             </li>
//           ))}
//         </ul>

//         <Dialog.Close className="mt-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
//           Close
//         </Dialog.Close>
//       </Dialog.Content>
//     </Dialog.Portal>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import config from "../../config";
import {
  Receipt,
  Search,
  FileText,
  CreditCard,
  Truck,
  Package,
  Loader2,
  X,
  Calendar,
  ArrowUpDown,
  Smartphone,
} from "lucide-react";
import { useTheme } from "../../context/themeContext";
import { useViewMode } from "../../context/viewContext";

export default function BillPage() {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [activeTab, setActiveTab] = useState("pos");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("placed_at");
  const [sortDirection, setSortDirection] = useState("desc");
  const token = localStorage.getItem("token");
  const { theme } = useTheme();
  const { viewMode, toggleViewMode } = useViewMode();

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

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort bills
  const filteredBills = bills
    .filter((bill) => {
      if (!searchQuery) return true;

      const searchLower = searchQuery.toLowerCase();
      return (
        bill.bill_number.toLowerCase().includes(searchLower) ||
        bill.payment_status.toLowerCase().includes(searchLower) ||
        (bill.order_status &&
          bill.order_status.toLowerCase().includes(searchLower))
      );
    })
    .sort((a, b) => {
      if (sortField === "placed_at") {
        return sortDirection === "asc"
          ? new Date(a.placed_at) - new Date(b.placed_at)
          : new Date(b.placed_at) - new Date(a.placed_at);
      } else if (sortField === "final_amount") {
        return sortDirection === "asc"
          ? a.final_amount - b.final_amount
          : b.final_amount - a.final_amount;
      }
      return 0;
    });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "delivered":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="p-6 min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Billing History</h1>
            <p className="text-muted-foreground mt-1">
              View and manage all your transaction records
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleViewMode}
              className="p-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              aria-label="Toggle view mode"
            >
              {viewMode === "grid" ? (
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                  <span className="hidden sm:inline">List View</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  <span className="hidden sm:inline">Grid View</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Tabs and Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex gap-2 bg-muted/30 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("pos")}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "pos"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              POS Bills
            </button>
            <button
              onClick={() => setActiveTab("app")}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "app"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              App Bills
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bills by number or status..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Bills Display */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading bills...</span>
          </div>
        ) : filteredBills.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredBills.map((bill) => (
                <div
                  key={bill._id}
                  className="bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-4 border-b border-border bg-muted/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{bill.bill_number}</h3>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(bill.placed_at)}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          bill.payment_status
                        )}`}
                      >
                        {bill.payment_status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-muted-foreground">
                        Amount
                      </span>
                      <span className="font-semibold">
                        ₹{bill.final_amount.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-muted-foreground">
                        Items
                      </span>
                      <span>{bill.order_items.length}</span>
                    </div>

                    {activeTab === "app" && bill.order_status && (
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-muted-foreground">
                          Order Status
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            bill.order_status
                          )}`}
                        >
                          {bill.order_status}
                        </span>
                      </div>
                    )}

                    <button
                      onClick={() => setSelectedBill(bill)}
                      className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">
                        <button
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                          onClick={() => handleSort("bill_number")}
                        >
                          Bill Number
                          <ArrowUpDown className="h-3 w-3" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left font-medium">
                        <button
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                          onClick={() => handleSort("placed_at")}
                        >
                          Date
                          <ArrowUpDown className="h-3 w-3" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left font-medium">
                        <button
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                          onClick={() => handleSort("final_amount")}
                        >
                          Amount
                          <ArrowUpDown className="h-3 w-3" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left font-medium">
                        Status
                      </th>
                      {activeTab === "app" && (
                        <th className="px-4 py-3 text-left font-medium">
                          Order Status
                        </th>
                      )}
                      <th className="px-4 py-3 text-right font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBills.map((bill, index) => (
                      <tr
                        key={bill._id}
                        className={`border-t border-border hover:bg-muted/20 transition-colors ${
                          index % 2 === 0 ? "bg-background" : "bg-muted/10"
                        }`}
                      >
                        <td className="px-4 py-3">{bill.bill_number}</td>
                        <td className="px-4 py-3 text-sm">
                          {formatDate(bill.placed_at)}
                        </td>
                        <td className="px-4 py-3 font-medium">
                          ₹{bill.final_amount.toFixed(2)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              bill.payment_status
                            )}`}
                          >
                            {bill.payment_status}
                          </span>
                        </td>
                        {activeTab === "app" && (
                          <td className="px-4 py-3">
                            {bill.order_status && (
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                  bill.order_status
                                )}`}
                              >
                                {bill.order_status}
                              </span>
                            )}
                          </td>
                        )}
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => setSelectedBill(bill)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 transition-colors"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        ) : (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Receipt className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No bills found</h3>
            <p className="text-muted-foreground mt-1">
              {searchQuery
                ? "Try a different search term"
                : `No ${activeTab} bills available yet`}
            </p>
          </div>
        )}
      </div>

      {/* Bill Details Modal */}
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
  const [isUpdating, setIsUpdating] = useState(false);
  const token = localStorage.getItem("token");
  const { theme } = useTheme();

  const orderStatusOptions = ["pending", "shipped", "delivered"];

  const handleStatusChange = async (newStatus) => {
    try {
      setIsUpdating(true);
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

        // Update the bill in the main list
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
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "delivered":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card text-card-foreground p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto z-50 m-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Dialog.Title className="text-xl font-bold">
              Bill Details
            </Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground">
              Bill Number: {bill.bill_number}
            </Dialog.Description>
          </div>
          <Dialog.Close className="rounded-full p-1.5 text-muted-foreground hover:bg-muted transition-colors">
            <X className="h-4 w-4" />
          </Dialog.Close>
        </div>

        <div className="space-y-4">
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{formatDate(bill.placed_at)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="font-medium">₹{bill.final_amount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Status</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    bill.payment_status
                  )}`}
                >
                  {bill.payment_status}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Order Status</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    orderStatus
                  )}`}
                >
                  {orderStatus || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-sm font-medium mb-2">Payment Methods</h3>
            <div className="space-y-2">
              {bill.payment_methods.map((payment, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-muted/20 p-3 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    {payment.method === "cash" ? (
                      <Banknote className="h-4 w-4 text-muted-foreground" />
                    ) : payment.method === "card" ? (
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="capitalize">{payment.method}</span>
                  </div>
                  <span className="font-medium">
                    ₹{payment.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Edit Order Status */}
          {tab === "app" && (
            <div>
              <h3 className="text-sm font-medium mb-2">Update Order Status</h3>
              <div className="flex gap-2">
                <select
                  value={orderStatus || ""}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" disabled>
                    Select status
                  </option>
                  {orderStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleStatusChange(orderStatus)}
                  disabled={isUpdating || orderStatus === bill.order_status}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Truck className="h-4 w-4" />
                  )}
                  Update
                </button>
              </div>
            </div>
          )}

          {/* Order Items */}
          <div>
            <h3 className="text-sm font-medium mb-2">Order Items</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {bill.order_items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-muted/20 p-3 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-muted rounded-md flex items-center justify-center">
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {item.product.product_name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">
                    ₹{item.total_price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Dialog.Close className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-md transition-colors">
            Close
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

function Banknote(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}
