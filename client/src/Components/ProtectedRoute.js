import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function ProtectedRoute({ children }) {
  const { logged, checkUserStatus, loading } = useContext(AuthContext);

  return (
    <>
      {loading ? (
        <p>Restricted access. Check your credentials</p>
      ) : logged ? (
        children
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default ProtectedRoute;
