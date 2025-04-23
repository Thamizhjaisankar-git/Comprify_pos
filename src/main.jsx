// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import { SocketProvider } from "../src/context/socketContext.jsx";
// import App from "./App.jsx";

// createRoot(document.getElementById("root")).render(
//   <SocketProvider>
//     {/* <StrictMode> */}
//     <App />
//     {/* </StrictMode> */}
//     <App />
//   </SocketProvider>
// );
import { createRoot } from "react-dom/client";
import "./index.css";
import { SocketProvider } from "../src/context/socketContext.jsx";
import { ThemeProvider } from "../src/context/themeContext.jsx";
import { ViewProvider } from "../src/context/viewContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <ViewProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </ViewProvider>
  </ThemeProvider>
);
