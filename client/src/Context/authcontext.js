import { createContext, useEffect, useState } from "react";
import getToken from "../utils/getToken.js";
import likes from "../Views/Trees.js";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [logged, setLogged] = useState(null);
  const [like, setLike] = useState(false);

  const checkUserStatus = () => {
    const token = getToken();
    if (token) {
      setLogged(true);
    }
    if (!token) {
      setLogged(false);
    }
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
        setUser({
          _id: result._id,
          userName: result.username,
          email: result.email,
          avatarPicture: result.avatar,
        });
      } catch (error) {
        console.log("error getting user's profile", error);
      }
    } else {
      setError(true);
      console.log("no token for this user");
    }
  };

  const checkLikes = () => {};

  useEffect(() => {
    checkUserStatus();
    getUserProfile();
    checkLikes();
    console.log("refresh");
  }, [logged, like]);

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
        checkLikes,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
