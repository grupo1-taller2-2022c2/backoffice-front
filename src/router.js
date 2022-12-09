import React from "react";
import LoginScreen from "./signIn";
import SignUpScreen from "./signUp";
import HomeScreen from "./home";
import { Route, Routes } from "react-router-dom";
import { GetUserContext } from "./UserContext";

export default function MyRoutes() {
  const userContext = GetUserContext();

  return (
    <Routes>
      <Route index path="/home" element={<HomeScreen />} />{" "}
      <Route index element={<LoginScreen />} />
      <Route path="/signUp" element={<SignUpScreen />} />
    </Routes>
  );
}
