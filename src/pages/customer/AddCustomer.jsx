import React, { useState } from "react";
import { FaUser } from "react-icons/fa"; // Importing an icon
import { useDispatch } from "react-redux";
import { addCustomer } from "../../redux/customerSlice";
import config from "../../config"; // Import backend URL config
import axios from "axios";

const AddCustomer = () => {
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState({
    customer_name: "",
    phone_number: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // ✅ Get auth token
    if (!token) {
      console.error("No authentication token found.");
      return;
    }

    try {
      // ✅ Send customer data with token in headers
      const response = await axios.post(
        `${config.serverApi}/pos/customer`, // Adjust endpoint if needed
        customer,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Customer Added:", response.data);

      dispatch(addCustomer(response.data)); // ✅ Update Redux Store

      // ✅ Reset form after submission
      setCustomer({
        customer_name: "",
        phone_number: "",
        email: "",
        address: "",
      });
    } catch (error) {
      console.error("Error adding customer:", error.response?.data || error.message);
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center min-h-screen">

      {/* Title with Icon */}
      <div className="mb-4 flex items-center space-x-2 bg-gray-900 text-white mt-10 py-3 px-6 rounded-lg shadow-lg">
        <FaUser className="text-3xl text-yellow-400" />
        <h1 className="text-2xl font-bold">Customer Management</h1>
      </div>

      {/* Form Container */}
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full md:w-xl lg:w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Customer</h2>

        {/* Scrollable Form Container */}
        <div className="max-h-[500px] overflow-y-auto pr-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Customer Name */}
            <div>
              <label className="block mb-1">Customer Name</label>
              <input type="text" name="customer_name" value={customer.customer_name} onChange={handleChange} 
                placeholder="Enter Customer Name"
                className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block mb-1">Phone Number</label>
              <input type="text" name="phone_number" value={customer.phone_number} onChange={handleChange} 
                placeholder="Enter Contact Number"
                className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1">Email</label>
              <input type="email" name="email" value={customer.email} onChange={handleChange} 
                placeholder="Enter Email"
                className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" />
            </div>

            {/* Address */}
            <div>
              <label className="block mb-1">Address</label>
              <input type="text" name="address" value={customer.address} onChange={handleChange} 
                placeholder="Enter Address"
                className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" />
            </div>

            {/* Submit Button */}
            <button type="submit" className="bg-yellow-600 mt-3 hover:bg-yellow-700 text-white px-4 py-2 rounded w-full">
              Add Customer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
