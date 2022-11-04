import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCookieFromBrowser } from "../cookies";

const ProtectedRoute = () => {
  const user = getCookieFromBrowser("authToken");

  if (!user) {
    return <Navigate to="/" state={{ from: useLocation() }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
