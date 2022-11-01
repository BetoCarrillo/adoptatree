import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import "../styles/register.css";
import { baseURL } from "../utils/getServerUrl";

function Register() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});
  const [emailError, setEmailError] = useState(null);
  const redirectProfile = useNavigate();

  const [passError, setPassError] = useState(null);

  const { checkUserStatus } = useContext(AuthContext);
  const [passwordChange, setPasswordChange] = useState("password");

  const handleClose = () => {
    redirectProfile(-1);
  };
  const togglePassword = () => {
    if (passwordChange === "password") {
      setPasswordChange("text");
      return;
    }
    setPasswordChange("password");
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPass(password) {
    return /^[A-Za-z0-9]\w{2,}$/.test(password);
  }

  const handleChangeHandler = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });

    if (!isValidEmail(newUser.email)) {
      setEmailError("invalid");
    } else {
      setEmailError(null);
    }

    if (!isValidPass(newUser.password)) {
      setPassError("invalid password");
    } else {
      setPassError(null);
    }
  };

  const attachFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log("selectedFile", selectedFile);
    formData.append("image", selectedFile);
    console.log("formData :>> ", formData);
    var requestOptions = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(
        baseURL + "/api/users/imageUpload",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      setNewUser({ ...newUser, avatarPicture: result.imageUrl });
    } catch (error) {}
  };

  const signUp = async (e) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    if (emailError === null && passError === null) {
      let urlencoded = new URLSearchParams();
      urlencoded.append("userName", newUser.userName);
      urlencoded.append("email", newUser.email);
      urlencoded.append("password", newUser.password);
      urlencoded.append(
        "avatarPicture",
        newUser.avatarPicture
          ? newUser.avatarPicture
          : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
      );
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
      };

      try {
        const response = await fetch(
          baseURL + "/api/users/signup",
          requestOptions
        );
        const results = await response.json();
        console.log("results", results);
        const token = results.token;

        if (token) {
          localStorage.setItem("token", token);
          checkUserStatus();
        }

        if (results.msg === "user already exists") {
          alert("email already exists");
          e.preventDefault();
        }
        if (results.msg === "User Registered successfully") {
          alert("User registered");
        }
        redirectProfile("/home");
      } catch (error) {
        console.log("error fetching", error);
      }
    }
    if (emailError === null && passError !== null) {
      alert("please a choose 4 digit password");
    }
    if (emailError !== null && passError === null) {
      alert("please a use valid email");
    }
  };

  return (
    <div>
      <div className="register">
        <div className="registerDiv">
          <span
            className="material-symbols-outlined backButton "
            onClick={handleClose}
          >
            arrow_back
          </span>

          <div className="registerFormDiv">
            <div>
              <label htmlFor="username" className="registerText">
                Username
              </label>
            </div>
            <div>
              <input
                className="registerInput"
                id="username"
                type="text"
                value={newUser.userName ? newUser.userName : ""}
                name="userName"
                onChange={handleChangeHandler}
              />
            </div>
            <br />
            <div>
              {" "}
              <label htmlFor="email" className="registerText">
                Email*
              </label>
            </div>
            <div>
              <input
                className="registerInput"
                type="text"
                name="email"
                id="email"
                value={newUser.email ? newUser.email : ""}
                onChange={handleChangeHandler}
              />
            </div>
            <br />
            <div>
              {" "}
              <label htmlFor="password" className="registerText">
                Password*
              </label>
            </div>
            <div>
              <input
                className="registerInputPassword"
                type={passwordChange}
                name="password"
                id="password"
                value={newUser.password ? newUser.password : ""}
                onChange={handleChangeHandler}
              />
              <span className="showpasswordtext" onClick={togglePassword}>
                {passwordChange === "password" ? (
                  <span className="material-symbols-outlined visibility ">
                    visibility
                  </span>
                ) : (
                  <span className="material-symbols-outlined">
                    visibility_off
                  </span>
                )}
              </span>
            </div>
            <br />
            <div className="photoFormDiv">
              <form>
                <input
                  color="success"
                  className="fileButton"
                  type="file"
                  onChange={attachFileHandler}
                />
                <Button
                  className="registerPhotoButton"
                  color="success"
                  type=""
                  onClick={submitForm}
                >
                  <span className="material-symbols-outlined">upload</span>
                </Button>
              </form>
            </div>
          </div>
          <div className="userPictureDiv">
            {newUser.avatarPicture && (
              <img
                className="userPicture"
                src={newUser.avatarPicture}
                alt="userPic"
              />
            )}
          </div>
          <div>
            <Button
              className="registerButton"
              color="success"
              type=""
              onClick={signUp}
            >
              Signup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
