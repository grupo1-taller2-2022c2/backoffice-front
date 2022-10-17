import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import LoginScreen from "./signIn";
import SignUpScreen from "./signUp";
import HomeScreen from "./home";

const MyRouter = createBrowserRouter([
  { path: "/signUp", element: <SignUpScreen /> },
  { path: "/home", element: <HomeScreen />},
  { path: "/", element: <LoginScreen />},
]);

export default MyRouter;