// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { saveStoreInfo } from "../../redux/storeSlice";
// import StoreInfoModal from "./StoreInfoModal";

// const StoreInformationView = () => {
//   const storeData = useSelector((state) => state.store.storeInfo) || {};
//   const dispatch = useDispatch();
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   const handleEdit = () => setIsEditModalOpen(true);
//   const handleCloseModal = () => setIsEditModalOpen(false);
//   const handleSaveStoreInfo = (updatedInfo) => {
//     dispatch(saveStoreInfo(updatedInfo));
//     handleCloseModal(); // Close modal after saving
//   };

//   const formatValue = (value) => {
//     if (Array.isArray(value)) return value.length > 0 ? value.join(", ") : "N/A";
//     return value || "N/A";
//   };

//   const formatAddress = (address) => {
//     if (!address) return "N/A";
//     const { street, city, state, zip_code, country } = address;
//     return [street, city, state, zip_code, country].filter(Boolean).join(", ");
//   };

//   return (
//     <div className="p-8 text-white min-h-screen">
//       <h1 className="text-3xl font-bold mb-8 text-center">Store Information</h1>

//       <div >
//         <table className="min-w-full bg-gray-800 rounded-lg shadow-md text-xl text-white">
//           <tbody>
//             <TableRow label="Store Name" value={formatValue(storeData.storeName)} />
//             <TableRow label="Owner Name" value={formatValue(storeData.ownerName)} />
//             <TableRow label="Logo URLs" value={formatValue(storeData.logoURLs)} />
//             <TableRow label="Image URLs" value={formatValue(storeData.imageURLs)} />
//             <TableRow label="Address" value={formatAddress(storeData.address)} />
//             <TableRow label="Delivery Options" value={formatValue(storeData.deliveryOptions)} />
//             <TableRow label="Payment Options" value={formatValue(storeData.paymentOptions)} />
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-center mt-6">
//         <button
//           className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
//           onClick={handleEdit}
//         >
//           Edit
//         </button>
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

// const TableRow = ({ label, value }) => (
//   <tr className="border-b border-gray-700">
//     <td className="py-4 px-6 font-semibold text-gray-300">{label}:</td>
//     <td className="py-4 px-6 text-gray-400">{value}</td>
//   </tr>
// );

// export default StoreInformationView;
import React, { useState, useEffect } from "react";
import axios from "axios";
import StoreInfoModal from "./StoreInfoModal";
import config from "../../config";

const StoreInformationView = () => {
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
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
    console.log(updatedInfo);
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

  if (isLoading)
    return <p className="text-center text-white">Loading store details...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">Failed to load store data.</p>
    );

  return (
    <div className="p-8 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Store Information</h1>

      <table className="min-w-full bg-gray-800 rounded-lg shadow-md text-xl text-white">
        <tbody>
          <TableRow
            label="Store Name"
            value={formatValue(storeData?.store_name)}
          />
          <TableRow
            label="Owner Name"
            value={formatValue(storeData?.owner_name)}
          />
          <TableRow
            label="Phone Number"
            value={formatValue(storeData?.phone_number)}
          />
          <TableRow label="Email" value={formatValue(storeData?.email)} />
          <TableRow label="Logo URL" value={formatValue(storeData?.logo_url)} />
          <TableRow
            label="Image URLs"
            value={formatValue(storeData?.img_urls)}
          />
          <TableRow label="Address" value={formatAddress(storeData?.address)} />
          <TableRow
            label="Latitude"
            value={storeData?.location?.latitude || "N/A"}
          />
          <TableRow
            label="Longitude"
            value={storeData?.location?.longitude || "N/A"}
          />
          <TableRow
            label="Purchase Options"
            value={formatValue(storeData?.purchase_options)}
          />
          <TableRow
            label="Payment Options"
            value={formatValue(storeData?.payment_options)}
          />
        </tbody>
      </table>

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
