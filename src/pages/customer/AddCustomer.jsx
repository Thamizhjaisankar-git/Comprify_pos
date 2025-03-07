import React, { useState } from "react";

const AddCustomer = () => {
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
    console.log("New Customer:", customer);
    // TODO: Send data to API or dispatch Redux action
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="customer_name"
          placeholder="Customer Name"
          value={customer.customer_name}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
          required
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={customer.phone_number}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
          value={customer.email}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={customer.address}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />
        <input
          type="number"
          name="loyalty_points"
          placeholder="Loyalty Points"
          value={customer.loyalty_points}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
          disabled // Since it's defaulted to 0, prevent manual editing
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
