// import { ShoppingCart } from "lucide-react";
// import { motion } from "framer-motion";

// const CartAnimation = () => {
//   console.log("CartAnimation rendered");
//   return (
//     <div className="h-screen w-full bg-black flex items-center justify-center overflow-hidden">
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


import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const CartAnimation = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <motion.div
        className="relative flex items-center justify-center w-40 h-40 rounded-full bg-black"
        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full"></div>
        <motion.div
          className="relative bg-black rounded-full w-36 h-36 flex items-center justify-center"
          initial={{ x: '-100vw' }}
          animate={{ x: ["-100vw", "0vw", "0vw", "100vw"] }}
          transition={{ times: [0, 0.4, 0.6, 1], duration: 6, ease: "easeInOut", repeat: Infinity }}
        >
          <ShoppingCart size={80} color="white" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CartAnimation;
