import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const isLogged = user !== null ? true : false;

  return <>{isLogged ? children : <Navigate to="/register" />}</>;
}

export default ProtectedRoute;
