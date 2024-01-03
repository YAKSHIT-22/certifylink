import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App";
import { NextUIProvider } from "@nextui-org/react";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Global from "./hoc/Global";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <Toaster />
        <Global>
          <App />
        </Global>
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
