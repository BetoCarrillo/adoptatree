import { createContext, useEffect, useState } from "react";
import getToken from "../utils/getToken.js";
import { TreeContext } from "./TreeContext.js";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [logged, setLogged] = useState(null);
  // const [like, setLike] = useState(false);
  // const [foo, setFoo] = useState(false);

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
        method: "GET",
        headers: myHeaders,
      };
      try {
        const response = await fetch(
          "http://localhost:5005/api/users/profile",
          requestOptionsOne
        );
        const result = await response.json();
        // console.log(result);
        setUser({
          _id: result.id,
          userName: result.userName,
          email: result.email,
          avatarPicture: result.avatarPicture,
        });

        /// Aqui se pierde el result. except email
      } catch (error) {
        console.log("error getting user's profile", error);
      }
    } else {
      setError(true);
      // console.log("no token for this user");
    }
  };
  // const changeLike = () => {
  //   setFoo(!like);
  // };
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
