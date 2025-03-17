import React, { useState } from "react";

const StoreInfoModal = ({ storeInfo, onClose, handleSubmit }) => {
  const [localStoreInfo, setLocalStoreInfo] = useState(storeInfo);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address")) {
      const field = name.split(".")[1];
      setLocalStoreInfo((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setLocalStoreInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (e, field) => {
    const value = e.target.value;
  
    // Ensure that the value is being split and trimmed correctly
    const updatedArray = value.split(",").map((item) => item.trim());
  
    setLocalStoreInfo((prev) => ({
      ...prev,
      [field]: updatedArray,
    }));
  };
  
 

    const handleCheckboxChange = (e, field) => {
      const { value, checked } = e.target;
  
      setLocalStoreInfo((prev) => {
        const updatedArray = checked
          ? [...prev[field], value] // Add if checked
          : prev[field].filter((item) => item !== value); // Remove if unchecked
  
        return { ...prev, [field]: updatedArray };
      });
    };

  const handleSave = () => {
    console.log("Store Information:", localStoreInfo);
    console.table(localStoreInfo);
    console.log("Store Info (with nested data):", JSON.stringify(localStoreInfo, null, 2));
    handleSubmit(localStoreInfo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">Edit Store Information</h2>

        <input
          type="text"
          name="storeName"
          value={localStoreInfo.storeName}
          onChange={handleInputChange}
          placeholder="Store Name"
          className="input-field w-full mb-4"
        />

        <input
          type="text"
          name="ownerName"
          value={localStoreInfo.ownerName}
          onChange={handleInputChange}
          placeholder="Owner Name"
          className="input-field w-full mb-4"
        />

        <textarea
          name="logoURLs"
          value={localStoreInfo.logoURLs.join(", ")}
          onChange={(e) => handleArrayChange(e, "logoURLs")}
          placeholder="Logo URLs (comma separated)"
          className="input-field w-full mb-4"
        />

        <textarea
          name="imageURLs"
          value={localStoreInfo.imageURLs.join(", ")}
          onChange={(e) => handleArrayChange(e, "imageURLs")}
          placeholder="Image URLs (comma separated)"
          className="input-field w-full mb-4"
        />

        <h3 className="text-xl font-semibold mb-2">Address:</h3>
        <input
          type="text"
          name="address.street"
          value={localStoreInfo.address.street}
          onChange={handleInputChange}
          placeholder="Street"
          className="input-field w-full mb-2"
        />
        <input
          type="text"
          name="address.city"
          value={localStoreInfo.address.city}
          onChange={handleInputChange}
          placeholder="City"
          className="input-field w-full mb-2"
        />
        <input
          type="text"
          name="address.state"
          value={localStoreInfo.address.state}
          onChange={handleInputChange}
          placeholder="State"
          className="input-field w-full mb-2"
        />
        <input
          type="text"
          name="address.zip_code"
          value={localStoreInfo.address.zip_code}
          onChange={handleInputChange}
          placeholder="Zip Code"
          className="input-field w-full mb-2"
        />
        <input
          type="text"
          name="address.country"
          value={localStoreInfo.address.country}
          onChange={handleInputChange}
          placeholder="Country"
          className="input-field w-full mb-4"
        />

        {/* <h3 className="text-xl font-semibold mb-2">Delivery Options:</h3>
        <textarea
          name="deliveryOptions"
          value={localStoreInfo.deliveryOptions.join(", ")}
          onChange={(e) => handleArrayChange(e, "deliveryOptions")}
          placeholder="Add new delivery options (comma separated)"
          className="input-field w-full mb-4"
        />

        <h3 className="text-xl font-semibold mb-2">Payment Options:</h3>
        <textarea
          name="paymentOptions"
          value={localStoreInfo.paymentOptions.join(", ")}
          onChange={(e) => handleArrayChange(e, "paymentOptions")}
          placeholder="Add new payment options (comma separated)"
          className="input-field w-full mb-4"
        /> */}

<h2 className="text-xl font-semibold mt-6">Delivery Options</h2>
        <div className="flex gap-6">
          {["In-App", "Door Delivery"].map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={option}
                checked={localStoreInfo.deliveryOptions.includes(option)}
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
                checked={localStoreInfo.paymentOptions.includes(option)}
                onChange={(e) => handleCheckboxChange(e, "paymentOptions")}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        

        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreInfoModal;
