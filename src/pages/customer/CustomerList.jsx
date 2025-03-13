import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      const token = localStorage.getItem("token"); // ✅ Get token from localStorage

      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${config.serverApi}/pos/customer`, {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Send token in headers
        });

        console.log(response.data.data);

        setCustomers(response.data.data); // ✅ Store response data in state
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Customer List</h1>

      {loading && <p className="text-gray-300">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-white border border-gray-700 rounded-lg">
            <thead className="bg-gray-900">
              <tr>
                <th className="py-3 px-6 text-left border-b border-gray-700">S.No</th>
                <th className="py-3 px-6 text-left border-b border-gray-700">Customer Name</th>
                <th className="py-3 px-6 text-left border-b border-gray-700">Phone Number</th>
                <th className="py-3 px-6 text-left border-b border-gray-700">Email</th>
                <th className="py-3 px-6 text-left border-b border-gray-700">Address</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={customer.id} className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}>
                  <td className="py-3 px-6 border-b border-gray-700">{index + 1}</td>
                  <td className="py-3 px-6 border-b border-gray-700">{customer.customer_name}</td>
                  <td className="py-3 px-6 border-b border-gray-700">{customer.phone_number}</td>
                  <td className="py-3 px-6 border-b border-gray-700">{customer.email || "N/A"}</td>
                  <td className="py-3 px-6 border-b border-gray-700">{customer.address || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
