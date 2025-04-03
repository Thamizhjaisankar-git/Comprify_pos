import React, { useState } from "react";
import { FaUser } from "react-icons/fa"; // Importing an icon
import { useDispatch } from "react-redux";
import { addCustomer } from "../../redux/customerSlice";
import config from "../../config"; // Import backend URL config
import axios from "axios";
import CustomToast from "../../components/globalComponent/customToast/CustomToast";

const AddCustomer = () => {
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState({
    name: "",
    phone_number: "",
    email: "",
  });
  const [toast, setToast] = useState({
    show: false,
    body: "",
    status: "success",
  });
  const [loading, setLoading] = useState(false);

  const showToast = (message, status) => {
    setToast({ show: true, body: message, status });
  };

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
      setLoading(true);
      // ✅ Send customer data with token in headers
      const response = await axios.post(
        `${config.serverApi}/app/auth/signup`, // Adjust endpoint if needed
        {
          name: customer.name,
          phone_number: customer.phone_number,
          email: customer.email,
          password: customer.phone_number,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Customer Added:", response.data);

      dispatch(addCustomer(response.data)); // ✅ Update Redux Store

      // ✅ Reset form after submission
      setCustomer({
        name: "",
        phone_number: "",
        email: "",
      });

      showToast(
        "User created! Use phone number as a password to login in COMPRIFY...",
        "success"
      );
    } catch (error) {
      console.error(
        "Error adding customer:",
        error.response?.data || error.message
      );
      showToast("Internal server error! please try again later...", "error");
    } finally {
      setLoading(false);
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
              <input
                type="text"
                name="name"
                value={customer.name}
                onChange={handleChange}
                placeholder="Enter Customer Name"
                className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block mb-1">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={customer.phone_number}
                onChange={handleChange}
                placeholder="Enter Contact Number"
                className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={customer.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-yellow-600 mt-3 hover:bg-yellow-700 text-white px-4 py-2 rounded w-full flex items-center justify-center"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  ></path>
                </svg>
              ) : (
                "Create User"
              )}
            </button>
          </form>
        </div>
      </div>

      <CustomToast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        body={toast.body}
        status={toast.status}
      />
    </div>
  );
};

export default AddCustomer;
