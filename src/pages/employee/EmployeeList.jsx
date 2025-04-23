// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import config from "../../config";

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       const token = localStorage.getItem("token"); // ✅ Get token from localStorage

//       if (!token) {
//         setError("No authentication token found.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `${config.serverApi}/pos/employee/store`,
//           {
//             headers: { Authorization: `Bearer ${token}` }, // ✅ Send token in headers
//           }
//         );

//         console.log(response.data);

//         setEmployees(response.data.employees); // ✅ Store response data in state
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch employees");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4 text-white">Employee List</h1>

//       {loading && <p className="text-gray-300">Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && !error && (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-gray-800 text-white border border-gray-700 rounded-lg">
//             <thead className="bg-gray-900">
//               <tr>
//                 <th className="py-3 px-6 text-left border-b border-gray-700">
//                   S.No
//                 </th>
//                 <th className="py-3 px-6 text-left border-b border-gray-700">
//                   Username
//                 </th>
//                 <th className="py-3 px-6 text-left border-b border-gray-700">
//                   Employee ID
//                 </th>
//                 <th className="py-3 px-6 text-left border-b border-gray-700">
//                   Role
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {employees.map((employee, index) => (
//                 <tr
//                   key={employee.id}
//                   className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}
//                 >
//                   <td className="py-3 px-6 border-b border-gray-700">
//                     {index + 1}
//                   </td>
//                   <td className="py-3 px-6 border-b border-gray-700">
//                     {employee.username}
//                   </td>
//                   <td className="py-3 px-6 border-b border-gray-700">
//                     {employee.employee_id}
//                   </td>
//                   <td className="py-3 px-6 border-b border-gray-700 capitalize">
//                     {employee.role}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeList;
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { Search, Filter, UserPlus, User, ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useViewMode } from "../../context/viewContext";
import { useTheme } from "../../context/themeContext";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const navigate = useNavigate();
  const { viewMode, toggleViewMode } = useViewMode();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${config.serverApi}/pos/employee/store`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(response.data);

        setEmployees(response.data.employees);
        setFilteredEmployees(response.data.employees);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Filter employees based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredEmployees(employees);
      return;
    }

    const filtered = employees.filter(
      (employee) =>
        employee.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (employee.employee_id &&
          employee.employee_id.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  // Handle sorting
  const requestSort = (key) => {
    let direction = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
      if (!a[key]) return 1;
      if (!b[key]) return -1;

      if (a[key].toLowerCase() < b[key].toLowerCase()) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key].toLowerCase() > b[key].toLowerCase()) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setFilteredEmployees(sortedEmployees);
  };

  const handleAddEmployee = () => {
    navigate("/add-employee");
  };

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "manager":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "cashier":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Employee Management</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-modern pl-10 pr-4 py-2 w-full md:w-64"
            />
          </div>

          {/* View Toggle */}
          <button
            onClick={toggleViewMode}
            className="btn-modern-outline flex items-center gap-2"
          >
            {viewMode === "grid" ? (
              <>
                <Filter size={18} />
                <span>List View</span>
              </>
            ) : (
              <>
                <Filter size={18} />
                <span>Grid View</span>
              </>
            )}
          </button>

          {/* Add Employee Button */}
          <button
            onClick={handleAddEmployee}
            className="btn-modern flex items-center gap-2"
          >
            <UserPlus size={18} />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p>{error}</p>
        </div>
      ) : (
        <>
          {filteredEmployees.length === 0 ? (
            <div className="bg-card rounded-xl shadow p-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                  <User size={32} className="text-muted-foreground" />
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-2">No Employees Found</h2>
              <p className="text-muted-foreground mb-6">
                There are no employees matching your search criteria.
              </p>
              <button
                onClick={handleAddEmployee}
                className="btn-modern flex items-center gap-2 mx-auto"
              >
                <UserPlus size={18} />
                Add Your First Employee
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid-view">
              {filteredEmployees.map((employee) => (
                <div key={employee._id} className="modern-card">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${getRoleColor(
                          employee.role
                        )}`}
                      >
                        {employee.role.charAt(0).toUpperCase() +
                          employee.role.slice(1)}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold mb-1">
                      {employee.username}
                    </h3>

                    {employee.employee_id && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <span className="font-mono bg-muted px-2 py-0.5 rounded text-xs">
                          ID: {employee.employee_id}
                        </span>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            employee.status === "active"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></span>
                        <span className="capitalize">
                          {employee.status || "Unknown"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-xl shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table-modern">
                  <thead>
                    <tr>
                      <th
                        onClick={() => requestSort("username")}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-1">
                          Username
                          <ArrowUpDown size={14} />
                        </div>
                      </th>
                      <th
                        onClick={() => requestSort("employee_id")}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-1">
                          Employee ID
                          <ArrowUpDown size={14} />
                        </div>
                      </th>
                      <th
                        onClick={() => requestSort("role")}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-1">
                          Role
                          <ArrowUpDown size={14} />
                        </div>
                      </th>
                      <th
                        onClick={() => requestSort("status")}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-1">
                          Status
                          <ArrowUpDown size={14} />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr key={employee._id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <User size={14} className="text-primary" />
                            </div>
                            {employee.username}
                          </div>
                        </td>
                        <td>
                          {employee.employee_id ? (
                            <span className="font-mono bg-muted px-2 py-0.5 rounded text-xs">
                              {employee.employee_id}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">
                              Not assigned
                            </span>
                          )}
                        </td>
                        <td>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(
                              employee.role
                            )}`}
                          >
                            {employee.role.charAt(0).toUpperCase() +
                              employee.role.slice(1)}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                employee.status === "active"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            ></span>
                            <span className="capitalize">
                              {employee.status || "Unknown"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeList;
