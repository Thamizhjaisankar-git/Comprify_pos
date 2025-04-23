// // import React, { useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import axios from "axios";
// // import config from "../../config";
// // import Modal from "react-modal";
// // import { useNavigate } from "react-router-dom";
// // import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
// // import ForgotPasswordModal from "./ForgotPasswordModal";
// // import CartAnimation from "./CartAnimation";

// // Modal.setAppElement("#root"); // Ensure accessibility

// // function LogIn() {
// //   const [signIn, setSignIn] = useState(true);
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [modalIsOpen, setModalIsOpen] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [otpSent, setOtpSent] = useState(false);
// //   const [otp, setOtp] = useState("");
// //   const [timer, setTimer] = useState(60);
// //   const [isResendDisabled, setIsResendDisabled] = useState(true);
// //   const navigate = useNavigate();

// //   const [isOtpVerified, setIsOtpVerified] = useState(false);
// //   const [showCartAnimation, setShowCartAnimation] = useState(false);

// //   const validatePassword = (password) => {
// //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
// //       password
// //     );
// //   };

// //   const validateEmail = (email) => {
// //     return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: name === "name" ? value.toLowerCase() : value,
// //     }));
// //   };

// //   const intervalRef = React.useRef(null);

// //   const startTimer = () => {
// //     setIsResendDisabled(true);
// //     setTimer(60);
// //     if (intervalRef.current) {
// //       clearInterval(intervalRef.current);
// //     }
// //     intervalRef.current = setInterval(() => {
// //       setTimer((prev) => {
// //         if (prev <= 1) {
// //           clearInterval(intervalRef.current);
// //           setIsResendDisabled(false);
// //           return 0;
// //         }
// //         return prev - 1;
// //       });
// //     }, 1000);
// //   };

// //   React.useEffect(() => {
// //     return () => clearInterval(intervalRef.current); // Cleanup on unmount
// //   }, []);

// //   // Signup function
// //   const handleSignup = async () => {
// //     setError("");
// //     if (!validateEmail(formData.email)) {
// //       setError("Invalid email format");
// //       return;
// //     }
// //     if (!validatePassword(formData.password)) {
// //       setError(
// //         "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
// //       );
// //       return;
// //     }
// //     if (formData.password !== formData.confirmPassword) {
// //       setError("Passwords do not match");
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       const response = await axios.post(
// //         `${config.serverApi}/comprify/auth/signup`,
// //         {
// //           owner_name: formData.name,
// //           email: formData.email,
// //           password: formData.password,
// //         }
// //       );
// //       console.log("Signup Success:", response.data);

// //       setModalIsOpen(true); // Show success modal
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Something went wrong");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //   const Loader = () => (
// //     <div className="flex items-center justify-center">
// //       <div className="w-6 h-6 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
// //     </div>
// //   );

// //   // // Login function
// //   // const handleLogin = async () => {
// //   //   setError("");
// //   //   if (!validateEmail(formData.email)) {
// //   //     setError("Invalid email format");
// //   //     return;
// //   //   }
// //   //   if (!formData.password) {
// //   //     setError("Password is required");
// //   //     return;
// //   //   }
// //   //   setLoading(true);
// //   //   try {
// //   //     const response = await axios.post(`${config.serverApi}/pos/store/login`, {
// //   //       email: formData.email,
// //   //       password: formData.password,
// //   //     });

// //   //     if (response.data.otpRequired) {
// //   //       setOtpSent(true);
// //   //       return; // Do not proceed to token storage yet
// //   //     }

// //   //     console.log("Login Success:", response.data);
// //   //     localStorage.setItem("token", response.data.token);
// //   //     localStorage.setItem("userEmail", formData.email);
// //   //     navigate("/");
// //   //   } catch (err) {
// //   //     setError(err.response?.data?.message || "Invalid credentials");
// //   //   } finally {
// //   //     setLoading(false);
// //   //   }
// //   // };

// //   const sendOtp = async () => {
// //     setError("");
// //     if (!validateEmail(formData.email)) {
// //       setError("Invalid email format");
// //       return;
// //     }
// //     if (!formData.password) {
// //       setError("Password is required");
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const response = await axios.post(
// //         `${config.serverApi}/comprify/auth/sendotp`,
// //         {
// //           email: formData.email,
// //           password: formData.password,
// //         }
// //       );

// //       if (response.data.success) {
// //         setOtpSent(true);
// //         startTimer(); // Start the timer when OTP is successfully sent
// //       }

// //       localStorage.setItem("aky", response.data.token);

// //       console.log("OTP Sent:", response.data);
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Invalid OTP");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // const verifyOtp = async () => {
// //   //   setError("");
// //   //   if (!otp) {
// //   //     setError("Enter OTP");
// //   //     return;
// //   //   }

// //   //   setLoading(true);
// //   //   try {
// //   //     const response = await axios.post(
// //   //       `${config.serverApi}/comprify/auth/verifyotp`,
// //   //       {
// //   //         token: localStorage.getItem("aky"),
// //   //         otp: otp,
// //   //       }
// //   //     );

// //   //     if (response.data.sucess) {
// //   //       console.log("Login Success:", response.data);
// //   //       localStorage.setItem("token", response.data.token);
// //   //       localStorage.setItem("userEmail", formData.email);
// //   //       localStorage.removeItem("aky");
// //   //       navigate("/");
// //   //     }
// //   //   } catch (err) {
// //   //     setError(err.response?.data?.message || "Invalid OTP");
// //   //   } finally {
// //   //     setLoading(false);
// //   //   }
// //   // };
// //   const handleOTPVerification = (data) => {
// //     if (!data.address || data.store_name == "") {
// //       localStorage.setItem("storeData", JSON.stringify(data));
// //       navigate("/store-info"); // Redirect to store info page
// //     } else {
// //       localStorage.setItem("storeData", JSON.stringify(data));
// //       navigate("/"); // Redirect to home page
// //     }
// //   };

// //   const verifyOtp = async () => {
// //     setError("");
// //     if (!otp) {
// //       setError("Enter OTP");
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const response = await axios.post(
// //         `${config.serverApi}/comprify/auth/verifyotp`,
// //         {
// //           token: localStorage.getItem("aky"),
// //           otp: otp,
// //         }
// //       );

// //       if (response.data.sucess) {
// //         console.log("Login Success:", response.data);
// //         localStorage.setItem("token", response.data.token);
// //         localStorage.setItem("userEmail", formData.email);
// //         localStorage.removeItem("aky");

// //         // Show cart animation for 5 seconds before navigating
// //         setShowCartAnimation(true);
// //         setTimeout(() => {
// //           handleOTPVerification(response.data.store); // Check store info and navigate accordingly
// //         }, 5000);
// //       }
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Invalid OTP");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleResendOtp = () => {
// //     sendOtp();
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-4">
// //       <div className="relative w-full max-w-[800px] h-auto md:h-[500px] bg-gray-800 shadow-lg rounded-lg overflow-hidden">
// //         {/* Sign Up Container */}
// //         <motion.div
// //           animate={{ x: signIn ? "0%" : "100%" }}
// //           transition={{ duration: 0.5 }}
// //           className="absolute top-0 left-0 w-full md:w-1/2 h-full flex flex-col items-center justify-center p-6 md:p-8 bg-gray-400"
// //         >
// //           <h2 className="text-xl md:text-2xl font-bold mb-4 text-black">
// //             Create Account
// //           </h2>
// //           <input
// //             type="text"
// //             name="name"
// //             placeholder="Name"
// //             className="input-style"
// //             onChange={handleChange}
// //           />
// //           <input
// //             type="email"
// //             name="email"
// //             placeholder="Email"
// //             className="input-style"
// //             onChange={handleChange}
// //           />
// //           {/* Password Input with Visibility Toggle */}
// //           <div className="relative w-full">
// //             <input
// //               type={showPassword ? "text" : "password"}
// //               name="password"
// //               placeholder="Password"
// //               className="input-style"
// //               onChange={handleChange}
// //             />
// //             <button
// //               type="button"
// //               className="absolute right-2 top-2"
// //               onClick={() => setShowPassword(!showPassword)}
// //             >
// //               {showPassword ? (
// //                 <EyeOffIcon className="h-10 w-5" />
// //               ) : (
// //                 <EyeIcon className="h-10 w-5" />
// //               )}
// //             </button>
// //           </div>
// //           {/* Confirm Password Input with Visibility Toggle */}
// //           <div className="relative w-full ">
// //             <input
// //               type={showConfirmPassword ? "text" : "password"}
// //               name="confirmPassword"
// //               placeholder="Confirm Password"
// //               className="input-style"
// //               onChange={handleChange}
// //             />
// //             <button
// //               type="button"
// //               className="absolute right-2 top-2"
// //               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //             >
// //               {showConfirmPassword ? (
// //                 <EyeOffIcon className="h-10 w-5" />
// //               ) : (
// //                 <EyeIcon className="h-10 w-5" />
// //               )}
// //             </button>
// //           </div>
// //           {error && <p className="text-black text-sm">{error}</p>}
// //           <button
// //             className="btn-primary mt-4 w-full md:w-auto"
// //             onClick={handleSignup}
// //             disabled={loading}
// //           >
// //             {loading ? <Loader /> : "Sign Up"}
// //           </button>
// //         </motion.div>
// //         {showCartAnimation ? (
// //           <CartAnimation key="cart" />
// //         ) : (
// //           <motion.div
// //             animate={{ x: signIn ? "100%" : "0%" }}
// //             transition={{ duration: 0.5 }}
// //             className="absolute top-0 right-0 w-full md:w-1/2 h-full flex flex-col items-center justify-center p-6 md:p-8 bg-gray-400"
// //           >
// //             <h2 className="text-xl md:text-xl font-bold mb-4 text-black">
// //               {otpSent ? "Enter the OTP Sent to your Email" : "Sign in"}
// //             </h2>

// //             {!otpSent && (
// //               <>
// //                 <input
// //                   type="email"
// //                   name="email"
// //                   placeholder="Email"
// //                   className="input-style"
// //                   onChange={handleChange}
// //                 />
// //                 <div className="relative w-full">
// //                   <input
// //                     type={showPassword ? "text" : "password"}
// //                     name="password"
// //                     placeholder="Password"
// //                     className="input-style"
// //                     onChange={handleChange}
// //                   />
// //                   <button
// //                     type="button"
// //                     className="absolute right-2 top-2"
// //                     onClick={() => setShowPassword(!showPassword)}
// //                   >
// //                     {showPassword ? (
// //                       <EyeOffIcon className="h-10 w-5" />
// //                     ) : (
// //                       <EyeIcon className="h-10 w-5" />
// //                     )}
// //                   </button>
// //                 </div>
// //                 <ForgotPasswordModal />
// //                 {error && <p className="text-black text-sm">{error}</p>}
// //               </>
// //             )}

// //             {otpSent && (
// //               <div className="relative w-full">
// //                 <input
// //                   className="input-style"
// //                   type="text"
// //                   value={otp}
// //                   onChange={(e) => setOtp(e.target.value)}
// //                   placeholder="Enter OTP"
// //                 />
// //                 <button
// //                   className="btn-primary w-full md:w-auto text-sm"
// //                   onClick={verifyOtp}
// //                   disabled={loading}
// //                 >
// //                   {loading ? <Loader /> : "Verify OTP"}
// //                 </button>
// //                 <button
// //                   className="btn-primary w-full md:w-auto mt-2 ml-2 text-sm"
// //                   onClick={handleResendOtp}
// //                   disabled={isResendDisabled}
// //                 >
// //                   {isResendDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
// //                 </button>
// //               </div>
// //             )}

// //             {!otpSent && (
// //               <button
// //                 className="btn-primary w-full md:w-auto mt-5"
// //                 onClick={sendOtp}
// //                 disabled={loading}
// //               >
// //                 {loading ? <Loader /> : "Send OTP"}
// //               </button>
// //             )}
// //           </motion.div>
// //         )}

// //         {/* Overlay Container */}
// //         <motion.div
// //           animate={{ x: signIn ? "0%" : "-100%" }}
// //           transition={{ duration: 0.5 }}
// //           className="absolute top-0 left-1/2 w-full md:w-1/2 h-full bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800 text-white flex flex-col items-center justify-center p-6 md:p-8"
// //         >
// //           <h2 className="text-xl md:text-2xl font-bold mb-4">
// //             {signIn ? "Hello, Friend!" : "Welcome Back!"}
// //           </h2>
// //           <p className="text-center mb-4">
// //             {signIn
// //               ? "Simplify your sales, streamline your business start your journey with Comprify POS today!"
// //               : "Stay ahead with seamless transactions and smarter business management. Log in now!"}
// //           </p>
// //           <button
// //             onClick={() => {
// //               setSignIn(!signIn);
// //               setError("");
// //               setOtpSent(false);
// //               setOtp("");
// //               localStorage.removeItem("aky");
// //             }}
// //             className="btn-outline w-full md:w-auto"
// //           >
// //             {signIn ? "Sign In" : "Sign Up"}
// //           </button>
// //         </motion.div>
// //       </div>

// //       {/* Success Modal */}
// //       {/* <Modal
// //         isOpen={modalIsOpen}
// //         onRequestClose={() => setModalIsOpen(false)}
// //         className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50"
// //       >
// //         <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
// //           <h2 className="text-xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
// //           <p className="text-gray-600 mb-4">Login to continue.</p>
// //           <button
// //             className="btn-primary w-full"
// //             onClick={() => {
// //               setModalIsOpen(false);
// //               setSignIn(false);
// //             }}
// //           >
// //             Go to Login
// //           </button>
// //         </div>
// //       </Modal> */}
// //       <AnimatePresence>
// //         {modalIsOpen && (
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.8 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             exit={{ opacity: 0, scale: 0.8 }}
// //             transition={{ duration: 0.3 }}
// //             className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50"
// //           >
// //             <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
// //               <h2 className="text-xl font-bold text-gray-800 mb-2">
// //                 Registration Successful!
// //               </h2>
// //               <p className="text-gray-600 mb-4">Login to continue.</p>
// //               <button
// //                 className="btn-primary w-full"
// //                 onClick={() => {
// //                   setModalIsOpen(false);
// //                   setSignIn(false);
// //                 }}
// //               >
// //                 Go to Login
// //               </button>
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }

// // export default LogIn;
// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import config from "../../config";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff, Mail, Lock, User, ShoppingCart } from "lucide-react";
// import ForgotPasswordModal from "./ForgotPasswordModal";
// import CartAnimation from "./CartAnimation";
// import { useTheme } from "../../context/themeContext";

// function LogIn() {
//   const [signIn, setSignIn] = useState(true);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [timer, setTimer] = useState(60);
//   const [isResendDisabled, setIsResendDisabled] = useState(true);
//   const navigate = useNavigate();
//   const { theme } = useTheme();

//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [showCartAnimation, setShowCartAnimation] = useState(false);

//   const validatePassword = (password) => {
//     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
//       password
//     );
//   };

//   const validateEmail = (email) => {
//     return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "name" ? value.toLowerCase() : value,
//     }));
//   };

//   const intervalRef = React.useRef(null);

//   const startTimer = () => {
//     setIsResendDisabled(true);
//     setTimer(60);
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }
//     intervalRef.current = setInterval(() => {
//       setTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(intervalRef.current);
//           setIsResendDisabled(false);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   useEffect(() => {
//     return () => clearInterval(intervalRef.current); // Cleanup on unmount
//   }, []);

//   // Signup function
//   const handleSignup = async () => {
//     setError("");
//     if (!validateEmail(formData.email)) {
//       setError("Invalid email format");
//       return;
//     }
//     if (!validatePassword(formData.password)) {
//       setError(
//         "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
//       );
//       return;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${config.serverApi}/comprify/auth/signup`,
//         {
//           owner_name: formData.name,
//           email: formData.email,
//           password: formData.password,
//         }
//       );
//       console.log("Signup Success:", response.data);

//       setModalIsOpen(true); // Show success modal
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const Loader = () => (
//     <div className="flex items-center justify-center">
//       <div className="w-6 h-6 border-t-2 border-primary border-solid rounded-full animate-spin"></div>
//     </div>
//   );

//   const sendOtp = async () => {
//     setError("");
//     if (!validateEmail(formData.email)) {
//       setError("Invalid email format");
//       return;
//     }
//     if (!formData.password) {
//       setError("Password is required");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${config.serverApi}/comprify/auth/sendotp`,
//         {
//           email: formData.email,
//           password: formData.password,
//         }
//       );

//       if (response.data.success) {
//         setOtpSent(true);
//         startTimer(); // Start the timer when OTP is successfully sent
//       }

//       localStorage.setItem("aky", response.data.token);

//       console.log("OTP Sent:", response.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOTPVerification = (data) => {
//     if (!data.address || data.store_name == "") {
//       localStorage.setItem("storeData", JSON.stringify(data));
//       navigate("/store-info"); // Redirect to store info page
//     } else {
//       localStorage.setItem("storeData", JSON.stringify(data));
//       navigate("/"); // Redirect to home page
//     }
//   };

//   const verifyOtp = async () => {
//     setError("");
//     if (!otp) {
//       setError("Enter OTP");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${config.serverApi}/comprify/auth/verifyotp`,
//         {
//           token: localStorage.getItem("aky"),
//           otp: otp,
//         }
//       );

//       if (response.data.sucess) {
//         console.log("Login Success:", response.data);
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("userEmail", formData.email);
//         localStorage.removeItem("aky");

//         // Show cart animation for 5 seconds before navigating
//         setShowCartAnimation(true);
//         setTimeout(() => {
//           handleOTPVerification(response.data.store); // Check store info and navigate accordingly
//         }, 5000);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOtp = () => {
//     sendOtp();
//   };

//   return (
//     <div
//       className={`flex items-center justify-center min-h-screen ${
//         theme === "dark"
//           ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
//           : "bg-gradient-to-b from-blue-50 via-white to-blue-50"
//       } p-4`}
//     >
//       <div className="relative w-full max-w-[900px] h-auto md:h-[550px] bg-card shadow-xl rounded-2xl overflow-hidden">
//         {/* Sign Up Container */}
//         <motion.div
//           animate={{ x: signIn ? "0%" : "100%" }}
//           transition={{ duration: 0.5, ease: "easeInOut" }}
//           className="absolute top-0 left-0 w-full md:w-1/2 h-full flex flex-col items-center justify-center p-6 md:p-8 bg-card"
//         >
//           <h2 className="text-xl md:text-2xl font-bold mb-6 text-foreground">
//             Create Account
//           </h2>

//           <div className="space-y-4 w-full max-w-sm">
//             <div className="relative">
//               <User
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
//                 size={18}
//               />
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 className="input-modern pl-10"
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="relative">
//               <Mail
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
//                 size={18}
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 className="input-modern pl-10"
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="relative">
//               <Lock
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
//                 size={18}
//               />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 className="input-modern pl-10"
//                 onChange={handleChange}
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>

//             <div className="relative">
//               <Lock
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
//                 size={18}
//               />
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//                 className="input-modern pl-10"
//                 onChange={handleChange}
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//           </div>

//           {error && <p className="text-destructive text-sm mt-2">{error}</p>}

//           <button
//             className="btn-modern mt-6 w-full max-w-sm"
//             onClick={handleSignup}
//             disabled={loading}
//           >
//             {loading ? <Loader /> : "Sign Up"}
//           </button>
//         </motion.div>

//         {showCartAnimation ? (
//           <CartAnimation key="cart" />
//         ) : (
//           <motion.div
//             animate={{ x: signIn ? "100%" : "0%" }}
//             transition={{ duration: 0.5, ease: "easeInOut" }}
//             className="absolute top-0 right-0 w-full md:w-1/2 h-full flex flex-col items-center justify-center p-6 md:p-8 bg-card"
//           >
//             <h2 className="text-xl md:text-2xl font-bold mb-6 text-foreground">
//               {otpSent ? "Enter the OTP Sent to your Email" : "Sign in"}
//             </h2>

//             {!otpSent ? (
//               <div className="space-y-4 w-full max-w-sm">
//                 <div className="relative">
//                   <Mail
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
//                     size={18}
//                   />
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     className="input-modern pl-10"
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="relative">
//                   <Lock
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
//                     size={18}
//                   />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     placeholder="Password"
//                     className="input-modern pl-10"
//                     onChange={handleChange}
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>

//                 <div className="text-right">
//                   <ForgotPasswordModal />
//                 </div>

//                 {error && <p className="text-destructive text-sm">{error}</p>}

//                 <button
//                   className="btn-modern w-full"
//                   onClick={sendOtp}
//                   disabled={loading}
//                 >
//                   {loading ? <Loader /> : "Send OTP"}
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4 w-full max-w-sm">
//                 <div className="relative">
//                   <input
//                     className="input-modern text-center text-lg tracking-widest"
//                     type="text"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     placeholder="Enter OTP"
//                     maxLength={6}
//                   />
//                 </div>

//                 <div className="flex flex-col gap-2">
//                   <button
//                     className="btn-modern"
//                     onClick={verifyOtp}
//                     disabled={loading}
//                   >
//                     {loading ? <Loader /> : "Verify OTP"}
//                   </button>

//                   <button
//                     className={`btn-modern-outline ${
//                       isResendDisabled ? "opacity-50 cursor-not-allowed" : ""
//                     }`}
//                     onClick={handleResendOtp}
//                     disabled={isResendDisabled}
//                   >
//                     {isResendDisabled
//                       ? `Resend OTP in ${timer}s`
//                       : "Resend OTP"}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         )}

//         {/* Overlay Container */}
//         <motion.div
//           animate={{ x: signIn ? "0%" : "-100%" }}
//           transition={{ duration: 0.5, ease: "easeInOut" }}
//           className="absolute top-0 left-1/2 w-full md:w-1/2 h-full bg-gradient-to-b from-primary-600 via-primary to-primary-800 text-white flex flex-col items-center justify-center p-6 md:p-8"
//         >
//           <ShoppingCart className="w-16 h-16 mb-6" />
//           <h2 className="text-xl md:text-2xl font-bold mb-4">
//             {signIn ? "Hello, Friend!" : "Welcome Back!"}
//           </h2>
//           <p className="text-center mb-6 max-w-xs">
//             {signIn
//               ? "Simplify your sales, streamline your business. Start your journey with Comprify POS today!"
//               : "Stay ahead with seamless transactions and smarter business management. Log in now!"}
//           </p>
//           <button
//             onClick={() => {
//               setSignIn(!signIn);
//               setError("");
//               setOtpSent(false);
//               setOtp("");
//               localStorage.removeItem("aky");
//             }}
//             className="btn-modern-white"
//           >
//             {signIn ? "Sign In" : "Sign Up"}
//           </button>
//         </motion.div>
//       </div>

//       {/* Success Modal */}
//       <AnimatePresence>
//         {modalIsOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 15 }}
//               className="bg-card p-6 rounded-xl shadow-xl max-w-sm w-full"
//             >
//               <div className="flex flex-col items-center text-center">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//                   <svg
//                     className="w-8 h-8 text-green-500"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M5 13l4 4L19 7"
//                     ></path>
//                   </svg>
//                 </div>
//                 <h2 className="text-xl font-bold text-foreground mb-2">
//                   Registration Successful!
//                 </h2>
//                 <p className="text-muted-foreground mb-6">
//                   Your account has been created. Please login to continue.
//                 </p>
//                 <button
//                   className="btn-modern w-full"
//                   onClick={() => {
//                     setModalIsOpen(false);
//                     setSignIn(false);
//                   }}
//                 >
//                   Go to Login
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default LogIn;
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ShoppingCart } from "lucide-react";
import ForgotPasswordModal from "./ForgotPasswordModal";
import CartAnimation from "./CartAnimation";
import { useTheme } from "../../context/themeContext";

function LogIn() {
  const [signIn, setSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showCartAnimation, setShowCartAnimation] = useState(false);

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  };

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "name" ? value.toLowerCase() : value,
    }));
  };

  const intervalRef = React.useRef(null);

  const startTimer = () => {
    setIsResendDisabled(true);
    setTimer(60);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, []);

  // Signup function
  const handleSignup = async () => {
    setError("");
    if (!validateEmail(formData.email)) {
      setError("Invalid email format");
      return;
    }
    if (!validatePassword(formData.password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${config.serverApi}/comprify/auth/signup`,
        {
          owner_name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );
      console.log("Signup Success:", response.data);

      setModalIsOpen(true); // Show success modal
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const Loader = () => (
    <div className="flex items-center justify-center">
      <div className="w-6 h-6 border-t-2 border-primary border-solid rounded-full animate-spin"></div>
    </div>
  );

  const sendOtp = async () => {
    setError("");
    if (!validateEmail(formData.email)) {
      setError("Invalid email format");
      return;
    }
    if (!formData.password) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${config.serverApi}/comprify/auth/sendotp`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data.success) {
        setOtpSent(true);
        startTimer(); // Start the timer when OTP is successfully sent
      }

      localStorage.setItem("aky", response.data.token);

      console.log("OTP Sent:", response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerification = (data) => {
    if (!data.address || data.store_name == "") {
      localStorage.setItem("storeData", JSON.stringify(data));
      navigate("/store-info"); // Redirect to store info page
    } else {
      localStorage.setItem("storeData", JSON.stringify(data));
      navigate("/"); // Redirect to home page
    }
  };

  const verifyOtp = async () => {
    setError("");
    if (!otp) {
      setError("Enter OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${config.serverApi}/comprify/auth/verifyotp`,
        {
          token: localStorage.getItem("aky"),
          otp: otp,
        }
      );

      if (response.data.sucess) {
        console.log("Login Success:", response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userEmail", formData.email);
        localStorage.removeItem("aky");

        // Show cart animation for 5 seconds before navigating
        setShowCartAnimation(true);
        setTimeout(() => {
          handleOTPVerification(response.data.store); // Check store info and navigate accordingly
        }, 5000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = () => {
    sendOtp();
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-b from-blue-50 via-white to-blue-50"
      } p-4`}
    >
      <div className="relative w-full max-w-[900px] h-auto md:h-[550px] bg-card shadow-xl rounded-2xl overflow-hidden">
        {/* Sign Up Container */}
        <motion.div
          animate={{ x: signIn ? "0%" : "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full md:w-1/2 h-full flex flex-col items-center justify-center p-6 md:p-8 bg-card"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-foreground">
            Create Account
          </h2>

          <div className="space-y-4 w-full max-w-sm">
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input-modern pl-10"
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input-modern pl-10"
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input-modern pl-10"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="input-modern pl-10"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-destructive text-sm mt-2">{error}</p>}

          <button
            className="btn-modern mt-6 w-full max-w-sm"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? <Loader /> : "Sign Up"}
          </button>
        </motion.div>

        {showCartAnimation ? (
          <CartAnimation key="cart" />
        ) : (
          <motion.div
            animate={{ x: signIn ? "100%" : "0%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-full md:w-1/2 h-full flex flex-col items-center justify-center p-6 md:p-8 bg-card"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-foreground">
              {otpSent ? "Enter the OTP Sent to your Email" : "Sign in"}
            </h2>

            {!otpSent ? (
              <div className="space-y-4 w-full max-w-sm">
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input-modern pl-10"
                    onChange={handleChange}
                  />
                </div>

                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="input-modern pl-10"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="text-right">
                  <ForgotPasswordModal />
                </div>

                {error && <p className="text-destructive text-sm">{error}</p>}

                <button
                  className="btn-modern w-full"
                  onClick={sendOtp}
                  disabled={loading}
                >
                  {loading ? <Loader /> : "Send OTP"}
                </button>
              </div>
            ) : (
              <div className="space-y-4 w-full max-w-sm">
                <div className="relative">
                  <input
                    className="input-modern text-center text-lg tracking-widest"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    maxLength={6}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    className="btn-modern"
                    onClick={verifyOtp}
                    disabled={loading}
                  >
                    {loading ? <Loader /> : "Verify OTP"}
                  </button>

                  <button
                    className={`btn-modern-outline ${
                      isResendDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleResendOtp}
                    disabled={isResendDisabled}
                  >
                    {isResendDisabled
                      ? `Resend OTP in ${timer}s`
                      : "Resend OTP"}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Overlay Container */}
        <motion.div
          animate={{ x: signIn ? "0%" : "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 w-full md:w-1/2 h-full bg-gradient-to-b from-primary-600 via-primary to-primary-800 text-white flex flex-col items-center justify-center p-6 md:p-8"
        >
          <ShoppingCart className="w-16 h-16 mb-6" />
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            {signIn ? "Hello, Friend!" : "Welcome Back!"}
          </h2>
          <p className="text-center mb-6 max-w-xs">
            {signIn
              ? "Simplify your sales, streamline your business. Start your journey with Comprify POS today!"
              : "Stay ahead with seamless transactions and smarter business management. Log in now!"}
          </p>
          <button
            onClick={() => {
              setSignIn(!signIn);
              setError("");
              setOtpSent(false);
              setOtp("");
              localStorage.removeItem("aky");
            }}
            className="btn-modern-white"
          >
            {signIn ? "Sign In" : "Sign Up"}
          </button>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {modalIsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-card p-6 rounded-xl shadow-xl max-w-sm w-full"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Registration Successful!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Your account has been created. Please login to continue.
                </p>
                <button
                  className="btn-modern w-full"
                  onClick={() => {
                    setModalIsOpen(false);
                    setSignIn(false);
                  }}
                >
                  Go to Login
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LogIn;
