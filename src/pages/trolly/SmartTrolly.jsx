import { useState } from "react";
import { Plus, ShoppingCart, History } from "lucide-react";
import AddCartModal from "../../components/Add-cart-model";
import CartDetails from "../../components/Cart-details";
import {
  sampleTrolleys,
  sampleCarts,
  sampleHistory,
} from "../../../sample-data";

export default function Dashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTrolley, setSelectedTrolley] = useState(null);
  const [trolleys, setTrolleys] = useState(sampleTrolleys);

  const handleAddTrolley = (newTrolley) => {
    setTrolleys([...trolleys, newTrolley]);
    setIsAddModalOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "in-use":
        return "bg-blue-100 text-blue-800";
      case "maintenance":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Smart Trolley Dashboard
            </h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Trolley
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedTrolley ? (
          <div>
            <button
              onClick={() => setSelectedTrolley(null)}
              className="mb-6 inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ← Back to Trolleys
            </button>
            <CartDetails
              trolley={selectedTrolley}
              cart={sampleCarts.find(
                (cart) => cart.trolley_id === selectedTrolley.trolley_code
              )}
              history={sampleHistory.filter(
                (h) => h.trolley_id === selectedTrolley.trolley_code
              )}
            />
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              All Trolleys
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trolleys.map((trolley) => (
                <div
                  key={trolley._id}
                  onClick={() => setSelectedTrolley(trolley)}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Trolley #{trolley.trolley_code}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Store: {trolley.store_name}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          trolley.status
                        )}`}
                      >
                        {trolley.status}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <ShoppingCart className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {trolley.current_cart ? "Active cart" : "No active cart"}
                    </div>
                    {trolley.last_used_at && (
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <History className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        Last used:{" "}
                        {new Date(trolley.last_used_at).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                    <div className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      View details →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {isAddModalOpen && (
        <AddCartModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddTrolley}
        />
      )}
    </div>
  );
}
