import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import "../styles/profile.css";

function UserInfo() {
  console.log("first");
  const [error, setError] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [modifyNameShown, setModifyNameShown] = useState(false);
  const [modifyEmailShown, setModifyEmailShown] = useState(false);
  const { user, setUser, logged, setLogged, userProfile } =
    useContext(AuthContext);
  const redirectLogin = useNavigate();
  const [newInfo, setNewInfo] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChangeHandler = (e) => {
    setNewInfo(e.target.value);
  };

  const handleClick = (e) => {
    // 👇️ toggle shown state

    setIsShown((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const handleModifyName = (e) => {
    setModifyNameShown((current) => !current);
  };

  const handleModifyEmail = (e) => {
    setModifyEmailShown((current) => !current);
  };

  const changeEmail = async (e, userProfile, req, res) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("_id", userProfile._id);
    urlencoded.append("email", newInfo);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
    };

    if (
      window.confirm("Are you sure you want to modify your email?") === true
    ) {
      try {
        const response = await fetch(
          "http://localhost:5005/api/users/email",
          requestOptions
        );
        const results = await response.json();
        console.log("results", results);
        if (results.msg === "email changed") {
          alert("email changed satisfactory");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  const changeUserName = async (e, userProfile, req, res) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("_id", userProfile._id);
    urlencoded.append("userName", newInfo);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
    };

    if (window.confirm("Are you sure you want to modify your name?") === true) {
      try {
        const response = await fetch(
          "http://localhost:5005/api/users/userName",
          requestOptions
        );
        const results = await response.json();
        console.log("results", results);
        if (results.msg === "name changed") {
          alert("name changed satisfactory");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const removeProfile = async (e, req, res) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("_id", userProfile.id);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
    };

    if (
      window.confirm("Are you sure you want to delete the your profile?") ===
      true
    ) {
      try {
        const response = await fetch(
          "http://localhost:5005/api/users/delete",
          requestOptions
        );
        const results = await response.json();
        console.log("results", results);
        if (results.msg === "User deleted successfully") {
          alert("Sad to see you go!");
          localStorage.removeItem("token");
          redirectLogin("/");
          setLogged(false);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const attachFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const updatePicture = async (e, req, res) => {
    e.preventDefault();
    console.log("selectedfile", selectedFile);
    console.log("userProfile", userProfile);
    let formdata = new FormData();
    formdata.append("_id", userProfile._id);
    formdata.append("image", selectedFile);

    var requestOptions = {
      method: "PUT",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/users/moreImageUpload",
        requestOptions
      );
      const results = await response.json();
      console.log("results", results);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <img
        src={userProfile.avatarPicture}
        alt={userProfile.userName}
        className="profilePic"
      />
      {!isShown ? (
        <button onClick={handleClick}>+</button>
      ) : (
        <button onClick={handleClick}>-</button>
      )}

      {isShown && (
        <div>
          {userProfile && (
            <div>
              <p>{userProfile.userName}</p>{" "}
              <span
                class="material-symbols-outlined"
                onClick={handleModifyName}
              >
                edit
              </span>
              <p>{userProfile.email}</p>{" "}
              <span
                class="material-symbols-outlined"
                onClick={handleModifyEmail}
              >
                edit
              </span>
              {modifyNameShown ? (
                <div>
                  <input
                    id="newInfo"
                    type="text"
                    value={newInfo}
                    name="newInfo"
                    onChange={handleChangeHandler}
                  />
                  <button onClick={(e) => changeUserName(e, userProfile)}>
                    modify name
                  </button>
                </div>
              ) : (
                <div></div>
              )}
              {modifyEmailShown ? (
                <div>
                  {" "}
                  <input
                    id="newInfo"
                    type="text"
                    value={newInfo}
                    name="newInfo"
                    onChange={handleChangeHandler}
                  />
                  <button onClick={(e) => changeEmail(e, userProfile)}>
                    modify email
                  </button>
                </div>
              ) : (
                <div></div>
              )}
              <form>
                <input type="file" onChange={attachFileHandler} />
                <button onClick={updatePicture}>Update Profile Picture</button>
              </form>
              <button onClick={(e) => removeProfile(e, userProfile)}>
                delete
              </button>
            </div>
          )}
          {error && <p>you have to login first</p>}
        </div>
      )}
    </div>
  );
}

export default UserInfo;
