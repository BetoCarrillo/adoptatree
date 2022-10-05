import React, { useState } from "react";

function Login() {
  const [userLogin, setuserLogin] = useState({});
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
      }
      console.log("result:", result);
    } catch (error) {
      console.log("login error", error);
    }
  };

  return (
    <div>
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
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
