import React, { useState } from "react";
import { FaTruck } from "react-icons/fa"; // Importing an icon
import { useDispatch } from "react-redux";
import { addSupplier } from "../../redux/supplierSlice";

const AddSupplier = () => {
  const dispatch = useDispatch();
  const [supplier, setSupplier] = useState({
    supplier_name: "",
    contact_person: "",
    phone_number: "",
    email: "",
    address: "",
    store_id: "",
    status: "active",
  });

  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSupplier(supplier));
    console.log("New Supplier:", supplier);
    setSupplier({
      supplier_name: "",
      contact_person: "",
      phone_number: "",
      email: "",
      address: "",
      store_id: "",
      status: "active",
    });
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center min-h-screen">

      {/* Title with Icon */}
      <div className="mb-4 flex items-center space-x-2 bg-gray-900 text-white mt-10 py-3 px-6 rounded-lg shadow-lg">
        <FaTruck className="text-3xl text-yellow-400" />
        <h1 className="text-2xl font-bold">Supplier Management</h1>
      </div>

      {/* Form Container */}
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full md:w-xl lg:w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Supplier</h2>

        {/* Scrollable Form Container */}
        <div className="max-h-[500px] overflow-y-auto pr-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Supplier Name */}
            <div>
              <label className="block mb-1">Supplier Name</label>
              <input type="text" name="supplier_name" value={supplier.supplier_name} onChange={handleChange} 
                placeholder="Enter Supplier Name"
                className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
            </div>

            {/* Contact Person */}
            <div>
              <label className="block mb-1">Contact Person</label>
              <input type="text" name="contact_person" value={supplier.contact_person} onChange={handleChange} 
                placeholder="Enter Contact Person Name"
                className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block mb-1">Phone Number</label>
              <input type="text" name="phone_number" value={supplier.phone_number} onChange={handleChange} 
                placeholder="Enter Phone Number"
                className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1">Email</label>
              <input type="email" name="email" value={supplier.email} onChange={handleChange} 
                placeholder="Enter Email"
                className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" />
            </div>

            {/* Address */}
            <div>
              <label className="block mb-1">Address</label>
              <input type="text" name="address" value={supplier.address} onChange={handleChange} 
                placeholder="Enter Address"
                className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" />
            </div>

            {/* Store ID */}
            <div>
              <label className="block mb-1">Store ID</label>
              <input type="text" name="store_id" value={supplier.store_id} onChange={handleChange} 
                placeholder="Enter Store ID"
                className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
            </div>

            {/* Status */}
            <div>
              <label className="block mb-1">Status</label>
              <select name="status" value={supplier.status} onChange={handleChange} 
                className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" required>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Submit Button */}
            <button type="submit" className="bg-yellow-600 mt-3 hover:bg-yellow-700 text-white px-4 py-2 rounded w-full">
              Add Supplier
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSupplier;
