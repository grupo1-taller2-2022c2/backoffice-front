import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import MyRoutes from "./router";
import { UserStatusProvider } from "./UserContext";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <UserStatusProvider>
          <MyRoutes />
        </UserStatusProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
