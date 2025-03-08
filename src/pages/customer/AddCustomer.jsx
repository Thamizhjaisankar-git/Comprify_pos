import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "../../redux/customerSlice";

const AddCustomer = () => {
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState({
    customer_name: "",
    phone_number: "",
    email: "",
    address: "",
    loyalty_points: 0, // Default value
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCustomer(customer));
    console.log("Customer added:", customer);
    setCustomer({
      customer_name: "",
      phone_number: "",
      email: "",
      address: "",
      loyalty_points: 0,
    });
  };

  return (
    <div className="absolute inset-0 flex flex-grow items-center justify-center min-h-screen ">
      
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full md:w-xl lg:w-2xl mx-auto ">           
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Customer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Customer Name */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label className="text-gray-300">Customer Name:</label>
            <input
              type="text"
              name="customer_name"
              placeholder="Enter name"
              value={customer.customer_name}
              onChange={handleChange}
              className="col-span-2 p-2 bg-gray-700 rounded w-full"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label className="text-gray-300">Phone Number:</label>
            <input
              type="text"
              name="phone_number"
              placeholder="Enter phone"
              value={customer.phone_number}
              onChange={handleChange}
              className="col-span-2 p-2 bg-gray-700 rounded w-full"
              required
            />
          </div>

          {/* Email */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label className="text-gray-300">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={customer.email}
              onChange={handleChange}
              className="col-span-2 p-2 bg-gray-700 rounded w-full"
            />
          </div>

          {/* Address */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label className="text-gray-300">Address:</label>
            <input
              type="text"
              name="address"
              placeholder="Enter address"
              value={customer.address}
              onChange={handleChange}
              className="col-span-2 p-2 bg-gray-700 rounded w-full"
            />
          </div>

          {/* Loyalty Points */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label className="text-gray-300">Loyalty Points:</label>
            <input
              type="number"
              name="loyalty_points"
              value={customer.loyalty_points}
              onChange={handleChange}
              className="col-span-2 p-2 bg-gray-700 rounded w-full"
            
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
