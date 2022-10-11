import { useContext } from "react";
import { AuthContext } from "../Context/authcontext.js";

function useAuth() {
  const { user } = useContext(AuthContext);

  const isLoggedIn = user !== null ? true : false;
  return isLoggedIn;
}

export { useAuth };
