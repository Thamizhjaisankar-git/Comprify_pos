import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveStoreInfo } from "../../redux/storeSlice";
import StoreInfoModal from "./StoreInfoModal";

const StoreInformationView = () => {
  const storeData = useSelector((state) => state.store.storeInfo) || {};
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => setIsEditModalOpen(true);
  const handleCloseModal = () => setIsEditModalOpen(false);
  const handleSaveStoreInfo = (updatedInfo) => {
    dispatch(saveStoreInfo(updatedInfo));
    handleCloseModal(); // Close modal after saving
  };

  const formatValue = (value) => {
    if (Array.isArray(value)) return value.length > 0 ? value.join(", ") : "N/A";
    return value || "N/A";
  };

  const formatAddress = (address) => {
    if (!address) return "N/A";
    const { street, city, state, zip_code, country } = address;
    return [street, city, state, zip_code, country].filter(Boolean).join(", ");
  };

  return (
    <div className="p-8 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Store Information</h1>

      <div >
        <table className="min-w-full bg-gray-800 rounded-lg shadow-md text-xl text-white">
          <tbody>
            <TableRow label="Store Name" value={formatValue(storeData.storeName)} />
            <TableRow label="Owner Name" value={formatValue(storeData.ownerName)} />
            <TableRow label="Logo URLs" value={formatValue(storeData.logoURLs)} />
            <TableRow label="Image URLs" value={formatValue(storeData.imageURLs)} />
            <TableRow label="Address" value={formatAddress(storeData.address)} />
            <TableRow label="Delivery Options" value={formatValue(storeData.deliveryOptions)} />
            <TableRow label="Payment Options" value={formatValue(storeData.paymentOptions)} />
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
          onClick={handleEdit}
        >
          Edit
        </button>
      </div>

      {isEditModalOpen && (
        <StoreInfoModal
          storeInfo={storeData}
          onClose={handleCloseModal}
          handleSubmit={handleSaveStoreInfo}
        />
      )}
    </div>
  );
};

const TableRow = ({ label, value }) => (
  <tr className="border-b border-gray-700">
    <td className="py-4 px-6 font-semibold text-gray-300">{label}:</td>
    <td className="py-4 px-6 text-gray-400">{value}</td>
  </tr>
);

export default StoreInformationView;
