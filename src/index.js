import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PassageProvider } from "./context/PassageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
// This should be placed in App.jsx, but need to refactor button code
<PassageProvider>
    <App />
</PassageProvider>

);
