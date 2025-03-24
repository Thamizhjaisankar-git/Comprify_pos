
import { useState } from "react"
import { ShoppingCart, Clock, AlertTriangle, Package, DollarSign } from "lucide-react"

export default function CartDetails({ trolley, cart, history }) {
  const [activeTab, setActiveTab] = useState("items")

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        )
      case "checking-out":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Checking Out
          </span>
        )
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Completed
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Trolley #{trolley.trolley_code}</h2>
            <p className="text-gray-500">Store: {trolley.store_name}</p>
          </div>
          <div className="flex flex-col items-end">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                trolley.status === "available"
                  ? "bg-green-100 text-green-800"
                  : trolley.status === "in-use"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-amber-100 text-amber-800"
              }`}
            >
              {trolley.status}
            </span>
            {trolley.last_used_at && (
              <span className="text-xs text-gray-500 mt-1">
                Last used: {new Date(trolley.last_used_at).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab("items")}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === "items"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <ShoppingCart className="w-5 h-5 inline-block mr-2" />
            Current Items
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === "history"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Clock className="w-5 h-5 inline-block mr-2" />
            Shopping History
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === "items" ? (
          <div>
            {cart ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Current Cart</h3>
                    <p className="text-sm text-gray-500">Started: {new Date(cart.created_at).toLocaleString()}</p>
                  </div>
                  <div>{getStatusBadge(cart.status)}</div>
                </div>

                {cart.flags && cart.flags.length > 0 && (
                  <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-amber-800">Attention needed</h3>
                        <div className="mt-2 text-sm text-amber-700">
                          <ul className="list-disc pl-5 space-y-1">
                            {cart.flags.map((flag, index) => (
                              <li key={index}>
                                {flag.issue} ({new Date(flag.flagged_at).toLocaleTimeString()})
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-700">Cart Items</h4>
                    <span className="text-gray-500 text-sm">{cart.items.length} items</span>
                  </div>

                  {cart.items.length > 0 ? (
                    <div className="space-y-4 mt-4">
                      {cart.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm"
                        >
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-md flex items-center justify-center">
                              <Package className="h-6 w-6 text-gray-500" />
                            </div>
                            <div className="ml-4">
                              <h5 className="text-sm font-medium text-gray-900">{item.product.name}</h5>
                              <p className="text-xs text-gray-500">
                                Added: {new Date(item.added_at).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900 mr-4">x{item.quantity}</span>
                            <span className="text-sm font-medium text-gray-900">${item.product.price.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm mt-2">No items in cart yet</p>
                  )}
                </div>

                <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg">
                  <span className="font-medium text-indigo-900">Total Price</span>
                  <span className="text-lg font-bold text-indigo-900">${cart.total_price.toFixed(2)}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No Active Cart</h3>
                <p className="mt-1 text-sm text-gray-500">This trolley doesn't have an active shopping session.</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Shopping History</h3>

            {history.length > 0 ? (
              <div className="space-y-6">
                {history.map((session, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-gray-900">Shopping Session #{index + 1}</h4>
                          <p className="text-sm text-gray-500">{new Date(session.checkout_time).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="font-bold text-gray-900">${session.total_price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-500 mb-2">
                          <span>Payment Method</span>
                          <span className="font-medium text-gray-900 capitalize">{session.payment_method}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Items</span>
                          <span className="font-medium text-gray-900">{session.cart_items.length}</span>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Purchased Items</h5>
                        <div className="space-y-2">
                          {session.cart_items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex justify-between items-center text-sm">
                              <div className="flex items-center">
                                <Package className="h-4 w-4 text-gray-400 mr-2" />
                                <span>{item.product.name}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="text-gray-500 mr-2">x{item.quantity}</span>
                                <span className="font-medium">${item.price_at_purchase.toFixed(2)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {session.flags && session.flags.length > 0 && (
                        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                          <div className="flex items-start">
                            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                            <div className="ml-2">
                              <h6 className="text-xs font-medium text-amber-800">Issues Flagged</h6>
                              <ul className="mt-1 text-xs text-amber-700 list-disc pl-4">
                                {session.flags.map((flag, flagIndex) => (
                                  <li key={flagIndex}>{flag.issue}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No Shopping History</h3>
                <p className="mt-1 text-sm text-gray-500">
                  This trolley hasn't been used for any completed shopping sessions yet.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

