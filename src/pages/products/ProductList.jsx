// import React from "react";

// const ProductList = () => {
//   // Sample product data (Replace with real data from API or Redux store)
//   const products = [
//     { id: 1, name: "Laptop", category: "Electronics", price: 75000, stock: 10, status: "Available" },
//     { id: 2, name: "Smartphone", category: "Electronics", price: 40000, stock: 25, status: "Available" },
//     { id: 3, name: "Headphones", category: "Accessories", price: 2500, stock: 50, status: "Out of Stock" },
//     { id: 4, name: "Refrigerator", category: "Appliances", price: 30000, stock: 5, status: "Available" },
//     { id: 5, name: "Washing Machine", category: "Appliances", price: 20000, stock: 3, status: "Limited Stock" },
//   ];

//   return (
//     <div className="p-6">
//       {/* Table Title */}
//       <h1 className="text-2xl font-bold mb-4 text-white">Product List</h1>

//       {/* Table Container */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-gray-800 text-white border border-gray-700 rounded-lg">
//           {/* Table Headings */}
//           <thead className="bg-gray-900">
//             <tr>
//               <th className="py-3 px-6 text-left border-b border-gray-700">S.No</th>
//               <th className="py-3 px-6 text-left border-b border-gray-700">Product Name</th>
//               {/* <th className="py-3 px-6 text-left border-b border-gray-700">Category</th> */}
//               <th className="py-3 px-6 text-left border-b border-gray-700">Price (₹)</th>
//               <th className="py-3 px-6 text-left border-b border-gray-700">Stock</th>
//               <th className="py-3 px-6 text-left border-b border-gray-700">Status</th>
//             </tr>
//           </thead>

//           {/* Table Body */}
//           <tbody>
//             {products.map((product, index) => (
//               <tr key={product.id} className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}>
//                 <td className="py-3 px-6 border-b border-gray-700">{index + 1}</td>
//                 <td className="py-3 px-6 border-b border-gray-700">{product.name}</td>
//                 {/* <td className="py-3 px-6 border-b border-gray-700">{product.category}</td> */}
//                 <td className="py-3 px-6 border-b border-gray-700">₹{product.price.toLocaleString()}</td>
//                 <td className="py-3 px-6 border-b border-gray-700">{product.stock}</td>
//                 <td className={`py-3 px-6 border-b border-gray-700 ${product.status === "Out of Stock" ? "text-red-500" : "text-green-400"}`}>
//                   {product.status}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProductData, setEditProductData] = useState({
    _id: "",
    store_id: "",
    product_code: "",
    product_name: "",
    product_weight: 0,
    img_urls: [],
    category_id: "",
    description: "",
    unit: "",
    pricing: [],
    status: "active",
    version: 1,
    previous_versions: [],
    archived: false,
    created_at: "",
    __v: 0,
    stock_id: {
      _id: "",
      product_id: "",
      store_id: "",
      stock_quantity: 0,
    },
  });
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      try {
        // Fetch Products
        const productResponse = await axios.get(
          `${config.serverApi}/pos/product/store`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Fetch Categories
        const categoryResponse = await axios.get(
          `${config.serverApi}/pos/category/store`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProducts(productResponse.data.products);
        setCategories(categoryResponse.data.categories);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const handleView = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditProductData({
      ...product,
      category_id: product.category_id?._id || "",
      pricing: product.pricing || [{ selling_price: 0, cost_price: 0, mrp: 0 }],
    });
    setShowEditModal(true);
  };

  const handleArchive = (product) => {
    setSelectedProduct(product);
    setShowArchiveModal(true);
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(name);
  //   console.log(value);
  //   setEditProductData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input name contains a dot (indicating a nested object)
    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");

      // Update the nested object
      setEditProductData((prevData) => ({
        ...prevData,
        [parentKey]: {
          ...prevData[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      // Update the top-level property
      setEditProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handlePricingChange = (e, index) => {
    const { name, value } = e.target;
    const newPricing = [...editProductData.pricing];
    newPricing[index] = {
      ...newPricing[index],
      [name]: value,
    };
    setEditProductData((prev) => ({
      ...prev,
      pricing: newPricing,
    }));
  };

  const confirmArchive = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No authentication token found.");
      return;
    }

    try {
      await axios.put(
        `${config.serverApi}/pos/product/archive/${selectedProduct._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(
        products.filter((product) => product._id !== selectedProduct._id)
      );
      setShowArchiveModal(false);
    } catch (err) {
      setError("Failed to archive the product.");
    }
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No authentication token found.");
      return;
    }

    try {
      const response = await axios.put(
        `${config.serverApi}/pos/product/${selectedProduct._id}`,
        editProductData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts((prev) =>
        prev.map((product) =>
          product._id === selectedProduct._id ? response.data : product
        )
      );
      setShowEditModal(false);
    } catch (err) {
      setError("Failed to update the product.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Product List</h1>

      {loading && <p className="text-gray-300">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-white border border-gray-700 rounded-lg">
            <thead className="bg-gray-900">
              <tr>
                <th className="py-3 px-6 text-left border-b border-gray-700">
                  S.No
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-700">
                  Product Code
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-700">
                  Product Name
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-700">
                  Price (₹)
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-700">
                  Stock
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-700">
                  Status
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}
                >
                  <td className="py-3 px-6 border-b border-gray-700">
                    {index + 1}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-700">
                    {product.product_code}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-700">
                    {product.product_name}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-700">
                    ₹{product.pricing[0]?.selling_price?.toLocaleString()}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-700">
                    {product.stock_id.stock_quantity}
                  </td>
                  <td
                    className={`py-3 px-6 border-b border-gray-700 ${
                      product.status === "Out of Stock"
                        ? "text-red-500"
                        : "text-green-400"
                    }`}
                  >
                    {product.status}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-700">
                    <button
                      onClick={() => handleView(product)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleArchive(product)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
                    >
                      Archive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Product Modal */}
      {showViewModal && selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedProduct.product_name}</h2>
            <p>Product Code: {selectedProduct.product_code}</p>
            <p>Description: {selectedProduct.description}</p>
            <p>Category: {selectedProduct.category_id?.category_name}</p>
            <p>Price: ₹{selectedProduct.pricing[0]?.selling_price}</p>
            <p>Stock Quantity: {selectedProduct.stock_quantity}</p>
            <p>Unit: {selectedProduct.unit}</p>
            <button
              onClick={() => setShowViewModal(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Product</h2>
            <form>
              <div className="mb-4">
                <label className="block text-white">Product Code</label>
                <input
                  type="text"
                  name="product_code"
                  value={editProductData.product_code}
                  className="w-full p-2 mt-1 bg-gray-700 text-white"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">Product Name</label>
                <input
                  type="text"
                  name="product_name"
                  value={editProductData.product_name}
                  className="w-full p-2 mt-1 bg-gray-700 text-white"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">Product Weight</label>
                <input
                  type="number"
                  name="product_weight"
                  value={editProductData.product_weight}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">Category</label>
                <select
                  name="category_id"
                  value={editProductData.category_id}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 bg-gray-700 text-white"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-white">Description</label>
                <textarea
                  name="description"
                  value={editProductData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">Unit</label>
                <select
                  name="unit"
                  value={editProductData.unit}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 bg-gray-700 text-white"
                >
                  <option value="kg">Kg</option>
                  <option value="liters">Liters</option>
                  <option value="pcs">Pieces</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-white">Pricing</label>
                {editProductData.pricing.map((price, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-white">Selling Price</label>
                    <input
                      type="number"
                      name="selling_price"
                      value={price.selling_price}
                      onChange={(e) => handlePricingChange(e, index)}
                      className="w-full p-2 mt-1 bg-gray-700 text-white"
                    />
                    <label className="block text-white">Cost Price</label>
                    <input
                      type="number"
                      name="cost_price"
                      value={price.cost_price}
                      onChange={(e) => handlePricingChange(e, index)}
                      className="w-full p-2 mt-1 bg-gray-700 text-white"
                    />
                    <label className="block text-white">MRP</label>
                    <input
                      type="number"
                      name="mrp"
                      value={price.mrp}
                      onChange={(e) => handlePricingChange(e, index)}
                      className="w-full p-2 mt-1 bg-gray-700 text-white"
                    />
                  </div>
                ))}
              </div>
              {/*

                <input
                  type="number"
                  name="stock_quantity"
                  value={editProductData.stock_id.stock_quantity}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 bg-gray-700 text-white"
                />
                */}
              <div className="mb-4">
                <label className="block text-white">Stock Quantity</label>
                <input
                  type="number"
                  name="stock_id.stock_quantity" // Use dot notation for nested objects
                  value={editProductData.stock_id.stock_quantity}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 bg-gray-700 text-white"
                />
              </div>
              <button
                onClick={handleSaveChanges}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Archive Confirmation Modal */}
      {showArchiveModal && selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <h2>Are you sure you want to archive this product?</h2>
            <button
              onClick={confirmArchive}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowArchiveModal(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
