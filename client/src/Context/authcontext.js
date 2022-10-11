import { createContext, useEffect, useState } from "react";
import usersModel from "../models/usersModel.js";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const checkIfUserIsLoggedIn = async (req, res) => {
    const existingUser = await usersModel.findOne({ email: req.body.email });

    if (existingUser) {
      setUser(user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        setError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
