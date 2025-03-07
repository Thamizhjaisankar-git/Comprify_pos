import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import LogIn from "./pages/loginPage/LogIn";
import Home from "./pages/home/Home";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route exact path="/login" element={<LogIn />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
