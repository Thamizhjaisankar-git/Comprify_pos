import React, { useState } from "react";
import { FaUserTie } from "react-icons/fa"; // Importing an icon for Employee
import { useDispatch } from "react-redux";
import { addEmployee } from "../../redux/employeeSlice"; // Redux action
import config from "../../config"; // Import backend URL config
import axios from "axios";
import CustomToast from "../../components/globalComponent/customToast/CustomToast";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState({
    username: "",
    password: "",
    role: "",
    status: "",
  });
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // ✅ Get auth token
    if (!token) {
      console.error("No authentication token found.");
      return;
    }

    try {
      // ✅ Send employee data with token in headers
      const response = await axios.post(
        `${config.serverApi}/pos/employee`, // Adjust endpoint if needed
        employee,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Employee Added:", response.data);

      dispatch(addEmployee(response.data)); // ✅ Update Redux Store

      // ✅ Reset form after submission
      setEmployee({
        username: "",
        password: "",
        role: "",
        status: "",
      });
      showToast("Employee created successfully!", "success");
    } catch (error) {
      console.error(
        "Error adding employee:",
        error.response?.data || error.message
      );
      showToast("Internal server error! please try again later...", "error");
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center min-h-screen">
      {/* Title with Icon */}
      <div className="mb-4 flex items-center space-x-2 bg-gray-900 text-white mt-10 py-3 px-6 rounded-lg shadow-lg">
        <FaUserTie className="text-3xl text-blue-400" />
        <h1 className="text-2xl font-bold">Employee Management</h1>
      </div>

      {/* Form Container */}
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full md:w-xl lg:w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>

        {/* Scrollable Form Container */}
        <div className="max-h-[500px] overflow-y-auto pr-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={employee.username}
                onChange={handleChange}
                placeholder="Enter Username"
                className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={employee.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block mb-1">Role</label>
              <select
                name="role"
                value={employee.role}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="cashier">Sales Person</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block mb-1">Status</label>
              <select
                name="status"
                value={employee.status}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Employee ID */}
            {/* <div>
              <label className="block mb-1">Employee ID</label>
              <input
                type="text"
                name="employee_id"
                value={employee.employee_id}
                onChange={handleChange}
                placeholder="Enter Employee ID"
                className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 mt-3 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
            >
              Add Employee
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

export default AddEmployee;
