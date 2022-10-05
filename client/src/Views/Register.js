import React, { useState } from "react";

function Register() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});

  const handleChangeHandler = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
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

  const signUp = async () => {
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
      body: urlencoded,
    };
    try {
      const response = await fetch(
        "http://localhost:5005/api/users/signup",
        requestOptions
      );
      const results = await response.json();
      console.log("results", results);
    } catch (error) {
      console.log("error fetching", error);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={newUser.userName ? newUser.userName : ""}
          name="userName"
          onChange={handleChangeHandler}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={newUser.email ? newUser.email : ""}
          onChange={handleChangeHandler}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
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
        <button onClick={submitForm}>Upload Picture</button>
      </form>
      {newUser.avatarPicture && (
        <img src={newUser.avatarPicture} alt="userPic" />
      )}
      <button onClick={signUp}>Signup</button>
    </div>
  );
}

export default Register;
