import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function LogIn() {
  const [signIn, setSignIn] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "name" ? value.toLowerCase() : value }));
  };

  const handleSubmit = async () => {
    setError("");
    if (!validateEmail(formData.email)) {
      setError("Invalid email format");
      return;
    }
    if (!validatePassword(formData.password)) {
      setError("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      console.log("Success:", response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-4">
  <div className="relative w-full max-w-[800px] h-auto md:h-[500px] bg-gray-800 shadow-lg rounded-lg overflow-hidden">
    {/* Sign Up Container */}
    <div 
      animate={{ x: signIn ? "100%" : "0%" }} 
      transition={{ duration: 0.5 }}
      className="absolute top-0 left-0 w-full md:w-1/2 h-full flex flex-col items-center justify-center p-6 md:p-8 bg-gray-400"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-black">Create Account</h2>
      <input type="text" name="name" placeholder="Name" className="input-style" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" className="input-style" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" className="input-style" onChange={handleChange} />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" className="input-style" onChange={handleChange} />
      {error && <p className="text-black text-sm">{error}</p>}
      <button className="btn-primary mt-4 w-full md:w-auto" onClick={handleSubmit} disabled={loading}>
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </div>

    {/* Sign In Container */}
    <div 
      animate={{ x: signIn ? "0%" : "-100%" }} 
      transition={{ duration: 0.5 }}
      className="absolute top-0 right-0 w-full md:w-1/2 h-full flex flex-col items-center justify-center p-6 md:p-8 bg-gray-400"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-black">Sign in</h2>
      <input type="email" placeholder="Email" className="input-style" />
      <input type="password" placeholder="Password" className="input-style" />
      <a href="#" className="text-sm text-black mb-4">Forgot your password?</a>
      <button className="btn-primary w-full md:w-auto">Sign In</button>
    </div>

    {/* Overlay Container */}
    <motion.div 
      animate={{ x: signIn ? "0%" : "-100%" }} 
      transition={{ duration: 0.5 }}
      className="absolute top-0 left-1/2 w-full md:w-1/2 h-full bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800 text-white flex flex-col items-center justify-center p-6 md:p-8"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-4">{signIn ? "Hello, Friend!" : "Welcome Back!"}</h2>
      <p className="text-center mb-4">
        {signIn
          ? "Simplify your sales, streamline your business start your journey with Comprify POS today!"
          : "Stay ahead with seamless transactions and smarter business management. Log in now!"}
      </p>
      <button 
        onClick={() => setSignIn(!signIn)}
        className="btn-outline w-full md:w-auto"
      >
        {signIn ? "Sign In" : "Sign Up"}
      </button>
    </motion.div>
  </div>
</div>

  );
}

export default LogIn;
