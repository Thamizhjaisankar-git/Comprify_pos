// // // import React, { useState, useEffect } from "react";

// // // const BillList = () => {
// // //   const [bills, setBills] = useState([]);
// // //   const [selectedBill, setSelectedBill] = useState(null);

// // //   // Load bills from local storage when the component mounts
// // //   useEffect(() => {
// // //     const savedBills = JSON.parse(localStorage.getItem("bills")) || [];
// // //     setBills(savedBills);
// // //   }, []);

// // //   const handleViewBill = (bill) => {
// // //     setSelectedBill(bill);
// // //   };

// // //   const closeModal = () => {
// // //     setSelectedBill(null);
// // //   };

// // //   const handlePrint = () => {
// // //     window.print();
// // //   };

// // //   const handleDeleteBill = (billNumber) => {
// // //     const updatedBills = bills.filter((bill) => bill.billNumber !== billNumber);
// // //     setBills(updatedBills);
// // //     localStorage.setItem("bills", JSON.stringify(updatedBills));
// // //     alert("Bill deleted successfully!");
// // //   };

// // //   return (
// // //     <div className="p-8 min-h-screen bg-gray-900 text-white">
// // //       <h1 className="text-3xl font-bold mb-6">Bill History</h1>

// // //       {bills.length === 0 ? (
// // //         <p className="text-gray-400">No bills generated yet.</p>
// // //       ) : (
// // //         <table className="w-full bg-gray-800 rounded-lg text-center">
// // //           <thead>
// // //             <tr className="bg-gray-700">
// // //               <th className="p-3">Bill Number</th>
// // //               <th className="p-3">Customer Name</th>
// // //               <th className="p-3">Phone Number</th>
// // //               <th className="p-3">Total Amount (₹)</th>
// // //               <th className="p-3">Date & Time</th>
// // //               <th className="p-3">Actions</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {bills.map((bill, index) => (
// // //               <tr key={index} className="border-b border-gray-700">
// // //                 <td className="p-3">{bill.billNumber}</td>
// // //                 <td className="p-3">{bill.customerName}</td>
// // //                 <td className="p-3">{bill.phoneNumber}</td>
// // //                 <td className="p-3">₹{bill.totalAmount.toFixed(2)}</td>
// // //                 <td className="p-3">{bill.date}</td>
// // //                 <td className="p-3 flex gap-4 justify-center">
// // //                   <button
// // //                     onClick={() => handleViewBill(bill)}
// // //                     className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700"
// // //                   >
// // //                     View
// // //                   </button>
// // //                   <button
// // //                     onClick={() => handleDeleteBill(bill.billNumber)}
// // //                     className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
// // //                   >
// // //                     Delete
// // //                   </button>
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       )}

// // //       {/* Modal for Viewing Bill */}
// // //       {selectedBill && (
// // //         <div className="modal-overlay">
// // //     <div className="modal-content">
// // //             <h2 className="text-2xl font-bold mb-4">Bill Invoice</h2>

// // //             <p>
// // //               <strong>Bill Number:</strong> {selectedBill.billNumber}
// // //             </p>
// // //             <p>
// // //               <strong>Customer Name:</strong> {selectedBill.customerName}
// // //             </p>
// // //             <p>
// // //               <strong>Phone Number:</strong> {selectedBill.phoneNumber}
// // //             </p>
// // //             <p>
// // //               <strong>Date:</strong> {selectedBill.date}
// // //             </p>

// // //             {/* Product List */}
// // //             <h3 className="text-xl font-semibold mt-4 mb-2">Products:</h3>
// // //             <table className="w-full mt-4 border-collapse border border-gray-700">
// // //               <thead>
// // //                 <tr className="bg-gray-800">
// // //                   <th className="p-2">Product ID</th>
// // //                   <th className="p-2">Product Name</th>
// // //                   <th className="p-2">Price (₹)</th>
// // //                   <th className="p-2">Quantity</th>
// // //                   <th className="p-2">Total (₹)</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {selectedBill?.cart?.map((product, index) => (
// // //                   <tr key={index} className="text-center border-b border-gray-700">
// // //                     <td className="p-2">{product.productId}</td>
// // //                     <td className="p-2">{product.productName}</td>
// // //                     <td className="p-2">₹{product.price.toFixed(2)}</td>
// // //                     <td className="p-2">{product.quantity}</td>
// // //                     <td className="p-2">₹{product.total.toFixed(2)}</td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>

// // //             <p className="text-right font-semibold text-lg mt-2">
// // //               Grand Total: ₹{selectedBill.totalAmount.toFixed(2)}
// // //             </p>

// // //             <div className="flex justify-end gap-4 mt-6">
// // //               <button
// // //                 onClick={handlePrint}
// // //                 className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
// // //               >
// // //                 Print Bill
// // //               </button>
// // //               <button
// // //                 onClick={closeModal}
// // //                 className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
// // //               >
// // //                 Close
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default BillList;
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import config from "../../config";

// // const BillList = () => {
// //   const [bills, setBills] = useState([]);
// //   const [selectedBill, setSelectedBill] = useState(null);
// //   const [activeTab, setActiveTab] = useState("pos"); // 'pos' or 'app'
// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     fetchBills(activeTab);
// //   }, [activeTab]);

// //   const fetchBills = async (type) => {
// //     try {
// //       const response = await axios.get(
// //         `${config.serverApi}/pos/bill/store/${type}`,
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );
// //       setBills(response.data.bills || []);
// //     } catch (error) {
// //       console.error("Error fetching bills:", error);
// //       setBills([]);
// //     }
// //   };

// //   const handleViewBill = (bill) => {
// //     setSelectedBill(bill);
// //   };

// //   const closeModal = () => {
// //     setSelectedBill(null);
// //   };

// //   const handlePrint = () => {
// //     window.print();
// //   };

// //   const handleDeleteBill = (billNumber) => {
// //     const updatedBills = bills.filter((bill) => bill.billNumber !== billNumber);
// //     setBills(updatedBills);
// //     alert("Bill deleted successfully!");
// //   };

// //   return (
// //     <>
// //       <div className="flex gap-4 mb-6">
// //         <button
// //           onClick={() => setActiveTab("pos")}
// //           className={`px-4 py-2 rounded ${
// //             activeTab === "pos" ? "bg-blue-600" : "bg-gray-700"
// //           }`}
// //         >
// //           POS Bills
// //         </button>
// //         <button
// //           onClick={() => setActiveTab("app")}
// //           className={`px-4 py-2 rounded ${
// //             activeTab === "app" ? "bg-blue-600" : "bg-gray-700"
// //           }`}
// //         >
// //           App Bills
// //         </button>
// //       </div>
// //     </>
// //     // <div className="p-8 min-h-screen bg-gray-900 text-white">
// //     //   <h1 className="text-3xl font-bold mb-6">Bill History</h1>

// //     //   {/* Tabs for POS & App Bills */}
// //     //   <div className="flex gap-4 mb-6">
// //     //     <button
// //     //       onClick={() => setActiveTab("pos")}
// //     //       className={`px-4 py-2 rounded ${
// //     //         activeTab === "pos" ? "bg-blue-600" : "bg-gray-700"
// //     //       }`}
// //     //     >
// //     //       POS Bills
// //     //     </button>
// //     //     <button
// //     //       onClick={() => setActiveTab("app")}
// //     //       className={`px-4 py-2 rounded ${
// //     //         activeTab === "app" ? "bg-blue-600" : "bg-gray-700"
// //     //       }`}
// //     //     >
// //     //       App Bills
// //     //     </button>
// //     //   </div>

// //     //   {bills.length === 0 ? (
// //     //     <p className="text-gray-400">No bills found.</p>
// //     //   ) : (
// //     //     <table className="w-full bg-gray-800 rounded-lg text-center">
// //     //       <thead>
// //     //         <tr className="bg-gray-700">
// //     //           <th className="p-3">Bill Number</th>
// //     //           <th className="p-3">Customer Name</th>
// //     //           <th className="p-3">Phone Number</th>
// //     //           <th className="p-3">Total Amount (₹)</th>
// //     //           <th className="p-3">Date & Time</th>
// //     //           <th className="p-3">Actions</th>
// //     //         </tr>
// //     //       </thead>
// //     //       <tbody>
// //     //         {bills.map((bill, index) => (
// //     //           <tr key={index} className="border-b border-gray-700">
// //     //             <td className="p-3">{bill.billNumber}</td>
// //     //             <td className="p-3">{bill.customerName}</td>
// //     //             <td className="p-3">{bill.phoneNumber}</td>
// //     //             <td className="p-3">₹{bill.totalAmount.toFixed(2)}</td>
// //     //             <td className="p-3">{bill.date}</td>
// //     //             <td className="p-3 flex gap-4 justify-center">
// //     //               <button
// //     //                 onClick={() => handleViewBill(bill)}
// //     //                 className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700"
// //     //               >
// //     //                 View
// //     //               </button>
// //     //               <button
// //     //                 onClick={() => handleDeleteBill(bill.billNumber)}
// //     //                 className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
// //     //               >
// //     //                 Delete
// //     //               </button>
// //     //             </td>
// //     //           </tr>
// //     //         ))}
// //     //       </tbody>
// //     //     </table>
// //     //   )}

// //     //   {/* Modal for Viewing Bill */}
// //     //   {selectedBill && (
// //     //     <div className="modal-overlay">
// //     //       <div className="modal-content">
// //     //         <h2 className="text-2xl font-bold mb-4">Bill Invoice</h2>

// //     //         <p>
// //     //           <strong>Bill Number:</strong> {selectedBill.billNumber}
// //     //         </p>
// //     //         <p>
// //     //           <strong>Customer Name:</strong> {selectedBill.customerName}
// //     //         </p>
// //     //         <p>
// //     //           <strong>Phone Number:</strong> {selectedBill.phoneNumber}
// //     //         </p>
// //     //         <p>
// //     //           <strong>Date:</strong> {selectedBill.date}
// //     //         </p>

// //     //         {/* Product List */}
// //     //         <h3 className="text-xl font-semibold mt-4 mb-2">Products:</h3>
// //     //         <table className="w-full mt-4 border-collapse border border-gray-700">
// //     //           <thead>
// //     //             <tr className="bg-gray-800">
// //     //               <th className="p-2">Product ID</th>
// //     //               <th className="p-2">Product Name</th>
// //     //               <th className="p-2">Price (₹)</th>
// //     //               <th className="p-2">Quantity</th>
// //     //               <th className="p-2">Total (₹)</th>
// //     //             </tr>
// //     //           </thead>
// //     //           <tbody>
// //     //             {selectedBill?.cart?.map((product, index) => (
// //     //               <tr
// //     //                 key={index}
// //     //                 className="text-center border-b border-gray-700"
// //     //               >
// //     //                 <td className="p-2">{product.productId}</td>
// //     //                 <td className="p-2">{product.productName}</td>
// //     //                 <td className="p-2">₹{product.price.toFixed(2)}</td>
// //     //                 <td className="p-2">{product.quantity}</td>
// //     //                 <td className="p-2">₹{product.total.toFixed(2)}</td>
// //     //               </tr>
// //     //             ))}
// //     //           </tbody>
// //     //         </table>

// //     //         <p className="text-right font-semibold text-lg mt-2">
// //     //           Grand Total: ₹{selectedBill.totalAmount.toFixed(2)}
// //     //         </p>

// //     //         <div className="flex justify-end gap-4 mt-6">
// //     //           <button
// //     //             onClick={handlePrint}
// //     //             className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
// //     //           >
// //     //             Print Bill
// //     //           </button>
// //     //           <button
// //     //             onClick={closeModal}
// //     //             className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
// //     //           >
// //     //             Close
// //     //           </button>
// //     //         </div>
// //     //       </div>
// //     //     </div>
// //     //   )}
// //     // </div>
// //   );
// // };

// custom componenet

// // export default BillList;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import config from "../../config";

// const BillList = () => {
//   const [bills, setBills] = useState([]);
//   const [selectedBill, setSelectedBill] = useState(null);
//   const [activeTab, setActiveTab] = useState("pos"); // 'pos' or 'app'
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchBills(activeTab);
//   }, [activeTab]);

//   const fetchBills = async (type) => {
//     try {
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
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       {/* Tab Switching */}
//       <div className="flex gap-4 mb-6">
//         <button
//           onClick={() => setActiveTab("pos")}
//           className={`px-4 py-2 rounded ${
//             activeTab === "pos" ? "bg-blue-600" : "bg-gray-700"
//           }`}
//         >
//           POS Bills
//         </button>
//         <button
//           onClick={() => setActiveTab("app")}
//           className={`px-4 py-2 rounded ${
//             activeTab === "app" ? "bg-blue-600" : "bg-gray-700"
//           }`}
//         >
//           App Bills
//         </button>
//       </div>

//       {/* Bill List */}
//       <div className="bg-white shadow-md rounded-lg p-4">
//         <h2 className="text-lg font-semibold mb-3">
//           {activeTab.toUpperCase()} Bills
//         </h2>
//         {bills.length === 0 ? (
//           <p className="text-gray-500">No bills found.</p>
//         ) : (
//           <ul className="divide-y divide-gray-200">
//             {bills.map((bill) => (
//               <li key={bill._id} className="flex justify-between py-3">
//                 <span className="text-gray-700 font-medium">
//                   {bill.bill_number}
//                 </span>
//                 <button
//                   onClick={() => setSelectedBill(bill)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded"
//                 >
//                   View
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Custom Modal */}
//       {selectedBill && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
//             <h3 className="text-xl font-semibold">Bill Details</h3>
//             <p className="text-gray-700 mt-2">
//               Bill Number: {selectedBill.bill_number}
//             </p>
//             <p className="text-gray-700">
//               Total Amount: ${selectedBill.total_amount}
//             </p>
//             <p className="text-gray-700">
//               Payment Status: {selectedBill.payment_status}
//             </p>

//             <h4 className="font-semibold mt-4">Order Items:</h4>
//             <ul className="mt-2 text-gray-600">
//               {selectedBill.order_items.map((item) => (
//                 <li key={item._id} className="border-b py-2">
//                   {item.product.product_name} - {item.quantity} x $
//                   {item.price_at_purchase}
//                 </li>
//               ))}
//             </ul>

//             <button
//               onClick={() => setSelectedBill(null)}
//               className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BillList;

// this is good above one

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import config from "../../config";

export default function BillPage() {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [activeTab, setActiveTab] = useState("pos");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBills(activeTab);
  }, [activeTab]);

  const fetchBills = async (type) => {
    try {
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
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Billing History</h1>

      {/* Tabs for POS and App Bills */}
      <div className="flex gap-4 mb-6 ">
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
                  ${bill.final_amount.toFixed(2)}
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
                  <Dialog.Root>
                    <Dialog.Trigger
                      onClick={() => setSelectedBill(bill)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      View Bill
                    </Dialog.Trigger>
                    {selectedBill && <BillModal bill={selectedBill} />}
                  </Dialog.Root>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Bill Modal Component
function BillModal({ bill }) {
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
            <strong>Total:</strong> ${bill.final_amount.toFixed(2)}
          </p>
          <p>
            <strong>Status:</strong> {bill.payment_status}
          </p>
          <p>
            <strong>Order Status:</strong> {bill.order_status}
          </p>
          {bill.payment_methods.map((payment, index) => (
            <p key={index}>
              <strong>Method and Cash:</strong> {payment.method} - $
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
              <span>${item.total_price.toFixed(2)}</span>
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
