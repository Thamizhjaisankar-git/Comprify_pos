// // import { ShoppingCart } from "lucide-react";
// // import { motion } from "framer-motion";

// // const CartAnimation = () => {
// //   console.log("CartAnimation rendered");
// //   return (
// //     <div className="h-screen w-full bg-black flex items-center justify-center overflow-hidden">
// //       <motion.div
// //         className="relative flex items-center justify-center w-40 h-40 rounded-full bg-black"
// //         animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
// //         transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
// //       >
// //         <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full"></div>
// //         <motion.div
// //           className="relative bg-black rounded-full w-36 h-36 flex items-center justify-center"
// //           initial={{ x: '-100vw' }}
// //           animate={{ x: ["-100vw", "0vw", "0vw", "100vw"] }}
// //           transition={{ times: [0, 0.4, 0.6, 1], duration: 6, ease: "easeInOut", repeat: Infinity }}
// //         >
// //           <ShoppingCart size={80} color="white" />
// //         </motion.div>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default CartAnimation;

// import { ShoppingCart } from "lucide-react";
// import { motion } from "framer-motion";

// const CartAnimation = () => {
//   return (
//     <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
//       <motion.div
//         className="relative flex items-center justify-center w-40 h-40 rounded-full bg-black"
//         animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
//         transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full"></div>
//         <motion.div
//           className="relative bg-black rounded-full w-36 h-36 flex items-center justify-center"
//           initial={{ x: '-100vw' }}
//           animate={{ x: ["-100vw", "0vw", "0vw", "100vw"] }}
//           transition={{ times: [0, 0.4, 0.6, 1], duration: 6, ease: "easeInOut", repeat: Infinity }}
//         >
//           <ShoppingCart size={80} color="white" />
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default CartAnimation;
"use client";

import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/themeContext";

const CartAnimation = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-background">
      <div className="relative">
        {/* Outer glowing circle */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            background:
              theme === "dark"
                ? "radial-gradient(circle, rgba(59, 130, 246, 0.7) 0%, rgba(16, 185, 129, 0.7) 100%)"
                : "radial-gradient(circle, rgba(59, 130, 246, 0.7) 0%, rgba(16, 185, 129, 0.7) 100%)",
          }}
        />

        {/* Inner circle with cart */}
        <motion.div
          className="relative w-40 h-40 rounded-full bg-background flex items-center justify-center"
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: {
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scale: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
        >
          {/* Moving cart animation */}
          <motion.div
            className="absolute"
            initial={{ x: -100, opacity: 0 }}
            animate={{
              x: ["-100%", "0%", "0%", "100%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              times: [0, 0.3, 0.7, 1],
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <ShoppingCart size={50} className="text-primary" />
          </motion.div>
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.div
        className="absolute mt-32 text-center"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <h2 className="text-xl font-bold text-primary mb-2">
          Loading your store
        </h2>
        <p className="text-muted-foreground">Please wait a moment...</p>
      </motion.div>
    </div>
  );
};

export default CartAnimation;
