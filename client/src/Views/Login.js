import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userLogin, setuserLogin] = useState({});
  const { user, setUser, logged, setLogged, checkUserStatus, getUserProfile } =
    useContext(AuthContext);
  const redirectLogin = useNavigate();

  const handleChangeHandler = (e) => {
    setuserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const login = async () => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("email", userLogin.email);
    urlencoded.append("password", userLogin.password);

    const requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/users/login",
        requestOptions
      );
      const result = await response.json();
      const token = result.token;

      if (token) {
        localStorage.setItem("token", token);
        checkUserStatus();
      }
      console.log("result:", result);
      if (result.msg === "user is logged in") {
        alert("login successful");
        redirectLogin("/", { replace: true });
      }

      if (result.msg === "user not found") {
        alert("Check your credentials");
      }
    } catch (error) {
      console.log("login error", error);
    }
  };

  const logout = () => {
    if (window.confirm("Are you sure you want to Logout?") === true) {
      localStorage.removeItem("token");
      setLogged(null);
    }
  };

  return (
    <div>
      <div>
        {!logged ? (
          <div>
            {" "}
            Login
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                value={userLogin.email ? userLogin.email : ""}
                onChange={handleChangeHandler}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="text"
                name="password"
                id="password"
                value={userLogin.password ? userLogin.password : ""}
                onChange={handleChangeHandler}
              />
            </div>
            <NavLink className="navbarLink" to="/register">
              Register here
            </NavLink>
            <button onClick={login}>Login</button>
          </div>
        ) : (
          <div>
            <button type="" onClick={logout}>
              logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
