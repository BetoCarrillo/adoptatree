import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "../styles/login.css";

function Login() {
  console.log("first");
  const [userLogin, setuserLogin] = useState({});
  const { user, setUser, logged, setLogged, checkUserStatus } =
    useContext(AuthContext);
  const redirectLogin = useNavigate();
  const [passwordChange, setPasswordChange] = useState("password");

  const handleChangeHandler = (e) => {
    setuserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    if (passwordChange === "password") {
      setPasswordChange("text");
      return;
    }
    setPasswordChange("password");
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
    if (window.confirm("Ready to logout?") === true) {
      localStorage.removeItem("token");
      setLogged(null);
    }
  };

  useEffect(() => {}, [logged]);

  return (
    <div>
      <div className="login">
        {!logged ? (
          <div className="loginDiv">
            {" "}
            <div className="loginFormDiv">
              <div>
                <label htmlFor="email" className="loginText">
                  Email
                </label>{" "}
              </div>{" "}
              <div>
                <input
                  className="loginInput"
                  type="text"
                  name="email"
                  id="email"
                  value={userLogin.email ? userLogin.email : ""}
                  onChange={handleChangeHandler}
                />
              </div>
              <br />
              <div>
                <label htmlFor="password" className="loginText">
                  Password
                </label>{" "}
              </div>
              <div>
                <input
                  className="loginInput"
                  type={passwordChange}
                  name="password"
                  id="password"
                  value={userLogin.password ? userLogin.password : ""}
                  onChange={handleChangeHandler}
                />
                <span className="showpasswordtext" onClick={togglePassword}>
                  {passwordChange === "password" ? (
                    <span className="material-symbols-outlined visibility ">
                      visibility
                    </span>
                  ) : (
                    <span class="material-symbols-outlined">
                      visibility_off
                    </span>
                  )}
                </span>
              </div>
            </div>
            <Button
              className="loginButton"
              color="success"
              type=""
              onClick={login}
            >
              Login
            </Button>
            <NavLink className="registerLink" to="/register">
              or register here
            </NavLink>
          </div>
        ) : (
          <div className="logoutButton">
            <Button
              className="logoutButtonMUI"
              color="success"
              type=""
              onClick={logout}
            >
              logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
