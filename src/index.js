import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import MyRouter from "./router";
import { RouterProvider } from "react-router-dom";
import {UserStatusProvider} from "./UserContext";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    
      <RouterProvider router={MyRouter} />
   
  </React.StrictMode>
);
