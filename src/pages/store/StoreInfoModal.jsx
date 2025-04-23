// // import React, { useState } from "react";

// // const StoreInfoModal = ({ storeInfo, onClose, handleSubmit }) => {
// //   const [localStoreInfo, setLocalStoreInfo] = useState(storeInfo);
// //   const [logoUrlInput, setLogoUrlInput] = useState(""); // for handling individual input
// //   const [imgUrlInput, setImgUrlInput] = useState(""); // for handling individual input

// //   // Handle changes in input fields, whether it's a regular input or nested field
// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;

// //     if (name === "phone_number") {
// //       // Remove all non-digit characters
// //       const digitsOnly = value.replace(/\D/g, "");

// //       // Prevent number from starting with 0
// //       if (digitsOnly.length === 1 && digitsOnly[0] === "0") return;

// //       // Allow up to 10 digits only
// //       if (digitsOnly.length <= 10) {
// //         setLocalStoreInfo((prev) => ({
// //           ...prev,
// //           [name]: digitsOnly,
// //         }));
// //       }
// //     } else if (name.includes("address")) {
// //       const field = name.split(".")[1];
// //       setLocalStoreInfo((prev) => ({
// //         ...prev,
// //         address: { ...prev.address, [field]: value },
// //       }));
// //     } else if (name.includes("location")) {
// //       const field = name.split(".")[1];
// //       setLocalStoreInfo((prev) => ({
// //         ...prev,
// //         location: { ...prev.location, [field]: value },
// //       }));
// //     } else {
// //       setLocalStoreInfo((prev) => ({ ...prev, [name]: value }));
// //     }
// //   };

// //   // Handle adding URL to logo_url or img_urls
// //   const handleAddUrl = (e, field, inputValue, setInputValue) => {
// //     e.preventDefault(); // Prevent form submission

// //     if (inputValue.trim()) {
// //       setLocalStoreInfo((prev) => ({
// //         ...prev,
// //         [field]: [...prev[field], inputValue.trim()],
// //       }));
// //       setInputValue(""); // Clear the input field after adding the URL
// //     }
// //   };

// //   // Handle checkbox changes for multi-selection fields like purchase_options and payment_options
// //   const handleCheckboxChange = (e, field) => {
// //     const { value, checked } = e.target;

// //     setLocalStoreInfo((prev) => {
// //       const updatedArray = checked
// //         ? [...prev[field], value] // Add if checked
// //         : prev[field].filter((item) => item !== value); // Remove if unchecked

// //       return { ...prev, [field]: updatedArray };
// //     });
// //   };

// //   // Handle saving of the updated store information
// //   const handleSave = () => {
// //     console.log("Updated Store Information:", localStoreInfo);
// //     const isValidPhoneNumber = (number) => {
// //       return /^[1-9][0-9]{9}$/.test(number);
// //     };

// //     if (!isValidPhoneNumber(localStoreInfo.phone_number)) {
// //       alert("Phone number must be 10 digits and not start with 0.");
// //       return;
// //     }

// //     handleSubmit(localStoreInfo);
// //     onClose();
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
// //       <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
// //         <h2 className="text-3xl font-bold mb-6">Edit Store Information</h2>

// //         {/* Store Name Input */}
// //         <input
// //           type="text"
// //           name="store_name"
// //           value={localStoreInfo.store_name}
// //           onChange={handleInputChange}
// //           placeholder="Store Name"
// //           className="input-field w-full mb-4"
// //         />

// //         {/* Owner Name Input */}
// //         <input
// //           type="text"
// //           name="owner_name"
// //           value={localStoreInfo.owner_name}
// //           onChange={handleInputChange}
// //           placeholder="Owner Name"
// //           className="input-field w-full mb-4"
// //         />

// //         <div className="mb-4">
// //           <input
// //             type="text"
// //             name="phone_number" // Added phone number field
// //             placeholder="Phone Number"
// //             value={localStoreInfo.phone_number} // Handling phone number state
// //             onChange={handleInputChange}
// //             className="input-field1"
// //           />
// //         </div>

// //         {/* Logo URLs Input with "Add" button */}
// //         <div>
// //           <input
// //             type="text"
// //             value={logoUrlInput}
// //             onChange={(e) => setLogoUrlInput(e.target.value)}
// //             placeholder="Add Logo URL"
// //             className="input-field w-full mb-2"
// //           />
// //           <button
// //             onClick={(e) =>
// //               handleAddUrl(e, "logo_url", logoUrlInput, setLogoUrlInput)
// //             }
// //             className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
// //           >
// //             Add Logo URL
// //           </button>
// //           <ul>
// //             {localStoreInfo.logo_url.map((url, index) => (
// //               <li key={index}>{url}</li>
// //             ))}
// //           </ul>
// //         </div>

// //         {/* Image URLs Input with "Add" button */}
// //         <div>
// //           <input
// //             type="text"
// //             value={imgUrlInput}
// //             onChange={(e) => setImgUrlInput(e.target.value)}
// //             placeholder="Add Image URL"
// //             className="input-field w-full mb-2"
// //           />
// //           <button
// //             onClick={(e) =>
// //               handleAddUrl(e, "img_urls", imgUrlInput, setImgUrlInput)
// //             }
// //             className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
// //           >
// //             Add Image URL
// //           </button>
// //           <ul>
// //             {localStoreInfo.img_urls.map((url, index) => (
// //               <li key={index}>{url}</li>
// //             ))}
// //           </ul>
// //         </div>

// //         {/* Address Inputs */}
// //         <h3 className="text-xl font-semibold mb-2">Address:</h3>
// //         <input
// //           type="text"
// //           name="address.street"
// //           value={localStoreInfo.address.street}
// //           onChange={handleInputChange}
// //           placeholder="Street"
// //           className="input-field w-full mb-2"
// //         />
// //         <input
// //           type="text"
// //           name="address.city"
// //           value={localStoreInfo.address.city}
// //           onChange={handleInputChange}
// //           placeholder="City"
// //           className="input-field w-full mb-2"
// //         />
// //         <input
// //           type="text"
// //           name="address.state"
// //           value={localStoreInfo.address.state}
// //           onChange={handleInputChange}
// //           placeholder="State"
// //           className="input-field w-full mb-2"
// //         />
// //         <input
// //           type="text"
// //           name="address.zip_code"
// //           value={localStoreInfo.address.zip_code}
// //           onChange={handleInputChange}
// //           placeholder="Zip Code"
// //           className="input-field w-full mb-2"
// //         />
// //         <input
// //           type="text"
// //           name="address.country"
// //           value={localStoreInfo.address.country}
// //           onChange={handleInputChange}
// //           placeholder="Country"
// //           className="input-field w-full mb-4"
// //         />

// //         {/* Location Coordinates Input */}
// //         <div>
// //           <h3 className="text-xl font-semibold mb-2">Location Coordinates:</h3>
// //           <input
// //             type="text"
// //             name="location.latitude"
// //             value={localStoreInfo.location.latitude}
// //             onChange={handleInputChange}
// //             placeholder="Latitude"
// //             className="input-field w-full mb-2"
// //           />
// //           <input
// //             type="text"
// //             name="location.longitude"
// //             value={localStoreInfo.location.longitude}
// //             onChange={handleInputChange}
// //             placeholder="Longitude"
// //             className="input-field w-full mb-4"
// //           />
// //         </div>

// //         <h2 className="text-xl font-semibold mt-6">Purchase Options</h2>
// //         <div className="flex gap-6">
// //           {["inStore", "online", "smart"].map((option) => (
// //             <label key={option} className="flex items-center space-x-2">
// //               <input
// //                 type="checkbox"
// //                 value={option}
// //                 checked={localStoreInfo.purchase_options.includes(option)} // Updated field name
// //                 onChange={
// //                   (e) => handleCheckboxChange(e, "purchase_options") // Updated field name
// //                 }
// //               />
// //               <span>{option}</span>
// //             </label>
// //           ))}
// //         </div>

// //         <h2 className="text-xl font-semibold mt-6">Payment Options</h2>
// //         <div className="flex gap-6">
// //           {["cash", "card", "UPI", "wallet"].map((option) => (
// //             <label key={option} className="flex items-center space-x-2">
// //               <input
// //                 type="checkbox"
// //                 value={option}
// //                 checked={localStoreInfo.payment_options.includes(option)} // Updated field name
// //                 onChange={
// //                   (e) => handleCheckboxChange(e, "payment_options") // Updated field name
// //                 }
// //               />
// //               <span>{option}</span>
// //             </label>
// //           ))}
// //         </div>

// //         <div className="flex justify-end gap-4 mt-6">
// //           <button
// //             className="bg-gray-600 text-white px-4 py-2 rounded-md"
// //             onClick={onClose}
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             className="bg-blue-600 text-white px-4 py-2 rounded-md"
// //             onClick={handleSave}
// //           >
// //             Save
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default StoreInfoModal;
// "use client";

// import { useState } from "react";
// import {
//   X,
//   Store,
//   MapPin,
//   Phone,
//   Mail,
//   ImageIcon,
//   CreditCard,
//   ShoppingBag,
//   Check,
//   Trash2,
// } from "lucide-react";
// import { useTheme } from "../../context/themeContext";

// const StoreInfoModal = ({ storeInfo, onClose, handleSubmit }) => {
//   const [localStoreInfo, setLocalStoreInfo] = useState(storeInfo);
//   const [logoUrlInput, setLogoUrlInput] = useState(""); // for handling individual input
//   const [imgUrlInput, setImgUrlInput] = useState(""); // for handling individual input
//   const [activeTab, setActiveTab] = useState("basic");
//   const [errors, setErrors] = useState({});
//   const { theme } = useTheme();

//   // Handle changes in input fields, whether it's a regular input or nested field
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "phone_number") {
//       // Remove all non-digit characters
//       const digitsOnly = value.replace(/\D/g, "");

//       // Prevent number from starting with 0
//       if (digitsOnly.length === 1 && digitsOnly[0] === "0") return;

//       // Allow up to 10 digits only
//       if (digitsOnly.length <= 10) {
//         setLocalStoreInfo((prev) => ({
//           ...prev,
//           [name]: digitsOnly,
//         }));
//       }
//     } else if (name.includes("address")) {
//       const field = name.split(".")[1];
//       setLocalStoreInfo((prev) => ({
//         ...prev,
//         address: { ...prev.address, [field]: value },
//       }));
//     } else if (name.includes("location")) {
//       const field = name.split(".")[1];
//       setLocalStoreInfo((prev) => ({
//         ...prev,
//         location: { ...prev.location, [field]: value },
//       }));
//     } else {
//       setLocalStoreInfo((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // Handle adding URL to logo_url or img_urls
//   const handleAddUrl = (e, field, inputValue, setInputValue) => {
//     e.preventDefault(); // Prevent form submission

//     if (inputValue.trim()) {
//       setLocalStoreInfo((prev) => ({
//         ...prev,
//         [field]: [...prev[field], inputValue.trim()],
//       }));
//       setInputValue(""); // Clear the input field after adding the URL
//     }
//   };

//   // Handle removing URL
//   const handleRemoveUrl = (field, index) => {
//     setLocalStoreInfo((prev) => ({
//       ...prev,
//       [field]: prev[field].filter((_, i) => i !== index),
//     }));
//   };

//   // Handle checkbox changes for multi-selection fields like purchase_options and payment_options
//   const handleCheckboxChange = (e, field) => {
//     const { value, checked } = e.target;

//     setLocalStoreInfo((prev) => {
//       const updatedArray = checked
//         ? [...prev[field], value] // Add if checked
//         : prev[field].filter((item) => item !== value); // Remove if unchecked

//       return { ...prev, [field]: updatedArray };
//     });
//   };

//   // Validate form before saving
//   const validateForm = () => {
//     const newErrors = {};

//     if (
//       !localStoreInfo.phone_number ||
//       !/^[1-9][0-9]{9}$/.test(localStoreInfo.phone_number)
//     ) {
//       newErrors.phone_number =
//         "Phone number must be 10 digits and not start with 0.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle saving of the updated store information
//   const handleSave = () => {
//     if (!validateForm()) return;

//     console.log("Updated Store Information:", localStoreInfo);
//     handleSubmit(localStoreInfo);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
//       <div className="bg-card rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-border">
//           <div className="flex justify-between items-center">
//             <h2 className="text-2xl font-bold">Edit Store Information</h2>
//             <button
//               onClick={onClose}
//               className="p-2 rounded-full hover:bg-muted"
//             >
//               <X size={20} />
//             </button>
//           </div>
//         </div>

//         <div className="p-6">
//           {/* Tabs */}
//           <div className="flex border-b border-border mb-6 overflow-x-auto">
//             <button
//               onClick={() => setActiveTab("basic")}
//               className={`px-4 py-3 flex items-center gap-2 font-medium text-sm whitespace-nowrap ${
//                 activeTab === "basic"
//                   ? "border-b-2 border-primary text-primary"
//                   : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               <Store size={18} />
//               Basic Info
//             </button>
//             <button
//               onClick={() => setActiveTab("address")}
//               className={`px-4 py-3 flex items-center gap-2 font-medium text-sm whitespace-nowrap ${
//                 activeTab === "address"
//                   ? "border-b-2 border-primary text-primary"
//                   : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               <MapPin size={18} />
//               Address
//             </button>
//             <button
//               onClick={() => setActiveTab("options")}
//               className={`px-4 py-3 flex items-center gap-2 font-medium text-sm whitespace-nowrap ${
//                 activeTab === "options"
//                   ? "border-b-2 border-primary text-primary"
//                   : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               <ShoppingBag size={18} />
//               Options
//             </button>
//             <button
//               onClick={() => setActiveTab("images")}
//               className={`px-4 py-3 flex items-center gap-2 font-medium text-sm whitespace-nowrap ${
//                 activeTab === "images"
//                   ? "border-b-2 border-primary text-primary"
//                   : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               <ImageIcon size={18} />
//               Images
//             </button>
//           </div>

//           {/* Basic Info Tab */}
//           {activeTab === "basic" && (
//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Store Name</label>
//                 <div className="relative">
//                   <Store
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
//                     size={18}
//                   />
//                   <input
//                     type="text"
//                     name="store_name"
//                     value={localStoreInfo.store_name}
//                     onChange={handleInputChange}
//                     placeholder="Enter store name"
//                     className="input-modern pl-10"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Phone Number</label>
//                 <div className="relative">
//                   <Phone
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
//                     size={18}
//                   />
//                   <input
//                     type="text"
//                     name="phone_number"
//                     value={localStoreInfo.phone_number}
//                     onChange={handleInputChange}
//                     placeholder="Enter phone number"
//                     className="input-modern pl-10"
//                   />
//                 </div>
//                 {errors.phone_number && (
//                   <p className="text-destructive text-sm">
//                     {errors.phone_number}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Email</label>
//                 <div className="relative">
//                   <Mail
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
//                     size={18}
//                   />
//                   <input
//                     type="email"
//                     name="email"
//                     value={localStoreInfo.email || ""}
//                     onChange={handleInputChange}
//                     placeholder="Enter email address"
//                     className="input-modern pl-10"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Address Tab */}
//           {activeTab === "address" && (
//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Street</label>
//                 <input
//                   type="text"
//                   name="address.street"
//                   value={localStoreInfo.address.street}
//                   onChange={handleInputChange}
//                   placeholder="Enter street address"
//                   className="input-modern"
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">City</label>
//                   <input
//                     type="text"
//                     name="address.city"
//                     value={localStoreInfo.address.city}
//                     onChange={handleInputChange}
//                     placeholder="Enter city"
//                     className="input-modern"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">State</label>
//                   <input
//                     type="text"
//                     name="address.state"
//                     value={localStoreInfo.address.state}
//                     onChange={handleInputChange}
//                     placeholder="Enter state"
//                     className="input-modern"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Zip Code</label>
//                   <input
//                     type="text"
//                     name="address.zip_code"
//                     value={localStoreInfo.address.zip_code}
//                     onChange={handleInputChange}
//                     placeholder="Enter zip code"
//                     className="input-modern"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Country</label>
//                   <input
//                     type="text"
//                     name="address.country"
//                     value={localStoreInfo.address.country}
//                     onChange={handleInputChange}
//                     placeholder="Enter country"
//                     className="input-modern"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Latitude</label>
//                   <input
//                     type="text"
//                     name="location.latitude"
//                     value={localStoreInfo.location.latitude}
//                     onChange={handleInputChange}
//                     placeholder="Enter latitude"
//                     className="input-modern"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Longitude</label>
//                   <input
//                     type="text"
//                     name="location.longitude"
//                     value={localStoreInfo.location.longitude}
//                     onChange={handleInputChange}
//                     placeholder="Enter longitude"
//                     className="input-modern"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Options Tab */}
//           {activeTab === "options" && (
//             <div className="space-y-6">
//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium flex items-center gap-2">
//                   <ShoppingBag size={20} className="text-primary" />
//                   Purchase Options
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                   {["inStore", "online", "smart"].map((option) => (
//                     <label
//                       key={option}
//                       className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/30"
//                     >
//                       <input
//                         type="checkbox"
//                         value={option}
//                         checked={localStoreInfo.purchase_options.includes(
//                           option
//                         )}
//                         onChange={(e) =>
//                           handleCheckboxChange(e, "purchase_options")
//                         }
//                         className="h-4 w-4 text-primary"
//                       />
//                       <span className="flex-1">
//                         {option === "inStore"
//                           ? "In-Store"
//                           : option === "online"
//                           ? "Online"
//                           : "Smart Trolley"}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium flex items-center gap-2">
//                   <CreditCard size={20} className="text-primary" />
//                   Payment Options
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {["cash", "card", "UPI", "wallet"].map((option) => (
//                     <label
//                       key={option}
//                       className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/30"
//                     >
//                       <input
//                         type="checkbox"
//                         value={option}
//                         checked={localStoreInfo.payment_options.includes(
//                           option
//                         )}
//                         onChange={(e) =>
//                           handleCheckboxChange(e, "payment_options")
//                         }
//                         className="h-4 w-4 text-primary"
//                       />
//                       <span className="flex-1">
//                         {option === "UPI"
//                           ? "UPI"
//                           : option.charAt(0).toUpperCase() + option.slice(1)}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Images Tab */}
//           {activeTab === "images" && (
//             <div className="space-y-6">
//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium flex items-center gap-2">
//                   <ImageIcon size={20} className="text-primary" />
//                   Logo URL
//                 </h3>
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="text"
//                     value={logoUrlInput}
//                     onChange={(e) => setLogoUrlInput(e.target.value)}
//                     placeholder="Enter logo URL"
//                     className="input-modern flex-1"
//                   />
//                   <button
//                     onClick={(e) =>
//                       handleAddUrl(e, "logo_url", logoUrlInput, setLogoUrlInput)
//                     }
//                     className="btn-modern"
//                   >
//                     Add
//                   </button>
//                 </div>

//                 {localStoreInfo.logo_url.length > 0 && (
//                   <div className="space-y-2 mt-2">
//                     {localStoreInfo.logo_url.map((url, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center justify-between p-3 bg-muted rounded-lg"
//                       >
//                         <div className="flex items-center gap-2 overflow-hidden">
//                           <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
//                             <ImageIcon size={16} className="text-primary" />
//                           </div>
//                           <span className="truncate">{url}</span>
//                         </div>
//                         <button
//                           onClick={() => handleRemoveUrl("logo_url", index)}
//                           className="text-destructive hover:text-destructive/80"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium flex items-center gap-2">
//                   <ImageIcon size={20} className="text-primary" />
//                   Store Images
//                 </h3>
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="text"
//                     value={imgUrlInput}
//                     onChange={(e) => setImgUrlInput(e.target.value)}
//                     placeholder="Enter image URL"
//                     className="input-modern flex-1"
//                   />
//                   <button
//                     onClick={(e) =>
//                       handleAddUrl(e, "img_urls", imgUrlInput, setImgUrlInput)
//                     }
//                     className="btn-modern"
//                   >
//                     Add
//                   </button>
//                 </div>

//                 {localStoreInfo.img_urls.length > 0 && (
//                   <div className="space-y-2 mt-2">
//                     {localStoreInfo.img_urls.map((url, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center justify-between p-3 bg-muted rounded-lg"
//                       >
//                         <div className="flex items-center gap-2 overflow-hidden">
//                           <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
//                             <ImageIcon size={16} className="text-primary" />
//                           </div>
//                           <span className="truncate">{url}</span>
//                         </div>
//                         <button
//                           onClick={() => handleRemoveUrl("img_urls", index)}
//                           className="text-destructive hover:text-destructive/80"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           <div className="flex justify-end gap-4 mt-8">
//             <button className="btn-modern-outline" onClick={onClose}>
//               Cancel
//             </button>
//             <button
//               className="btn-modern flex items-center gap-2"
//               onClick={handleSave}
//             >
//               <Check size={18} />
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StoreInfoModal;
"use client";

import { useState } from "react";
import {
  X,
  Store,
  MapPin,
  Phone,
  Mail,
  ImageIcon,
  CreditCard,
  ShoppingBag,
  Check,
  Trash2,
  ExternalLink,
  Maximize2,
  XIcon,
} from "lucide-react";
import { useTheme } from "../../context/themeContext";

const StoreInfoModal = ({ storeInfo, onClose, handleSubmit }) => {
  const [localStoreInfo, setLocalStoreInfo] = useState(storeInfo);
  const [logoUrlInput, setLogoUrlInput] = useState(""); // for handling individual input
  const [imgUrlInput, setImgUrlInput] = useState(""); // for handling individual input
  const [activeTab, setActiveTab] = useState("basic");
  const [errors, setErrors] = useState({});
  const { theme } = useTheme();
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Handle changes in input fields, whether it's a regular input or nested field
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone_number") {
      // Remove all non-digit characters
      const digitsOnly = value.replace(/\D/g, "");

      // Prevent number from starting with 0
      if (digitsOnly.length === 1 && digitsOnly[0] === "0") return;

      // Allow up to 10 digits only
      if (digitsOnly.length <= 10) {
        setLocalStoreInfo((prev) => ({
          ...prev,
          [name]: digitsOnly,
        }));
      }
    } else if (name.includes("address")) {
      const field = name.split(".")[1];
      setLocalStoreInfo((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else if (name.includes("location")) {
      const field = name.split(".")[1];
      setLocalStoreInfo((prev) => ({
        ...prev,
        location: { ...prev.location, [field]: value },
      }));
    } else {
      setLocalStoreInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle adding URL to logo_url or img_urls
  const handleAddUrl = (e, field, inputValue, setInputValue) => {
    e.preventDefault(); // Prevent form submission

    if (inputValue.trim()) {
      setLocalStoreInfo((prev) => ({
        ...prev,
        [field]: [...prev[field], inputValue.trim()],
      }));
      setInputValue(""); // Clear the input field after adding the URL
    }
  };

  // Handle removing URL
  const handleRemoveUrl = (field, index) => {
    setLocalStoreInfo((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Handle getting current device location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocalStoreInfo((prev) => ({
          ...prev,
          location: {
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          },
        }));
        setIsGettingLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert(`Error getting location: ${error.message}`);
        setIsGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  // Handle checkbox changes for multi-selection fields like purchase_options and payment_options
  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;

    setLocalStoreInfo((prev) => {
      const updatedArray = checked
        ? [...prev[field], value] // Add if checked
        : prev[field].filter((item) => item !== value); // Remove if unchecked

      return { ...prev, [field]: updatedArray };
    });
  };

  // Validate form before saving
  const validateForm = () => {
    const newErrors = {};

    if (
      !localStoreInfo.phone_number ||
      !/^[1-9][0-9]{9}$/.test(localStoreInfo.phone_number)
    ) {
      newErrors.phone_number =
        "Phone number must be 10 digits and not start with 0.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle saving of the updated store information
  const handleSave = () => {
    if (!validateForm()) return;

    console.log("Updated Store Information:", localStoreInfo);
    handleSubmit(localStoreInfo);
    onClose();
  };

  // Handle image preview
  const openImagePreview = (url) => {
    setPreviewImage(url);
  };

  // Handle image error
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/150?text=Invalid+Image";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-card rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Edit Store Information</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex border-b border-border mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab("basic")}
              className={`px-4 py-3 flex items-center gap-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "basic"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Store size={18} />
              Basic Info
            </button>
            <button
              onClick={() => setActiveTab("address")}
              className={`px-4 py-3 flex items-center gap-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "address"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <MapPin size={18} />
              Address
            </button>
            <button
              onClick={() => setActiveTab("options")}
              className={`px-4 py-3 flex items-center gap-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "options"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ShoppingBag size={18} />
              Options
            </button>
            <button
              onClick={() => setActiveTab("images")}
              className={`px-4 py-3 flex items-center gap-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "images"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ImageIcon size={18} />
              Images
            </button>
          </div>

          {/* Basic Info Tab */}
          {activeTab === "basic" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Store Name</label>
                <div className="relative">
                  <Store
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                  <input
                    type="text"
                    name="store_name"
                    value={localStoreInfo.store_name}
                    onChange={handleInputChange}
                    placeholder="Enter store name"
                    className="input-modern pl-10"
                  />
                </div>
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
                    value={localStoreInfo.phone_number}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="input-modern pl-10"
                  />
                </div>
                {errors.phone_number && (
                  <p className="text-destructive text-sm">
                    {errors.phone_number}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                  <input
                    type="email"
                    name="email"
                    value={localStoreInfo.email || ""}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="input-modern pl-10"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Address Tab */}
          {activeTab === "address" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Street</label>
                <input
                  type="text"
                  name="address.street"
                  value={localStoreInfo.address.street}
                  onChange={handleInputChange}
                  placeholder="Enter street address"
                  className="input-modern"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <input
                    type="text"
                    name="address.city"
                    value={localStoreInfo.address.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    className="input-modern"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">State</label>
                  <input
                    type="text"
                    name="address.state"
                    value={localStoreInfo.address.state}
                    onChange={handleInputChange}
                    placeholder="Enter state"
                    className="input-modern"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Zip Code</label>
                  <input
                    type="text"
                    name="address.zip_code"
                    value={localStoreInfo.address.zip_code}
                    onChange={handleInputChange}
                    placeholder="Enter zip code"
                    className="input-modern"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Country</label>
                  <input
                    type="text"
                    name="address.country"
                    value={localStoreInfo.address.country}
                    onChange={handleInputChange}
                    placeholder="Enter country"
                    className="input-modern"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Latitude</label>
                  <input
                    type="text"
                    name="location.latitude"
                    value={localStoreInfo.location.latitude}
                    onChange={handleInputChange}
                    placeholder="Enter latitude"
                    className="input-modern"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Longitude</label>
                  <input
                    type="text"
                    name="location.longitude"
                    value={localStoreInfo.location.longitude}
                    onChange={handleInputChange}
                    placeholder="Enter longitude"
                    className="input-modern"
                  />
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="btn-modern flex items-center gap-2"
                  disabled={isGettingLocation}
                >
                  {isGettingLocation ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                      Getting location...
                    </>
                  ) : (
                    <>
                      <MapPin size={18} />
                      Use Current Location
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Options Tab */}
          {activeTab === "options" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <ShoppingBag size={20} className="text-primary" />
                  Purchase Options
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["inStore", "online", "smart"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/30"
                    >
                      <input
                        type="checkbox"
                        value={option}
                        checked={localStoreInfo.purchase_options.includes(
                          option
                        )}
                        onChange={(e) =>
                          handleCheckboxChange(e, "purchase_options")
                        }
                        className="h-4 w-4 text-primary"
                      />
                      <span className="flex-1">
                        {option === "inStore"
                          ? "In-Store"
                          : option === "online"
                          ? "Online"
                          : "Smart Trolley"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <CreditCard size={20} className="text-primary" />
                  Payment Options
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["cash", "card", "UPI", "wallet"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/30"
                    >
                      <input
                        type="checkbox"
                        value={option}
                        checked={localStoreInfo.payment_options.includes(
                          option
                        )}
                        onChange={(e) =>
                          handleCheckboxChange(e, "payment_options")
                        }
                        className="h-4 w-4 text-primary"
                      />
                      <span className="flex-1">
                        {option === "UPI"
                          ? "UPI"
                          : option.charAt(0).toUpperCase() + option.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Images Tab */}
          {activeTab === "images" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <ImageIcon size={20} className="text-primary" />
                  Logo URL
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={logoUrlInput}
                    onChange={(e) => setLogoUrlInput(e.target.value)}
                    placeholder="Enter logo URL"
                    className="input-modern flex-1"
                  />
                  <button
                    onClick={(e) =>
                      handleAddUrl(e, "logo_url", logoUrlInput, setLogoUrlInput)
                    }
                    className="btn-modern"
                  >
                    Add
                  </button>
                </div>

                {localStoreInfo.logo_url.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {localStoreInfo.logo_url.map((url, index) => (
                      <div
                        key={index}
                        className="bg-muted rounded-lg overflow-hidden"
                      >
                        <div className="relative aspect-video bg-muted/50 flex items-center justify-center overflow-hidden">
                          <img
                            src={url || "/placeholder.svg"}
                            alt={`Logo ${index + 1}`}
                            className="w-full h-full object-contain"
                            onError={handleImageError}
                          />
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                            <button
                              onClick={() => openImagePreview(url)}
                              className="p-2 bg-background/80 rounded-full mr-2"
                              title="View larger"
                            >
                              <Maximize2 size={16} />
                            </button>
                            <button
                              onClick={() => handleRemoveUrl("logo_url", index)}
                              className="p-2 bg-destructive/80 rounded-full text-white"
                              title="Remove"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="p-3 border-t border-border">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {url}
                            </span>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 ml-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={14} />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <ImageIcon size={20} className="text-primary" />
                  Store Images
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={imgUrlInput}
                    onChange={(e) => setImgUrlInput(e.target.value)}
                    placeholder="Enter image URL"
                    className="input-modern flex-1"
                  />
                  <button
                    onClick={(e) =>
                      handleAddUrl(e, "img_urls", imgUrlInput, setImgUrlInput)
                    }
                    className="btn-modern"
                  >
                    Add
                  </button>
                </div>

                {localStoreInfo.img_urls.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {localStoreInfo.img_urls.map((url, index) => (
                      <div
                        key={index}
                        className="bg-muted rounded-lg overflow-hidden"
                      >
                        <div className="relative aspect-video bg-muted/50 flex items-center justify-center overflow-hidden">
                          <img
                            src={url || "/placeholder.svg"}
                            alt={`Store image ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={handleImageError}
                          />
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                            <button
                              onClick={() => openImagePreview(url)}
                              className="p-2 bg-background/80 rounded-full mr-2"
                              title="View larger"
                            >
                              <Maximize2 size={16} />
                            </button>
                            <button
                              onClick={() => handleRemoveUrl("img_urls", index)}
                              className="p-2 bg-destructive/80 rounded-full text-white"
                              title="Remove"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="p-3 border-t border-border">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {url}
                            </span>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 ml-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={14} />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4 mt-8">
            <button className="btn-modern-outline" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn-modern flex items-center gap-2"
              onClick={handleSave}
            >
              <Check size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center">
            <button
              className="absolute top-2 right-2 p-2 bg-background/80 rounded-full z-10"
              onClick={() => setPreviewImage(null)}
            >
              <XIcon size={20} />
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

export default StoreInfoModal;
