// import { useEffect, useState } from "react";
// import { Plus, ShoppingCart, History } from "lucide-react";
// import AddCartModal from "../../components/Add-cart-model";
// import CartDetails from "../../components/Cart-details";
// import {
//   sampleTrolleys,
//   sampleCarts,
//   sampleHistory,
// } from "../../../sample-data";
// import axios from "axios";
// import config from "../../config";
// import QRCode from "react-qr-code";
// import { useSocketListener } from "../../context/socketContext";
// import CustomToast from "../../components/globalComponent/customToast/CustomToast";

// export default function Dashboard() {
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [selectedTrolley, setSelectedTrolley] = useState(null);
//   const [trolleys, setTrolleys] = useState([]);
//   const [storeData, setStoreData] = useState(() => {
//     const stored = localStorage.getItem("storeData");
//     console.log("-----------------", stored);
//     return stored ? JSON.parse(stored) : {};
//   });
//   const [toast, setToast] = useState({
//     show: false,
//     body: "",
//     status: "success",
//   });

//   const showToast = (message, status) => {
//     setToast({ show: true, body: message, status });
//   };

//   useSocketListener("trolley-connected", (data) => {
//     setTrolleys((prevTrolleys) => {
//       return prevTrolleys.map((trolley) => {
//         if (trolley.trolley_code === data.trolley_code) {
//           return {
//             ...trolley,
//             status: "in-use", // ✅ update status
//           };
//         }
//         return trolley;
//       });
//     });

//     showToast(
//       `A new user (${data.userId}) is connected to trolley with code: ${data.trolley_code}`,
//       "success"
//     );
//   });

//   const downloadQRCode = (storeId, trolleyId, trolleyCode) => {
//     const qrElement = document.getElementById(`qr-${trolleyId}`);
//     if (!qrElement) return;

//     const svgData = new XMLSerializer().serializeToString(qrElement);
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     const img = new Image();

//     img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
//     img.onload = () => {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0);

//       const pngUrl = canvas.toDataURL("image/png");
//       const link = document.createElement("a");
//       link.href = pngUrl;
//       link.download = `${trolleyCode}.png`;
//       link.click();
//     };

//     img.onerror = (err) => console.error("QR Code conversion error:", err);
//   };

//   const handleAddTrolley = async (newTrolley) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.error("No authentication token found.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${config.serverApi}/pos/smart-trolley`,
//         newTrolley,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log("Trolley Added:", response.data);
//       setTrolleys([...trolleys, response.data.trolley]);
//     } catch (error) {
//       console.log(error);
//     }
//     setIsAddModalOpen(false);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "available":
//         return "bg-green-100 text-green-800";
//       case "in-use":
//         return "bg-blue-100 text-blue-800";
//       case "maintenance":
//         return "bg-amber-100 text-amber-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getStoreTrolleys = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.error("No authentication token found.");
//       return;
//     }

//     try {
//       const response = await axios.get(
//         `${config.serverApi}/pos/smart-trolley`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log("All Trolleys:", response.data);
//       setTrolleys(response.data.trolleys);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getStoreTrolleys();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-bold text-gray-900">
//               Smart Trolley Dashboard
//             </h1>
//             <button
//               onClick={() => setIsAddModalOpen(true)}
//               className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Add New Trolley
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {selectedTrolley ? (
//           <div>
//             <button
//               onClick={() => setSelectedTrolley(null)}
//               className="mb-6 inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               ← Back to Trolleys
//             </button>
//             <CartDetails
//               trolley={selectedTrolley}
//               cart={sampleCarts.find(
//                 (cart) => cart.trolley_id === selectedTrolley.trolley_code
//               )}
//               history={selectedTrolley?.history || []}
//             />
//           </div>
//         ) : (
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800 mb-6">
//               All Trolleys
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {trolleys.map((trolley) => (
//                 <div
//                   key={trolley._id}
//                   onClick={() => setSelectedTrolley(trolley)}
//                   className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
//                 >
//                   <div className="p-6">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h3 className="text-lg font-medium text-gray-900">
//                           Trolley #{trolley.trolley_code}
//                         </h3>
//                       </div>
//                       {/* QR Code Rendered with an ID */}

//                       <span
//                         className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
//                           trolley.status
//                         )}`}
//                       >
//                         {trolley.status}
//                       </span>
//                     </div>
//                     <div className="mt-4">
//                       <QRCode
//                         id={`qr-${trolley._id}`}
//                         value={`${storeData.store_id}/${trolley._id}/${trolley.trolley_code}`}
//                         size={256}
//                       />
//                     </div>
//                     <div className="mt-4 flex items-center text-sm text-gray-500">
//                       <ShoppingCart className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
//                       {trolley.current_cart ? "Active cart" : "No active cart"}
//                     </div>
//                     {trolley.last_used_at && (
//                       <div className="mt-2 flex items-center text-sm text-gray-500">
//                         <History className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
//                         Last used:{" "}
//                         {new Date(trolley.last_used_at).toLocaleDateString()}
//                       </div>
//                     )}
//                   </div>
//                   <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-between items-center">
//                     <div className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
//                       View details →
//                     </div>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         downloadQRCode(
//                           storeData.store_id,
//                           trolley._id,
//                           trolley.trolley_code
//                         );
//                       }}
//                       className="text-sm text-blue-600 hover:underline"
//                     >
//                       Download QR Code
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </main>

//       {isAddModalOpen && (
//         <AddCartModal
//           onClose={() => setIsAddModalOpen(false)}
//           onAdd={handleAddTrolley}
//         />
//       )}

//       <CustomToast
//         show={toast.show}
//         onClose={() => setToast({ ...toast, show: false })}
//         body={toast.body}
//         status={toast.status}
//       />
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  ShoppingCart,
  History,
  QrCode,
  Download,
  RefreshCw,
} from "lucide-react";
import AddCartModal from "../../components/Add-cart-model";
import CartDetails from "../../components/Cart-details";
import { sampleCarts } from "../../../sample-data";
import axios from "axios";
import config from "../../config";
import QRCode from "react-qr-code";
import { useSocketListener } from "../../context/socketContext";
import CustomToast from "../../components/globalComponent/customToast/CustomToast";
import { useViewMode } from "../../context/viewContext";
import { useTheme } from "../../context/themeContext";

export default function Dashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTrolley, setSelectedTrolley] = useState(null);
  const [trolleys, setTrolleys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storeData, setStoreData] = useState(() => {
    const stored = localStorage.getItem("storeData");
    return stored ? JSON.parse(stored) : {};
  });
  const [toast, setToast] = useState({
    show: false,
    body: "",
    status: "success",
  });
  const { viewMode, toggleViewMode } = useViewMode();
  const { theme } = useTheme();

  const showToast = (message, status) => {
    setToast({ show: true, body: message, status });
  };

  useSocketListener("trolley-connected", (data) => {
    setTrolleys((prevTrolleys) => {
      return prevTrolleys.map((trolley) => {
        if (trolley.trolley_code === data.trolley_code) {
          return {
            ...trolley,
            status: "in-use", // ✅ update status
          };
        }
        return trolley;
      });
    });

    showToast(
      `A new user (${data.userId}) is connected to trolley with code: ${data.trolley_code}`,
      "success"
    );
  });

  const downloadQRCode = (storeId, trolleyId, trolleyCode) => {
    const qrElement = document.getElementById(`qr-${trolleyId}`);
    if (!qrElement) return;

    const svgData = new XMLSerializer().serializeToString(qrElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `${trolleyCode}.png`;
      link.click();
    };

    img.onerror = (err) => console.error("QR Code conversion error:", err);
  };

  const handleAddTrolley = async (newTrolley) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found.");
      return;
    }

    try {
      const response = await axios.post(
        `${config.serverApi}/pos/smart-trolley`,
        newTrolley,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Trolley Added:", response.data);
      setTrolleys([...trolleys, response.data.trolley]);
      showToast("New trolley added successfully!", "success");
    } catch (error) {
      console.log(error);
      showToast("Failed to add trolley. Please try again.", "error");
    }
    setIsAddModalOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "in-use":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "maintenance":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300";
    }
  };

  const getStoreTrolleys = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${config.serverApi}/pos/smart-trolley`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("All Trolleys:", response.data);
      setTrolleys(response.data.trolleys);
    } catch (error) {
      console.log(error);
      showToast("Failed to fetch trolleys. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStoreTrolleys();
  }, []);

  return (
    <div className="min-h-screen">
      <header className="bg-card rounded-xl shadow-sm mb-6 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Smart Trolley Dashboard</h1>
            <p className="text-muted-foreground">
              Manage and monitor your smart trolleys
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => getStoreTrolleys()}
              className="btn-modern-outline flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>

            <button
              onClick={toggleViewMode}
              className="btn-modern-outline flex items-center gap-2"
            >
              {viewMode === "grid" ? (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  <span>List View</span>
                </>
              ) : (
                <>
                  <QrCode className="h-4 w-4" />
                  <span>Grid View</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-modern flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Trolley</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {selectedTrolley ? (
          <div>
            <button
              onClick={() => setSelectedTrolley(null)}
              className="mb-6 btn-modern-outline"
            >
              ← Back to Trolleys
            </button>
            <CartDetails
              trolley={selectedTrolley}
              cart={sampleCarts.find(
                (cart) => cart.trolley_id === selectedTrolley.trolley_code
              )}
              history={selectedTrolley?.history || []}
            />
          </div>
        ) : (
          <div>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : trolleys.length === 0 ? (
              <div className="text-center p-10 bg-card rounded-xl shadow-sm">
                <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                  No Trolleys Found
                </h2>
                <p className="text-muted-foreground mb-6">
                  You haven't added any smart trolleys yet.
                </p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="btn-modern"
                >
                  Add Your First Trolley
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {trolleys.map((trolley) => (
                  <div
                    key={trolley._id}
                    className="bg-card rounded-xl shadow-sm overflow-hidden border border-border hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium">
                          Trolley #{trolley.trolley_code}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            trolley.status
                          )}`}
                        >
                          {trolley.status}
                        </span>
                      </div>

                      <div className="flex justify-center bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
                        <QRCode
                          id={`qr-${trolley._id}`}
                          value={`${storeData.store_id}/${trolley._id}/${trolley.trolley_code}`}
                          size={180}
                          className="max-w-full"
                        />
                      </div>

                      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <ShoppingCart className="flex-shrink-0 mr-2 h-4 w-4" />
                          {trolley.current_cart
                            ? "Active cart"
                            : "No active cart"}
                        </div>

                        {trolley.last_used_at && (
                          <div className="flex items-center">
                            <History className="flex-shrink-0 mr-2 h-4 w-4" />
                            Last used:{" "}
                            {new Date(
                              trolley.last_used_at
                            ).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-muted/30 px-6 py-3 border-t border-border flex justify-between items-center">
                      <button
                        onClick={() => setSelectedTrolley(trolley)}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        View details
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadQRCode(
                            storeData.store_id,
                            trolley._id,
                            trolley.trolley_code
                          );
                        }}
                        className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      >
                        <Download className="h-4 w-4" />
                        <span>QR Code</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-xl shadow-sm overflow-hidden border border-border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Trolley Code
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Last Used
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {trolleys.map((trolley) => (
                        <tr
                          key={trolley._id}
                          className="border-b border-border hover:bg-muted/20 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="font-medium">
                              #{trolley.trolley_code}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {trolley.current_cart
                                ? "Active cart"
                                : "No active cart"}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                trolley.status
                              )}`}
                            >
                              {trolley.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            {trolley.last_used_at ? (
                              new Date(
                                trolley.last_used_at
                              ).toLocaleDateString()
                            ) : (
                              <span className="text-muted-foreground">
                                Never used
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => setSelectedTrolley(trolley)}
                                className="btn-modern py-1 px-3 text-sm"
                              >
                                View Details
                              </button>
                              <button
                                onClick={() =>
                                  downloadQRCode(
                                    storeData.store_id,
                                    trolley._id,
                                    trolley.trolley_code
                                  )
                                }
                                className="btn-modern-outline py-1 px-3 text-sm flex items-center gap-1"
                              >
                                <Download className="h-3 w-3" />
                                <span>QR</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {isAddModalOpen && (
        <AddCartModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddTrolley}
        />
      )}

      <CustomToast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        body={toast.body}
        status={toast.status}
      />
    </div>
  );
}
