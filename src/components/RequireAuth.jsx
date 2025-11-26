// src/components/RequireAuth.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const token = localStorage.getItem("raynott_token");

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
