import React, { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    product_code: "",
    product_name: "",
    category_id: "",
    unit: "",
    mrp: "",
    landing_cost: "",
    net_cost: "",
    basic_cost: "",
    profit_percent: "",
    selling_price: "",
    stock_quantity: "",
    supplier_id: "",
    status: "active",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Product:", product);
    // You can dispatch an action to save the product in Redux or an API call
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      
      {/* Scrollable Form Container */}
      <div className="max-h-[400px] overflow-y-auto pr-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="product_code" placeholder="Product Code" value={product.product_code} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" required />
          <input type="text" name="product_name" placeholder="Product Name" value={product.product_name} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" required />
          <input type="text" name="category_id" placeholder="Category ID" value={product.category_id} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" required />
          
          <select name="unit" value={product.unit} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" required>
            <option value="">Select Unit</option>
            <option value="kg">Kg</option>
            <option value="liters">Liters</option>
            <option value="pcs">Pcs</option>
          </select>

          <input type="number" name="mrp" placeholder="MRP" value={product.mrp} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" required />
          <input type="number" name="landing_cost" placeholder="Landing Cost" value={product.landing_cost} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" required />
          <input type="number" name="net_cost" placeholder="Net Cost" value={product.net_cost} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" required />
          <input type="number" name="basic_cost" placeholder="Basic Cost" value={product.basic_cost} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" required />
          <input type="number" name="profit_percent" placeholder="Profit Percent" value={product.profit_percent} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" required />
          <input type="number" name="selling_price" placeholder="Selling Price" value={product.selling_price} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" required />
          <input type="number" name="stock_quantity" placeholder="Stock Quantity" value={product.stock_quantity} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" required />

          <select name="status" value={product.status} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" required>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
