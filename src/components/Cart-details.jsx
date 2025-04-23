// import { useEffect, useState } from "react";
// import {
//   ShoppingCart,
//   Clock,
//   AlertTriangle,
//   Package,
//   DollarSign,
// } from "lucide-react";
// import axios from "axios";
// import config from "../config";
// import { useSocket, useSocketListener } from "../context/socketContext";
// import CustomToast from "./globalComponent/customToast/CustomToast";
// import { Check, X, Info } from "lucide-react";

// export default function CartDetails({ trolley, history }) {
//   const [activeTab, setActiveTab] = useState("items");
//   const [cart, setCart] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedAuditItems, setEditedAuditItems] = useState([]);
//   const [toast, setToast] = useState({
//     show: false,
//     body: "",
//     status: "success",
//   });

//   const showToast = (message, status) => {
//     setToast({ show: true, body: message, status });
//     setTimeout(() => {
//       setToast((prev) => ({ ...prev, show: false }));
//     }, 3000);
//   };

//   const getCart = async () => {
//     if (trolley.status === "in-use") {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("No authentication token found.");
//         return;
//       }
//       try {
//         const response = await axios.get(
//           `${config.serverApi}/pos/smart-cart/${trolley.current_cart}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         console.log("Cart Details:", response.data);
//         setCart(response.data.cart);
//       } catch (error) {
//         console.log("Error getting cart details:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     getCart();
//     console.log(history);
//   }, []);

//   useSocketListener("fraud_alert", (data) => {
//     console.log("new fraud alert have come:", data);
//     if (cart._id === data.cartId) {
//       showToast("Malicious activity detected! Kindly review it immediately!");
//     }
//   });

//   useSocketListener("purchase-complete", (data) => {
//     if (cart._id === data.cartId) {
//       showToast(
//         `Purchase complete on trolley with code: ${data.trolley_code}. Refresh to see changes!`,
//         "success"
//       );
//     }
//   });

//   useSocketListener("fraud_update", (data) => {
//     if (cart._id === data.cartId && cart.auditId._id === data.auditId) {
//       console.log("fraud products updated:", data);
//       showToast(
//         `Item added after verification: ${data.product.product_name}!!!!!!`,
//         "error"
//       );

//       setCart((prevCart) => {
//         const updatedAuditItems = [...prevCart.auditId.items];
//         const incomingProduct = data.product;

//         const existingIndex = updatedAuditItems.findIndex(
//           (item) => item.product._id === incomingProduct._id
//         );

//         if (existingIndex !== -1) {
//           // 🔄 Product exists → update quantity
//           updatedAuditItems[existingIndex] = {
//             ...updatedAuditItems[existingIndex],
//             quantity: data.quantity,
//           };
//         } else {
//           // ➕ Product doesn't exist → push new item
//           updatedAuditItems.push({
//             added_at: data.added_at,
//             quantity: data.quantity,
//             product: incomingProduct,
//           });
//         }

//         return {
//           ...prevCart,
//           auditId: {
//             ...prevCart.auditId,
//             items: updatedAuditItems,
//           },
//         };
//       });
//     }
//   });

//   useSocketListener("cart_update", (data) => {
//     if (cart._id === data.cartId) {
//       console.log("cart is updated:", data);
//       showToast(
//         `New item added to cart: ${data.product.product_name}`,
//         "success"
//       );

//       setCart((prevCart) => {
//         const updatedItems = [...prevCart.items];
//         const incomingProduct = data.product;

//         const existingIndex = updatedItems.findIndex(
//           (item) => item.product._id === incomingProduct._id
//         );

//         if (existingIndex !== -1) {
//           // 🔄 Product exists → update quantity
//           updatedItems[existingIndex] = {
//             ...updatedItems[existingIndex],
//             quantity: data.quantity,
//           };
//         } else {
//           // ➕ Product doesn't exist → push new item
//           updatedItems.push({
//             added_at: data.added_at,
//             quantity: data.quantity,
//             product: incomingProduct,
//           });
//         }

//         return {
//           ...prevCart,
//           items: updatedItems,
//         };
//       });
//     }
//   });

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "active":
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//             Active
//           </span>
//         );
//       case "checking-out":
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//             Checking Out
//           </span>
//         );
//       case "completed":
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//             Automated Verification done - Payment Pending
//           </span>
//         );
//       default:
//         return null;
//     }
//   };

//   const totalPrice = cart?.items?.reduce((sum, item) => {
//     const price = item?.product?.pricing?.[0]?.selling_price || 0; // Get selling price
//     return sum + price * (item?.quantity || 1); // Multiply by quantity
//   }, 0);

//   return (
//     <div className="bg-white shadow-md rounded-lg overflow-hidden">
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex justify-between items-start">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">
//               Trolley #{trolley.trolley_code}
//             </h2>
//             {/* <p className="text-gray-500">Store: {trolley.store_name}</p> */}
//           </div>
//           <div className="flex flex-col items-end">
//             <span
//               className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                 trolley.status === "available"
//                   ? "bg-green-100 text-green-800"
//                   : trolley.status === "in-use"
//                   ? "bg-blue-100 text-blue-800"
//                   : "bg-amber-100 text-amber-800"
//               }`}
//             >
//               {trolley.status}
//             </span>
//             {trolley.last_used_at && (
//               <span className="text-xs text-gray-500 mt-1">
//                 Last used: {new Date(trolley.last_used_at).toLocaleDateString()}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="border-b border-gray-200">
//         <nav className="flex -mb-px">
//           <button
//             onClick={() => setActiveTab("items")}
//             className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
//               activeTab === "items"
//                 ? "border-indigo-500 text-indigo-600"
//                 : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//             }`}
//           >
//             <ShoppingCart className="w-5 h-5 inline-block mr-2" />
//             Current Items
//           </button>
//           <button
//             onClick={() => setActiveTab("history")}
//             className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
//               activeTab === "history"
//                 ? "border-indigo-500 text-indigo-600"
//                 : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//             }`}
//           >
//             <Clock className="w-5 h-5 inline-block mr-2" />
//             Shopping History
//           </button>
//         </nav>
//       </div>

//       <div className="p-6">
//         {activeTab === "items" ? (
//           <div>
//             {cart ? (
//               <div>
//                 <div className="flex justify-between items-center mb-6">
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-900">
//                       Current Cart
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       Started: {new Date(cart?.created_at).toLocaleString()}
//                     </p>
//                   </div>
//                   <div>{getStatusBadge(cart?.status)}</div>
//                 </div>

//                 {cart?.flags && cart?.flags?.length > 0 && (
//                   <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
//                     <div className="flex">
//                       <AlertTriangle className="h-5 w-5 text-amber-400" />
//                       <div className="ml-3">
//                         <h3 className="text-sm font-medium text-amber-800">
//                           Attention needed
//                         </h3>
//                         <div className="mt-2 text-sm text-amber-700">
//                           <ul className="list-disc pl-5 space-y-1">
//                             {cart?.flags?.map((flag, index) => (
//                               <li key={index}>
//                                 {flag?.issue} (
//                                 {new Date(
//                                   flag?.flagged_at
//                                 ).toLocaleTimeString()}
//                                 )
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {cart?.auditId && cart?.auditId.items?.length > 0 && (
//                   <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
//                     <div className="flex">
//                       <AlertTriangle className="h-5 w-5 text-red-400" />
//                       <div className="ml-3">
//                         <h3 className="text-sm font-medium text-red-800">
//                           Manual Verification Required
//                         </h3>
//                         <p className="mt-1 text-sm text-red-700">
//                           Some products have been added after automated
//                           verification.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {cart?.auditId && cart?.auditId.items?.length > 0 && (
//                   <>
//                     <div className="flex justify-between items-center">
//                       <h4 className="font-medium text-gray-700">
//                         Audit Items for Verification
//                       </h4>
//                       {!isEditing ? (
//                         <button
//                           onClick={() => {
//                             setIsEditing(true);
//                             setEditedAuditItems(cart.auditId.items); // Load items for editing
//                           }}
//                           className="text-sm text-blue-600 hover:underline"
//                         >
//                           Edit
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => setIsEditing(false)}
//                           className="text-sm text-red-600 hover:underline"
//                         >
//                           Cancel
//                         </button>
//                       )}
//                     </div>
//                     {isEditing
//                       ? editedAuditItems.map((item, index) => (
//                           <div
//                             key={index}
//                             className="flex justify-between items-center p-3 bg-white rounded-md shadow-sm"
//                           >
//                             <div className="flex items-center">
//                               <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-md flex items-center justify-center">
//                                 <Package className="h-6 w-6 text-gray-500" />
//                               </div>
//                               <div className="ml-4">
//                                 <h5 className="text-sm font-medium text-gray-900">
//                                   {item.product.product_name}
//                                 </h5>
//                                 <input
//                                   type="number"
//                                   value={item.quantity}
//                                   onChange={(e) => {
//                                     const updatedItems = [...editedAuditItems];
//                                     updatedItems[index].quantity = Number(
//                                       e.target.value
//                                     );
//                                     setEditedAuditItems(updatedItems);
//                                   }}
//                                   className="w-16 text-sm border rounded-md px-2 py-1"
//                                 />
//                               </div>
//                             </div>
//                             <button
//                               onClick={() => {
//                                 setEditedAuditItems(
//                                   editedAuditItems.filter((_, i) => i !== index)
//                                 );
//                               }}
//                               className="text-red-600 hover:text-red-800 text-sm"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         ))
//                       : cart.auditId.items.map((item, index) => (
//                           <div
//                             key={index}
//                             className="flex justify-between p-3 bg-white rounded-md shadow-sm"
//                           >
//                             <div className="flex items-center">
//                               <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-md flex items-center justify-center">
//                                 <Package className="h-6 w-6 text-gray-500" />
//                               </div>
//                               <div className="ml-4">
//                                 <h5 className="text-sm font-medium text-gray-900">
//                                   {item.product.product_name}
//                                 </h5>
//                                 <p className="text-xs text-gray-500">
//                                   Quantity: x{item.quantity}
//                                 </p>
//                               </div>
//                             </div>
//                             <span className="text-sm font-medium text-gray-900">
//                               ₹
//                               {item.product.pricing[0].selling_price.toFixed(2)}
//                             </span>
//                           </div>
//                         ))}
//                     {isEditing && (
//                       <button
//                         onClick={async () => {
//                           try {
//                             const token = localStorage.getItem("token");
//                             console.log(editedAuditItems, cart.auditId._id);
//                             await axios.post(
//                               `${config.serverApi}/pos/smart-cart/audit-sync/${cart.auditId._id}`,
//                               { products: editedAuditItems },
//                               { headers: { Authorization: `Bearer ${token}` } }
//                             );
//                             setIsEditing(false);
//                             getCart(); // Refresh cart details
//                           } catch (error) {
//                             console.error("Error syncing audit data:", error);
//                           }
//                         }}
//                         className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
//                       >
//                         Sync Changes
//                       </button>
//                     )}
//                   </>
//                 )}

//                 <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                   <div className="flex justify-between items-center mb-2">
//                     <h4 className="font-medium text-gray-700">Cart Items</h4>
//                     <span className="text-gray-500 text-sm">
//                       {cart?.items?.length} items
//                     </span>
//                   </div>

//                   {cart?.items?.length > 0 ? (
//                     <div className="space-y-4 mt-4">
//                       {cart?.items?.map((item, index) => (
//                         <div
//                           key={index}
//                           className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm"
//                         >
//                           <div className="flex items-center">
//                             <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-md flex items-center justify-center">
//                               <Package className="h-6 w-6 text-gray-500" />
//                             </div>
//                             <div className="ml-4">
//                               <h5 className="text-sm font-medium text-gray-900">
//                                 {item?.product?.product_name}
//                               </h5>
//                               <p className="text-xs text-gray-500">
//                                 Added:{" "}
//                                 {new Date(item?.added_at).toLocaleTimeString()}
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex items-center">
//                             <span className="text-sm font-medium text-gray-900 mr-4">
//                               x{item?.quantity}
//                             </span>
//                             <span className="text-sm font-medium text-gray-900">
//                               ₹
//                               {item?.product?.pricing[0].selling_price.toFixed(
//                                 2
//                               )}
//                             </span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-gray-500 text-sm mt-2">
//                       No items in cart yet
//                     </p>
//                   )}
//                 </div>

//                 <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg">
//                   <span className="font-medium text-indigo-900">
//                     Total Price
//                   </span>
//                   <span className="text-lg font-bold text-indigo-900">
//                     ₹{totalPrice.toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
//                 <h3 className="mt-2 text-sm font-medium text-gray-900">
//                   No Active Cart
//                 </h3>
//                 <p className="mt-1 text-sm text-gray-500">
//                   This trolley doesn't have an active shopping session.
//                 </p>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div>
//             <h3 className="text-lg font-medium text-gray-900 mb-6">
//               Shopping History
//             </h3>

//             {history.length > 0 ? (
//               <div className="space-y-6">
//                 {history.map((session, index) => (
//                   <div
//                     key={index}
//                     className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
//                   >
//                     <div className="p-4 border-b border-gray-200 bg-gray-50">
//                       <div className="flex justify-between items-center">
//                         <div>
//                           <h4 className="font-medium text-gray-900">
//                             Shopping Session #{index + 1}
//                           </h4>
//                           <p className="text-sm text-gray-500">
//                             {new Date(session.verified_time).toLocaleString()}
//                           </p>
//                         </div>
//                         <div className="flex items-center">
//                           <span className="font-bold text-gray-900">
//                             ₹{session.total_price.toFixed(2)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="p-4">
//                       <div className="mb-4">
//                         <div className="flex justify-between text-sm text-gray-500 mb-2">
//                           <span>Payment Method</span>
//                           <span className="font-medium text-gray-900 capitalize">
//                             {session.payment_method}
//                           </span>
//                         </div>
//                         <div className="flex justify-between text-sm text-gray-500">
//                           <span>Items</span>
//                           <span className="font-medium text-gray-900">
//                             {session.cart_items.length}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="border-t border-gray-200 pt-4">
//                         <h5 className="text-sm font-medium text-gray-700 mb-3">
//                           Purchased Items
//                         </h5>
//                         <div className="space-y-2">
//                           {session.cart_items.map((item, itemIndex) => (
//                             <div
//                               key={itemIndex}
//                               className="flex justify-between items-center text-sm"
//                             >
//                               <div className="flex items-center text-gray-500">
//                                 <Package className="h-4 w-4 mr-2 text-gray-500" />
//                                 <span>{item.product.product_name}</span>
//                               </div>
//                               <div className="flex items-center">
//                                 <span className="text-gray-500 mr-2 text-gray-500">
//                                   x{item.quantity}
//                                 </span>
//                                 <span className="font-medium text-gray-500">
//                                   ₹{item.price_at_purchase.toFixed(2)}
//                                 </span>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       {session.flags && session.flags.length > 0 && (
//                         <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
//                           <div className="flex items-start">
//                             <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
//                             <div className="ml-2">
//                               <h6 className="text-xs font-medium text-amber-800">
//                                 Issues Flagged
//                               </h6>
//                               <ul className="mt-1 text-xs text-amber-700 list-disc pl-4">
//                                 {session.flags.map((flag, flagIndex) => (
//                                   <li key={flagIndex}>{flag.issue}</li>
//                                 ))}
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <Clock className="mx-auto h-12 w-12 text-gray-400" />
//                 <h3 className="mt-2 text-sm font-medium text-gray-900">
//                   No Shopping History
//                 </h3>
//                 <p className="mt-1 text-sm text-gray-500">
//                   This trolley hasn't been used for any completed shopping
//                   sessions yet.
//                 </p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {toast.show && (
//         <div className="fixed top-4 right-4 z-[1000]">
//           <div
//             className={`flex items-start p-4 rounded-lg border shadow-lg max-w-md ${
//               toast.status === "success"
//                 ? "bg-green-100 border-green-300 text-green-800"
//                 : toast.status === "error"
//                 ? "bg-red-100 border-red-300 text-red-800"
//                 : "bg-blue-100 border-blue-300 text-blue-800"
//             }`}
//             style={{ animation: "slideIn 0.3s forwards" }}
//           >
//             <div className="mr-3 mt-0.5">
//               {toast.status === "success" ? (
//                 <Check className="w-5 h-5" />
//               ) : (
//                 <X className="w-5 h-5" />
//               )}
//             </div>
//             <div className="flex-1">
//               <p className="text-sm font-medium">{toast.body}</p>
//             </div>
//             <button
//               onClick={() => setToast({ ...toast, show: false })}
//               className="ml-4 text-gray-500 hover:text-gray-700"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Clock,
  AlertTriangle,
  Package,
  Check,
  X,
  Loader2,
  Edit,
  Save,
  Trash2,
} from "lucide-react";
import axios from "axios";
import config from "../config";
import { useSocketListener } from "../context/socketContext";
import { useTheme } from "../context/themeContext";

export default function CartDetails({ trolley, history }) {
  const [activeTab, setActiveTab] = useState("items");
  const [cart, setCart] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAuditItems, setEditedAuditItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    body: "",
    status: "success",
  });
  const { theme } = useTheme();

  const showToast = (message, status) => {
    setToast({ show: true, body: message, status });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const getCart = async () => {
    if (trolley.status === "in-use") {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found.");
        return;
      }
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${config.serverApi}/pos/smart-cart/${trolley.current_cart}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Cart Details:", response.data);
        setCart(response.data.cart);
      } catch (error) {
        console.log("Error getting cart details:", error);
        showToast("Failed to load cart details", "error");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  useSocketListener("fraud_alert", (data) => {
    console.log("new fraud alert have come:", data);
    if (cart && cart._id === data.cartId) {
      showToast(
        "Malicious activity detected! Kindly review it immediately!",
        "error"
      );
    }
  });

  useSocketListener("purchase-complete", (data) => {
    if (cart && cart._id === data.cartId) {
      showToast(
        `Purchase complete on trolley with code: ${data.trolley_code}. Refresh to see changes!`,
        "success"
      );
    }
  });

  useSocketListener("fraud_update", (data) => {
    if (cart && cart._id === data.cartId && cart.auditId._id === data.auditId) {
      console.log("fraud products updated:", data);
      showToast(
        `Item added after verification: ${data.product.product_name}!!!!!!`,
        "error"
      );

      setCart((prevCart) => {
        const updatedAuditItems = [...prevCart.auditId.items];
        const incomingProduct = data.product;

        const existingIndex = updatedAuditItems.findIndex(
          (item) => item.product._id === incomingProduct._id
        );

        if (existingIndex !== -1) {
          // 🔄 Product exists → update quantity
          updatedAuditItems[existingIndex] = {
            ...updatedAuditItems[existingIndex],
            quantity: data.quantity,
          };
        } else {
          // ➕ Product doesn't exist → push new item
          updatedAuditItems.push({
            added_at: data.added_at,
            quantity: data.quantity,
            product: incomingProduct,
          });
        }

        return {
          ...prevCart,
          auditId: {
            ...prevCart.auditId,
            items: updatedAuditItems,
          },
        };
      });
    }
  });

  useSocketListener("cart_update", (data) => {
    if (cart && cart._id === data.cartId) {
      console.log("cart is updated:", data);
      showToast(
        `New item added to cart: ${data.product.product_name}`,
        "success"
      );

      setCart((prevCart) => {
        const updatedItems = [...prevCart.items];
        const incomingProduct = data.product;

        const existingIndex = updatedItems.findIndex(
          (item) => item.product._id === incomingProduct._id
        );

        if (existingIndex !== -1) {
          // 🔄 Product exists → update quantity
          updatedItems[existingIndex] = {
            ...updatedItems[existingIndex],
            quantity: data.quantity,
          };
        } else {
          // ➕ Product doesn't exist → push new item
          updatedItems.push({
            added_at: data.added_at,
            quantity: data.quantity,
            product: incomingProduct,
          });
        }

        return {
          ...prevCart,
          items: updatedItems,
        };
      });
    }
  });

  const handleSyncAuditItems = async () => {
    try {
      setIsSyncing(true);
      const token = localStorage.getItem("token");
      await axios.post(
        `${config.serverApi}/pos/smart-cart/audit-sync/${cart.auditId._id}`,
        { products: editedAuditItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEditing(false);
      showToast("Audit items synced successfully", "success");
      getCart(); // Refresh cart details
    } catch (error) {
      console.error("Error syncing audit data:", error);
      showToast("Failed to sync audit items", "error");
    } finally {
      setIsSyncing(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Active
          </span>
        );
      case "checking-out":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Checking Out
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
            Automated Verification done - Payment Pending
          </span>
        );
      default:
        return null;
    }
  };

  const totalPrice = cart?.items?.reduce((sum, item) => {
    const price = item?.product?.pricing?.[0]?.selling_price || 0; // Get selling price
    return sum + price * (item?.quantity || 1); // Multiply by quantity
  }, 0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              Trolley #{trolley.trolley_code}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              {trolley.last_used_at &&
                `Last used: ${formatDate(trolley.last_used_at)}`}
            </p>
          </div>
          <div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                trolley.status === "available"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : trolley.status === "in-use"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                  : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
              }`}
            >
              {trolley.status}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex">
          <button
            onClick={() => setActiveTab("items")}
            className={`py-3 px-6 text-center border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
              activeTab === "items"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Current Items
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`py-3 px-6 text-center border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
              activeTab === "history"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            <Clock className="w-4 h-4" />
            Shopping History
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading cart details...</span>
          </div>
        ) : activeTab === "items" ? (
          <div>
            {cart ? (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-medium">Current Cart</h3>
                    <p className="text-sm text-muted-foreground">
                      Started: {formatDate(cart?.created_at)}
                    </p>
                  </div>
                  <div>{getStatusBadge(cart?.status)}</div>
                </div>

                {/* Flags */}
                {cart?.flags && cart?.flags?.length > 0 && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg dark:bg-amber-900/20 dark:border-amber-800">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">
                          Attention needed
                        </h3>
                        <div className="mt-2 text-sm text-amber-700 dark:text-amber-400">
                          <ul className="list-disc pl-5 space-y-1">
                            {cart?.flags?.map((flag, index) => (
                              <li key={index}>
                                {flag?.issue} ({formatDate(flag?.flagged_at)})
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Audit Warning */}
                {cart?.auditId && cart?.auditId.items?.length > 0 && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
                          Manual Verification Required
                        </h3>
                        <p className="mt-1 text-sm text-red-700 dark:text-red-400">
                          Some products have been added after automated
                          verification.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Audit Items */}
                {cart?.auditId && cart?.auditId.items?.length > 0 && (
                  <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <div className="p-4 border-b border-border bg-muted/30 flex justify-between items-center">
                      <h4 className="font-medium">
                        Audit Items for Verification
                      </h4>
                      {!isEditing ? (
                        <button
                          onClick={() => {
                            setIsEditing(true);
                            setEditedAuditItems(cart.auditId.items); // Load items for editing
                          }}
                          className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsEditing(false)}
                          className="flex items-center gap-1 text-sm text-destructive hover:text-destructive/80 transition-colors"
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </button>
                      )}
                    </div>

                    <div className="p-4 space-y-3">
                      {isEditing ? (
                        <>
                          {editedAuditItems.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-3 bg-muted/20 rounded-lg"
                            >
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0 bg-muted rounded-md flex items-center justify-center">
                                  <Package className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div className="ml-3">
                                  <h5 className="text-sm font-medium">
                                    {item.product.product_name}
                                  </h5>
                                  <div className="flex items-center gap-2 mt-1">
                                    <label className="text-xs text-muted-foreground">
                                      Quantity:
                                    </label>
                                    <input
                                      type="number"
                                      value={item.quantity}
                                      onChange={(e) => {
                                        const updatedItems = [
                                          ...editedAuditItems,
                                        ];
                                        updatedItems[index].quantity = Number(
                                          e.target.value
                                        );
                                        setEditedAuditItems(updatedItems);
                                      }}
                                      className="w-16 text-sm px-2 py-1 rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  setEditedAuditItems(
                                    editedAuditItems.filter(
                                      (_, i) => i !== index
                                    )
                                  );
                                }}
                                className="p-1.5 rounded-md text-destructive hover:bg-destructive/10 transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}

                          <button
                            onClick={handleSyncAuditItems}
                            disabled={isSyncing}
                            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                          >
                            {isSyncing ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Syncing Changes...
                              </>
                            ) : (
                              <>
                                <Save className="h-4 w-4" />
                                Sync Changes
                              </>
                            )}
                          </button>
                        </>
                      ) : (
                        cart.auditId.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-3 bg-muted/20 rounded-lg"
                          >
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 bg-muted rounded-md flex items-center justify-center">
                                <Package className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div className="ml-3">
                                <h5 className="text-sm font-medium">
                                  {item.product.product_name}
                                </h5>
                                <p className="text-xs text-muted-foreground">
                                  Quantity: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <span className="font-medium">
                              ₹
                              {item.product.pricing[0].selling_price.toFixed(2)}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* Cart Items */}
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                  <div className="p-4 border-b border-border bg-muted/30 flex justify-between items-center">
                    <h4 className="font-medium">Cart Items</h4>
                    <span className="text-sm text-muted-foreground">
                      {cart?.items?.length || 0} items
                    </span>
                  </div>

                  <div className="p-4">
                    {cart?.items?.length > 0 ? (
                      <div className="space-y-3">
                        {cart?.items?.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-3 bg-muted/20 rounded-lg"
                          >
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 bg-muted rounded-md flex items-center justify-center">
                                <Package className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div className="ml-3">
                                <h5 className="text-sm font-medium">
                                  {item?.product?.product_name}
                                </h5>
                                <p className="text-xs text-muted-foreground">
                                  Added: {formatDate(item?.added_at)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-muted-foreground">
                                x{item?.quantity}
                              </span>
                              <span className="font-medium">
                                ₹
                                {item?.product?.pricing[0].selling_price.toFixed(
                                  2
                                )}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
                          <ShoppingCart className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground">
                          No items in cart yet
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Total Price */}
                <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg">
                  <span className="font-medium">Total Price</span>
                  <span className="text-lg font-bold">
                    ₹{totalPrice ? totalPrice.toFixed(2) : "0.00"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No Active Cart</h3>
                <p className="text-muted-foreground mt-1">
                  This trolley doesn't have an active shopping session.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-medium mb-6">Shopping History</h3>

            {history && history.length > 0 ? (
              <div className="space-y-6">
                {history.map((session, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-lg overflow-hidden"
                  >
                    <div className="p-4 border-b border-border bg-muted/30">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <h4 className="font-medium">
                            Shopping Session #{index + 1}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(session.verified_time)}
                          </p>
                        </div>
                        <div className="font-bold">
                          ₹{session.total_price.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="bg-muted/20 p-3 rounded-lg">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">
                              Payment Method
                            </span>
                            <span className="font-medium capitalize">
                              {session.payment_method}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Items</span>
                            <span className="font-medium">
                              {session.cart_items.length}
                            </span>
                          </div>
                        </div>

                        {session.flags && session.flags.length > 0 && (
                          <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg dark:bg-amber-900/20 dark:border-amber-800">
                            <div className="flex items-start">
                              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              <div className="ml-2">
                                <h6 className="text-xs font-medium text-amber-800 dark:text-amber-300">
                                  Issues Flagged
                                </h6>
                                <ul className="mt-1 text-xs text-amber-700 dark:text-amber-400 list-disc pl-4">
                                  {session.flags.map((flag, flagIndex) => (
                                    <li key={flagIndex}>{flag.issue}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="border-t border-border pt-4">
                        <h5 className="text-sm font-medium mb-3">
                          Purchased Items
                        </h5>
                        <div className="space-y-2">
                          {session.cart_items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex justify-between items-center p-2 bg-muted/20 rounded-lg"
                            >
                              <div className="flex items-center">
                                <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="text-sm">
                                  {item.product.product_name}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                  x{item.quantity}
                                </span>
                                <span className="text-sm font-medium">
                                  ₹{item.price_at_purchase.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No Shopping History</h3>
                <p className="text-muted-foreground mt-1">
                  This trolley hasn't been used for any completed shopping
                  sessions yet.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-[1000]">
          <div
            className={`flex items-start p-4 rounded-lg border shadow-lg max-w-md ${
              toast.status === "success"
                ? "bg-green-100 border-green-300 text-green-800 dark:bg-green-900/70 dark:border-green-800 dark:text-green-300"
                : toast.status === "error"
                ? "bg-red-100 border-red-300 text-red-800 dark:bg-red-900/70 dark:border-red-800 dark:text-red-300"
                : "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/70 dark:border-blue-800 dark:text-blue-300"
            }`}
            style={{ animation: "slideIn 0.3s forwards" }}
          >
            <div className="mr-3 mt-0.5">
              {toast.status === "success" ? (
                <Check className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{toast.body}</p>
            </div>
            <button
              onClick={() => setToast({ ...toast, show: false })}
              className="ml-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
