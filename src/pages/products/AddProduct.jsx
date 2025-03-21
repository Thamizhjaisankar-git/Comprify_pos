// import React, { useState } from "react";
// import { FaBoxOpen } from "react-icons/fa"; // Importing an icon
// import { useDispatch } from "react-redux";
// import { addProduct } from "../../redux/productSlice";
// import config from "../../config";
// import axios from "axios";

// const AddProduct = () => {
//   const dispatch = useDispatch();
//   const [product, setProduct] = useState({
//     product_code: "",
//     product_name: "",
//     category_id: "",
//     unit: "",
//     mrp: "",
//     landing_cost: "",
//     net_cost: "",
//     basic_cost: "",
//     profit_percent: "",
//     selling_price: "",
//     stock_quantity: "",
//     supplier_id: "",
//     status: "active",
//   });

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token"); // ✅ Get token from localStorage

//     if (!token) {
//       console.error("No authentication token found.");
//       return;
//     }

//     try {
//       // ✅ Send product data with token in headers
//       const response = await axios.post(
//         `${config.serverApi}/pos/product`, // Change URL if needed
//         product,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       console.log("Product Added:", response.data);

//       dispatch(addProduct(response.data)); // ✅ Update Redux Store

//       // ✅ Reset the form after submission
//       setProduct({
//         product_code: "",
//         product_name: "",
//         category_id: "",
//         unit: "",
//         mrp: "",
//         landing_cost: "",
//         net_cost: "",
//         basic_cost: "",
//         profit_percent: "",
//         selling_price: "",
//         stock_quantity: "",
//         supplier_id: "",
//         status: "active",
//       });
//     } catch (error) {
//       console.error("Error adding product:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="absolute inset-0 flex flex-col items-center justify-center min-h-screen">

//       {/* Title with Icon */}
//       <div className="mb-4 flex items-center space-x-2 bg-gray-900 text-white mt-10 py-3 px-6 rounded-lg shadow-lg">
//         <FaBoxOpen className="text-3xl text-blue-400" />
//         <h1 className="text-2xl font-bold">Products & Inventory</h1>
//       </div>

//       {/* Form Container */}
//       <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full md:w-xl lg:w-2xl mx-auto">
//         <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

//         {/* Scrollable Form Container */}
//         <div className="max-h-[500px] overflow-y-auto pr-2">
//           <form onSubmit={handleSubmit} className="space-y-4">

//             {/* Product Code */}
//             <div>
//               <label className="block mb-1">Product Code</label>
//               <input type="text" name="product_code" value={product.product_code} onChange={handleChange}
//                 placeholder="Enter Product Code"
//                 className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
//             </div>

//             {/* Product Name */}
//             <div>
//               <label className="block mb-1">Product Name</label>
//               <input type="text" name="product_name" value={product.product_name} onChange={handleChange}
//                 placeholder="Enter Product Name"
//                 className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
//             </div>

//             {/* Category ID */}
//             <div>
//               <label className="block mb-1">Category ID</label>
//               <input type="text" name="category_id" value={product.category_id} onChange={handleChange}
//                 placeholder="Enter Category ID"
//                 className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
//             </div>

//             {/* Unit Selection */}
//             <div>
//               <label className="block mb-1">Unit</label>
//               <select name="unit" value={product.unit} onChange={handleChange}
//                 className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required>
//                 <option value="">Select Unit</option>
//                 <option value="kg">Kg</option>
//                 <option value="liters">Liters</option>
//                 <option value="pcs">Pcs</option>
//               </select>
//             </div>

//             {/* Numeric Fields with Placeholders */}
//             {[
//               { name: "mrp", label: "MRP", placeholder: "Enter Maximum Retail Price" },
//               { name: "landing_cost", label: "Landing Cost", placeholder: "Enter Landing Cost" },
//               { name: "net_cost", label: "Net Cost", placeholder: "Enter Net Cost" },
//               { name: "basic_cost", label: "Basic Cost", placeholder: "Enter Basic Cost" },
//               { name: "profit_percent", label: "Profit Percent", placeholder: "Enter Profit %" },
//               { name: "selling_price", label: "Selling Price", placeholder: "Enter Selling Price" },
//               { name: "stock_quantity", label: "Stock Quantity", placeholder: "Enter Stock Quantity" },
//             ].map((field) => (
//               <div key={field.name}>
//                 <label className="block mb-1">{field.label}</label>
//                 <input type="number" name={field.name} value={product[field.name]} onChange={handleChange}
//                   placeholder={field.placeholder}
//                   className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
//               </div>
//             ))}

//             {/* Supplier ID */}
//             <div>
//               <label className="block mb-1">Supplier ID</label>
//               <input type="text" name="supplier_id" value={product.supplier_id} onChange={handleChange}
//                 placeholder="Enter Supplier ID"
//                 className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
//             </div>

//             {/* Status */}
//             <div>
//               <label className="block mb-1">Status</label>
//               <select name="status" value={product.status} onChange={handleChange}
//                 className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>
//             </div>

//             {/* Submit Button */}
//             <button type="submit" className="bg-blue-600 mt-3 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">
//               Add Product
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addProduct } from "../../redux/productSlice";
// import config from "../../config";
// import axios from "axios";

// const AddProduct = () => {
//   const dispatch = useDispatch();
//   const [product, setProduct] = useState({
//     product_code: "",
//     product_name: "",
//     category_id: "",
//     unit: "",
//     mrp: "",
//     landing_cost: "",
//     net_cost: "",
//     basic_cost: "",
//     profit_percent: "",
//     selling_price: "",
//     stock_quantity: "",
//     supplier_id: "",
//     status: "active",
//   });

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.error("No authentication token found.");
//       return;
//     }

//     try {
//       const response = await axios.post(`${config.serverApi}/pos/product`, product, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("Product Added:", response.data);
//       dispatch(addProduct(response.data));

//       // Reset form
//       setProduct({
//         product_code: "",
//         product_name: "",
//         category_id: "",
//         unit: "",
//         mrp: "",
//         landing_cost: "",
//         net_cost: "",
//         basic_cost: "",
//         profit_percent: "",
//         selling_price: "",
//         stock_quantity: "",
//         supplier_id: "",
//         status: "active",
//       });
//     } catch (error) {
//       console.error("Error adding product:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md w-full h-full">
//       {/* Header */}
//       <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//         {/* Product Fields */}
//         {[
//           { name: "product_code", label: "Product Code" },
//           { name: "product_name", label: "Product Name" },
//           { name: "category_id", label: "Category ID" },
//           { name: "mrp", label: "MRP" },
//           { name: "landing_cost", label: "Landing Cost" },
//           { name: "net_cost", label: "Net Cost" },
//           { name: "basic_cost", label: "Basic Cost" },
//           { name: "profit_percent", label: "Profit Percent" },
//           { name: "selling_price", label: "Selling Price" },
//           { name: "stock_quantity", label: "Stock Quantity" },
//           { name: "supplier_id", label: "Supplier ID" },
//         ].map((field) => (
//           <div key={field.name}>
//             <label className="block mb-1 text-sm">{field.label}</label>
//             <input
//               type="text"
//               name={field.name}
//               value={product[field.name]}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
//               required
//             />
//           </div>
//         ))}

//         {/* Unit Selection */}
//         <div>
//           <label className="block mb-1 text-sm">Unit</label>
//           <select name="unit" value={product.unit} onChange={handleChange} className="w-full p-2 border border-gray-600 bg-gray-900 rounded" required>
//             <option value="">Select Unit</option>
//             <option value="kg">Kg</option>
//             <option value="liters">Liters</option>
//             <option value="pcs">Pcs</option>
//           </select>
//         </div>

//         {/* Status */}
//         <div>
//           <label className="block mb-1 text-sm">Status</label>
//           <select name="status" value={product.status} onChange={handleChange} className="w-full p-2 border border-gray-600 bg-gray-900 rounded" required>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>

//         {/* Submit Button */}
//         <div className="col-span-2 flex justify-center mt-4">
//           <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
//             Add Product
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addProduct } from "../../redux/productSlice";
// import config from "../../config";
// import axios from "axios";

// const AddProduct = () => {
//   const dispatch = useDispatch();
//   const { categories } = useSelector((state) => state.category);

//   const [product, setProduct] = useState({
//     product_code: "",
//     product_name: "",
//     category_id: "",
//     subcategory_id: "",
//     unit: "",
//     mrp: "",
//     landing_cost: "",
//     net_cost: "",
//     basic_cost: "",
//     profit_percent: "",
//     selling_price: "",
//     stock_quantity: "",
//     supplier_id: "",
//     status: "active",
//   });

//   // Handle Input Changes
//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   // Handle Form Submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.error("No authentication token found.");
//       return;
//     }

//     try {
//       const response = await axios.post(`${config.serverApi}/pos/product`, product, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("Product Added:", response.data);
//       dispatch(addProduct(response.data));

//       // Reset form
//       setProduct({
//         product_code: "",
//         product_name: "",
//         category_id: "",
//         subcategory_id: "",
//         unit: "",
//         mrp: "",
//         landing_cost: "",
//         net_cost: "",
//         basic_cost: "",
//         profit_percent: "",
//         selling_price: "",
//         stock_quantity: "",
//         supplier_id: "",
//         status: "active",
//       });
//     } catch (error) {
//       console.error("Error adding product:", error.response?.data || error.message);
//     }
//   };

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
//               <option key={category.name} value={category.name}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Subcategory Selection */}
//         <div>
//           <label className="block mb-1 text-sm">Subcategory</label>
//           <select
//             name="subcategory_id"
//             value={product.subcategory_id}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
//             required
//             disabled={!product.category_id} // Disable if no category selected
//           >
//             <option value="">Select Subcategory</option>
//             {categories
//               .find((cat) => cat.name === product.category_id)
//               ?.subcategories?.map((sub) => (
//                 <option key={sub.name} value={sub.name}>
//                   {sub.name}
//                 </option>
//               ))}
//           </select>
//         </div>

//         {/* Other Product Fields */}
//         {[
//           { name: "product_code", label: "Product Code" },
//           { name: "product_name", label: "Product Name" },
//           { name: "mrp", label: "MRP" },
//           { name: "landing_cost", label: "Landing Cost" },
//           { name: "net_cost", label: "Net Cost" },
//           { name: "basic_cost", label: "Basic Cost" },
//           { name: "profit_percent", label: "Profit Percent" },
//           { name: "selling_price", label: "Selling Price" },
//           { name: "stock_quantity", label: "Stock Quantity" },
//           { name: "supplier_id", label: "Supplier ID" },
//         ].map((field) => (
//           <div key={field.name}>
//             <label className="block mb-1 text-sm">{field.label}</label>
//             <input
//               type="text"
//               name={field.name}
//               value={product[field.name]}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
//               required
//             />
//           </div>
//         ))}

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
//           <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
//             Add Product
//           </button>
//         </div>
//       </form>

//     </div>
//   );
// };

// export default AddProduct;
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/productSlice";
import config from "../../config";
import axios from "axios";

const AddProduct = () => {
  const dispatch = useDispatch();

  // State for categories and form data
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    product_name: "",
    category_id: "",
    product_weight: "",
    img_urls: [],
    description: "",
    unit: "",
    pricing: [{ mrp: "", cost_price: "", selling_price: "" }],
    // supplier_id: "",
    stock_quantity: "",
    status: "active",
  });

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
        setCategories(response.data.categories); // Set fetched categories
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

  // Handle adding/removing image URLs
  const handleImgUrlsChange = (e, index) => {
    const updatedImgUrls = [...product.img_urls];
    updatedImgUrls[index] = e.target.value;
    setProduct({ ...product, img_urls: updatedImgUrls });
  };

  const handleAddImgUrl = () => {
    setProduct({ ...product, img_urls: [...product.img_urls, ""] });
  };

  const handleRemoveImgUrl = (index) => {
    const updatedImgUrls = product.img_urls.filter((_, i) => i !== index);
    setProduct({ ...product, img_urls: updatedImgUrls });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found.");
      return;
    }

    try {
      const response = await axios.post(
        `${config.serverApi}/pos/product`,
        product,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Product Added:", response.data);

      // Reset form after successful submission
      setProduct({
        product_name: "",
        category_id: "",
        product_weight: "",
        img_urls: [],
        description: "",
        unit: "",
        pricing: [{ mrp: "", cost_price: "", selling_price: "" }],
        stock_quantity: "",
        status: "active",
      });
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="p-3 bg-gray-800 text-white rounded-lg shadow-md w-full h-full overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Category Selection */}
        <div>
          <label className="block mb-1 text-sm">Category</label>
          <select
            name="category_id"
            value={product.category_id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
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

        <div>
          <label className="block mb-1 text-sm">Product Name</label>
          <input
            type="text"
            name="product_name"
            value={product.product_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Product Weight</label>
          <input
            type="number"
            name="product_weight"
            value={product.product_weight}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
          ></textarea>
        </div>

        {/* Pricing Fields */}
        <div>
          <label className="block mb-1 text-sm">Pricing</label>
          {product.pricing.map((pricing, index) => (
            <div key={index} className="grid grid-cols-3 gap-2">
              <div>
                <label className="block mb-1 text-sm">MRP</label>
                <input
                  type="number"
                  name="mrp"
                  value={pricing.mrp}
                  onChange={(e) => handlePricingChange(e, index)}
                  className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Cost Price</label>
                <input
                  type="number"
                  name="cost_price"
                  value={pricing.cost_price}
                  onChange={(e) => handlePricingChange(e, index)}
                  className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Selling Price</label>
                <input
                  type="number"
                  name="selling_price"
                  value={pricing.selling_price}
                  onChange={(e) => handlePricingChange(e, index)}
                  className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Image URLs Fields */}
        <div>
          <label className="block mb-1 text-sm">Product Images</label>
          {product.img_urls.map((imgUrl, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                value={imgUrl}
                onChange={(e) => handleImgUrlsChange(e, index)}
                className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
                placeholder="Enter image URL"
              />
              <button
                type="button"
                onClick={() => handleRemoveImgUrl(index)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImgUrl}
            className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Another Image URL
          </button>
        </div>

        {/* Stock Quantity Field */}
        <div>
          <label className="block mb-1 text-sm">Stock Quantity</label>
          <input
            type="number"
            name="stock_quantity"
            value={product.stock_quantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
            required
          />
        </div>

        {/* Unit Selection */}
        <div>
          <label className="block mb-1 text-sm">Unit</label>
          <select
            name="unit"
            value={product.unit}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
            required
          >
            <option value="">Select Unit</option>
            <option value="kg">Kg</option>
            <option value="liters">Liters</option>
            <option value="pcs">Pcs</option>
          </select>
        </div>

        {/* Status Selection */}
        <div>
          <label className="block mb-1 text-sm">Status</label>
          <select
            name="status"
            value={product.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-900 rounded"
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-center mt-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
