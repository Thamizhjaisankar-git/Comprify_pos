// import React, { useState } from "react";
// import { FaUser } from "react-icons/fa"; // Importing an icon
// import { useDispatch } from "react-redux";
// import { addCustomer } from "../../redux/customerSlice";
// import config from "../../config"; // Import backend URL config
// import axios from "axios";
// import CustomToast from "../../components/globalComponent/customToast/CustomToast";

// const AddCustomer = () => {
//   const dispatch = useDispatch();
//   const [customer, setCustomer] = useState({
//     name: "",
//     phone_number: "",
//     email: "",
//   });
//   const [toast, setToast] = useState({
//     show: false,
//     body: "",
//     status: "success",
//   });
//   const [loading, setLoading] = useState(false);

//   const showToast = (message, status) => {
//     setToast({ show: true, body: message, status });
//   };

//   const handleChange = (e) => {
//     setCustomer({ ...customer, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token"); // ✅ Get auth token
//     if (!token) {
//       console.error("No authentication token found.");
//       return;
//     }

//     try {
//       setLoading(true);
//       // ✅ Send customer data with token in headers
//       const response = await axios.post(
//         `${config.serverApi}/app/auth/signup`, // Adjust endpoint if needed
//         {
//           name: customer.name,
//           phone_number: customer.phone_number,
//           email: customer.email,
//           password: customer.phone_number,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       console.log("Customer Added:", response.data);

//       dispatch(addCustomer(response.data)); // ✅ Update Redux Store

//       // ✅ Reset form after submission
//       setCustomer({
//         name: "",
//         phone_number: "",
//         email: "",
//       });

//       showToast(
//         "User created! Use phone number as a password to login in COMPRIFY...",
//         "success"
//       );
//     } catch (error) {
//       console.error(
//         "Error adding customer:",
//         error.response?.data || error.message
//       );
//       showToast("Internal server error! please try again later...", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="absolute inset-0 flex flex-col items-center justify-center min-h-screen">
//       {/* Title with Icon */}
//       <div className="mb-4 flex items-center space-x-2 bg-gray-900 text-white mt-10 py-3 px-6 rounded-lg shadow-lg">
//         <FaUser className="text-3xl text-yellow-400" />
//         <h1 className="text-2xl font-bold">Customer Management</h1>
//       </div>

//       {/* Form Container */}
//       <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full md:w-xl lg:w-2xl mx-auto">
//         <h2 className="text-2xl font-bold mb-4">Add New Customer</h2>

//         {/* Scrollable Form Container */}
//         <div className="max-h-[500px] overflow-y-auto pr-2">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Customer Name */}
//             <div>
//               <label className="block mb-1">Customer Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={customer.name}
//                 onChange={handleChange}
//                 placeholder="Enter Customer Name"
//                 className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>

//             {/* Contact Number */}
//             <div>
//               <label className="block mb-1">Phone Number</label>
//               <input
//                 type="text"
//                 name="phone_number"
//                 value={customer.phone_number}
//                 onChange={handleChange}
//                 placeholder="Enter Contact Number"
//                 className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={customer.email}
//                 onChange={handleChange}
//                 placeholder="Enter Email"
//                 className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="bg-yellow-600 mt-3 hover:bg-yellow-700 text-white px-4 py-2 rounded w-full flex items-center justify-center"
//               disabled={loading} // Disable button while loading
//             >
//               {loading ? (
//                 <svg
//                   className="animate-spin h-5 w-5 mr-2 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
//                   ></path>
//                 </svg>
//               ) : (
//                 "Create User"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>

//       <CustomToast
//         show={toast.show}
//         onClose={() => setToast({ ...toast, show: false })}
//         body={toast.body}
//         status={toast.status}
//       />
//     </div>
//   );
// };

// export default AddCustomer;
"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "../../redux/customerSlice";
import config from "../../config";
import axios from "axios";
import CustomToast from "../../components/globalComponent/customToast/CustomToast";
import { User, Mail, Phone, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/themeContext";

const AddCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [customer, setCustomer] = useState({
    name: "",
    phone_number: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    body: "",
    status: "success",
  });

  const showToast = (message, status) => {
    setToast({ show: true, body: message, status });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone_number") {
      // Only allow digits
      const digitsOnly = value.replace(/\D/g, "");

      // Prevent starting with 0 and limit to 10 digits
      if (digitsOnly.length === 1 && digitsOnly[0] === "0") return;
      if (digitsOnly.length <= 10) {
        setCustomer({ ...customer, [name]: digitsOnly });
      }
    } else {
      setCustomer({ ...customer, [name]: value });
    }

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!customer.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!customer.phone_number) {
      newErrors.phone_number = "Phone number is required";
    } else if (!/^[1-9][0-9]{9}$/.test(customer.phone_number)) {
      newErrors.phone_number =
        "Phone number must be 10 digits and not start with 0";
    }

    if (customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Authentication error. Please log in again.", "error");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${config.serverApi}/app/auth/signup`,
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
      dispatch(addCustomer(response.data));

      setCustomer({
        name: "",
        phone_number: "",
        email: "",
      });

      showToast(
        "Customer created successfully! Phone number is set as the password.",
        "success"
      );

      // Navigate back to customer list after a short delay
      setTimeout(() => {
        navigate("/customer-list");
      }, 2000);
    } catch (error) {
      console.error(
        "Error adding customer:",
        error.response?.data || error.message
      );
      showToast(
        error.response?.data?.message ||
          "Failed to create customer. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Add New Customer</h1>
        <button
          onClick={() => navigate("/customer-list")}
          className="btn-modern-outline"
        >
          Back to Customers
        </button>
      </div>

      <div className="bg-card rounded-xl shadow-md overflow-hidden max-w-2xl mx-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Customer Information</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Customer Name</label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <input
                type="text"
                name="name"
                value={customer.name}
                onChange={handleChange}
                placeholder="Enter customer name"
                className={`input-modern pl-10 ${
                  errors.name ? "border-destructive" : ""
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <input
                type="text"
                name="phone_number"
                value={customer.phone_number}
                onChange={handleChange}
                placeholder="Enter phone number"
                className={`input-modern pl-10 ${
                  errors.phone_number ? "border-destructive" : ""
                }`}
              />
            </div>
            {errors.phone_number && (
              <p className="text-destructive text-sm">{errors.phone_number}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Note: Phone number will be used as the password for the customer's
              account.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <input
                type="email"
                name="email"
                value={customer.email}
                onChange={handleChange}
                placeholder="Enter email address (optional)"
                className={`input-modern pl-10 ${
                  errors.email ? "border-destructive" : ""
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email}</p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="btn-modern w-full flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white"></div>
                  Creating Customer...
                </>
              ) : (
                <>
                  <Check size={18} />
                  Create Customer
                </>
              )}
            </button>
          </div>
        </form>
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
