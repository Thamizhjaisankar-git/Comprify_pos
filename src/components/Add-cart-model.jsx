// import { useState } from "react";
// import { X } from "lucide-react";

// export default function AddCartModal({ onClose, onAdd }) {
//   const [formData, setFormData] = useState({
//     trolleyCode: "",
//     store: "",
//     status: "available",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Create new trolley object based on the model structure
//     const newTrolley = {
//       _id: Math.random().toString(36).substr(2, 9),
//       trolleyCode: formData.trolleyCode,
//       store_name: "Store " + formData.store.slice(-4), // Just for display purposes
//       status: formData.status,
//       current_user: null,
//       current_cart: null,
//       last_used_at: null,
//       history: [],
//       created_at: new Date().toISOString(),
//     };

//     onAdd(newTrolley);
//   };

//   return (
//     <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
//         onClick={onClose}
//       ></div>

//       <div className="relative bg-white rounded-lg max-w-md w-full mx-auto shadow-xl z-10">
//         <div className="flex justify-between items-center p-4 border-b">
//           <h3 className="text-lg font-medium text-gray-900">Add New Trolley</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-500 focus:outline-none"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 text-black">
//           <div className="space-y-4">
//             <div>
//               <label
//                 htmlFor="trolley_code"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Trolley Code
//               </label>
//               <input
//                 type="text"
//                 id="trolleyCode"
//                 name="trolleyCode"
//                 required
//                 value={formData.trolleyCode}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="TR-12345"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="status"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Status
//               </label>
//               <select
//                 id="status"
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               >
//                 <option value="available">Available</option>
//                 <option value="in-use">In Use</option>
//                 <option value="maintenance">Maintenance</option>
//               </select>
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end space-x-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Add Trolley
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { X, ShoppingCart } from "lucide-react";

export default function AddCartModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    trolleyCode: "",
    store: "",
    status: "available",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new trolley object based on the model structure
    const newTrolley = {
      _id: Math.random().toString(36).substr(2, 9),
      trolleyCode: formData.trolleyCode,
      store_name: "Store " + formData.store.slice(-4), // Just for display purposes
      status: formData.status,
      current_user: null,
      current_cart: null,
      last_used_at: null,
      history: [],
      created_at: new Date().toISOString(),
    };

    onAdd(newTrolley);
  };

  return (
    <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-card rounded-xl max-w-md w-full mx-auto shadow-xl z-10 border border-border">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h3 className="text-lg font-medium">Add New Trolley</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="trolley_code"
                className="block text-sm font-medium mb-1"
              >
                Trolley Code
              </label>
              <input
                type="text"
                id="trolleyCode"
                name="trolleyCode"
                required
                value={formData.trolleyCode}
                onChange={handleChange}
                className="input-modern"
                placeholder="TR-12345"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-modern"
              >
                <option value="available">Available</option>
                <option value="in-use">In Use</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-modern-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-modern flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add Trolley</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
