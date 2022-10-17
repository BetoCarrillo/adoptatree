import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Register() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});
  const [error, setError] = useState(null);
  const [passError, setPassError] = useState(null);
  const redirectLogin = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPass(password) {
    return /^[A-Za-z0-9]\w{2,}$/.test(password);
  }

  const handleChangeHandler = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });

    /*     if (!isValidEmail(newUser.email)) {
      setError("invalid");
    } else {
      setError(null);
    } */

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
      method: "Post",
      body: formData,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/users/imageUpload",
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

    if (error === null && passError === null) {
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
        method: "Post",
        headers: myHeaders,
        body: urlencoded,
      };

      try {
        const response = await fetch(
          "http://localhost:5005/api/users/signup",
          requestOptions
        );
        const results = await response.json();
        console.log("results", results);

        if (results.msg === "user already exists") {
          alert("email already exists");
          e.preventDefault();
        }
        if (results.msg === "User Registered successfully") {
          alert("User registered");
        }
      } catch (error) {
        console.log("error fetching", error);
      }
    }
    if (error === null && passError !== null) {
      alert("please a choose 4 digit password");
    }
    if (error !== null && passError === null) {
      alert("please a use valid email");
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="username">Username (optional)</label>
        <input
          id="username"
          type="text"
          value={newUser.userName ? newUser.userName : ""}
          name="userName"
          onChange={handleChangeHandler}
        />
      </div>
      <div>
        <label htmlFor="email">Email*</label>
        <input
          type="text"
          name="email"
          id="email"
          value={newUser.email ? newUser.email : ""}
          onChange={handleChangeHandler}
        />
      </div>
      <div>
        <label htmlFor="password">Password*</label>
        <input
          type="text"
          name="password"
          id="password"
          value={newUser.password ? newUser.password : ""}
          onChange={handleChangeHandler}
        />
      </div>
      <form>
        <input type="file" onChange={attachFileHandler} />
        <button onClick={submitForm}>Upload</button>
      </form>
      {newUser.avatarPicture && (
        <img src={newUser.avatarPicture} alt="userPic" />
      )}
      <button onClick={signUp}>Signup</button>
    </div>
  );
}

export default Register;
