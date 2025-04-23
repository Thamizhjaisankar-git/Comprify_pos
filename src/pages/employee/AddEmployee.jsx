// import React, { useState } from "react";
// import { FaUserTie } from "react-icons/fa"; // Importing an icon for Employee
// import { useDispatch } from "react-redux";
// import { addEmployee } from "../../redux/employeeSlice"; // Redux action
// import config from "../../config"; // Import backend URL config
// import axios from "axios";
// import CustomToast from "../../components/globalComponent/customToast/CustomToast";

// const AddEmployee = () => {
//   const dispatch = useDispatch();
//   const [employee, setEmployee] = useState({
//     username: "",
//     password: "",
//     role: "",
//     status: "",
//   });
//   const [toast, setToast] = useState({
//     show: false,
//     body: "",
//     status: "success",
//   });

//   const showToast = (message, status) => {
//     setToast({ show: true, body: message, status });
//   };

//   const handleChange = (e) => {
//     setEmployee({ ...employee, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token"); // ✅ Get auth token
//     if (!token) {
//       console.error("No authentication token found.");
//       return;
//     }

//     try {
//       // ✅ Send employee data with token in headers
//       const response = await axios.post(
//         `${config.serverApi}/pos/employee`, // Adjust endpoint if needed
//         employee,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       console.log("Employee Added:", response.data);

//       dispatch(addEmployee(response.data)); // ✅ Update Redux Store

//       // ✅ Reset form after submission
//       setEmployee({
//         username: "",
//         password: "",
//         role: "",
//         status: "",
//       });
//       showToast("Employee created successfully!", "success");
//     } catch (error) {
//       console.error(
//         "Error adding employee:",
//         error.response?.data || error.message
//       );
//       showToast("Internal server error! please try again later...", "error");
//     }
//   };

//   return (
//     <div className="absolute inset-0 flex flex-col items-center justify-center min-h-screen">
//       {/* Title with Icon */}
//       <div className="mb-4 flex items-center space-x-2 bg-gray-900 text-white mt-10 py-3 px-6 rounded-lg shadow-lg">
//         <FaUserTie className="text-3xl text-blue-400" />
//         <h1 className="text-2xl font-bold">Employee Management</h1>
//       </div>

//       {/* Form Container */}
//       <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full md:w-xl lg:w-2xl mx-auto">
//         <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>

//         {/* Scrollable Form Container */}
//         <div className="max-h-[500px] overflow-y-auto pr-2">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Username */}
//             <div>
//               <label className="block mb-1">Username</label>
//               <input
//                 type="text"
//                 name="username"
//                 value={employee.username}
//                 onChange={handleChange}
//                 placeholder="Enter Username"
//                 className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block mb-1">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={employee.password}
//                 onChange={handleChange}
//                 placeholder="Enter Password"
//                 className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Role Selection */}
//             <div>
//               <label className="block mb-1">Role</label>
//               <select
//                 name="role"
//                 value={employee.role}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Role</option>
//                 <option value="admin">Admin</option>
//                 <option value="cashier">Sales Person</option>
//                 <option value="manager">Manager</option>
//               </select>
//             </div>

//             {/* Role Selection */}
//             <div>
//               <label className="block mb-1">Status</label>
//               <select
//                 name="status"
//                 value={employee.status}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Status</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>
//             </div>

//             {/* Employee ID */}
//             {/* <div>
//               <label className="block mb-1">Employee ID</label>
//               <input
//                 type="text"
//                 name="employee_id"
//                 value={employee.employee_id}
//                 onChange={handleChange}
//                 placeholder="Enter Employee ID"
//                 className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div> */}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="bg-blue-600 mt-3 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
//             >
//               Add Employee
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

// export default AddEmployee;
"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../redux/employeeSlice";
import config from "../../config";
import axios from "axios";
import CustomToast from "../../components/globalComponent/customToast/CustomToast";
import { User, Lock, Check, UserCog, ShieldCheck, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/themeContext";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [employee, setEmployee] = useState({
    username: "",
    password: "",
    role: "",
    status: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    body: "",
    status: "success",
  });

  const showToast = (message, status) => {
    setToast({ show: true, body: message, status });
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });

    // Clear error when field is edited
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!employee.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!employee.password) {
      newErrors.password = "Password is required";
    } else if (employee.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (employee.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!employee.role) {
      newErrors.role = "Role is required";
    }

    if (!employee.status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found.");
      showToast("Authentication error. Please log in again.", "error");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        `${config.serverApi}/pos/employee`,
        employee,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Employee Added:", response.data);
      dispatch(addEmployee(response.data));

      showToast("Employee created successfully!", "success");

      // Reset form after successful submission
      setEmployee({
        username: "",
        password: "",
        role: "",
        status: "",
      });
      setConfirmPassword("");

      // Navigate back to employee list after a short delay
      setTimeout(() => {
        navigate("/employee-list");
      }, 2000);
    } catch (error) {
      console.error(
        "Error adding employee:",
        error.response?.data || error.message
      );
      showToast(
        error.response?.data?.message ||
          "Failed to create employee. Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Add New Employee</h1>
        <button
          onClick={() => navigate("/employee-list")}
          className="btn-modern-outline"
        >
          Back to Employees
        </button>
      </div>

      <div className="bg-card rounded-xl shadow-md overflow-hidden max-w-2xl mx-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <UserCog className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Employee Information</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <input
                type="text"
                name="username"
                value={employee.username}
                onChange={handleChange}
                placeholder="Enter username"
                className={`input-modern pl-10 ${
                  errors.username ? "border-destructive" : ""
                }`}
              />
            </div>
            {errors.username && (
              <p className="text-destructive text-sm">{errors.username}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={employee.password}
                onChange={handleChange}
                placeholder="Enter password"
                className={`input-modern pl-10 ${
                  errors.password ? "border-destructive" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <X size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-destructive text-sm">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm Password</label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) {
                    setErrors({ ...errors, confirmPassword: null });
                  }
                }}
                placeholder="Confirm password"
                className={`input-modern pl-10 ${
                  errors.confirmPassword ? "border-destructive" : ""
                }`}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-destructive text-sm">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <select
                name="role"
                value={employee.role}
                onChange={handleChange}
                className={`input-modern ${
                  errors.role ? "border-destructive" : ""
                }`}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="cashier">Sales Person</option>
                <option value="manager">Manager</option>
              </select>
              {errors.role && (
                <p className="text-destructive text-sm">{errors.role}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={employee.status === "active"}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary"
                  />
                  <span className="flex items-center gap-1">
                    <Check size={16} className="text-green-500" />
                    Active
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={employee.status === "inactive"}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary"
                  />
                  <span className="flex items-center gap-1">
                    <X size={16} className="text-red-500" />
                    Inactive
                  </span>
                </label>
              </div>
              {errors.status && (
                <p className="text-destructive text-sm">{errors.status}</p>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="btn-modern w-full flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white"></div>
                  Creating Employee...
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Create Employee
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

const Eye = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default AddEmployee;
