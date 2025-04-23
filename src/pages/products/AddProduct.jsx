// // import React, { useState, useEffect } from "react";
// // import { useDispatch } from "react-redux";
// // import { addProduct } from "../../redux/productSlice";
// // import config from "../../config";
// // import axios from "axios";
// // import CustomToast from "../../components/globalComponent/customToast/CustomToast";

// // const AddProduct = () => {
// //   const dispatch = useDispatch();

// //   // State for categories and form data
// //   const [categories, setCategories] = useState([]);
// //   const [toast, setToast] = useState({
// //     show: false,
// //     body: "",
// //     status: "success",
// //   });
// //   const [product, setProduct] = useState({
// //     product_name: "",
// //     category_id: "",
// //     scan_id: "",
// //     product_weight: "",
// //     img_urls: [],
// //     description: "",
// //     unit: "",
// //     pricing: [{ mrp: "", cost_price: "", selling_price: "" }],
// //     // supplier_id: "",
// //     stock_quantity: "",
// //     status: "active",
// //   });
// //   const [suggestions, setSuggestions] = useState([]);

// //   const showToast = (message, status) => {
// //     setToast({ show: true, body: message, status });
// //     // setTimeout(() => setToast({ ...toast, show: false }), 3000);
// //   };

// //   // Fetch store categories on component mount
// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       const token = localStorage.getItem("token");
// //       if (!token) {
// //         console.error("No authentication token found.");
// //         return;
// //       }
// //       try {
// //         const response = await axios.get(
// //           `${config.serverApi}/pos/category/store`,
// //           {
// //             headers: { Authorization: `Bearer ${token}` },
// //           }
// //         );
// //         setCategories(response.data.categories); // Set fetched categories
// //       } catch (error) {
// //         console.error("Error fetching categories:", error);
// //       }
// //     };
// //     fetchCategories();
// //   }, []);

// //   // Handle input changes
// //   const handleChange = (e) => {
// //     setProduct({ ...product, [e.target.name]: e.target.value });
// //   };

// //   // Handle pricing array changes
// //   const handlePricingChange = (e, index) => {
// //     const updatedPricing = product.pricing.map((p, i) =>
// //       i === index ? { ...p, [e.target.name]: e.target.value } : p
// //     );
// //     setProduct({ ...product, pricing: updatedPricing });
// //   };

// //   // Handle adding/removing image URLs
// //   const handleImgUrlsChange = (e, index) => {
// //     const updatedImgUrls = [...product.img_urls];
// //     updatedImgUrls[index] = e.target.value;
// //     setProduct({ ...product, img_urls: updatedImgUrls });
// //   };

// //   const handleAddImgUrl = () => {
// //     setProduct({ ...product, img_urls: [...product.img_urls, ""] });
// //   };

// //   const handleRemoveImgUrl = (index) => {
// //     const updatedImgUrls = product.img_urls.filter((_, i) => i !== index);
// //     setProduct({ ...product, img_urls: updatedImgUrls });
// //   };

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       console.error("No authentication token found.");
// //       return;
// //     }

// //     const formattedProduct = {
// //       ...product,
// //       product_name: product.product_name.trim().toLowerCase(),
// //     };

// //     try {
// //       const response = await axios.post(
// //         `${config.serverApi}/pos/product`,
// //         formattedProduct,
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );
// //       console.log("Product Added:", response.data);

// //       // Reset form after successful submission
// //       setProduct({
// //         product_name: "",
// //         scan_id: "",
// //         category_id: "",
// //         product_weight: "",
// //         img_urls: [],
// //         description: "",
// //         unit: "",
// //         pricing: [{ mrp: "", cost_price: "", selling_price: "" }],
// //         stock_quantity: "",
// //         status: "active",
// //       });

// //       showToast("Product added successfully", "success");
// //     } catch (error) {
// //       console.error(
// //         "Error adding product:",
// //         error.response?.data || error.message
// //       );
// //       showToast("Internal server Error! please try again later...", "error");
// //     }
// //   };

// //   const fetchProductSuggestions = async (query) => {
// //     if (!query) {
// //       setSuggestions([]); // Clear suggestions if input is empty
// //       return;
// //     }

// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await axios.get(
// //         `${config.serverApi}/pos/product/search?name=${query}`,
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );
// //       setSuggestions(response.data.products); // Assuming backend returns a `products` array
// //     } catch (error) {
// //       console.error("Error fetching product suggestions:", error);
// //     }
// //   };

// //   // Debounce function to limit API calls
// //   const debounce = (func, delay) => {
// //     let timer;
// //     return (...args) => {
// //       clearTimeout(timer);
// //       timer = setTimeout(() => func(...args), delay);
// //     };
// //   };

// //   const handleProductNameChange = (e) => {
// //     setProduct({ ...product, product_name: e.target.value });
// //     debouncedFetch(e.target.value);
// //   };

// //   const debouncedFetch = debounce(fetchProductSuggestions, 300);

// //   return (
// //     <div className="p-3 bg-gray-800 text-white rounded-lg shadow-md w-full h-full overflow-auto">
// //       <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

// //       <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
// //         {/* Category Selection */}
// //         <div>
// //           <label className="block mb-1 text-sm">Category</label>
// //           <select
// //             name="category_id"
// //             value={product.category_id}
// //             onChange={handleChange}
// //             className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
// //             required
// //           >
// //             <option value="">Select Category</option>
// //             {categories.map((category) => (
// //               <option key={category._id} value={category._id}>
// //                 {category.category_name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div className="relative">
// //           <label className="block mb-1 text-sm">Product Name</label>
// //           <input
// //             type="text"
// //             name="product_name"
// //             value={product.product_name}
// //             onChange={handleProductNameChange}
// //             className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
// //             required
// //           />
// //           {suggestions.length > 0 && (
// //             <ul className="absolute z-10 bg-gray-900 border border-gray-700 w-full rounded mt-1 max-h-40 overflow-y-auto">
// //               {suggestions.map((item) => (
// //                 <li
// //                   key={item._id}
// //                   className="p-2 hover:bg-gray-700 cursor-pointer"
// //                   onClick={() => {
// //                     setProduct({ ...product, product_name: item.product_name });
// //                     setSuggestions([]); // Clear suggestions when selected
// //                   }}
// //                 >
// //                   {item.product_name}
// //                 </li>
// //               ))}
// //             </ul>
// //           )}
// //         </div>

// //         <div>
// //           <label className="block mb-1 text-sm">Barcode Id</label>
// //           <input
// //             type="text"
// //             name="scan_id"
// //             value={product.scan_id}
// //             onChange={handleChange}
// //             className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 text-sm">Product Weight (g)</label>
// //           <input
// //             type="number"
// //             name="product_weight"
// //             value={product.product_weight}
// //             onChange={handleChange}
// //             className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 text-sm">Description</label>
// //           <textarea
// //             name="description"
// //             value={product.description}
// //             onChange={handleChange}
// //             className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
// //           ></textarea>
// //         </div>

// //         {/* Pricing Fields */}
// //         <div>
// //           <label className="block mb-1 text-sm">Pricing</label>
// //           {product.pricing.map((pricing, index) => (
// //             <div key={index} className="grid grid-cols-3 gap-2">
// //               <div>
// //                 <label className="block mb-1 text-sm">MRP</label>
// //                 <input
// //                   type="number"
// //                   name="mrp"
// //                   value={pricing.mrp}
// //                   onChange={(e) => handlePricingChange(e, index)}
// //                   className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block mb-1 text-sm">Cost Price</label>
// //                 <input
// //                   type="number"
// //                   name="cost_price"
// //                   value={pricing.cost_price}
// //                   onChange={(e) => handlePricingChange(e, index)}
// //                   className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block mb-1 text-sm">Selling Price</label>
// //                 <input
// //                   type="number"
// //                   name="selling_price"
// //                   value={pricing.selling_price}
// //                   onChange={(e) => handlePricingChange(e, index)}
// //                   className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
// //                 />
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Image URLs Fields */}
// //         <div>
// //           <label className="block mb-1 text-sm">Product Images</label>
// //           {product.img_urls.map((imgUrl, index) => (
// //             <div key={index} className="flex space-x-2">
// //               <input
// //                 type="text"
// //                 value={imgUrl}
// //                 onChange={(e) => handleImgUrlsChange(e, index)}
// //                 className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
// //                 placeholder="Enter image URL"
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => handleRemoveImgUrl(index)}
// //                 className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
// //               >
// //                 Remove
// //               </button>
// //             </div>
// //           ))}
// //           <button
// //             type="button"
// //             onClick={handleAddImgUrl}
// //             className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
// //           >
// //             Add Another Image URL
// //           </button>
// //         </div>

// //         {/* Stock Quantity Field */}
// //         <div>
// //           <label className="block mb-1 text-sm">Stock Quantity</label>
// //           <input
// //             type="number"
// //             name="stock_quantity"
// //             value={product.stock_quantity}
// //             onChange={handleChange}
// //             className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
// //             required
// //           />
// //         </div>

// //         {/* Unit Selection */}
// //         <div>
// //           <label className="block mb-1 text-sm">Unit</label>
// //           <select
// //             name="unit"
// //             value={product.unit}
// //             onChange={handleChange}
// //             className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
// //             required
// //           >
// //             <option value="">Select Unit</option>
// //             <option value="kg">Kg</option>
// //             <option value="liters">Liters</option>
// //             <option value="pcs">Pcs</option>
// //           </select>
// //         </div>

// //         {/* Status Selection */}
// //         <div>
// //           <label className="block mb-1 text-sm">Status</label>
// //           <select
// //             name="status"
// //             value={product.status}
// //             onChange={handleChange}
// //             className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
// //             required
// //           >
// //             <option value="active">Active</option>
// //             <option value="inactive">Inactive</option>
// //           </select>
// //         </div>

// //         {/* Submit Button */}
// //         <div className="col-span-2 flex justify-center mt-2">
// //           <button
// //             type="submit"
// //             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
// //           >
// //             Add Product
// //           </button>
// //         </div>
// //       </form>

// //       <CustomToast
// //         show={toast.show}
// //         onClose={() => setToast({ ...toast, show: false })}
// //         body={toast.body}
// //         status={toast.status}
// //       />
// //     </div>
// //   );
// // };

// // export default AddProduct;
// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { addProduct } from "../../redux/productSlice";
// import config from "../../config";
// import axios from "axios";
// import CustomToast from "../../components/globalComponent/customToast/CustomToast";

// const AddProduct = () => {
//   const dispatch = useDispatch();
//   const fileInputRef = useRef(null);

//   // State for categories and form data
//   const [categories, setCategories] = useState([]);
//   const [toast, setToast] = useState({
//     show: false,
//     body: "",
//     status: "success",
//   });
//   const [product, setProduct] = useState({
//     product_name: "",
//     category_id: "",
//     scan_id: "",
//     product_weight: "",
//     img_urls: [],
//     description: "",
//     unit: "",
//     pricing: [{ mrp: "", cost_price: "", selling_price: "" }],
//     stock_quantity: "",
//     status: "active",
//   });
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [isUploading, setIsUploading] = useState(false);

//   const showToast = (message, status) => {
//     setToast({ show: true, body: message, status });
//   };

//   // Fetch store categories on component mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("No authentication token found.");
//         return;
//       }
//       try {
//         const response = await axios.get(
//           `${config.serverApi}/pos/category/store`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setCategories(response.data.categories);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   // Handle pricing array changes
//   const handlePricingChange = (e, index) => {
//     const updatedPricing = product.pricing.map((p, i) =>
//       i === index ? { ...p, [e.target.name]: e.target.value } : p
//     );
//     setProduct({ ...product, pricing: updatedPricing });
//   };

//   // Handle image selection
//   const handleImageChange = (e) => {
//     if (e.target.files) {
//       const filesArray = Array.from(e.target.files).map((file) => ({
//         file,
//         preview: URL.createObjectURL(file),
//       }));

//       setSelectedImages((prev) => [...prev, ...filesArray]);
//     }
//   };

//   // Remove selected image
//   const handleRemoveImage = (index) => {
//     const newImages = [...selectedImages];
//     URL.revokeObjectURL(newImages[index].preview); // Clean up memory
//     newImages.splice(index, 1);
//     setSelectedImages(newImages);
//   };

//   // Clean up object URLs when component unmounts
//   useEffect(() => {
//     return () => {
//       selectedImages.forEach((image) => URL.revokeObjectURL(image.preview));
//     };
//   }, [selectedImages]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsUploading(true);

//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.error("No authentication token found.");
//       setIsUploading(false);
//       return;
//     }

//     const formData = new FormData();

//     // Append product data
//     formData.append("product_name", product.product_name.trim().toLowerCase());
//     formData.append("category_id", product.category_id);
//     formData.append("scan_id", product.scan_id);
//     formData.append("product_weight", product.product_weight);
//     formData.append("description", product.description);
//     formData.append("unit", product.unit);
//     formData.append("stock_quantity", product.stock_quantity);
//     formData.append("status", product.status);

//     // Append pricing data
//     formData.append("pricing", JSON.stringify(product.pricing[0]));

//     // Append files
//     selectedImages.forEach((image) => {
//       formData.append("files", image.file); // Ensure 'image' is the actual file
//     });

//     try {
//       const response = await axios.post(
//         `${config.serverApi}/pos/product`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Product Added:", response.data);

//       // Reset form after successful submission
//       setProduct({
//         product_name: "",
//         scan_id: "",
//         category_id: "",
//         product_weight: "",
//         img_urls: [],
//         description: "",
//         unit: "",
//         pricing: [{ mrp: "", cost_price: "", selling_price: "" }],
//         stock_quantity: "",
//         status: "active",
//       });
//       setSelectedImages([]);

//       showToast("Product added successfully", "success");
//     } catch (error) {
//       console.error(
//         "Error adding product:",
//         error.response?.data || error.message
//       );
//       showToast("Error adding product. Please try again.", "error");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const fetchProductSuggestions = async (query) => {
//     if (!query) {
//       setSuggestions([]);
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `${config.serverApi}/pos/product/search?name=${query}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setSuggestions(response.data.products);
//     } catch (error) {
//       console.error("Error fetching product suggestions:", error);
//     }
//   };

//   // Debounce function to limit API calls
//   const debounce = (func, delay) => {
//     let timer;
//     return (...args) => {
//       clearTimeout(timer);
//       timer = setTimeout(() => func(...args), delay);
//     };
//   };

//   const handleProductNameChange = (e) => {
//     setProduct({ ...product, product_name: e.target.value });
//     debouncedFetch(e.target.value);
//   };

//   const debouncedFetch = debounce(fetchProductSuggestions, 300);

//   return (
//     <div className="p-3 bg-gray-800 text-white rounded-lg shadow-md w-full h-full overflow-auto">
//       <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

//       <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//         {/* Category Selection */}
//         <div>
//           <label className="block mb-1 text-sm">Category</label>
//           <select
//             name="category_id"
//             value={product.category_id}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
//             required
//           >
//             <option value="">Select Category</option>
//             {categories.map((category) => (
//               <option key={category._id} value={category._id}>
//                 {category.category_name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="relative">
//           <label className="block mb-1 text-sm">Product Name</label>
//           <input
//             type="text"
//             name="product_name"
//             value={product.product_name}
//             onChange={handleProductNameChange}
//             className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
//             required
//           />
//           {suggestions.length > 0 && (
//             <ul className="absolute z-10 bg-gray-900 border border-gray-700 w-full rounded mt-1 max-h-40 overflow-y-auto">
//               {suggestions.map((item) => (
//                 <li
//                   key={item._id}
//                   className="p-2 hover:bg-gray-700 cursor-pointer"
//                   onClick={() => {
//                     setProduct({ ...product, product_name: item.product_name });
//                     setSuggestions([]);
//                   }}
//                 >
//                   {item.product_name}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div>
//           <label className="block mb-1 text-sm">Barcode Id</label>
//           <input
//             type="text"
//             name="scan_id"
//             value={product.scan_id}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm">Product Weight (g)</label>
//           <input
//             type="number"
//             name="product_weight"
//             value={product.product_weight}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm">Description</label>
//           <textarea
//             name="description"
//             value={product.description}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
//           ></textarea>
//         </div>

//         {/* Pricing Fields */}
//         <div>
//           <label className="block mb-1 text-sm">Pricing</label>
//           {product.pricing.map((pricing, index) => (
//             <div key={index} className="grid grid-cols-3 gap-2">
//               <div>
//                 <label className="block mb-1 text-sm">MRP</label>
//                 <input
//                   type="number"
//                   name="mrp"
//                   value={pricing.mrp}
//                   onChange={(e) => handlePricingChange(e, index)}
//                   className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm">Cost Price</label>
//                 <input
//                   type="number"
//                   name="cost_price"
//                   value={pricing.cost_price}
//                   onChange={(e) => handlePricingChange(e, index)}
//                   className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm">Selling Price</label>
//                 <input
//                   type="number"
//                   name="selling_price"
//                   value={pricing.selling_price}
//                   onChange={(e) => handlePricingChange(e, index)}
//                   className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Image Upload Section */}
//         <div className="col-span-2">
//           <label className="block mb-1 text-sm">Product Images</label>
//           <div className="flex flex-wrap gap-4 mb-4">
//             {selectedImages.map((image, index) => (
//               <div key={index} className="relative group">
//                 <img
//                   src={image.preview}
//                   alt={`Preview ${index}`}
//                   className="h-24 w-24 object-cover rounded border border-gray-600"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveImage(index)}
//                   className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//           </div>

//           <div className="flex items-center gap-4">
//             <button
//               type="button"
//               onClick={() => fileInputRef.current.click()}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               Add Images
//             </button>
//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleImageChange}
//               className="hidden"
//               multiple
//               accept="image/*"
//             />
//             <span className="text-sm text-gray-400">
//               {selectedImages.length} image(s) selected
//             </span>
//           </div>
//         </div>

//         {/* Stock Quantity Field */}
//         <div>
//           <label className="block mb-1 text-sm">Stock Quantity</label>
//           <input
//             type="number"
//             name="stock_quantity"
//             value={product.stock_quantity}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
//             required
//           />
//         </div>

//         {/* Unit Selection */}
//         <div>
//           <label className="block mb-1 text-sm">Unit</label>
//           <select
//             name="unit"
//             value={product.unit}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
//             required
//           >
//             <option value="">Select Unit</option>
//             <option value="kg">Kg</option>
//             <option value="liters">Liters</option>
//             <option value="pcs">Pcs</option>
//           </select>
//         </div>

//         {/* Status Selection */}
//         <div>
//           <label className="block mb-1 text-sm">Status</label>
//           <select
//             name="status"
//             value={product.status}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
//             required
//           >
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>

//         {/* Submit Button */}
//         <div className="col-span-2 flex justify-center mt-2">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded flex items-center"
//             disabled={isUploading}
//           >
//             {isUploading ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Uploading...
//               </>
//             ) : (
//               "Add Product"
//             )}
//           </button>
//         </div>
//       </form>

//       <CustomToast
//         show={toast.show}
//         onClose={() => setToast({ ...toast, show: false })}
//         body={toast.body}
//         status={toast.status}
//       />
//     </div>
//   );
// };

// export default AddProduct;
"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import config from "../../config";
import axios from "axios";
import CustomToast from "../../components/globalComponent/customToast/CustomToast";
import {
  Upload,
  Tag,
  Package,
  FileText,
  DollarSign,
  Layers,
  Check,
  X,
  ImageIcon,
  Trash2,
} from "lucide-react";
import { useTheme } from "../../context/themeContext";

const AddProduct = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { theme } = useTheme();

  // State for categories and form data
  const [categories, setCategories] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    body: "",
    status: "success",
  });
  const [product, setProduct] = useState({
    product_name: "",
    category_id: "",
    scan_id: "",
    product_weight: "",
    img_urls: [],
    description: "",
    unit: "",
    pricing: [{ mrp: "", cost_price: "", selling_price: "" }],
    stock_quantity: "",
    status: "active",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic"); // basic, pricing, images, inventory

  const showToast = (message, status) => {
    setToast({ show: true, body: message, status });
  };

  // Fetch store categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found.");
        return;
      }
      try {
        const response = await axios.get(
          `${config.serverApi}/pos/category/store`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle pricing array changes
  const handlePricingChange = (e, index) => {
    const updatedPricing = product.pricing.map((p, i) =>
      i === index ? { ...p, [e.target.name]: e.target.value } : p
    );
    setProduct({ ...product, pricing: updatedPricing });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setSelectedImages((prev) => [...prev, ...filesArray]);
    }
  };

  // Remove selected image
  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages];
    URL.revokeObjectURL(newImages[index].preview); // Clean up memory
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      selectedImages.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [selectedImages]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found.");
      setIsUploading(false);
      return;
    }

    const formData = new FormData();

    // Append product data
    formData.append("product_name", product.product_name.trim().toLowerCase());
    formData.append("category_id", product.category_id);
    formData.append("scan_id", product.scan_id);
    formData.append("product_weight", product.product_weight);
    formData.append("description", product.description);
    formData.append("unit", product.unit);
    formData.append("stock_quantity", product.stock_quantity);
    formData.append("status", product.status);

    // Append pricing data
    formData.append("pricing", JSON.stringify(product.pricing[0]));

    // Append files
    selectedImages.forEach((image) => {
      formData.append("files", image.file); // Ensure 'image' is the actual file
    });

    try {
      const response = await axios.post(
        `${config.serverApi}/pos/product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product Added:", response.data);

      // Reset form after successful submission
      setProduct({
        product_name: "",
        scan_id: "",
        category_id: "",
        product_weight: "",
        img_urls: [],
        description: "",
        unit: "",
        pricing: [{ mrp: "", cost_price: "", selling_price: "" }],
        stock_quantity: "",
        status: "active",
      });
      setSelectedImages([]);
      setActiveTab("basic");

      showToast("Product added successfully", "success");
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data || error.message
      );
      showToast("Error adding product. Please try again.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const fetchProductSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${config.serverApi}/pos/product/search?name=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuggestions(response.data.products);
    } catch (error) {
      console.error("Error fetching product suggestions:", error);
    }
  };

  // Debounce function to limit API calls
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleProductNameChange = (e) => {
    setProduct({ ...product, product_name: e.target.value });
    debouncedFetch(e.target.value);
  };

  const debouncedFetch = debounce(fetchProductSuggestions, 300);

  const isFormValid = () => {
    if (activeTab === "basic") {
      return (
        product.product_name &&
        product.category_id &&
        product.scan_id &&
        product.product_weight
      );
    } else if (activeTab === "pricing") {
      return (
        product.pricing[0].mrp &&
        product.pricing[0].cost_price &&
        product.pricing[0].selling_price
      );
    } else if (activeTab === "inventory") {
      return product.stock_quantity && product.unit;
    }
    return true;
  };

  const handleNextTab = () => {
    if (activeTab === "basic") setActiveTab("pricing");
    else if (activeTab === "pricing") setActiveTab("images");
    else if (activeTab === "images") setActiveTab("inventory");
  };

  const handlePrevTab = () => {
    if (activeTab === "inventory") setActiveTab("images");
    else if (activeTab === "images") setActiveTab("pricing");
    else if (activeTab === "pricing") setActiveTab("basic");
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>

      <div className="bg-card rounded-xl shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("basic")}
            className={`px-4 py-3 flex items-center gap-2 font-medium text-sm ${
              activeTab === "basic"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Package size={18} />
            Basic Info
          </button>
          <button
            onClick={() => setActiveTab("pricing")}
            className={`px-4 py-3 flex items-center gap-2 font-medium text-sm ${
              activeTab === "pricing"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <DollarSign size={18} />
            Pricing
          </button>
          <button
            onClick={() => setActiveTab("images")}
            className={`px-4 py-3 flex items-center gap-2 font-medium text-sm ${
              activeTab === "images"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ImageIcon size={18} />
            Images
          </button>
          <button
            onClick={() => setActiveTab("inventory")}
            className={`px-4 py-3 flex items-center gap-2 font-medium text-sm ${
              activeTab === "inventory"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Layers size={18} />
            Inventory
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {/* Basic Info Tab */}
            {activeTab === "basic" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Product Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="product_name"
                        value={product.product_name}
                        onChange={handleProductNameChange}
                        placeholder="Enter product name"
                        className="input-modern"
                        required
                      />
                      {suggestions.length > 0 && (
                        <ul className="absolute z-10 mt-1 w-full bg-popover border border-border rounded-md shadow-md max-h-60 overflow-auto">
                          {suggestions.map((item) => (
                            <li
                              key={item._id}
                              className="px-4 py-2 hover:bg-muted cursor-pointer"
                              onClick={() => {
                                setProduct({
                                  ...product,
                                  product_name: item.product_name,
                                });
                                setSuggestions([]);
                              }}
                            >
                              {item.product_name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select
                      name="category_id"
                      value={product.category_id}
                      onChange={handleChange}
                      className="input-modern"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.category_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Barcode ID</label>
                    <div className="relative">
                      <Tag
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        size={18}
                      />
                      <input
                        type="text"
                        name="scan_id"
                        value={product.scan_id}
                        onChange={handleChange}
                        placeholder="Enter barcode ID"
                        className="input-modern pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Product Weight (g)
                    </label>
                    <input
                      type="number"
                      name="product_weight"
                      value={product.product_weight}
                      onChange={handleChange}
                      placeholder="Enter product weight"
                      className="input-modern"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <div className="relative">
                    <FileText
                      className="absolute left-3 top-3 text-muted-foreground"
                      size={18}
                    />
                    <textarea
                      name="description"
                      value={product.description}
                      onChange={handleChange}
                      placeholder="Enter product description"
                      className="input-modern pl-10 min-h-[120px]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === "pricing" && (
              <div className="space-y-6">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <DollarSign size={20} className="text-primary" />
                    Pricing Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">MRP (₹)</label>
                      <input
                        type="number"
                        name="mrp"
                        value={product.pricing[0].mrp}
                        onChange={(e) => handlePricingChange(e, 0)}
                        placeholder="Enter MRP"
                        className="input-modern"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Cost Price (₹)
                      </label>
                      <input
                        type="number"
                        name="cost_price"
                        value={product.pricing[0].cost_price}
                        onChange={(e) => handlePricingChange(e, 0)}
                        placeholder="Enter cost price"
                        className="input-modern"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Selling Price (₹)
                      </label>
                      <input
                        type="number"
                        name="selling_price"
                        value={product.pricing[0].selling_price}
                        onChange={(e) => handlePricingChange(e, 0)}
                        placeholder="Enter selling price"
                        className="input-modern"
                        required
                      />
                    </div>
                  </div>

                  {product.pricing[0].selling_price &&
                    product.pricing[0].cost_price && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            Profit Margin:
                          </span>
                          <span className="text-sm font-bold">
                            {product.pricing[0].cost_price &&
                            product.pricing[0].selling_price
                              ? `${(
                                  ((product.pricing[0].selling_price -
                                    product.pricing[0].cost_price) /
                                    product.pricing[0].cost_price) *
                                  100
                                ).toFixed(2)}%`
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            )}

            {/* Images Tab */}
            {activeTab === "images" && (
              <div className="space-y-6">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Upload Product Images
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Drag and drop your images here, or click to browse
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="btn-modern flex items-center gap-2"
                    >
                      <Upload size={18} />
                      Choose Files
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      className="hidden"
                      multiple
                      accept="image/*"
                    />
                  </div>
                </div>

                {selectedImages.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Selected Images ({selectedImages.length})
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {selectedImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden border border-border">
                            <img
                              src={image.preview || "/placeholder.svg"}
                              alt={`Preview ${index}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Inventory Tab */}
            {activeTab === "inventory" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="stock_quantity"
                      value={product.stock_quantity}
                      onChange={handleChange}
                      placeholder="Enter stock quantity"
                      className="input-modern"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Unit</label>
                    <select
                      name="unit"
                      value={product.unit}
                      onChange={handleChange}
                      className="input-modern"
                      required
                    >
                      <option value="">Select Unit</option>
                      <option value="kg">Kg</option>
                      <option value="liters">Liters</option>
                      <option value="pcs">Pcs</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="active"
                        checked={product.status === "active"}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary"
                      />
                      <span className="flex items-center gap-1">
                        <Check size={16} className="text-green-500" />
                        Active
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="inactive"
                        checked={product.status === "inactive"}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary"
                      />
                      <span className="flex items-center gap-1">
                        <X size={16} className="text-red-500" />
                        Inactive
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handlePrevTab}
                className={`btn-modern-outline ${
                  activeTab === "basic" ? "invisible" : ""
                }`}
              >
                Previous
              </button>

              {activeTab === "inventory" ? (
                <button
                  type="submit"
                  className="btn-modern flex items-center gap-2"
                  disabled={isUploading || !isFormValid()}
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white"></div>
                      Saving Product...
                    </>
                  ) : (
                    <>
                      <Check size={18} />
                      Save Product
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextTab}
                  className="btn-modern"
                  disabled={!isFormValid()}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <CustomToast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        body={toast.body}
        status={toast.status}
      />
    </div>
  );
};

export default AddProduct;
