import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CartesContextProvider } from "./context/CartesContext";
import { AuthContextProvider } from "./context/AuthContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AuthContextProvider>
      <CartesContextProvider>
        <App />
      </CartesContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
