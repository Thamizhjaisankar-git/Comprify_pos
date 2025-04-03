import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";

const CustomerList = () => {
  const [customers, setCustomers] = useState({
    pos: [],
    online: [],
    smart: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("pos"); // Default tab: POS Customers
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${config.serverApi}/pos/store/users`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCustomers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const currentCustomers = customers[activeTab];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Customer List</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {["pos", "online", "smart"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {tab === "pos"
              ? "POS Customers"
              : tab === "online"
              ? "Online Customers"
              : "Smart Trolley Customers"}
          </button>
        ))}
      </div>

      {/* Loader */}
      {loading && <p className="text-gray-300">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Customer Table */}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-white border border-gray-700 rounded-lg">
            <thead className="bg-gray-900">
              <tr>
                <th className="py-3 px-6 text-left border-b border-gray-700">
                  S.No
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-700">
                  Name
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-700">
                  Email
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-700">
                  Phone Number
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-700">
                  No. of Purchases
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.length > 0 ? (
                currentCustomers.map((customer, index) => (
                  <tr
                    key={customer._id}
                    className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}
                  >
                    <td className="py-3 px-6 border-b border-gray-700">
                      {index + 1}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-700">
                      {customer.name}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-700">
                      {customer.email || "Not Available"}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-700">
                      {customer.phone_number || "Not Available"}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-700">
                      {customer.no_of_purchases}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-700">
                      <button
                        onClick={() => setShowModal(true)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-3 px-6 text-center text-gray-400"
                  >
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg text-white">
            <h2 className="text-xl font-bold">Feature Coming Soon!</h2>
            <p className="mt-2">We are working on adding more details.</p>
            <button
              className="mt-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
