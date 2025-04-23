// // // import React, { useState } from "react";
// // // import { useSelector, useDispatch } from "react-redux";
// // // import { saveStoreInfo } from "../../redux/storeSlice";
// // // import StoreInfoModal from "./StoreInfoModal";

// // // const StoreInformationView = () => {
// // //   const storeData = useSelector((state) => state.store.storeInfo) || {};
// // //   const dispatch = useDispatch();
// // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

// // //   const handleEdit = () => setIsEditModalOpen(true);
// // //   const handleCloseModal = () => setIsEditModalOpen(false);
// // //   const handleSaveStoreInfo = (updatedInfo) => {
// // //     dispatch(saveStoreInfo(updatedInfo));
// // //     handleCloseModal(); // Close modal after saving
// // //   };

// // //   const formatValue = (value) => {
// // //     if (Array.isArray(value)) return value.length > 0 ? value.join(", ") : "N/A";
// // //     return value || "N/A";
// // //   };

// // //   const formatAddress = (address) => {
// // //     if (!address) return "N/A";
// // //     const { street, city, state, zip_code, country } = address;
// // //     return [street, city, state, zip_code, country].filter(Boolean).join(", ");
// // //   };

// // //   return (
// // //     <div className="p-8 text-white min-h-screen">
// // //       <h1 className="text-3xl font-bold mb-8 text-center">Store Information</h1>

// // //       <div >
// // //         <table className="min-w-full bg-gray-800 rounded-lg shadow-md text-xl text-white">
// // //           <tbody>
// // //             <TableRow label="Store Name" value={formatValue(storeData.storeName)} />
// // //             <TableRow label="Owner Name" value={formatValue(storeData.ownerName)} />
// // //             <TableRow label="Logo URLs" value={formatValue(storeData.logoURLs)} />
// // //             <TableRow label="Image URLs" value={formatValue(storeData.imageURLs)} />
// // //             <TableRow label="Address" value={formatAddress(storeData.address)} />
// // //             <TableRow label="Delivery Options" value={formatValue(storeData.deliveryOptions)} />
// // //             <TableRow label="Payment Options" value={formatValue(storeData.paymentOptions)} />
// // //           </tbody>
// // //         </table>
// // //       </div>

// // //       <div className="flex justify-center mt-6">
// // //         <button
// // //           className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
// // //           onClick={handleEdit}
// // //         >
// // //           Edit
// // //         </button>
// // //       </div>

// // //       {isEditModalOpen && (
// // //         <StoreInfoModal
// // //           storeInfo={storeData}
// // //           onClose={handleCloseModal}
// // //           handleSubmit={handleSaveStoreInfo}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // const TableRow = ({ label, value }) => (
// // //   <tr className="border-b border-gray-700">
// // //     <td className="py-4 px-6 font-semibold text-gray-300">{label}:</td>
// // //     <td className="py-4 px-6 text-gray-400">{value}</td>
// // //   </tr>
// // // );

// // // export default StoreInformationView;
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import StoreInfoModal from "./StoreInfoModal";
// // import config from "../../config";

// // const StoreInformationView = () => {
// //   const [storeData, setStoreData] = useState(null);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [isError, setIsError] = useState(false);
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

// //   useEffect(() => {
// //     const fetchStoreData = async () => {
// //       try {
// //         const token = localStorage.getItem("token"); // Get token from localStorage
// //         const response = await axios.get(`${config.serverApi}/pos/store`, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });
// //         setStoreData(response.data.store);
// //       } catch (error) {
// //         console.error("Error fetching store data:", error);
// //         setIsError(true);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchStoreData();
// //   }, []);

// //   const handleEdit = () => setIsEditModalOpen(true);
// //   const handleCloseModal = () => setIsEditModalOpen(false);

// //   const handleSaveStoreInfo = async (updatedInfo) => {
// //     console.log(updatedInfo);
// //     try {
// //       const token = localStorage.getItem("token");
// //       await axios.put(`${config.serverApi}/pos/store`, updatedInfo, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       setStoreData(updatedInfo);
// //       handleCloseModal();
// //     } catch (error) {
// //       console.error("Error updating store info:", error);
// //     }
// //   };

// //   const formatValue = (value) => {
// //     if (Array.isArray(value))
// //       return value.length > 0 ? value.join(", ") : "N/A";
// //     return value || "N/A";
// //   };

// //   const formatAddress = (address) => {
// //     if (!address) return "N/A";
// //     const { street, city, state, zip_code, country } = address;
// //     return [street, city, state, zip_code, country].filter(Boolean).join(", ");
// //   };

// //   if (isLoading)
// //     return <p className="text-center text-white">Loading store details...</p>;
// //   if (isError)
// //     return (
// //       <p className="text-center text-red-500">Failed to load store data.</p>
// //     );

// //   return (
// //     <div className="p-8 text-white min-h-screen">
// //       <h1 className="text-3xl font-bold mb-8 text-center">Store Information</h1>

// //       <table className="min-w-full bg-gray-800 rounded-lg shadow-md text-xl text-white">
// //         <tbody>
// //           <TableRow
// //             label="Store Name"
// //             value={formatValue(storeData?.store_name)}
// //           />
// //           <TableRow
// //             label="Owner Name"
// //             value={formatValue(storeData?.owner_name)}
// //           />
// //           <TableRow
// //             label="Phone Number"
// //             value={formatValue(storeData?.phone_number)}
// //           />
// //           <TableRow label="Email" value={formatValue(storeData?.email)} />
// //           <TableRow label="Logo URL" value={formatValue(storeData?.logo_url)} />
// //           <TableRow
// //             label="Image URLs"
// //             value={formatValue(storeData?.img_urls)}
// //           />
// //           <TableRow label="Address" value={formatAddress(storeData?.address)} />
// //           <TableRow
// //             label="Latitude"
// //             value={storeData?.location?.latitude || "N/A"}
// //           />
// //           <TableRow
// //             label="Longitude"
// //             value={storeData?.location?.longitude || "N/A"}
// //           />
// //           <TableRow
// //             label="Purchase Options"
// //             value={formatValue(storeData?.purchase_options)}
// //           />
// //           <TableRow
// //             label="Payment Options"
// //             value={formatValue(storeData?.payment_options)}
// //           />
// //         </tbody>
// //       </table>

// //       <div className="flex justify-center mt-6">
// //         <button
// //           className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
// //           onClick={handleEdit}
// //         >
// //           Edit
// //         </button>
// //       </div>

// //       {isEditModalOpen && (
// //         <StoreInfoModal
// //           storeInfo={storeData}
// //           onClose={handleCloseModal}
// //           handleSubmit={handleSaveStoreInfo}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // const TableRow = ({ label, value }) => (
// //   <tr className="border-b border-gray-700">
// //     <td className="py-4 px-6 font-semibold text-gray-300">{label}:</td>
// //     <td className="py-4 px-6 text-gray-400">{value}</td>
// //   </tr>
// // );

// // export default StoreInformationView;
// // a
// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import StoreInfoModal from "./StoreInfoModal";
// import config from "../../config";
// import {
//   Store,
//   MapPin,
//   Phone,
//   Mail,
//   ImageIcon,
//   CreditCard,
//   ShoppingBag,
//   Edit,
//   ExternalLink,
// } from "lucide-react";
// import { useTheme } from "../../context/themeContext";

// const StoreInformationView = () => {
//   const [storeData, setStoreData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const { theme } = useTheme();

//   useEffect(() => {
//     const fetchStoreData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`${config.serverApi}/pos/store`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setStoreData(response.data.store);
//       } catch (error) {
//         console.error("Error fetching store data:", error);
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchStoreData();
//   }, []);

//   const handleEdit = () => setIsEditModalOpen(true);
//   const handleCloseModal = () => setIsEditModalOpen(false);

//   const handleSaveStoreInfo = async (updatedInfo) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(`${config.serverApi}/pos/store`, updatedInfo, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setStoreData(updatedInfo);
//       handleCloseModal();
//     } catch (error) {
//       console.error("Error updating store info:", error);
//     }
//   };

//   const formatValue = (value) => {
//     if (Array.isArray(value))
//       return value.length > 0 ? value.join(", ") : "N/A";
//     return value || "N/A";
//   };

//   const formatAddress = (address) => {
//     if (!address) return "N/A";
//     const { street, city, state, zip_code, country } = address;
//     return [street, city, state, zip_code, country].filter(Boolean).join(", ");
//   };

//   if (isLoading) {
//     return (
//       <div className="p-6 min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="p-6 min-h-screen">
//         <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-center">
//           <p>Failed to load store data. Please try again later.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Store Information</h1>
//         <button
//           onClick={handleEdit}
//           className="btn-modern flex items-center gap-2"
//         >
//           <Edit size={18} />
//           Edit Store
//         </button>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Basic Info Card */}
//         <div className="bg-card rounded-xl shadow p-6">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
//               <Store className="h-5 w-5 text-primary" />
//             </div>
//             <h2 className="text-xl font-semibold">Basic Information</h2>
//           </div>

//           <div className="space-y-4">
//             <InfoItem label="Store Name" value={storeData?.store_name} />
//             <InfoItem
//               label="Phone Number"
//               value={storeData?.phone_number}
//               icon={<Phone size={16} className="text-muted-foreground" />}
//             />
//             <InfoItem
//               label="Email"
//               value={storeData?.email}
//               icon={<Mail size={16} className="text-muted-foreground" />}
//             />
//           </div>
//         </div>

//         {/* Address Card */}
//         <div className="bg-card rounded-xl shadow p-6">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
//               <MapPin className="h-5 w-5 text-primary" />
//             </div>
//             <h2 className="text-xl font-semibold">Address</h2>
//           </div>

//           <div className="space-y-4">
//             <div className="p-4 bg-muted/30 rounded-lg">
//               <p className="text-sm">{formatAddress(storeData?.address)}</p>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <InfoItem
//                 label="Latitude"
//                 value={storeData?.location?.latitude}
//               />
//               <InfoItem
//                 label="Longitude"
//                 value={storeData?.location?.longitude}
//               />
//             </div>

//             {storeData?.location?.latitude &&
//               storeData?.location?.longitude && (
//                 <a
//                   href={`https://maps.google.com/?q=${storeData.location.latitude},${storeData.location.longitude}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="btn-modern-outline flex items-center justify-center gap-2 w-full mt-2"
//                 >
//                   <MapPin size={16} />
//                   View on Map
//                   <ExternalLink size={14} />
//                 </a>
//               )}
//           </div>
//         </div>

//         {/* Options Card */}
//         <div className="bg-card rounded-xl shadow p-6">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
//               <CreditCard className="h-5 w-5 text-primary" />
//             </div>
//             <h2 className="text-xl font-semibold">Store Options</h2>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
//                 <ShoppingBag size={14} />
//                 Purchase Options
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {storeData?.purchase_options?.length > 0 ? (
//                   storeData.purchase_options.map((option) => (
//                     <span
//                       key={option}
//                       className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
//                     >
//                       {option === "inStore"
//                         ? "In-Store"
//                         : option === "online"
//                         ? "Online"
//                         : "Smart Trolley"}
//                     </span>
//                   ))
//                 ) : (
//                   <span className="text-muted-foreground text-sm">
//                     No purchase options set
//                   </span>
//                 )}
//               </div>
//             </div>

//             <div>
//               <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
//                 <CreditCard size={14} />
//                 Payment Options
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {storeData?.payment_options?.length > 0 ? (
//                   storeData.payment_options.map((option) => (
//                     <span
//                       key={option}
//                       className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
//                     >
//                       {option === "UPI"
//                         ? "UPI"
//                         : option.charAt(0).toUpperCase() + option.slice(1)}
//                     </span>
//                   ))
//                 ) : (
//                   <span className="text-muted-foreground text-sm">
//                     No payment options set
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Images Card */}
//         <div className="bg-card rounded-xl shadow p-6 lg:col-span-3">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
//               <ImageIcon className="h-5 w-5 text-primary" />
//             </div>
//             <h2 className="text-xl font-semibold">Store Images</h2>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <h3 className="text-sm font-medium text-muted-foreground mb-2">
//                 Logo URLs
//               </h3>
//               {storeData?.logo_url?.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {storeData.logo_url.map((url, index) => (
//                     <div
//                       key={index}
//                       className="p-3 bg-muted/30 rounded-lg flex items-center gap-3"
//                     >
//                       <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
//                         <ImageIcon size={16} className="text-primary" />
//                       </div>
//                       <span className="text-sm truncate flex-1">{url}</span>
//                       <a
//                         href={url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-primary hover:text-primary/80"
//                       >
//                         <ExternalLink size={14} />
//                       </a>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-muted-foreground text-sm">
//                   No logo URLs added
//                 </p>
//               )}
//             </div>

//             <div>
//               <h3 className="text-sm font-medium text-muted-foreground mb-2">
//                 Image URLs
//               </h3>
//               {storeData?.img_urls?.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {storeData.img_urls.map((url, index) => (
//                     <div
//                       key={index}
//                       className="p-3 bg-muted/30 rounded-lg flex items-center gap-3"
//                     >
//                       <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
//                         <ImageIcon size={16} className="text-primary" />
//                       </div>
//                       <span className="text-sm truncate flex-1">{url}</span>
//                       <a
//                         href={url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-primary hover:text-primary/80"
//                       >
//                         <ExternalLink size={14} />
//                       </a>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-muted-foreground text-sm">
//                   No image URLs added
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {isEditModalOpen && (
//         <StoreInfoModal
//           storeInfo={storeData}
//           onClose={handleCloseModal}
//           handleSubmit={handleSaveStoreInfo}
//         />
//       )}
//     </div>
//   );
// };

// const InfoItem = ({ label, value, icon }) => (
//   <div className="flex flex-col">
//     <span className="text-xs text-muted-foreground">{label}</span>
//     <div className="flex items-center gap-1">
//       {icon && icon}
//       <span className="font-medium">{value || "N/A"}</span>
//     </div>
//   </div>
// );

// export default StoreInformationView;
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import StoreInfoModal from "./StoreInfoModal";
import config from "../../config";
import {
  Store,
  MapPin,
  Phone,
  Mail,
  ImageIcon,
  CreditCard,
  ShoppingBag,
  Edit,
  ExternalLink,
  Maximize2,
  X,
} from "lucide-react";
import { useTheme } from "../../context/themeContext";

const StoreInformationView = () => {
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${config.serverApi}/pos/store`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStoreData(response.data.store);
      } catch (error) {
        console.error("Error fetching store data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoreData();
  }, []);

  const handleEdit = () => setIsEditModalOpen(true);
  const handleCloseModal = () => setIsEditModalOpen(false);

  const handleSaveStoreInfo = async (updatedInfo) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${config.serverApi}/pos/store`, updatedInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStoreData(updatedInfo);
      handleCloseModal();
    } catch (error) {
      console.error("Error updating store info:", error);
    }
  };

  const formatValue = (value) => {
    if (Array.isArray(value))
      return value.length > 0 ? value.join(", ") : "N/A";
    return value || "N/A";
  };

  const formatAddress = (address) => {
    if (!address) return "N/A";
    const { street, city, state, zip_code, country } = address;
    return [street, city, state, zip_code, country].filter(Boolean).join(", ");
  };

  // Handle image error
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/150?text=Invalid+Image";
  };

  if (isLoading) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 min-h-screen">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-center">
          <p>Failed to load store data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Store Information</h1>
        <button
          onClick={handleEdit}
          className="btn-modern flex items-center gap-2"
        >
          <Edit size={18} />
          Edit Store
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info Card */}
        <div className="bg-card rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Basic Information</h2>
          </div>

          <div className="space-y-4">
            <InfoItem label="Store Name" value={storeData?.store_name} />
            <InfoItem
              label="Phone Number"
              value={storeData?.phone_number}
              icon={<Phone size={16} className="text-muted-foreground" />}
            />
            <InfoItem
              label="Email"
              value={storeData?.email}
              icon={<Mail size={16} className="text-muted-foreground" />}
            />
          </div>
        </div>

        {/* Address Card */}
        <div className="bg-card rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Address</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm">{formatAddress(storeData?.address)}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InfoItem
                label="Latitude"
                value={storeData?.location?.latitude}
              />
              <InfoItem
                label="Longitude"
                value={storeData?.location?.longitude}
              />
            </div>

            {storeData?.location?.latitude &&
              storeData?.location?.longitude && (
                <>
                  <a
                    href={`https://maps.google.com/?q=${storeData.location.latitude},${storeData.location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-modern-outline flex items-center justify-center gap-2 w-full mt-2"
                  >
                    <MapPin size={16} />
                    View on Map
                    <ExternalLink size={14} />
                  </a>
                </>
              )}
          </div>
        </div>

        {/* Options Card */}
        <div className="bg-card rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Store Options</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <ShoppingBag size={14} />
                Purchase Options
              </h3>
              <div className="flex flex-wrap gap-2">
                {storeData?.purchase_options?.length > 0 ? (
                  storeData.purchase_options.map((option) => (
                    <span
                      key={option}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                    >
                      {option === "inStore"
                        ? "In-Store"
                        : option === "online"
                        ? "Online"
                        : "Smart Trolley"}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground text-sm">
                    No purchase options set
                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <CreditCard size={14} />
                Payment Options
              </h3>
              <div className="flex flex-wrap gap-2">
                {storeData?.payment_options?.length > 0 ? (
                  storeData.payment_options.map((option) => (
                    <span
                      key={option}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                    >
                      {option === "UPI"
                        ? "UPI"
                        : option.charAt(0).toUpperCase() + option.slice(1)}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground text-sm">
                    No payment options set
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Logo Images Card */}
        {storeData?.logo_url?.length > 0 && (
          <div className="bg-card rounded-xl shadow p-6 lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ImageIcon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Logo Images</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {storeData.logo_url.map((url, index) => (
                <div
                  key={index}
                  className="bg-muted rounded-lg overflow-hidden group"
                >
                  <div className="relative aspect-square bg-muted/50 flex items-center justify-center overflow-hidden">
                    <img
                      src={url || "/placeholder.svg"}
                      alt={`Logo ${index + 1}`}
                      className="w-full h-full object-contain"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => setPreviewImage(url)}
                        className="p-2 bg-background/80 rounded-full"
                        title="View larger"
                      >
                        <Maximize2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="p-3 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                        Logo {index + 1}
                      </span>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Map Card */}
        {storeData?.location?.latitude && storeData?.location?.longitude && (
          <div className="bg-card rounded-xl shadow p-6 lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Store Location</h2>
            </div>

            <MapDisplay
              latitude={storeData.location.latitude}
              longitude={storeData.location.longitude}
            />
          </div>
        )}

        {/* Store Images Card */}
        {storeData?.img_urls?.length > 0 && (
          <div className="bg-card rounded-xl shadow p-6 lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ImageIcon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Store Images</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {storeData.img_urls.map((url, index) => (
                <div
                  key={index}
                  className="bg-muted rounded-lg overflow-hidden group"
                >
                  <div className="relative aspect-square bg-muted/50 flex items-center justify-center overflow-hidden">
                    <img
                      src={url || "/placeholder.svg"}
                      alt={`Store image ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => setPreviewImage(url)}
                        className="p-2 bg-background/80 rounded-full"
                        title="View larger"
                      >
                        <Maximize2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="p-3 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                        Image {index + 1}
                      </span>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isEditModalOpen && (
        <StoreInfoModal
          storeInfo={storeData}
          onClose={handleCloseModal}
          handleSubmit={handleSaveStoreInfo}
        />
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center">
            <button
              className="absolute top-2 right-2 p-2 bg-background/80 rounded-full z-10"
              onClick={() => setPreviewImage(null)}
            >
              <X size={20} />
            </button>
            <img
              src={previewImage || "/placeholder.svg"}
              alt="Preview"
              className="max-w-full max-h-[85vh] object-contain"
              onError={handleImageError}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ label, value, icon }) => (
  <div className="flex flex-col">
    <span className="text-xs text-muted-foreground">{label}</span>
    <div className="flex items-center gap-1">
      {icon && icon}
      <span className="font-medium">{value || "N/A"}</span>
    </div>
  </div>
);

const MapDisplay = ({ latitude, longitude }) => {
  if (!latitude || !longitude) return null;

  // Create the map URL
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    Number.parseFloat(longitude) - 0.01
  },${Number.parseFloat(latitude) - 0.01},${
    Number.parseFloat(longitude) + 0.01
  },${
    Number.parseFloat(latitude) + 0.01
  }&layer=mapnik&marker=${latitude},${longitude}`;

  return (
    <div className="mt-6 rounded-xl overflow-hidden border border-border h-[300px] lg:h-[400px]">
      <iframe
        title="Store Location Map"
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={mapUrl}
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default StoreInformationView;
