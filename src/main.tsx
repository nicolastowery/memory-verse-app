import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { PassageProvider } from "./context/PassageContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PassageProvider>
      <App />
    </PassageProvider>
  </React.StrictMode>
);
