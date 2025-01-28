import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CryptoContextProvider from "./contexts/CryptoContext.jsx";
import ThemeContextProvider from "./contexts/ThemeContext.jsx";

const root = document.getElementById("root");

createRoot(root).render(
  <CryptoContextProvider>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </CryptoContextProvider>
);
