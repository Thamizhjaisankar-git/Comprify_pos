import React, { useState } from "react";

const StoreInfoModal = ({ storeInfo, onClose, handleSubmit }) => {
  const [localStoreInfo, setLocalStoreInfo] = useState(storeInfo);
  const [logoUrlInput, setLogoUrlInput] = useState(""); // for handling individual input
  const [imgUrlInput, setImgUrlInput] = useState(""); // for handling individual input

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

  // Handle saving of the updated store information
  const handleSave = () => {
    console.log("Updated Store Information:", localStoreInfo);
    const isValidPhoneNumber = (number) => {
      return /^[1-9][0-9]{9}$/.test(number);
    };
    
    if (!isValidPhoneNumber(localStoreInfo.phone_number)) {
      alert("Phone number must be 10 digits and not start with 0.");
      return;
    }
    
    handleSubmit(localStoreInfo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">Edit Store Information</h2>

        {/* Store Name Input */}
        <input
          type="text"
          name="store_name"
          value={localStoreInfo.store_name}
          onChange={handleInputChange}
          placeholder="Store Name"
          className="input-field w-full mb-4"
        />

        {/* Owner Name Input */}
        <input
          type="text"
          name="owner_name"
          value={localStoreInfo.owner_name}
          onChange={handleInputChange}
          placeholder="Owner Name"
          className="input-field w-full mb-4"
        />

        <div className="mb-4">
          <input
            type="text"
            name="phone_number" // Added phone number field
            placeholder="Phone Number"
            value={localStoreInfo.phone_number} // Handling phone number state
            onChange={handleInputChange}
            className="input-field1"
          />
        </div>

        {/* Logo URLs Input with "Add" button */}
        <div>
          <input
            type="text"
            value={logoUrlInput}
            onChange={(e) => setLogoUrlInput(e.target.value)}
            placeholder="Add Logo URL"
            className="input-field w-full mb-2"
          />
          <button
            onClick={(e) =>
              handleAddUrl(e, "logo_url", logoUrlInput, setLogoUrlInput)
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
          >
            Add Logo URL
          </button>
          <ul>
            {localStoreInfo.logo_url.map((url, index) => (
              <li key={index}>{url}</li>
            ))}
          </ul>
        </div>

        {/* Image URLs Input with "Add" button */}
        <div>
          <input
            type="text"
            value={imgUrlInput}
            onChange={(e) => setImgUrlInput(e.target.value)}
            placeholder="Add Image URL"
            className="input-field w-full mb-2"
          />
          <button
            onClick={(e) =>
              handleAddUrl(e, "img_urls", imgUrlInput, setImgUrlInput)
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
          >
            Add Image URL
          </button>
          <ul>
            {localStoreInfo.img_urls.map((url, index) => (
              <li key={index}>{url}</li>
            ))}
          </ul>
        </div>

        {/* Address Inputs */}
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

        {/* Location Coordinates Input */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Location Coordinates:</h3>
          <input
            type="text"
            name="location.latitude"
            value={localStoreInfo.location.latitude}
            onChange={handleInputChange}
            placeholder="Latitude"
            className="input-field w-full mb-2"
          />
          <input
            type="text"
            name="location.longitude"
            value={localStoreInfo.location.longitude}
            onChange={handleInputChange}
            placeholder="Longitude"
            className="input-field w-full mb-4"
          />
        </div>

        <h2 className="text-xl font-semibold mt-6">Purchase Options</h2>
        <div className="flex gap-6">
          {["inStore", "online", "smart"].map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={option}
                checked={localStoreInfo.purchase_options.includes(option)} // Updated field name
                onChange={
                  (e) => handleCheckboxChange(e, "purchase_options") // Updated field name
                }
              />
              <span>{option}</span>
            </label>
          ))}
        </div>

        <h2 className="text-xl font-semibold mt-6">Payment Options</h2>
        <div className="flex gap-6">
          {["cash", "card", "UPI", "wallet"].map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={option}
                checked={localStoreInfo.payment_options.includes(option)} // Updated field name
                onChange={
                  (e) => handleCheckboxChange(e, "payment_options") // Updated field name
                }
              />
              <span>{option}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-6">
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
