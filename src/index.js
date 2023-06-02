import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MyUserContextProvider } from "./contexts/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MyUserContextProvider>
      <App />
    </MyUserContextProvider>
  </React.StrictMode>
);
