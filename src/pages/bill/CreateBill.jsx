import React, { useState, useRef } from "react";

const productList = [
  "Laptop",
  "Mobile Phone",
  "Tablet",
  "Headphones",
  "Smart Watch",
  "Camera",
  "Charger",
  "Power Bank",
  "Keyboard",
  "Mouse",
];

const CreateBill = () => {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Refs for input fields
  const productIdRef = useRef(null);
  const productNameRef = useRef(null);
  const priceRef = useRef(null);
  const quantityRef = useRef(null);
  const addProductRef = useRef(null);

  const handleAddProduct = () => {
    if (!productId || !productName || !price || !quantity) {
      alert("All product fields are required!");
      return;
    }

    const newProduct = {
      productId,
      productName,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      total: parseFloat(price) * parseInt(quantity),
    };

    setCart([...cart, newProduct]);
    setProductId("");
    setProductName("");
    setPrice("");
    setQuantity("");
    setFilteredProducts([]);
    setSelectedIndex(-1);

    productIdRef.current.focus(); // Focus back to Product ID after adding product
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.total, 0);
  };

  const handleSubmitBill = () => {
    if (!customerName || !phoneNumber) {
      alert("Customer name and phone number are required!");
      return;
    }

    const newBill = {
      billNumber: `BILL-${Date.now()}`,
      customerName,
      phoneNumber,
      cart,
      totalAmount: calculateTotal(),
      date: new Date().toLocaleString(),
    };

    const existingBills = JSON.parse(localStorage.getItem("bills")) || [];
    localStorage.setItem("bills", JSON.stringify([...existingBills, newBill]));

    alert(`Bill Generated Successfully! Total: ₹${calculateTotal().toFixed(2)}`);

    setCustomerName("");
    setPhoneNumber("");
    setCart([]);
  };

  const handleProductNameChange = (e) => {
    const value = e.target.value;
    setProductName(value);

    const suggestions = productList.filter((product) =>
      product.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredProducts(suggestions);
    setSelectedIndex(-1); // Reset the selection when typing
  };

  const handleKeyDown = (e, fieldRef) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
      fieldRef.current.focus(); // Focus the next field
    }
  };

  const handleProductKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, filteredProducts.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      handleSelectProduct(filteredProducts[selectedIndex]);
    }
  };

  const handleSelectProduct = (name) => {
    setProductName(name);
    setFilteredProducts([]);
    setSelectedIndex(-1);
    priceRef.current.focus(); // Move focus to the next field after selecting a product
  };

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Create Bill</h1>

      {/* Customer Details */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-2">Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, phoneNumber)}
            placeholder="Customer Name"
            className="p-3 bg-gray-800 text-white rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, productIdRef)}
            placeholder="Phone Number"
            className="p-3 bg-gray-800 text-white rounded w-full"
          />
        </div>
      </div>

      {/* Product Input Fields */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-2">Product ID:</label>
          <input
            ref={productIdRef}
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, productNameRef)}
            placeholder="Product ID"
            className="p-3 bg-gray-800 text-white rounded w-full"
          />
        </div>

        <div className="relative">
          <label className="block mb-2">Product Name:</label>
          <input
            ref={productNameRef}
            type="text"
            value={productName}
            onChange={handleProductNameChange}
            onKeyDown={handleProductKeyDown}
            placeholder="Product Name"
            className="p-3 bg-gray-800 text-white rounded w-full"
          />
          {filteredProducts.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-gray-800 text-white rounded mt-1 max-h-40 overflow-y-auto z-50">
              {filteredProducts.map((product, index) => (
                <li
                  key={index}
                  className={`p-2 hover:bg-gray-700 cursor-pointer ${
                    index === selectedIndex ? "bg-gray-700" : ""
                  }`}
                  onClick={() => handleSelectProduct(product)}
                >
                  {product}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block mb-2">Price (₹):</label>
          <input
            ref={priceRef}
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, quantityRef)}
            placeholder="Price"
            className="p-3 bg-gray-800 text-white rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-2">Quantity:</label>
          <input
            ref={quantityRef}
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, addProductRef)}
            placeholder="Quantity"
            className="p-3 bg-gray-800 text-white rounded w-full"
          />
        </div>
      </div>

      <button ref={addProductRef} onClick={handleAddProduct} className="bg-yellow-500 p-3 rounded w-full mb-6">
        Add Product
      </button>

      {/* Cart Table */}
      {cart.length > 0 && (
        <table className="w-full text-white border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800 text-left">
            <th className="p-3">Product ID</th>
            <th className="p-3">Product Name</th>
            <th className="p-3">Price (₹)</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Total (₹)</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index} className="border-b border-gray-700 hover:bg-gray-800">
              <td className="p-3">{item.productId}</td>
              <td className="p-3">{item.productName}</td>
              <td className="p-3">
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => {
                    const updatedCart = [...cart];
                    updatedCart[index].price = parseFloat(e.target.value);
                    updatedCart[index].total = updatedCart[index].price * updatedCart[index].quantity;
                    setCart(updatedCart);
                  }}
                  className="bg-transparent text-white w-16 text-center"
                />
              </td>
              <td className="p-3">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const updatedCart = [...cart];
                    updatedCart[index].quantity = parseInt(e.target.value);
                    updatedCart[index].total = updatedCart[index].price * updatedCart[index].quantity;
                    setCart(updatedCart);
                  }}
                  className="bg-transparent text-white w-16 text-center"
                />
              </td>
              <td className="p-3">{item.total.toFixed(2)}</td>
              <td className="p-3">
                <button
                  onClick={() => {
                    const updatedCart = cart.filter((_, i) => i !== index);
                    setCart(updatedCart);
                  }}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      )}

      {cart.length > 0 && (
        <button onClick={handleSubmitBill} className="bg-green-500 p-3 rounded w-full">
          Generate Bill
        </button>
      )}
    </div>
  );
};

export default CreateBill;
