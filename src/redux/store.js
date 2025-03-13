import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import userReducer from "./userSlice";
import menuReducer from "./menuSlice"; // ✅ Import menuReducer
import customerReducer from "./customerSlice"; // ✅ Import customerReducer
import productReducer from "./productSlice";
// ✅ Import productReducer
import supplierReducer from "./supplierSlice";
import employeeReducer from "./employeeSlice"; // ✅ Import employeeReducer


// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  menu: menuReducer,
  customer: customerReducer,
  product: productReducer,
  supplier: supplierReducer,
  employee: employeeReducer // ✅ Add menuReducer
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create persistor
export const persistor = persistStore(store);
export default store;
