import React, { useState, useEffect } from "react";

const BillList = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);

  // Load bills from local storage when the component mounts
  useEffect(() => {
    const savedBills = JSON.parse(localStorage.getItem("bills")) || [];
    setBills(savedBills);
  }, []);

  const handleViewBill = (bill) => {
    setSelectedBill(bill);
  };

  const closeModal = () => {
    setSelectedBill(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDeleteBill = (billNumber) => {
    const updatedBills = bills.filter((bill) => bill.billNumber !== billNumber);
    setBills(updatedBills);
    localStorage.setItem("bills", JSON.stringify(updatedBills));
    alert("Bill deleted successfully!");
  };

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Bill History</h1>

      {bills.length === 0 ? (
        <p className="text-gray-400">No bills generated yet.</p>
      ) : (
        <table className="w-full bg-gray-800 rounded-lg text-center">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3">Bill Number</th>
              <th className="p-3">Customer Name</th>
              <th className="p-3">Phone Number</th>
              <th className="p-3">Total Amount (₹)</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="p-3">{bill.billNumber}</td>
                <td className="p-3">{bill.customerName}</td>
                <td className="p-3">{bill.phoneNumber}</td>
                <td className="p-3">₹{bill.totalAmount.toFixed(2)}</td>
                <td className="p-3">{bill.date}</td>
                <td className="p-3 flex gap-4 justify-center">
                  <button
                    onClick={() => handleViewBill(bill)}
                    className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteBill(bill.billNumber)}
                    className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for Viewing Bill */}
      {selectedBill && (
        <div className="modal-overlay">
    <div className="modal-content">
            <h2 className="text-2xl font-bold mb-4">Bill Invoice</h2>

            <p>
              <strong>Bill Number:</strong> {selectedBill.billNumber}
            </p>
            <p>
              <strong>Customer Name:</strong> {selectedBill.customerName}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedBill.phoneNumber}
            </p>
            <p>
              <strong>Date:</strong> {selectedBill.date}
            </p>

            {/* Product List */}
            <h3 className="text-xl font-semibold mt-4 mb-2">Products:</h3>
            <table className="w-full mt-4 border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2">Product ID</th>
                  <th className="p-2">Product Name</th>
                  <th className="p-2">Price (₹)</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Total (₹)</th>
                </tr>
              </thead>
              <tbody>
                {selectedBill?.cart?.map((product, index) => (
                  <tr key={index} className="text-center border-b border-gray-700">
                    <td className="p-2">{product.productId}</td>
                    <td className="p-2">{product.productName}</td>
                    <td className="p-2">₹{product.price.toFixed(2)}</td>
                    <td className="p-2">{product.quantity}</td>
                    <td className="p-2">₹{product.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="text-right font-semibold text-lg mt-2">
              Grand Total: ₹{selectedBill.totalAmount.toFixed(2)}
            </p>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handlePrint}
                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
              >
                Print Bill
              </button>
              <button
                onClick={closeModal}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillList;
