import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function UserInfo() {
  const [userProfile, setUserProfile] = useState({});
  const [error, setError] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [modifyNameShown, setModifyNameShown] = useState(false);
  const [modifyEmailShown, setModifyEmailShown] = useState(false);
  const { user, setUser, logged, setLogged } = useContext(AuthContext);
  const redirectLogin = useNavigate();
  const [newInfo, setNewInfo] = useState("");

  const handleChangeHandler = (e) => {
    setNewInfo(e.target.value);
  };

  const handleClick = (e) => {
    // 👇️ toggle shown state

    setIsShown((current) => !current);
    getProfile();
    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const handleModifyName = (e) => {
    setModifyNameShown((current) => !current);
  };

  const handleModifyEmail = (e) => {
    setModifyEmailShown((current) => !current);
  };

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    console.log("token", token);

    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      try {
        const response = await fetch(
          "http://localhost:5005/api/users/profile",
          requestOptions
        );
        const result = await response.json();
        setUserProfile({
          email: result.email,
          userName: result.userName,
          avatarPicture: result.avatarPicture,
        });
      } catch (error) {
        console.log("error getting user's profile", error);
      }
    } else {
      setError(true);
      console.log("no token for this user");
    }
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

  const removeProfile = async (e, userProfile, req, res) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("_id", userProfile._id);

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

  return (
    <div>
      <h2>Profile</h2>
      <img src={userProfile.avatarPicture} alt={userProfile.userName} />
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
