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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token"); // ✅ Get token from localStorage

      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${config.serverApi}/pos/product`, {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Send token in headers
        });

        console.log(response.data.data)

        setProducts(response.data.data); // ✅ Store response data in state
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
                <th className="py-3 px-6 text-left border-b border-gray-700">S.No</th>
                <th className="py-3 px-6 text-left border-b border-gray-700">Product Name</th>
                <th className="py-3 px-6 text-left border-b border-gray-700">Price (₹)</th>
                <th className="py-3 px-6 text-left border-b border-gray-700">Stock</th>
                <th className="py-3 px-6 text-left border-b border-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id} className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}>
                  <td className="py-3 px-6 border-b border-gray-700">{index + 1}</td>
                  <td className="py-3 px-6 border-b border-gray-700">{product.product_name}</td>
                  <td className="py-3 px-6 border-b border-gray-700">₹{product.selling_price.toLocaleString()}</td>
                  <td className="py-3 px-6 border-b border-gray-700">{product.stock_quantity}</td>
                  <td
                    className={`py-3 px-6 border-b border-gray-700 ${
                      product.status === "Out of Stock" ? "text-red-500" : "text-green-400"
                    }`}
                  >
                    {product.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
