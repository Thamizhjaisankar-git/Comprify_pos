// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import config from "../../config";
// import CustomToast from "../../components/globalComponent/customToast/CustomToast";

// const CreateBill = () => {
//   const [productId, setProductId] = useState("");
//   const [id, setId] = useState("");
//   const [productName, setProductName] = useState("");
//   const [price, setPrice] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [cart, setCart] = useState([]);
//   const [customerName, setCustomerName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [userId, setUserId] = useState("");
//   const [filteredCustomers, setFilteredCustomers] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedCustomerIndex, setSelectedCustomerIndex] = useState(-1);
//   const [selectedProductIndex, setSelectedProductIndex] = useState(-1);
//   const [customers, setCustomers] = useState();
//   const [products, setProducts] = useState();

//   // Refs for input fields
//   const productIdRef = useRef(null);
//   const productNameRef = useRef(null);
//   const priceRef = useRef(null);
//   const quantityRef = useRef(null);
//   const addProductRef = useRef(null);
//   const token = localStorage.getItem("token");

//   const [totalAmount, setTotalAmount] = useState(0);

//   const [toast, setToast] = useState({
//     show: false,
//     body: "",
//     status: "success",
//   });

//   const showToast = (message, status) => {
//     setToast({ show: true, body: message, status });
//   };

//   // 🔹 Function to calculate total cart amount
//   const calculateTotalAmount = (cartItems) => {
//     return cartItems.reduce((acc, item) => acc + item.total, 0);
//   };

//   // 🔹 Update `totalAmount` whenever `cart` changes
//   useEffect(() => {
//     setTotalAmount(calculateTotalAmount(cart));
//   }, [cart]);

//   // payment
//   const [paymentMethods, setPaymentMethods] = useState([]);

//   const handleAddPayment = (method) => {
//     if (!paymentMethods.some((p) => p.method === method)) {
//       setPaymentMethods([...paymentMethods, { method, amount: totalAmount }]);
//     }
//   };

//   const handleAmountChange = (index, amount) => {
//     const updatedPayments = [...paymentMethods];
//     updatedPayments[index].amount = parseFloat(amount) || 0;
//     setPaymentMethods(updatedPayments);
//     onPaymentChange(updatedPayments);
//   };

//   const handleDeletePayment = (index) => {
//     const updatedPayments = paymentMethods.filter((_, i) => i !== index);
//     setPaymentMethods(updatedPayments);
//     onPaymentChange(updatedPayments);
//   };

//   const handleCustomerSearch = async (e) => {
//     const value = e.target.value;
//     setPhoneNumber(value);

//     // if (value.length < 3) {
//     //   setFilteredCustomers([]);
//     //   return;
//     // }

//     try {
//       const response = await axios.get(
//         `${config.serverApi}/pos/store/all-users?phone=${value}`, // Adjust API endpoint if needed
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const suggestions = response.data.users.map((user) => ({
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone_number,
//       }));

//       console.log("---------", suggestions);

//       setFilteredCustomers(suggestions);
//       // setSelectedCustomerIndex(-1);
//     } catch (error) {
//       console.error("Error fetching customers:", error);
//     }
//   };

//   const handleProductSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setProductName(value);

//     if (!value) {
//       setFilteredProducts([]); // Clear suggestions when input is empty
//       return;
//     }

//     const suggestions = products.filter((product) =>
//       product.product_name.toLowerCase().includes(value)
//     );

//     setFilteredProducts(suggestions);
//     setSelectedProductIndex(-1);
//   };

//   const handleProductIdSearch = (e) => {
//     const value = e.target.value;
//     setProductId(value);
//     console.log(value);

//     if (!value) {
//       setFilteredProducts([]); // Clear suggestions when input is empty
//       return;
//     }

//     const suggestions = products.filter((product) =>
//       product.scan_id?.toString().includes(value.toString())
//     );

//     setFilteredProducts(suggestions);
//     setSelectedProductIndex(-1);
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           `${config.serverApi}/pos/product/store`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         console.log("+++++++++++++", response.data);

//         setProducts(response.data.products); // Store fetched products
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []); // Fetch only once when component mounts

//   // Fetch customers and products on component mount
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const customerResponse = await axios.get(
//   //         `${config.serverApi}/pos/store/all-users`,
//   //         {
//   //           headers: { Authorization: `Bearer ${token}` },
//   //         }
//   //       );

//   //       const customers = customerResponse.data.users.map((user) => ({
//   //         id: user.customer._id,
//   //         name: user.customer.name,
//   //         email: user.customer.email,
//   //         phone: user.customer.phone_number,
//   //         // shoppingType: user.shopping_type || [], // Handle possible null values
//   //       }));

//   //       console.log(customers);
//   //       // setCustomers(customerResponse.data.users);
//   //       setCustomers(customers);

//   //       const productResponse = await axios.get(
//   //         `${config.serverApi}/pos/product/store`,
//   //         {
//   //           headers: { Authorization: `Bearer ${token}` },
//   //         }
//   //       );
//   //       setProducts(productResponse.data.products);
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, [token]);

//   const handleAddProduct = () => {
//     if (!productId || !productName || !price || !quantity) {
//       alert("All product fields are required!");
//       return;
//     }

//     const existingProductIndex = cart.findIndex(
//       (item) => item.productId === productId
//     );

//     if (existingProductIndex !== -1) {
//       // If product exists, update its quantity and total price
//       const updatedCart = [...cart];
//       updatedCart[existingProductIndex].quantity += parseInt(quantity);
//       updatedCart[existingProductIndex].total =
//         updatedCart[existingProductIndex].price *
//         updatedCart[existingProductIndex].quantity;

//       setCart(updatedCart);
//     } else {
//       // If product doesn't exist, add it as a new item
//       const newProduct = {
//         id,
//         productId,
//         productName,
//         price: parseFloat(price),
//         quantity: parseInt(quantity),
//         total: parseFloat(price) * parseInt(quantity),
//       };

//       setCart([...cart, newProduct]);
//     }

//     setProductId("");
//     setProductName("");
//     setPrice("");
//     setQuantity("");
//     setFilteredProducts([]);
//     setSelectedProductIndex(-1);

//     productIdRef.current.focus(); // Focus back to Product ID after adding product
//   };

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => total + item.total, 0);
//   };

//   const handleSubmitBill = async () => {
//     if (!customerName || !phoneNumber) {
//       alert("Customer name and phone number are required!");
//       return;
//     }

//     const newBill = {
//       bill_number: `BILL-${Date.now()}`,
//       customer_id: userId,
//       email,
//       name: customerName,
//       phone: phoneNumber,
//       password: phoneNumber,
//       cart,
//       totalAmount: calculateTotal(),
//       date: new Date().toLocaleString(),
//       type: "pos",
//       total_amount: totalAmount,
//       final_amount: totalAmount, //this should be done in backend
//       payment_methods: paymentMethods,
//     };

//     console.log("-----------BEFORE--:", newBill);

//     try {
//       const response = await axios.post(
//         `${config.serverApi}/pos/bill`,
//         newBill,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       console.log(response);

//       if (response.data.success) {
//         setCustomerName("");
//         setPhoneNumber("");
//         setCart([]);
//         setEmail("");
//         setPaymentMethods([]);
//         showToast(
//           `Bill Generated Successfully! Total: ₹${calculateTotal().toFixed(2)}`,
//           "success"
//         );
//       } else {
//         alert("Failed to generate bill. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting bill:", error);
//       alert("Failed to generate bill. Please try again.");
//       showToast(`Internal Server Error! please try again later...`, "error");
//     }
//   };

//   // const handleProductSearch = (e) => {
//   //   const value = e.target.value;
//   //   setProductName(value);

//   //   const suggestions = products.filter((product) => {
//   //     return (
//   //       product.product_name.toLowerCase().includes(value.toLowerCase()) ||
//   //       product.product_code.toLowerCase().includes(value.toLowerCase())
//   //     );
//   //   });

//   //   setFilteredProducts(suggestions);
//   //   setSelectedProductIndex(-1);
//   // };

//   const handleSelectCustomer = (customer) => {
//     setCustomerName(customer.name || "No name");
//     setPhoneNumber(customer.phone);
//     setEmail(customer.email);
//     setUserId(customer.id);
//     setFilteredCustomers([]);
//     setSelectedCustomerIndex(-1);
//   };

//   // const handleSelectProduct = (product) => {
//   //   setProductId(product.product_code);
//   //   setProductName(product.product_name);
//   //   setPrice(product.pricing[0].selling_price);
//   //   setId(product._id);
//   //   setFilteredProducts([]);
//   //   setSelectedProductIndex(-1);
//   //   quantityRef.current.focus();
//   // };
//   const handleSelectProduct = (product) => {
//     console.log(product);
//     setProductId(product.product_code);
//     setProductName(product.product_name);
//     setPrice(product.pricing[0].selling_price);
//     setId(product._id);
//     setFilteredProducts([]);
//     setSelectedProductIndex(-1);
//     quantityRef.current.focus();
//   };

//   const handleProductKeyDown = (e) => {
//     if (e.key === "ArrowDown") {
//       setSelectedProductIndex((prevIndex) =>
//         Math.min(prevIndex + 1, filteredProducts.length - 1)
//       );
//     } else if (e.key === "ArrowUp") {
//       setSelectedProductIndex((prevIndex) => Math.max(prevIndex - 1, 0));
//     } else if (e.key === "Enter" && selectedProductIndex !== -1) {
//       handleSelectProduct(filteredProducts[selectedProductIndex]);
//     }
//   };

//   const handleKeyDown = (e, fieldRef) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       fieldRef.current.focus();
//     }
//   };

//   const handleCustomerKeyDown = (e) => {
//     if (e.key === "ArrowDown") {
//       setSelectedCustomerIndex((prevIndex) =>
//         Math.min(prevIndex + 1, filteredCustomers.length - 1)
//       );
//     } else if (e.key === "ArrowUp") {
//       setSelectedCustomerIndex((prevIndex) => Math.max(prevIndex - 1, 0));
//     } else if (e.key === "Enter" && selectedCustomerIndex !== -1) {
//       handleSelectCustomer(filteredCustomers[selectedCustomerIndex]);
//     }
//   };

//   // const handleProductKeyDown = (e) => {
//   //   if (e.key === "ArrowDown") {
//   //     setSelectedProductIndex((prevIndex) =>
//   //       Math.min(prevIndex + 1, filteredProducts.length - 1)
//   //     );
//   //   } else if (e.key === "ArrowUp") {
//   //     setSelectedProductIndex((prevIndex) => Math.max(prevIndex - 1, 0));
//   //   } else if (e.key === "Enter" && selectedProductIndex !== -1) {
//   //     handleSelectProduct(filteredProducts[selectedProductIndex]);
//   //   }
//   // };

//   return (
//     <div className="p-8 min-h-screen bg-gray-900 text-white">
//       <h1 className="text-3xl font-bold mb-6">Create Bill</h1>

//       {/* Customer Details */}
//       <div className="grid grid-cols-2 gap-6 mb-6">
//         <div className="relative">
//           <label className="block mb-2">Phone Number:</label>
//           <input
//             type="text"
//             value={phoneNumber}
//             onChange={handleCustomerSearch}
//             onKeyDown={handleCustomerKeyDown}
//             placeholder="Phone Number"
//             className="p-3 bg-gray-800 text-white rounded w-full"
//           />
//           {filteredCustomers.length > 0 && (
//             <ul className="absolute top-full left-0 w-full bg-gray-800 text-white rounded mt-1 max-h-40 overflow-y-auto z-50">
//               {filteredCustomers.map((customer, index) => (
//                 <li
//                   key={customer.id}
//                   className={`p-2 hover:bg-gray-700 cursor-pointer ${
//                     index === selectedCustomerIndex ? "bg-gray-700" : ""
//                   }`}
//                   onClick={() => handleSelectCustomer(customer)}
//                 >
//                   {customer.name || "No name"} - {customer.phone} -{" "}
//                   {customer.email}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//         <div className="relative">
//           <label className="block mb-2">Customer Name:</label>
//           <input
//             type="text"
//             value={customerName}
//             onChange={handleCustomerSearch}
//             onKeyDown={handleCustomerKeyDown}
//             placeholder="Customer Name or Phone Number or email"
//             className="p-3 bg-gray-800 text-white rounded w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-2">Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             onKeyDown={(e) => handleKeyDown(e, productIdRef)}
//             placeholder="Email"
//             className="p-3 bg-gray-800 text-white rounded w-full"
//           />
//         </div>
//       </div>

//       {/* Product Input Fields */}
//       <div className="relative">
//         <div className="grid grid-cols-2 gap-6 mb-6">
//           <div className="">
//             <label className="block mb-2">Product Name:</label>
//             <input
//               ref={productNameRef}
//               type="text"
//               value={productName}
//               onChange={handleProductSearch}
//               onKeyDown={handleProductKeyDown}
//               placeholder="Search by Product Name"
//               className="p-3 bg-gray-800 text-white rounded w-full"
//             />
//           </div>

//           <div className="">
//             <label className="block mb-2">Product ID:</label>
//             <input
//               ref={productIdRef}
//               type="text"
//               value={productId}
//               onChange={handleProductIdSearch}
//               onKeyDown={handleProductKeyDown}
//               placeholder="Search by Product ID"
//               className="p-3 bg-gray-800 text-white rounded w-full"
//             />
//           </div>
//         </div>
//         {filteredProducts.length > 0 && (
//           <ul className="absolute top-full left-0 w-full bg-gray-800 text-white rounded mt-1 max-h-40 overflow-y-auto z-50">
//             {filteredProducts.map((product, index) => (
//               <li
//                 key={index}
//                 className={`p-2 hover:bg-gray-700 cursor-pointer ${
//                   index === selectedProductIndex ? "bg-gray-700" : ""
//                 }`}
//                 onClick={() => handleSelectProduct(product)}
//               >
//                 {product.product_code} - {product.product_name} - ₹
//                 {product.pricing[0].selling_price}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <div>
//         <div>
//           <label className="block mb-2">Price (₹):</label>
//           <input
//             ref={priceRef}
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             onKeyDown={(e) => handleKeyDown(e, quantityRef)}
//             placeholder="Price"
//             className="p-3 bg-gray-800 text-white rounded w-full"
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Quantity:</label>
//           <input
//             ref={quantityRef}
//             type="number"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//             onKeyDown={(e) => handleKeyDown(e, addProductRef)}
//             placeholder="Quantity"
//             className="p-3 bg-gray-800 text-white rounded w-full"
//           />
//         </div>
//       </div>

//       <button
//         ref={addProductRef}
//         onClick={handleAddProduct}
//         className="bg-yellow-500 p-3 mt-4 rounded w-full mb-6"
//       >
//         Add Product
//       </button>

//       {/* Cart Table */}
//       {cart.length > 0 && (
//         <table className="w-full text-white border-collapse border border-gray-700">
//           <thead>
//             <tr className="bg-gray-800 text-left">
//               <th className="p-3">Product ID</th>
//               <th className="p-3">Product Name</th>
//               <th className="p-3">Price (₹)</th>
//               <th className="p-3">Quantity</th>
//               <th className="p-3">Total (₹)</th>
//               <th className="p-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cart.map((item, index) => (
//               <tr
//                 key={index}
//                 className="border-b border-gray-700 hover:bg-gray-800"
//               >
//                 <td className="p-3">{item.productId}</td>
//                 <td className="p-3">{item.productName}</td>
//                 <td className="p-3">
//                   <input
//                     type="number"
//                     value={item.price}
//                     onChange={(e) => {
//                       const updatedCart = [...cart];
//                       updatedCart[index].price = parseFloat(e.target.value);
//                       updatedCart[index].total =
//                         updatedCart[index].price * updatedCart[index].quantity;
//                       setCart(updatedCart);
//                     }}
//                     readOnly
//                     className="bg-transparent text-white w-16 text-center"
//                   />
//                 </td>
//                 <td className="p-3">
//                   <input
//                     type="number"
//                     value={item.quantity}
//                     onChange={(e) => {
//                       const updatedCart = [...cart];
//                       updatedCart[index].quantity = parseInt(e.target.value);
//                       updatedCart[index].total =
//                         updatedCart[index].price * updatedCart[index].quantity;
//                       setCart(updatedCart);
//                     }}
//                     className="bg-transparent text-white w-16 text-center"
//                   />
//                 </td>
//                 <td className="p-3">{item.total.toFixed(2)}</td>
//                 <td className="p-3">
//                   <button
//                     onClick={() => {
//                       const updatedCart = cart.filter((_, i) => i !== index);
//                       setCart(updatedCart);
//                     }}
//                     className="text-red-500"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot>
//             <tr className="bg-gray-900 font-bold">
//               <td colSpan="4" className="p-3 text-right">
//                 Grand Total (₹):
//               </td>
//               <td className="p-3">{totalAmount.toFixed(2)}</td>
//               <td></td>
//             </tr>
//           </tfoot>
//         </table>
//       )}

//       {cart.length > 0 && (
//         <div className="p-4 bg-gray-900 text-white rounded-lg">
//           <h2 className="text-lg font-semibold mb-2">Select Payment Method</h2>
//           <div className="flex gap-2 mb-4">
//             {["cash", "card", "UPI"].map((method) => (
//               <button
//                 key={method}
//                 onClick={() => handleAddPayment(method)}
//                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
//               >
//                 {method}
//               </button>
//             ))}
//           </div>

//           {paymentMethods.length > 0 && (
//             <div className="space-y-2">
//               {paymentMethods.map((payment, index) => (
//                 <div key={payment.method} className="flex items-center gap-2">
//                   <span className="w-20">
//                     {payment.method.toUpperCase()} Recieved:
//                   </span>
//                   <input
//                     type="text"
//                     value={payment.amount.toFixed(2)}
//                     onChange={(e) => handleAmountChange(index, e.target.value)}
//                     className="bg-gray-800 text-white px-3 py-1 rounded-md w-24"
//                   />
//                   <button
//                     onClick={() => handleDeletePayment(index)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     ✖
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//       {cart.length > 0 && (
//         <button
//           onClick={handleSubmitBill}
//           className="bg-green-500 p-3 rounded w-full"
//         >
//           Generate Bill
//         </button>
//       )}

//       <CustomToast
//         show={toast.show}
//         onClose={() => setToast({ ...toast, show: false })}
//         body={toast.body}
//         status={toast.status}
//       />
//     </div>
//   );
// };

// export default CreateBill;
"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import CustomToast from "../../components/globalComponent/customToast/CustomToast";
import {
  Search,
  ShoppingCart,
  Plus,
  Trash2,
  CreditCard,
  Banknote,
  Smartphone,
  X,
  Package,
  Loader2,
  Receipt,
} from "lucide-react";
import { useTheme } from "../../context/themeContext";

const CreateBill = () => {
  const [productId, setProductId] = useState("");
  const [id, setId] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState(-1);
  const [selectedProductIndex, setSelectedProductIndex] = useState(-1);
  const [customers, setCustomers] = useState();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs for input fields
  const productIdRef = useRef(null);
  const productNameRef = useRef(null);
  const priceRef = useRef(null);
  const quantityRef = useRef(null);
  const addProductRef = useRef(null);
  const token = localStorage.getItem("token");
  const { theme } = useTheme();

  const [totalAmount, setTotalAmount] = useState(0);

  const [toast, setToast] = useState({
    show: false,
    body: "",
    status: "success",
  });

  const showToast = (message, status) => {
    setToast({ show: true, body: message, status });
  };

  // 🔹 Function to calculate total cart amount
  const calculateTotalAmount = (cartItems) => {
    return cartItems.reduce((acc, item) => acc + item.total, 0);
  };

  // 🔹 Update `totalAmount` whenever `cart` changes
  useEffect(() => {
    setTotalAmount(calculateTotalAmount(cart));
  }, [cart]);

  // payment
  const [paymentMethods, setPaymentMethods] = useState([]);

  const handleAddPayment = (method) => {
    if (!paymentMethods.some((p) => p.method === method)) {
      setPaymentMethods([...paymentMethods, { method, amount: totalAmount }]);
    }
  };

  const handleAmountChange = (index, amount) => {
    const updatedPayments = [...paymentMethods];
    updatedPayments[index].amount = Number.parseFloat(amount) || 0;
    setPaymentMethods(updatedPayments);
  };

  const handleDeletePayment = (index) => {
    const updatedPayments = paymentMethods.filter((_, i) => i !== index);
    setPaymentMethods(updatedPayments);
  };

  const handleCustomerSearch = async (e) => {
    const value = e.target.value;
    setPhoneNumber(value);

    if (value.length < 3) {
      setFilteredCustomers([]);
      return;
    }

    try {
      const response = await axios.get(
        `${config.serverApi}/pos/store/all-users?phone=${value}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const suggestions = response.data.users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone_number,
      }));

      setFilteredCustomers(suggestions);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleProductSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setProductName(value);

    if (!value) {
      setFilteredProducts([]);
      return;
    }

    const suggestions = products.filter((product) =>
      product.product_name.toLowerCase().includes(value)
    );

    setFilteredProducts(suggestions);
    setSelectedProductIndex(-1);
  };

  const handleProductIdSearch = (e) => {
    const value = e.target.value;
    setProductId(value);

    if (!value) {
      setFilteredProducts([]);
      return;
    }

    const suggestions = products.filter((product) =>
      product.scan_id?.toString().includes(value.toString())
    );

    setFilteredProducts(suggestions);
    setSelectedProductIndex(-1);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${config.serverApi}/pos/product/store`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        showToast("Failed to load products", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    if (!productId || !productName || !price || !quantity) {
      showToast("All product fields are required!", "error");
      return;
    }

    const existingProductIndex = cart.findIndex(
      (item) => item.productId === productId
    );

    if (existingProductIndex !== -1) {
      // If product exists, update its quantity and total price
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += Number.parseInt(quantity);
      updatedCart[existingProductIndex].total =
        updatedCart[existingProductIndex].price *
        updatedCart[existingProductIndex].quantity;

      setCart(updatedCart);
      showToast(`Updated quantity for ${productName}`, "success");
    } else {
      // If product doesn't exist, add it as a new item
      const newProduct = {
        id,
        productId,
        productName,
        price: Number.parseFloat(price),
        quantity: Number.parseInt(quantity),
        total: Number.parseFloat(price) * Number.parseInt(quantity),
      };

      setCart([...cart, newProduct]);
      showToast(`Added ${productName} to cart`, "success");
    }

    setProductId("");
    setProductName("");
    setPrice("");
    setQuantity("");
    setFilteredProducts([]);
    setSelectedProductIndex(-1);

    productIdRef.current.focus(); // Focus back to Product ID after adding product
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.total, 0);
  };

  const handleSubmitBill = async () => {
    if (!customerName || !phoneNumber) {
      showToast("Customer name and phone number are required!", "error");
      return;
    }

    if (cart.length === 0) {
      showToast("Cart is empty. Add products before generating bill.", "error");
      return;
    }

    const newBill = {
      bill_number: `BILL-${Date.now()}`,
      customer_id: userId,
      email,
      name: customerName,
      phone: phoneNumber,
      password: phoneNumber,
      cart,
      totalAmount: calculateTotal(),
      date: new Date().toLocaleString(),
      type: "pos",
      total_amount: totalAmount,
      final_amount: totalAmount,
      payment_methods: paymentMethods,
    };

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${config.serverApi}/pos/bill`,
        newBill,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setCustomerName("");
        setPhoneNumber("");
        setCart([]);
        setEmail("");
        setPaymentMethods([]);
        showToast(
          `Bill Generated Successfully! Total: ₹${calculateTotal().toFixed(2)}`,
          "success"
        );
      } else {
        showToast("Failed to generate bill. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error submitting bill:", error);
      showToast(`Internal Server Error! please try again later...`, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectCustomer = (customer) => {
    setCustomerName(customer.name || "No name");
    setPhoneNumber(customer.phone);
    setEmail(customer.email);
    setUserId(customer.id);
    setFilteredCustomers([]);
    setSelectedCustomerIndex(-1);
  };

  const handleSelectProduct = (product) => {
    setProductId(product.product_code || product.scan_id || "");
    setProductName(product.product_name);
    setPrice(product.pricing[0].selling_price);
    setId(product._id);
    setFilteredProducts([]);
    setSelectedProductIndex(-1);
    quantityRef.current.focus();
  };

  const handleProductKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedProductIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredProducts.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setSelectedProductIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && selectedProductIndex !== -1) {
      handleSelectProduct(filteredProducts[selectedProductIndex]);
    }
  };

  const handleKeyDown = (e, fieldRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fieldRef.current.focus();
    }
  };

  const handleCustomerKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedCustomerIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredCustomers.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setSelectedCustomerIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && selectedCustomerIndex !== -1) {
      handleSelectCustomer(filteredCustomers[selectedCustomerIndex]);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create Bill</h1>
          <p className="text-muted-foreground mt-1">
            Generate a new bill for customer purchase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Customer & Product Entry */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details Card */}
            <div className="bg-card rounded-lg shadow-sm border border-border p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Customer Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={handleCustomerSearch}
                      onKeyDown={handleCustomerKeyDown}
                      placeholder="Enter phone number"
                      className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  </div>
                  {filteredCustomers.length > 0 && (
                    <ul className="absolute z-10 mt-1 w-full bg-card rounded-md shadow-lg max-h-60 overflow-auto border border-border">
                      {filteredCustomers.map((customer, index) => (
                        <li
                          key={customer.id}
                          className={`px-4 py-2 cursor-pointer hover:bg-accent transition-colors ${
                            index === selectedCustomerIndex ? "bg-accent" : ""
                          }`}
                          onClick={() => handleSelectCustomer(customer)}
                        >
                          <div className="font-medium">
                            {customer.name || "No name"}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <span>{customer.phone}</span>
                            {customer.email && <span>• {customer.email}</span>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter customer name"
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, productIdRef)}
                    placeholder="Enter email address"
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Product Entry Card */}
            <div className="bg-card rounded-lg shadow-sm border border-border p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Add Products
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <label className="block text-sm font-medium mb-1">
                    Product Name
                  </label>
                  <div className="relative">
                    <input
                      ref={productNameRef}
                      type="text"
                      value={productName}
                      onChange={handleProductSearch}
                      onKeyDown={handleProductKeyDown}
                      placeholder="Search by product name"
                      className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium mb-1">
                    Product ID
                  </label>
                  <div className="relative">
                    <input
                      ref={productIdRef}
                      type="text"
                      value={productId}
                      onChange={handleProductIdSearch}
                      onKeyDown={handleProductKeyDown}
                      placeholder="Search by product ID"
                      className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  </div>
                </div>

                {filteredProducts.length > 0 && (
                  <div className="md:col-span-2">
                    <ul className="w-full bg-card rounded-md shadow-lg max-h-60 overflow-auto border border-border">
                      {filteredProducts.map((product, index) => (
                        <li
                          key={index}
                          className={`px-4 py-2 cursor-pointer hover:bg-accent transition-colors ${
                            index === selectedProductIndex ? "bg-accent" : ""
                          }`}
                          onClick={() => handleSelectProduct(product)}
                        >
                          <div className="font-medium">
                            {product.product_name}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <span>
                              ID:{" "}
                              {product.product_code || product.scan_id || "N/A"}
                            </span>
                            <span>
                              • Price: ₹
                              {product.pricing[0].selling_price.toFixed(2)}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Price (₹)
                  </label>
                  <input
                    ref={priceRef}
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, quantityRef)}
                    placeholder="Enter price"
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Quantity
                  </label>
                  <input
                    ref={quantityRef}
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, addProductRef)}
                    placeholder="Enter quantity"
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <button
                ref={addProductRef}
                onClick={handleAddProduct}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                Add Product to Cart
              </button>
            </div>

            {/* Cart Table */}
            {cart.length > 0 && (
              <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/30">
                  <h2 className="text-xl font-semibold flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Cart Items
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      ({cart.length} items)
                    </span>
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left font-medium">
                          Product ID
                        </th>
                        <th className="px-4 py-3 text-left font-medium">
                          Product Name
                        </th>
                        <th className="px-4 py-3 text-right font-medium">
                          Price (₹)
                        </th>
                        <th className="px-4 py-3 text-right font-medium">
                          Quantity
                        </th>
                        <th className="px-4 py-3 text-right font-medium">
                          Total (₹)
                        </th>
                        <th className="px-4 py-3 text-center font-medium">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, index) => (
                        <tr
                          key={index}
                          className="border-t border-border hover:bg-muted/20 transition-colors"
                        >
                          <td className="px-4 py-3">{item.productId}</td>
                          <td className="px-4 py-3">{item.productName}</td>
                          <td className="px-4 py-3 text-right">
                            ₹{item.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const updatedCart = [...cart];
                                updatedCart[index].quantity =
                                  Number.parseInt(e.target.value) || 1;
                                updatedCart[index].total =
                                  updatedCart[index].price *
                                  updatedCart[index].quantity;
                                setCart(updatedCart);
                              }}
                              className="w-16 px-2 py-1 text-right rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </td>
                          <td className="px-4 py-3 text-right font-medium">
                            ₹{item.total.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => {
                                const updatedCart = cart.filter(
                                  (_, i) => i !== index
                                );
                                setCart(updatedCart);
                              }}
                              className="p-1.5 rounded-md text-destructive hover:bg-destructive/10 transition-colors"
                              aria-label="Delete item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-muted/30 font-bold">
                        <td colSpan="4" className="px-4 py-3 text-right">
                          Grand Total:
                        </td>
                        <td className="px-4 py-3 text-right">
                          ₹{totalAmount.toFixed(2)}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Payment & Summary */}
          <div className="space-y-6">
            {/* Payment Methods Card */}
            {cart.length > 0 && (
              <div className="bg-card rounded-lg shadow-sm border border-border p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Details
                </h2>

                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">
                    Select Payment Method
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleAddPayment("cash")}
                      className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Banknote className="h-4 w-4" />
                      Cash
                    </button>
                    <button
                      onClick={() => handleAddPayment("card")}
                      className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <CreditCard className="h-4 w-4" />
                      Card
                    </button>
                    <button
                      onClick={() => handleAddPayment("UPI")}
                      className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Smartphone className="h-4 w-4" />
                      UPI
                    </button>
                  </div>
                </div>

                {paymentMethods.length > 0 && (
                  <div className="space-y-3 mb-6">
                    <h3 className="text-sm font-medium">Payment Breakdown</h3>
                    {paymentMethods.map((payment, index) => (
                      <div
                        key={payment.method}
                        className="flex items-center justify-between bg-muted/30 p-3 rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          {payment.method === "cash" ? (
                            <Banknote className="h-4 w-4" />
                          ) : payment.method === "card" ? (
                            <CreditCard className="h-4 w-4" />
                          ) : (
                            <Smartphone className="h-4 w-4" />
                          )}
                          <span className="font-medium capitalize">
                            {payment.method}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={payment.amount}
                            onChange={(e) =>
                              handleAmountChange(index, e.target.value)
                            }
                            className="w-24 px-2 py-1 text-right rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                          <button
                            onClick={() => handleDeletePayment(index)}
                            className="p-1.5 rounded-md text-destructive hover:bg-destructive/10 transition-colors"
                            aria-label="Remove payment method"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Order Summary */}
                <div className="bg-muted/30 p-4 rounded-md mb-4">
                  <h3 className="font-medium mb-2">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax:</span>
                      <span>₹0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount:</span>
                      <span>₹0.00</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between font-medium">
                      <span>Total:</span>
                      <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmitBill}
                  disabled={
                    isSubmitting ||
                    cart.length === 0 ||
                    paymentMethods.length === 0
                  }
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Receipt className="h-4 w-4" />
                  )}
                  Generate Bill
                </button>
              </div>
            )}

            {/* Empty Cart State */}
            {cart.length === 0 && (
              <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
                <h3 className="text-lg font-medium">Your cart is empty</h3>
                <p className="text-muted-foreground mt-1 mb-4">
                  Add products to the cart to generate a bill
                </p>
              </div>
            )}
          </div>
        </div>
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

export default CreateBill;
