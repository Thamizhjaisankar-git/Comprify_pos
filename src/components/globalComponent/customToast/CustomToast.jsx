// import { useEffect, useState } from "react";
// import { X } from "lucide-react";

// const CustomToast = ({ show, onClose, body, status }) => {
//   const [visible, setVisible] = useState(show);

//   useEffect(() => {
//     if (show) {
//       setVisible(true);
//       const timer = setTimeout(() => {
//         setVisible(false);
//         onClose();
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [show, onClose]);

//   if (!visible) return null;

//   return (
//     <div
//       className="fixed top-5 right-5 z-50 flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all duration-300 ease-in-out bg-opacity-90"
//       style={{ backgroundColor: status === "success" ? "#16a34a" : "#dc2626" }}
//     >
//       <span>{status === "success" ? "✅ Success:" : "❌ Error:"}</span>
//       <span>{body}</span>
//       <button onClick={() => setVisible(false)} className="ml-auto">
//         <X className="w-4 h-4" />
//       </button>
//     </div>
//   );
// };

// export default CustomToast;
"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";

const CustomToast = ({ show, onClose, body, status }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all duration-300 ease-in-out ${
        status === "success"
          ? "bg-green-500 dark:bg-green-600"
          : "bg-red-500 dark:bg-red-600"
      }`}
      style={{
        animation: "slideInRight 0.3s forwards",
        transform: "translateX(100%)",
      }}
    >
      {status === "success" ? (
        <CheckCircle className="h-5 w-5" />
      ) : (
        <AlertCircle className="h-5 w-5" />
      )}
      <span>{body}</span>
      <button onClick={() => setVisible(false)} className="ml-auto">
        <X className="w-4 h-4" />
      </button>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomToast;
