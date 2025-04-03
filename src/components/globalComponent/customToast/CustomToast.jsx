import { useEffect, useState } from "react";
import { X } from "lucide-react";

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
      className="fixed top-5 right-5 z-50 flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all duration-300 ease-in-out bg-opacity-90"
      style={{ backgroundColor: status === "success" ? "#16a34a" : "#dc2626" }}
    >
      <span>{status === "success" ? "✅ Success:" : "❌ Error:"}</span>
      <span>{body}</span>
      <button onClick={() => setVisible(false)} className="ml-auto">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CustomToast;
