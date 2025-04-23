// // import React from "react";

// // const ProductList = () => {
// //   // Sample product data (Replace with real data from API or Redux store)
// //   const products = [
// //     { id: 1, name: "Laptop", category: "Electronics", price: 75000, stock: 10, status: "Available" },
// //     { id: 2, name: "Smartphone", category: "Electronics", price: 40000, stock: 25, status: "Available" },
// //     { id: 3, name: "Headphones", category: "Accessories", price: 2500, stock: 50, status: "Out of Stock" },
// //     { id: 4, name: "Refrigerator", category: "Appliances", price: 30000, stock: 5, status: "Available" },
// //     { id: 5, name: "Washing Machine", category: "Appliances", price: 20000, stock: 3, status: "Limited Stock" },
// //   ];

// //   return (
// //     <div className="p-6">
// //       {/* Table Title */}
// //       <h1 className="text-2xl font-bold mb-4 text-white">Product List</h1>

// //       {/* Table Container */}
// //       <div className="overflow-x-auto">
// //         <table className="min-w-full bg-gray-800 text-white border border-gray-700 rounded-lg">
// //           {/* Table Headings */}
// //           <thead className="bg-gray-900">
// //             <tr>
// //               <th className="py-3 px-6 text-left border-b border-gray-700">S.No</th>
// //               <th className="py-3 px-6 text-left border-b border-gray-700">Product Name</th>
// //               {/* <th className="py-3 px-6 text-left border-b border-gray-700">Category</th> */}
// //               <th className="py-3 px-6 text-left border-b border-gray-700">Price (₹)</th>
// //               <th className="py-3 px-6 text-left border-b border-gray-700">Stock</th>
// //               <th className="py-3 px-6 text-left border-b border-gray-700">Status</th>
// //             </tr>
// //           </thead>

// //           {/* Table Body */}
// //           <tbody>
// //             {products.map((product, index) => (
// //               <tr key={product.id} className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}>
// //                 <td className="py-3 px-6 border-b border-gray-700">{index + 1}</td>
// //                 <td className="py-3 px-6 border-b border-gray-700">{product.name}</td>
// //                 {/* <td className="py-3 px-6 border-b border-gray-700">{product.category}</td> */}
// //                 <td className="py-3 px-6 border-b border-gray-700">₹{product.price.toLocaleString()}</td>
// //                 <td className="py-3 px-6 border-b border-gray-700">{product.stock}</td>
// //                 <td className={`py-3 px-6 border-b border-gray-700 ${product.status === "Out of Stock" ? "text-red-500" : "text-green-400"}`}>
// //                   {product.status}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductList;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import config from "../../config";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showArchiveModal, setShowArchiveModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [editProductData, setEditProductData] = useState({
//     _id: "",
//     store_id: "",
//     product_code: "",
//     product_name: "",
//     product_weight: 0,
//     img_urls: [],
//     category_id: "",
//     description: "",
//     unit: "",
//     pricing: [],
//     status: "active",
//     version: 1,
//     previous_versions: [],
//     archived: false,
//     created_at: "",
//     __v: 0,
//     stock_id: {
//       _id: "",
//       product_id: "",
//       store_id: "",
//       stock_quantity: 0,
//     },
//   });
//   useEffect(() => {
//     const fetchProductsAndCategories = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setError("No authentication token found.");
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch Products
//         const productResponse = await axios.get(
//           `${config.serverApi}/pos/product/store`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         // Fetch Categories
//         const categoryResponse = await axios.get(
//           `${config.serverApi}/pos/category/store`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setProducts(productResponse.data.products);
//         setCategories(categoryResponse.data.categories);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductsAndCategories();
//   }, []);

//   const handleView = (product) => {
//     console.log(product)
//     setSelectedProduct(product);
//     setShowViewModal(true);
//   };

//   const handleEdit = (product) => {
//     setSelectedProduct(product);
//     setEditProductData({
//       ...product,
//       category_id: product.category_id?._id || "",
//       pricing: product.pricing || [{ selling_price: 0, cost_price: 0, mrp: 0 }],
//     });
//     setShowEditModal(true);
//   };

//   const handleArchive = (product) => {
//     setSelectedProduct(product);
//     setShowArchiveModal(true);
//   };

//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   //   console.log(name);
//   //   console.log(value);
//   //   setEditProductData((prev) => ({
//   //     ...prev,
//   //     [name]: value,
//   //   }));
//   // };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // Check if the input name contains a dot (indicating a nested object)
//     if (name.includes(".")) {
//       const [parentKey, childKey] = name.split(".");

//       // Update the nested object
//       setEditProductData((prevData) => ({
//         ...prevData,
//         [parentKey]: {
//           ...prevData[parentKey],
//           [childKey]: value,
//         },
//       }));
//     } else {
//       // Update the top-level property
//       setEditProductData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const handlePricingChange = (e, index) => {
//     const { name, value } = e.target;
//     const newPricing = [...editProductData.pricing];
//     newPricing[index] = {
//       ...newPricing[index],
//       [name]: value,
//     };
//     setEditProductData((prev) => ({
//       ...prev,
//       pricing: newPricing,
//     }));
//   };

//   const confirmArchive = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       setError("No authentication token found.");
//       return;
//     }

//     try {
//       await axios.put(
//         `${config.serverApi}/pos/product/archive/${selectedProduct._id}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setProducts(
//         products.filter((product) => product._id !== selectedProduct._id)
//       );
//       setShowArchiveModal(false);
//     } catch (err) {
//       setError("Failed to archive the product.");
//     }
//   };

//   const handleSaveChanges = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       setError("No authentication token found.");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `${config.serverApi}/pos/product/${selectedProduct._id}`,
//         editProductData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setProducts((prev) =>
//         prev.map((product) =>
//           product._id === selectedProduct._id ? response.data : product
//         )
//       );
//       setShowEditModal(false);
//     } catch (err) {
//       setError("Failed to update the product.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4 text-white">Product List</h1>

//       {loading && <p className="text-gray-300">Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && !error && (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-gray-800 text-white border border-gray-700 rounded-lg">
//             <thead className="bg-gray-900">
//               <tr>
//                 <th className="py-3 px-6 text-left border-b border-gray-700">
//                   S.No
//                 </th>
//                 <th className="py-3 px-6 text-left border-b border-gray-700">
//                   Product Code
//                 </th>
//                 <th className="py-3 px-6 text-left border-b border-gray-700">
//                   Product Name
//                 </th>
//                 <th className="py-3 px-6 text-left border-b border-gray-700">
//                   Price (₹)
//                 </th>
//                 <th className="py-3 px-6 text-left border-b border-gray-700">
//                   Stock
//                 </th>
//                 <th className="py-3 px-6 text-left border-b border-gray-700">
//                   Status
//                 </th>
//                 <th className="py-3 px-6 text-left border-b border-gray-700">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product, index) => (
//                 <tr
//                   key={product._id}
//                   className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}
//                 >
//                   <td className="py-3 px-6 border-b border-gray-700">
//                     {index + 1}
//                   </td>
//                   <td className="py-3 px-6 border-b border-gray-700">
//                     {product.product_code}
//                   </td>
//                   <td className="py-3 px-6 border-b border-gray-700">
//                     {product.product_name}
//                   </td>
//                   <td className="py-3 px-6 border-b border-gray-700">
//                     ₹{product.pricing[0]?.selling_price?.toLocaleString()}
//                   </td>
//                   <td className="py-3 px-6 border-b border-gray-700">
//                     {product.stock_id.stock_quantity}
//                   </td>
//                   <td
//                     className={`py-3 px-6 border-b border-gray-700 ${
//                       product.status === "Out of Stock"
//                         ? "text-red-500"
//                         : "text-green-400"
//                     }`}
//                   >
//                     {product.status}
//                   </td>
//                   <td className="py-3 px-6 border-b border-gray-700">
//                     <button
//                       onClick={() => handleView(product)}
//                       className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded mr-2"
//                     >
//                       View
//                     </button>
//                     <button
//                       onClick={() => handleEdit(product)}
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded mr-2"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleArchive(product)}
//                       className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
//                     >
//                       Archive
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* View Product Modal */}
//       {showViewModal && selectedProduct && (
//   <div className="modal-overlay1">
//     <div className="modal-content1 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
//       {/* Product Name */}
//       <h2 className="text-2xl font-bold mb-4 text-center">{selectedProduct.product_name}</h2>

//       {/* Image or Placeholder */}
//       <div className="w-full h-48 mb-4 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
//         {selectedProduct.img_urls && selectedProduct.img_urls.length > 0 ? (
//           <img
//             src={selectedProduct.img_urls[0]}
//             alt={selectedProduct.product_name}
//             className="object-cover w-full h-full"
//           />
//         ) : (
//           <div className="text-gray-400 text-lg">No Image Available</div>
//         )}
//       </div>

//       {/* Table-style Info */}
//       <div className="grid grid-cols-2 gap-4 text-sm">
//         <div className="font-medium text-gray-500">Product Code:</div>
//         <div>{selectedProduct.product_code}</div>

//         <div className="font-medium text-gray-500">Description:</div>
//         <div>{selectedProduct.description || "N/A"}</div>

//         <div className="font-medium text-gray-500">Category:</div>
//         <div>{selectedProduct.category_id?.category_name}</div>

//         <div className="font-medium text-gray-500">Price:</div>
//         <div>₹{selectedProduct.pricing[0]?.selling_price}</div>

//         <div className="font-medium text-gray-500">Stock Quantity:</div>
//         <div>{selectedProduct.stock_id?.stock_quantity}</div>

//         <div className="font-medium text-gray-500">Unit:</div>
//         <div>{selectedProduct.unit}</div>

//         <div className="font-medium text-gray-500">Weight:</div>
//         <div>{selectedProduct.product_weight} g</div>

//         <div className="font-medium text-gray-500">Status:</div>
//         <div className={selectedProduct.status === "active" ? "text-green-600" : "text-red-600"}>
//           {selectedProduct.status}
//         </div>
//       </div>

//       {/* Close Button */}
//       <div className="text-center mt-6">
//         <button
//           onClick={() => setShowViewModal(false)}
//           className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-lg"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//       {/* Edit Product Modal */}
//       {showEditModal && selectedProduct && (
//   <div className="modal-overlay1">
//     <div className="modal-content1">
//       <h2 className="text-xl font-bold mb-4">Edit Product</h2>
//             <form>
//               <div className="mb-4">
//                 <label className="block text-white">Product Code</label>
//                 <input
//                   type="text"
//                   name="product_code"
//                   value={editProductData.product_code}
//                   className="w-full p-2 mt-1 bg-gray-700 text-white"
//                   readOnly
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-white">Product Name</label>
//                 <input
//                   type="text"
//                   name="product_name"
//                   value={editProductData.product_name}
//                   className="w-full p-2 mt-1 bg-gray-700 text-white"
//                   readOnly
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-white">Product Weight</label>
//                 <input
//                   type="number"
//                   name="product_weight"
//                   value={editProductData.product_weight}
//                   onChange={handleInputChange}
//                   className="w-full p-2 mt-1 bg-gray-700 text-white"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-white">Category</label>
//                 <select
//                   name="category_id"
//                   value={editProductData.category_id}
//                   onChange={handleInputChange}
//                   className="w-full p-2 mt-1 bg-gray-700 text-white"
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((category) => (
//                     <option key={category._id} value={category._id}>
//                       {category.category_name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-white">Description</label>
//                 <textarea
//                   name="description"
//                   value={editProductData.description}
//                   onChange={handleInputChange}
//                   className="w-full p-2 mt-1 bg-gray-700 text-white"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-white">Unit</label>
//                 <select
//                   name="unit"
//                   value={editProductData.unit}
//                   onChange={handleInputChange}
//                   className="w-full p-2 mt-1 bg-gray-700 text-white"
//                 >
//                   <option value="kg">Kg</option>
//                   <option value="liters">Liters</option>
//                   <option value="pcs">Pieces</option>
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-white">Pricing</label>
//                 {editProductData.pricing.map((price, index) => (
//                   <div key={index} className="mb-4">
//                     <label className="block text-white">Selling Price</label>
//                     <input
//                       type="number"
//                       name="selling_price"
//                       value={price.selling_price}
//                       onChange={(e) => handlePricingChange(e, index)}
//                       className="w-full p-2 mt-1 bg-gray-700 text-white"
//                     />
//                     <label className="block text-white">Cost Price</label>
//                     <input
//                       type="number"
//                       name="cost_price"
//                       value={price.cost_price}
//                       onChange={(e) => handlePricingChange(e, index)}
//                       className="w-full p-2 mt-1 bg-gray-700 text-white"
//                     />
//                     <label className="block text-white">MRP</label>
//                     <input
//                       type="number"
//                       name="mrp"
//                       value={price.mrp}
//                       onChange={(e) => handlePricingChange(e, index)}
//                       className="w-full p-2 mt-1 bg-gray-700 text-white"
//                     />
//                   </div>
//                 ))}
//               </div>
//               {/*

//                 <input
//                   type="number"
//                   name="stock_quantity"
//                   value={editProductData.stock_id.stock_quantity}
//                   onChange={handleInputChange}
//                   className="w-full p-2 mt-1 bg-gray-700 text-white"
//                 />
//                 */}
//               <div className="mb-4">
//                 <label className="block text-white">Stock Quantity</label>
//                 <input
//                   type="number"
//                   name="stock_id.stock_quantity" // Use dot notation for nested objects
//                   value={editProductData.stock_id.stock_quantity}
//                   onChange={handleInputChange}
//                   className="w-full p-2 mt-1 bg-gray-700 text-white"
//                 />
//               </div>
//               <button
//                 onClick={handleSaveChanges}
//                 className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
//               >
//                 Save Changes
//               </button>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded ml-2"
//               >
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Archive Confirmation Modal */}
//       {showArchiveModal && selectedProduct && (
//   <div className="modal-overlay1">
//     <div className="modal-content1">
//       <h2 className="text-xl font-bold mb-4">Archive Product</h2>
//             <button
//               onClick={confirmArchive}
//               className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
//             >
//               Confirm
//             </button>
//             <button
//               onClick={() => setShowArchiveModal(false)}
//               className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded ml-2"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import {
  Grid,
  List,
  Search,
  Filter,
  Edit,
  Archive,
  Eye,
  X,
  Package,
} from "lucide-react";
import { useViewMode } from "../../context/viewContext";
import { useTheme } from "../../context/themeContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const { viewMode, toggleViewMode } = useViewMode();
  const { theme } = useTheme();

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

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product_code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "" || product.category_id?._id === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Product List</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-modern pl-10 pr-4 py-2 w-full md:w-64"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input-modern pl-10 pr-4 py-2 w-full md:w-48 appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <button
            onClick={toggleViewMode}
            className="btn-modern-outline flex items-center gap-2"
          >
            {viewMode === "grid" ? (
              <>
                <List size={18} />
                <span>List View</span>
              </>
            ) : (
              <>
                <Grid size={18} />
                <span>Grid View</span>
              </>
            )}
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {error && <p className="text-red-500 text-center p-4">{error}</p>}

      {!loading && !error && (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center p-10 bg-card rounded-xl shadow">
              <p className="text-lg">
                No products found matching your criteria.
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid-view">
              {filteredProducts.map((product) => (
                <div key={product._id} className="modern-card">
                  <div className="h-40 bg-muted flex items-center justify-center overflow-hidden">
                    {product.img_urls && product.img_urls.length > 0 ? (
                      <img
                        src={product.img_urls[0] || "/placeholder.svg"}
                        alt={product.product_name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Package size={64} className="text-muted-foreground/30" />
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {product.product_name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {product.product_code}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          product.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {product.status}
                      </span>
                    </div>

                    <div className="mt-2">
                      <p className="text-lg font-bold">
                        ₹{product.pricing[0]?.selling_price?.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Stock: {product.stock_id.stock_quantity}
                      </p>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleView(product)}
                        className="btn-modern-outline flex-1 py-1.5 flex items-center justify-center gap-1"
                      >
                        <Eye size={16} />
                        {/* <span>View</span> */}
                      </button>
                      <button
                        onClick={() => handleEdit(product)}
                        className="btn-modern-outline flex-1 py-1.5 flex items-center justify-center gap-1"
                      >
                        <Edit size={16} />
                        {/* <span>Edit</span> */}
                      </button>
                      <button
                        onClick={() => handleArchive(product)}
                        className="btn-modern-outline flex-1 py-1.5 flex items-center justify-center gap-1 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Archive size={16} />
                        {/* <span>Archive</span> */}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-modern">
                <thead>
                  <tr>
                    <th>Product Code</th>
                    <th>Product Name</th>
                    <th>Price (₹)</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product._id}>
                      <td>{product.product_code}</td>
                      <td>{product.product_name}</td>
                      <td>
                        ₹{product.pricing[0]?.selling_price?.toLocaleString()}
                      </td>
                      <td>{product.stock_id.stock_quantity}</td>
                      <td>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            product.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleView(product)}
                            className="p-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20"
                            title="View"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-1.5 rounded-md bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleArchive(product)}
                            className="p-1.5 rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20"
                            title="Archive"
                          >
                            <Archive size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* View Product Modal */}
      {showViewModal && selectedProduct && (
        <div className="modal-overlay1">
          <div className="modal-content1 max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {selectedProduct.product_name}
              </h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-1 rounded-full hover:bg-muted"
              >
                <X size={20} />
              </button>
            </div>

            {/* Image or Placeholder */}
            <div className="w-full h-48 mb-4 rounded-xl overflow-hidden bg-muted flex items-center justify-center">
              {selectedProduct.img_urls &&
              selectedProduct.img_urls.length > 0 ? (
                <img
                  src={selectedProduct.img_urls[0] || "/placeholder.svg"}
                  alt={selectedProduct.product_name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <Package size={64} className="text-muted-foreground/30" />
              )}
            </div>

            {/* Table-style Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="font-medium text-muted-foreground">
                Product Code:
              </div>
              <div>{selectedProduct.product_code}</div>

              <div className="font-medium text-muted-foreground">
                Description:
              </div>
              <div>{selectedProduct.description || "N/A"}</div>

              <div className="font-medium text-muted-foreground">Category:</div>
              <div>{selectedProduct.category_id?.category_name}</div>

              <div className="font-medium text-muted-foreground">Price:</div>
              <div>₹{selectedProduct.pricing[0]?.selling_price}</div>

              <div className="font-medium text-muted-foreground">
                Stock Quantity:
              </div>
              <div>{selectedProduct.stock_id?.stock_quantity}</div>

              <div className="font-medium text-muted-foreground">Unit:</div>
              <div>{selectedProduct.unit}</div>

              <div className="font-medium text-muted-foreground">Weight:</div>
              <div>{selectedProduct.product_weight} g</div>

              <div className="font-medium text-muted-foreground">Status:</div>
              <div
                className={
                  selectedProduct.status === "active"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {selectedProduct.status}
              </div>
            </div>

            {/* Close Button */}
            <div className="text-center mt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="btn-modern"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="modal-overlay1">
          <div className="modal-content1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Product</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 rounded-full hover:bg-muted"
              >
                <X size={20} />
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Product Code
                  </label>
                  <input
                    type="text"
                    name="product_code"
                    value={editProductData.product_code}
                    className="input-modern"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="product_name"
                    value={editProductData.product_name}
                    className="input-modern"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Product Weight
                  </label>
                  <input
                    type="number"
                    name="product_weight"
                    value={editProductData.product_weight}
                    onChange={handleInputChange}
                    className="input-modern"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select
                    name="category_id"
                    value={editProductData.category_id}
                    onChange={handleInputChange}
                    className="input-modern"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editProductData.description}
                  onChange={handleInputChange}
                  className="input-modern min-h-[100px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Unit</label>
                <select
                  name="unit"
                  value={editProductData.unit}
                  onChange={handleInputChange}
                  className="input-modern"
                >
                  <option value="kg">Kg</option>
                  <option value="liters">Liters</option>
                  <option value="pcs">Pieces</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Pricing
                </label>
                {editProductData.pricing.map((price, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/30"
                  >
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Selling Price
                      </label>
                      <input
                        type="number"
                        name="selling_price"
                        value={price.selling_price}
                        onChange={(e) => handlePricingChange(e, index)}
                        className="input-modern"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Cost Price
                      </label>
                      <input
                        type="number"
                        name="cost_price"
                        value={price.cost_price}
                        onChange={(e) => handlePricingChange(e, index)}
                        className="input-modern"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        MRP
                      </label>
                      <input
                        type="number"
                        name="mrp"
                        value={price.mrp}
                        onChange={(e) => handlePricingChange(e, index)}
                        className="input-modern"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock_id.stock_quantity"
                  value={editProductData.stock_id.stock_quantity}
                  onChange={handleInputChange}
                  className="input-modern"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="btn-modern-outline"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="btn-modern"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Archive Confirmation Modal */}
      {showArchiveModal && selectedProduct && (
        <div className="modal-overlay1">
          <div className="modal-content1 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Archive Product</h2>
              <button
                onClick={() => setShowArchiveModal(false)}
                className="p-1 rounded-full hover:bg-muted"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mb-6">
              Are you sure you want to archive{" "}
              <strong>{selectedProduct.product_name}</strong>? This action
              cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowArchiveModal(false)}
                className="btn-modern-outline"
              >
                Cancel
              </button>
              <button
                onClick={confirmArchive}
                className="btn-modern bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
