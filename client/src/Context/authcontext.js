import { createContext, useEffect, useState } from "react";
import { baseURL } from "../utils/getServerUrl.js";
import getToken from "../utils/getToken.js";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [logged, setLogged] = useState(null);
  const [loading, setLoading] = useState({});

  const checkUserStatus = () => {
    const token = getToken();
    if (token) {
      setLogged(true);
      setLoading(false);
    }
    if (!token) {
      setLogged(false);
      setLoading(false);
    }
    getUserProfile();
  };

  const getUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptionsOne = {
        headers: myHeaders,
      };
      try {
        const response = await fetch(
          baseURL + "/api/users/profile",
          requestOptionsOne
        );
        const result = await response.json();

        setUser({
          _id: result.id,
          userName: result.userName,
          email: result.email,
          avatarPicture: result.avatarPicture,
        });
      } catch (error) {
        console.log("error getting user's profile", error);
      }
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    checkUserStatus();
    getToken();
  }, [logged]);

  return (
    <AuthContext.Provider
      value={{
        getUserProfile,
        logged,
        setLogged,
        user,
        setUser,
        error,
        setError,
        checkUserStatus,
        loading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
