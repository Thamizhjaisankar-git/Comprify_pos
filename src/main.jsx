import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { SocketProvider } from "../src/context/socketContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <SocketProvider>
    {/* <StrictMode> */}
    <App />
    {/* </StrictMode> */}
    <App />
  </SocketProvider>
);
