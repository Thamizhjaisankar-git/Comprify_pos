// import { motion } from "framer-motion";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { saveStoreInfo } from "../../redux/storeSlice";
// import config from "../../config";

// const StoreInfoPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   // const storeData = useSelector((state) => state.store.storeInfo);
//   const [isHovered, setIsHovered] = useState(false);

//   const [storeInfo, setStoreInfo] = useState({
//     store_name: "", // Updated field name
//     logo_url: [], // Updated field name
//     img_urls: [], // Updated field name
//     address: {
//       street: "",
//       city: "",
//       state: "",
//       zip_code: "",
//       country: "",
//     },
//     location: {
//       latitude: "",
//       longitude: "",
//     },
//     purchase_options: [], // Updated field name
//     payment_options: [], // Updated field name
//     phone_number: "",
//   });

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [logoInput, setLogoInput] = useState("");
//   const [imageInput, setImageInput] = useState("");

//   useEffect(() => {
//     document.body.style.overflow = isModalOpen ? "hidden" : "auto";
//   }, [isModalOpen]);

//   useEffect(() => {
//     if (storeInfo) {
//       console.log("Store data already exists:", storeInfo);
//     }
//   }, [storeInfo]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name.includes("address")) {
//       const field = name.split(".")[1];
//       setStoreInfo((prev) => ({
//         ...prev,
//         address: { ...prev.address, [field]: value },
//       }));
//     } else if (name.includes("location")) {
//       const field = name.split(".")[1];
//       setStoreInfo((prev) => ({
//         ...prev,
//         location: { ...prev.location, [field]: value },
//       }));
//     } else {
//       setStoreInfo((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleCheckboxChange = (e, type) => {
//     const { value, checked } = e.target;
//     setStoreInfo((prev) => ({
//       ...prev,
//       [type]: checked
//         ? [...prev[type], value]
//         : prev[type].filter((option) => option !== value),
//     }));
//   };

//   const handleAddLogoURL = () => {
//     if (logoInput.trim() !== "") {
//       setStoreInfo((prev) => ({
//         ...prev,
//         logo_url: [...prev.logo_url, logoInput], // Updated field name
//       }));
//       setLogoInput("");
//     }
//   };

//   const handleAddImageURL = () => {
//     if (imageInput.trim() !== "") {
//       setStoreInfo((prev) => ({
//         ...prev,
//         img_urls: [...prev.img_urls, imageInput], // Updated field name
//       }));
//       setImageInput("");
//     }
//   };

//   const handleRemoveLogoURL = (index) => {
//     setStoreInfo((prev) => ({
//       ...prev,
//       logo_url: prev.logo_url.filter((_, i) => i !== index), // Updated field name
//     }));
//   };

//   const handleRemoveImageURL = (index) => {
//     setStoreInfo((prev) => ({
//       ...prev,
//       img_urls: prev.img_urls.filter((_, i) => i !== index), // Updated field name
//     }));
//   };

//   const [formErrors, setFormErrors] = useState({});

//   const handleSubmit = async () => {
//     let errors = {};

//     if (!storeInfo.store_name.trim())
//       errors.store_name = "Store name is required.";
//     if (!storeInfo.phone_number.trim()) {
//       errors.phone_number = "Phone number is required.";
//     } else if (!/^[1-9][0-9]{9}$/.test(storeInfo.phone_number.trim())) {
//       errors.phone_number = "Phone number must be 10 digits and not start with 0.";
//     }

//     if (!storeInfo.address.street.trim()) errors.street = "Street is required.";
//     if (!storeInfo.address.city.trim()) errors.city = "City is required.";
//     if (!storeInfo.address.state.trim()) errors.state = "State is required.";
//     if (!storeInfo.address.zip_code.trim())
//       errors.zip_code = "Zip Code is required.";
//     if (!storeInfo.address.country.trim())
//       errors.country = "Country is required.";
//     if (
//       !storeInfo.location.latitude.trim() ||
//       !storeInfo.location.longitude.trim()
//     ) {
//       errors.location = "Latitude and Longitude are required.";
//     }

//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token"); // Retrieve JWT Token

//       if (!token) {
//         alert("Please login to save store information.");
//         return;
//       }

//       const response = await fetch(`${config.serverApi}/pos/store`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Send Token in Authorization Header
//         },
//         body: JSON.stringify(storeInfo),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to save store data");
//       }

//       const data = await response.json();
//       console.log("Store successfully created:", data);
//       alert("Store information saved successfully!");

//       closeModal();
//       navigate("/");
//     } catch (error) {
//       console.error("Error saving store data:", error);
//     }
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center p-8 bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
//       <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-50 top-40 left-20"></div>
//       <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-50 bottom-10 right-10"></div>

//       {/* Title */}
//       <motion.h1
//         className="text-5xl font-extrabold text-white mb-8"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       >
//         Welcome to Comprify Store Setup
//       </motion.h1>

//       {/* Animated Button */}
//       <motion.button
//         className={`py-3 px-8 text-lg font-medium rounded-lg ${
//           isHovered
//             ? "bg-blue-700 text-white shadow-lg shadow-blue-500/50"
//             : "bg-blue-600 text-white"
//         }`}
//         onClick={openModal}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         🚀 Give Your Store Details
//       </motion.button>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md animate-fadeIn">
//           <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative glass-effect">
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
//             >
//               ✖
//             </button>

//             <h1 className="text-3xl font-bold mb-8 text-center">
//               Store Information
//             </h1>

//             <div className="space-y-6">
//               <input
//                 type="text"
//                 name="store_name"
//                 placeholder="Store Name"
//                 value={storeInfo.store_name} // Updated field name
//                 onChange={handleChange}
//                 className="input-field1"
//               />
//               {formErrors.store_name && (
//                 <p className="text-red-500">{formErrors.store_name}</p>
//               )}
//               <div>
//                 <input
//                   type="text"
//                   name="phone_number" // Added phone number field
//                   placeholder="Phone Number"
//                   value={storeInfo.phone_number} // Handling phone number state
//                   onChange={handleChange}
//                   className="input-field1"
//                 />
//                 {formErrors.phone_number && (
//                   <p className="text-red-500">{formErrors.phone_number}</p>
//                 )}
//               </div>

//               {/* Logo URL Input */}
//               {/* Logo URL Input */}
//               <div>
//                 <div className="flex items-center space-x-4">
//                   <input
//                     type="text"
//                     value={logoInput}
//                     onChange={(e) => setLogoInput(e.target.value)}
//                     placeholder="Add Logo URL"
//                     className="input-field1"
//                   />
//                   <button
//                     onClick={handleAddLogoURL}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-md"
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <div className="mt-4 space-y-2">
//                   {storeInfo.logo_url.map(
//                     // <-- Use logoURLs
//                     (url, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center justify-between p-2 bg-gray-700 rounded-md"
//                       >
//                         <span>{url}</span>
//                         <button
//                           onClick={() => handleRemoveLogoURL(index)}
//                           className="text-red-500 ml-4"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>

//               {/* Image URL Input */}
//               <div>
//                 <div className="flex items-center space-x-4 mt-4">
//                   <input
//                     type="text"
//                     value={imageInput}
//                     onChange={(e) => setImageInput(e.target.value)}
//                     placeholder="Add Image URL"
//                     className="input-field1"
//                   />
//                   <button
//                     onClick={handleAddImageURL}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-md"
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <div className="mt-4 space-y-2">
//                   {storeInfo.img_urls.map(
//                     // <-- Use imageURLs
//                     (url, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center justify-between p-2 bg-gray-700 rounded-md"
//                       >
//                         <span>{url}</span>
//                         <button
//                           onClick={() => handleRemoveImageURL(index)}
//                           className="text-red-500 ml-4"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>

//               <h2 className="text-xl font-semibold mt-6 mb-2">Address</h2>
//               <div className="grid grid-cols-2 gap-4">
//                 <input
//                   type="text"
//                   name="address.street"
//                   placeholder="Street"
//                   value={storeInfo.address.street}
//                   onChange={handleChange}
//                   className="input-field1"
//                 />
//                 {formErrors.street && (
//                   <p className="text-red-500 col-span-2">{formErrors.street}</p>
//                 )}
//                 <input
//                   type="text"
//                   name="address.city"
//                   placeholder="City"
//                   value={storeInfo.address.city}
//                   onChange={handleChange}
//                   className="input-field1"
//                 />
//                 {formErrors.city && (
//                   <p className="text-red-500 col-span-2">{formErrors.city}</p>
//                 )}
//                 <input
//                   type="text"
//                   name="address.state"
//                   placeholder="State"
//                   value={storeInfo.address.state}
//                   onChange={handleChange}
//                   className="input-field1"
//                 />
//                 {formErrors.state && (
//                   <p className="text-red-500 col-span-2">{formErrors.state}</p>
//                 )}
//                 <input
//                   type="text"
//                   name="address.country"
//                   placeholder="Country"
//                   value={storeInfo.address.country}
//                   onChange={handleChange}
//                   className="col-span-2 input-field1"
//                 />
//                 {formErrors.country && (
//                   <p className="text-red-500 col-span-2">
//                     {formErrors.country}
//                   </p>
//                 )}
//                 <input
//                   type="text"
//                   name="address.zip_code"
//                   placeholder="Zip Code"
//                   value={storeInfo.address.zip_code}
//                   onChange={handleChange}
//                   className="input-field1"
//                 />
//                 {formErrors.zip_code && (
//                   <p className="text-red-500 col-span-2">
//                     {formErrors.zip_code}
//                   </p>
//                 )}
//               </div>

//               <h2 className="text-xl font-semibold mt-6">
//                 Store Location (Geo-Coordinates)
//               </h2>
//               <div className="grid grid-cols-2 gap-4">
//                 <input
//                   type="text"
//                   name="location.latitude"
//                   placeholder="Latitude"
//                   value={storeInfo.location.latitude}
//                   onChange={handleChange}
//                   className="input-field1"
//                 />
//                 <input
//                   type="text"
//                   name="location.longitude"
//                   placeholder="Longitude"
//                   value={storeInfo.location.longitude}
//                   onChange={handleChange}
//                   className="input-field1"
//                 />
//               </div>
//               {formErrors.location && (
//                 <p className="text-red-500">{formErrors.location}</p>
//               )}

//               {storeInfo && storeInfo.location && (
//                 <div className="mt-4 text-gray-400 text-sm">
//                   <p>
//                     📍 Location: {storeInfo.location.latitude},{" "}
//                     {storeInfo.location.longitude}
//                   </p>
//                 </div>
//               )}

//               <h2 className="text-xl font-semibold mt-6">Purchase Options</h2>
//               <div className="flex gap-6">
//                 {["inStore", "online", "smart"].map((option) => (
//                   <label key={option} className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       value={option}
//                       checked={storeInfo.purchase_options.includes(option)} // Updated field name
//                       onChange={
//                         (e) => handleCheckboxChange(e, "purchase_options") // Updated field name
//                       }
//                     />
//                     <span>{option}</span>
//                   </label>
//                 ))}
//               </div>

//               <h2 className="text-xl font-semibold mt-6">Payment Options</h2>
//               <div className="flex gap-6">
//                 {["cash", "card", "UPI", "wallet"].map((option) => (
//                   <label key={option} className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       value={option}
//                       checked={storeInfo.payment_options.includes(option)} // Updated field name
//                       onChange={
//                         (e) => handleCheckboxChange(e, "payment_options") // Updated field name
//                       }
//                     />
//                     <span>{option}</span>
//                   </label>
//                 ))}
//               </div>

//               <button
//                 onClick={handleSubmit}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg mt-6 transition duration-300"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StoreInfoPage;
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import config from "../../config";
import {
  Store,
  MapPin,
  Phone,
  Mail,
  ImageIcon,
  CreditCard,
  ShoppingBag,
  Check,
  X,
} from "lucide-react";
import { useTheme } from "../../context/themeContext";

const StoreInfoPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  const [storeInfo, setStoreInfo] = useState({
    store_name: "",
    logo_url: [],
    img_urls: [],
    address: {
      street: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
    },
    location: {
      latitude: "",
      longitude: "",
    },
    purchase_options: [],
    payment_options: [],
    phone_number: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logoInput, setLogoInput] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [activeTab, setActiveTab] = useState("basic");
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  useEffect(() => {
    if (storeInfo) {
      console.log("Store data already exists:", storeInfo);
    }
  }, [storeInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address")) {
      const field = name.split(".")[1];
      setStoreInfo((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else if (name.includes("location")) {
      const field = name.split(".")[1];
      setStoreInfo((prev) => ({
        ...prev,
        location: { ...prev.location, [field]: value },
      }));
    } else {
      setStoreInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e, type) => {
    const { value, checked } = e.target;
    setStoreInfo((prev) => ({
      ...prev,
      [type]: checked
        ? [...prev[type], value]
        : prev[type].filter((option) => option !== value),
    }));
  };

  const handleAddLogoURL = () => {
    if (logoInput.trim() !== "") {
      setStoreInfo((prev) => ({
        ...prev,
        logo_url: [...prev.logo_url, logoInput],
      }));
      setLogoInput("");
    }
  };

  const handleAddImageURL = () => {
    if (imageInput.trim() !== "") {
      setStoreInfo((prev) => ({
        ...prev,
        img_urls: [...prev.img_urls, imageInput],
      }));
      setImageInput("");
    }
  };

  const handleRemoveLogoURL = (index) => {
    setStoreInfo((prev) => ({
      ...prev,
      logo_url: prev.logo_url.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveImageURL = (index) => {
    setStoreInfo((prev) => ({
      ...prev,
      img_urls: prev.img_urls.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (activeTab === "basic") {
      if (!storeInfo.store_name.trim())
        errors.store_name = "Store name is required.";
      if (!storeInfo.phone_number.trim()) {
        errors.phone_number = "Phone number is required.";
      } else if (!/^[1-9][0-9]{9}$/.test(storeInfo.phone_number.trim())) {
        errors.phone_number =
          "Phone number must be 10 digits and not start with 0.";
      }
    } else if (activeTab === "address") {
      if (!storeInfo.address.street.trim())
        errors.street = "Street is required.";
      if (!storeInfo.address.city.trim()) errors.city = "City is required.";
      if (!storeInfo.address.state.trim()) errors.state = "State is required.";
      if (!storeInfo.address.zip_code.trim())
        errors.zip_code = "Zip Code is required.";
      if (!storeInfo.address.country.trim())
        errors.country = "Country is required.";
    } else if (activeTab === "location") {
      if (
        !storeInfo.location.latitude.trim() ||
        !storeInfo.location.longitude.trim()
      ) {
        errors.location = "Latitude and Longitude are required.";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextTab = () => {
    if (!validateForm()) return;

    if (activeTab === "basic") setActiveTab("address");
    else if (activeTab === "address") setActiveTab("location");
    else if (activeTab === "location") setActiveTab("options");
    else if (activeTab === "options") setActiveTab("images");
  };

  const handlePrevTab = () => {
    if (activeTab === "images") setActiveTab("options");
    else if (activeTab === "options") setActiveTab("location");
    else if (activeTab === "location") setActiveTab("address");
    else if (activeTab === "address") setActiveTab("basic");
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login to save store information.");
        return;
      }

      const response = await fetch(`${config.serverApi}/pos/store`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(storeInfo),
      });

      if (!response.ok) {
        throw new Error("Failed to save store data");
      }

      const data = await response.json();
      console.log("Store successfully created:", data);
      alert("Store information saved successfully!");

      closeModal();
      navigate("/");
    } catch (error) {
      console.error("Error saving store data:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center p-8 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-blue-100"
      } relative overflow-hidden`}
    >
      <div className="absolute w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-30 top-40 left-20"></div>
      <div className="absolute w-72 h-72 bg-primary/30 rounded-full blur-3xl opacity-30 bottom-10 right-10"></div>

      {/* Title */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Store className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Welcome to Comprify
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Let's set up your store to get started with our powerful POS system
        </p>
      </motion.div>

      {/* Animated Button */}
      <motion.button
        className={`btn-modern flex items-center gap-2 text-lg px-8 py-4`}
        onClick={openModal}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Store size={20} />
        Set Up Your Store
      </motion.button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4 overflow-y-auto">
          <div className="bg-card rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Store Setup</h1>
                <button
                  onClick={closeModal}
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
                  onClick={() => setActiveTab("location")}
                  className={`px-4 py-3 flex items-center gap-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === "location"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <MapPin size={18} />
                  Location
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
                        value={storeInfo.store_name}
                        onChange={handleChange}
                        placeholder="Enter store name"
                        className="input-modern pl-10"
                      />
                    </div>
                    {formErrors.store_name && (
                      <p className="text-destructive text-sm">
                        {formErrors.store_name}
                      </p>
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
                        value={storeInfo.phone_number}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className="input-modern pl-10"
                      />
                    </div>
                    {formErrors.phone_number && (
                      <p className="text-destructive text-sm">
                        {formErrors.phone_number}
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
                        value={storeInfo.email || ""}
                        onChange={handleChange}
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
                      value={storeInfo.address.street}
                      onChange={handleChange}
                      placeholder="Enter street address"
                      className="input-modern"
                    />
                    {formErrors.street && (
                      <p className="text-destructive text-sm">
                        {formErrors.street}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">City</label>
                      <input
                        type="text"
                        name="address.city"
                        value={storeInfo.address.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                        className="input-modern"
                      />
                      {formErrors.city && (
                        <p className="text-destructive text-sm">
                          {formErrors.city}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">State</label>
                      <input
                        type="text"
                        name="address.state"
                        value={storeInfo.address.state}
                        onChange={handleChange}
                        placeholder="Enter state"
                        className="input-modern"
                      />
                      {formErrors.state && (
                        <p className="text-destructive text-sm">
                          {formErrors.state}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Zip Code</label>
                      <input
                        type="text"
                        name="address.zip_code"
                        value={storeInfo.address.zip_code}
                        onChange={handleChange}
                        placeholder="Enter zip code"
                        className="input-modern"
                      />
                      {formErrors.zip_code && (
                        <p className="text-destructive text-sm">
                          {formErrors.zip_code}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Country</label>
                      <input
                        type="text"
                        name="address.country"
                        value={storeInfo.address.country}
                        onChange={handleChange}
                        placeholder="Enter country"
                        className="input-modern"
                      />
                      {formErrors.country && (
                        <p className="text-destructive text-sm">
                          {formErrors.country}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Location Tab */}
              {activeTab === "location" && (
                <div className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-lg mb-4">
                    <p className="text-sm text-muted-foreground">
                      Enter the geographical coordinates of your store. You can
                      find these using Google Maps or other mapping services.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Latitude</label>
                      <input
                        type="text"
                        name="location.latitude"
                        value={storeInfo.location.latitude}
                        onChange={handleChange}
                        placeholder="e.g. 40.7128"
                        className="input-modern"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Longitude</label>
                      <input
                        type="text"
                        name="location.longitude"
                        value={storeInfo.location.longitude}
                        onChange={handleChange}
                        placeholder="e.g. -74.0060"
                        className="input-modern"
                      />
                    </div>
                  </div>
                  {formErrors.location && (
                    <p className="text-destructive text-sm">
                      {formErrors.location}
                    </p>
                  )}
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
                            checked={storeInfo.purchase_options.includes(
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
                            checked={storeInfo.payment_options.includes(option)}
                            onChange={(e) =>
                              handleCheckboxChange(e, "payment_options")
                            }
                            className="h-4 w-4 text-primary"
                          />
                          <span className="flex-1">
                            {option === "UPI"
                              ? "UPI"
                              : option.charAt(0).toUpperCase() +
                                option.slice(1)}
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
                        value={logoInput}
                        onChange={(e) => setLogoInput(e.target.value)}
                        placeholder="Enter logo URL"
                        className="input-modern flex-1"
                      />
                      <button onClick={handleAddLogoURL} className="btn-modern">
                        Add
                      </button>
                    </div>

                    {storeInfo.logo_url.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {storeInfo.logo_url.map((url, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-muted rounded-lg"
                          >
                            <div className="flex items-center gap-2 overflow-hidden">
                              <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                                <ImageIcon size={16} className="text-primary" />
                              </div>
                              <span className="truncate">{url}</span>
                            </div>
                            <button
                              onClick={() => handleRemoveLogoURL(index)}
                              className="text-destructive hover:text-destructive/80"
                            >
                              <X size={16} />
                            </button>
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
                        value={imageInput}
                        onChange={(e) => setImageInput(e.target.value)}
                        placeholder="Enter image URL"
                        className="input-modern flex-1"
                      />
                      <button
                        onClick={handleAddImageURL}
                        className="btn-modern"
                      >
                        Add
                      </button>
                    </div>

                    {storeInfo.img_urls.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {storeInfo.img_urls.map((url, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-muted rounded-lg"
                          >
                            <div className="flex items-center gap-2 overflow-hidden">
                              <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                                <ImageIcon size={16} className="text-primary" />
                              </div>
                              <span className="truncate">{url}</span>
                            </div>
                            <button
                              onClick={() => handleRemoveImageURL(index)}
                              className="text-destructive hover:text-destructive/80"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {activeTab !== "basic" ? (
                  <button
                    type="button"
                    onClick={handlePrevTab}
                    className="btn-modern-outline"
                  >
                    Previous
                  </button>
                ) : (
                  <div></div> // Empty div to maintain flex spacing
                )}

                {activeTab === "images" ? (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn-modern flex items-center gap-2"
                  >
                    <Check size={18} />
                    Save Store Information
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextTab}
                    className="btn-modern"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreInfoPage;
