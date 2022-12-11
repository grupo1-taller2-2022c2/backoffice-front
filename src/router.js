import React from "react";
import LoginScreen from "./signIn";
import SignUpScreen from "./signUp";
import HomeScreen from "./home";
import Metricas from "./Metricas";
import ReglasCotizacion from "./ReglasCotizacion"
import { Route, Routes } from "react-router-dom";
import { GetUserContext } from "./UserContext";
import { ModalContextProvider } from "@chakra-ui/react";

export default function MyRoutes() {
  const context = GetUserContext();

  return (
    <Routes>
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/metricas" element={<Metricas />} />
      <Route index element={<LoginScreen />} />
      <Route path="/signUp" element={<SignUpScreen />} />
      <Route path="/reglas-cotizacion" element={<ReglasCotizacion />} />
      
    </Routes>
  );
}

/* <>
      {context.userStatus.isLoggedIn ? (
        <Routes>
          <Route index path="/home" element={<HomeScreen />} />
          <Route path="/metricas" element={<Metricas />} />
        </Routes>
      ) : (
        <Routes>
          {" "}
          <Route index element={<LoginScreen />} />
          <Route path="/signUp" element={<SignUpScreen />} />
        </Routes>
      )}
    </>*/
