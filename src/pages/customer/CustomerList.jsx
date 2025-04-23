// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import config from "../../config";

// const CustomerList = () => {
//   const [customers, setCustomers] = useState({
//     pos: [],
//     online: [],
//     smart: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("pos"); // Default tab: POS Customers
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("No authentication token found.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `${config.serverApi}/pos/store/users`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setCustomers(response.data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch customers");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   const currentCustomers = customers[activeTab];

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4 text-white">Customer List</h1>

//       {/* Tabs */}
//       <div className="flex space-x-4 mb-6">
//         {["pos", "online", "smart"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 rounded-md ${
//               activeTab === tab
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//             }`}
//           >
//             {tab === "pos"
//               ? "POS Customers"
//               : tab === "online"
//               ? "Online Customers"
//               : "Smart Trolley Customers"}
//           </button>
//         ))}
//       </div>

//       {/* Loader */}
//       {loading && <p className="text-gray-300">Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* Customer Table */}
//       {!loading && !error && (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-gray-800 text-white border border-gray-700 rounded-lg">
//             <thead className="bg-gray-900">
//               <tr>
//                 <th className="py-3 px-6 text-left border-b border-gray-700">
//                   S.No
//                 </th>
//                 <th className="py-3 px-6 text-left border-b border-gray-700">
//                   Name
//                 </th>
//                 <th className="py-3 px-6 text-left border-b border-gray-700">
//                   Email
//                 </th>
//                 <th className="py-3 px-6 text-left border-b border-gray-700">
//                   Phone Number
//                 </th>
//                 <th className="py-3 px-6 text-left border-b border-gray-700">
//                   No. of Purchases
//                 </th>
//                 <th className="py-3 px-6 text-left border-b border-gray-700">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentCustomers.length > 0 ? (
//                 currentCustomers.map((customer, index) => (
//                   <tr
//                     key={customer._id}
//                     className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}
//                   >
//                     <td className="py-3 px-6 border-b border-gray-700">
//                       {index + 1}
//                     </td>
//                     <td className="py-3 px-6 border-b border-gray-700">
//                       {customer.name}
//                     </td>
//                     <td className="py-3 px-6 border-b border-gray-700">
//                       {customer.email || "Not Available"}
//                     </td>
//                     <td className="py-3 px-6 border-b border-gray-700">
//                       {customer.phone_number || "Not Available"}
//                     </td>
//                     <td className="py-3 px-6 border-b border-gray-700">
//                       {customer.no_of_purchases}
//                     </td>
//                     <td className="py-3 px-6 border-b border-gray-700">
//                       <button
//                         onClick={() => setShowModal(true)}
//                         className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                       >
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="6"
//                     className="py-3 px-6 text-center text-gray-400"
//                   >
//                     No customers found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-gray-900 p-6 rounded-lg text-white">
//             <h2 className="text-xl font-bold">Feature Coming Soon!</h2>
//             <p className="mt-2">We are working on adding more details.</p>
//             <button
//               className="mt-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
//               onClick={() => setShowModal(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomerList;
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { Search, Filter, X, Mail, Phone, User } from "lucide-react";
import { useViewMode } from "../../context/viewContext";
import { useTheme } from "../../context/themeContext";

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
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { viewMode, toggleViewMode } = useViewMode();
  const { theme } = useTheme();

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

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  // Filter customers based on search term
  const filteredCustomers = customers[activeTab].filter(
    (customer) =>
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone_number?.includes(searchTerm)
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Customer List</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search customers..."
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
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
        {["pos", "online", "smart"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? theme === "light"
                  ? "bg-white text-gray-800 shadow-sm"
                  : "bg-gray-800 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
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
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {error && <p className="text-red-500 text-center p-4">{error}</p>}

      {/* Customer List */}
      {!loading && !error && (
        <>
          {filteredCustomers.length === 0 ? (
            <div className="text-center p-10 bg-card rounded-xl shadow">
              <p className="text-lg">No customers found in this category.</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid-view">
              {filteredCustomers.map((customer, index) => (
                <div key={customer._id || index} className="modern-card">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {customer.no_of_purchases || 0} purchases
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold mb-1">
                      {customer.name || "No Name"}
                    </h3>

                    {customer.email && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Mail className="h-4 w-4" />
                        <span>{customer.email}</span>
                      </div>
                    )}

                    {customer.phone_number && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{customer.phone_number}</span>
                      </div>
                    )}

                    <button
                      onClick={() => handleViewDetails(customer)}
                      className="btn-modern w-full mt-4"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-modern">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Purchases</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer, index) => (
                    <tr key={customer._id || index}>
                      <td>{customer.name || "No Name"}</td>
                      <td>{customer.email || "Not Available"}</td>
                      <td>{customer.phone_number || "Not Available"}</td>
                      <td>{customer.no_of_purchases || 0}</td>
                      <td>
                        <button
                          onClick={() => handleViewDetails(customer)}
                          className="btn-modern py-1 px-3 text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Customer Details Modal */}
      {showModal && selectedCustomer && (
        <div className="modal-overlay1">
          <div className="modal-content1 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Customer Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-full hover:bg-muted"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col items-center mb-6">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <User className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold">
                {selectedCustomer.name || "No Name"}
              </h3>
              <p className="text-muted-foreground">
                {activeTab.toUpperCase()} Customer
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 p-4 rounded-lg bg-muted/30">
                <div className="text-sm font-medium text-muted-foreground">
                  Email:
                </div>
                <div>{selectedCustomer.email || "Not Available"}</div>

                <div className="text-sm font-medium text-muted-foreground">
                  Phone:
                </div>
                <div>{selectedCustomer.phone_number || "Not Available"}</div>

                <div className="text-sm font-medium text-muted-foreground">
                  Total Purchases:
                </div>
                <div>{selectedCustomer.no_of_purchases || 0}</div>
              </div>

              <div className="p-4 rounded-lg bg-muted/30">
                <h4 className="text-sm font-medium mb-2">Purchase History</h4>
                <p className="text-sm text-muted-foreground">
                  Detailed purchase history will be available in future updates.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="btn-modern"
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

export default CustomerList;
