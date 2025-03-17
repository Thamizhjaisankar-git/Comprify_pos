import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveStoreInfo } from "../../redux/storeSlice";

const StoreInfoPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.store.storeInfo);
  const [isHovered, setIsHovered] = useState(false);

  
  const [storeInfo, setStoreInfo] = useState({
    storeName: "",
    ownerName: "",
    logoURLs: [],
    imageURLs: [],
    address: {
      street: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
    },
    deliveryOptions: [],
    paymentOptions: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logoInput, setLogoInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address")) {
      const field = name.split(".")[1];
      setStoreInfo((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
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
        logoURLs: [...prev.logoURLs, logoInput],
      }));
      setLogoInput("");
    }
  };

  const handleAddImageURL = () => {
    if (imageInput.trim() !== "") {
      setStoreInfo((prev) => ({
        ...prev,
        imageURLs: [...prev.imageURLs, imageInput],
      }));
      setImageInput("");
    }
  };

  const handleRemoveLogoURL = (index) => {
    setStoreInfo((prev) => ({
      ...prev,
      logoURLs: prev.logoURLs.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveImageURL = (index) => {
    setStoreInfo((prev) => ({
      ...prev,
      imageURLs: prev.imageURLs.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    console.log("Store Information:", storeInfo); // Logs the full store info
    console.table(storeInfo); // Displays data in a table format
  
    dispatch(saveStoreInfo(storeInfo)); // Save to Redux
    localStorage.setItem("storeInfoCompleted", "true"); // Store in local storage
    closeModal(); // Close the modal
    navigate("/"); // Navigate to the home page
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">

      <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-50 top-40 left-20"></div>
      <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-50 bottom-10 right-10"></div>

      {/* Title */}
      <motion.h1
        className="text-5xl font-extrabold text-white mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Welcome to Comprify Store Setup
      </motion.h1>

      {/* Animated Button */}
      <motion.button
        className={`py-3 px-8 text-lg font-medium rounded-lg ${
          isHovered
            ? "bg-blue-700 text-white shadow-lg shadow-blue-500/50"
            : "bg-blue-600 text-white"
        }`}
        onClick={openModal}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🚀 Give Your Store Details
      </motion.button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md animate-fadeIn">
          <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative glass-effect">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
            >
              ✖
            </button>

            <h1 className="text-3xl font-bold mb-8 text-center">
              Store Information
            </h1>

            <div className="space-y-6">
              <input
                type="text"
                name="storeName"
                placeholder="Store Name"
                value={storeInfo.storeName}
                onChange={handleChange}
                className="input-field1"
              />
              <input
                type="text"
                name="ownerName"
                placeholder="Owner Name"
                value={storeInfo.ownerName}
                onChange={handleChange}
                className="input-field1"
              />

              {/* Logo URL Input */}
              <div>
              <div className="flex items-center space-x-4">
  <input
    type="text"
    value={logoInput}
    onChange={(e) => setLogoInput(e.target.value)}
    placeholder="Add Logo URL"
    className="input-field1"
  />
  <button
    onClick={handleAddLogoURL}
    className="bg-blue-600 text-white px-4 py-2 rounded-md"
  >
    Add
  </button>
</div>
                <div className="mt-4 space-y-2">
                  {storeInfo.logoURLs.map((url, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-700 rounded-md"
                    >
                      <span>{url}</span>
                      <button
                        onClick={() => handleRemoveLogoURL(index)}
                        className="text-red-500 ml-4"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image URL Input */}
              <div>
              <div className="flex items-center space-x-4 mt-4">
  <input
    type="text"
    value={imageInput}
    onChange={(e) => setImageInput(e.target.value)}
    placeholder="Add Image URL"
    className="input-field1"
  />
  <button
    onClick={handleAddImageURL}
    className="bg-blue-600 text-white px-4 py-2 rounded-md"
  >
    Add
  </button>
  </div>
                <div className="mt-4 space-y-2">
                  {storeInfo.imageURLs.map((url, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-700 rounded-md"
                    >
                      <span>{url}</span>
                      <button
                        onClick={() => handleRemoveImageURL(index)}
                        className="text-red-500 ml-4"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <h2 className="text-xl font-semibold mt-6 mb-2">Address</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="address.street"
            placeholder="Street"
            value={storeInfo.address.street}
            onChange={handleChange}
            className="input-field1"
          />
          <input
            type="text"
            name="address.city"
            placeholder="City"
            value={storeInfo.address.city}
            onChange={handleChange}
            className="input-field1"
          />
          <input
            type="text"
            name="address.state"
            placeholder="State"
            value={storeInfo.address.state}
            onChange={handleChange}
            className="input-field1"
          />
          <input
            type="text"
            name="address.zip_code"
            placeholder="Zip Code"
            value={storeInfo.address.zip_code}
            onChange={handleChange}
            className="input-field1"
          />
          <input
            type="text"
            name="address.country"
            placeholder="Country"
            value={storeInfo.address.country}
            onChange={handleChange}
            className="col-span-2 input-field1"
          />
        </div>

        <h2 className="text-xl font-semibold mt-6">Delivery Options</h2>
        <div className="flex gap-6">
          {["In-App", "Door Delivery"].map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={option}
                checked={storeInfo.deliveryOptions.includes(option)}
                onChange={(e) => handleCheckboxChange(e, "deliveryOptions")}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>

        <h2 className="text-xl font-semibold mt-6">Payment Options</h2>
        <div className="flex gap-6">
          {["Cash", "Online", "UPI"].map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={option}
                checked={storeInfo.paymentOptions.includes(option)}
                onChange={(e) => handleCheckboxChange(e, "paymentOptions")}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg mt-6 transition duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreInfoPage;
