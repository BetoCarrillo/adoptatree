import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import "../styles/profile.css";

function UserInfo() {
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
    setIsShown((current) => !current);
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

  const updatePicture = async (e) => {
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
      <div className="profileInfoDiv">
        <img
          src={userProfile.avatarPicture}
          alt={userProfile.userName}
          className="profilePic"
        />
        <br /> <br />
        {userProfile.userName !== undefined ? (
          <h2 className="profileNameTitle">{userProfile.email}</h2>
        ) : (
          <h2 className="profileNameTitle">{userProfile.userName}</h2>
        )}
        {!isShown ? (
          <Button
            className="editProfileButton"
            color="success"
            type=""
            onClick={handleClick}
          >
            Edit profile
          </Button>
        ) : (
          <Button
            className="editProfileButton"
            color="success"
            type=""
            onClick={handleClick}
          >
            Cancel
          </Button>
        )}
        {isShown && (
          <div>
            {userProfile && (
              <div>
                <div>
                  {" "}
                  <span className="boldText underlinedText">
                    Username:
                  </span>{" "}
                  {userProfile.userName}{" "}
                  <span
                    class="material-symbols-outlined editProfileLogo"
                    onClick={handleModifyName}
                  >
                    edit
                  </span>{" "}
                  {modifyNameShown ? (
                    <div>
                      <input
                        id="newInfo"
                        type="text"
                        value={newInfo}
                        name="newInfo"
                        onChange={handleChangeHandler}
                      />
                      <Button
                        className="editProfileButton"
                        color="success"
                        type=""
                        onClick={(e) => changeUserName(e, userProfile)}
                      >
                        done
                      </Button>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <br />
                </div>
                <span className="boldText underlinedText">Email:</span>{" "}
                {userProfile.email}{" "}
                <span
                  class="material-symbols-outlined editProfileLogo"
                  onClick={handleModifyEmail}
                >
                  edit
                </span>
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
                    <Button
                      className="editProfileButton"
                      color="success"
                      type=""
                      onClick={(e) => changeEmail(e, userProfile)}
                    >
                      done
                    </Button>
                  </div>
                ) : (
                  <div></div>
                )}{" "}
                <br />
                <form>
                  <input
                    className="uploadUsePic"
                    type="file"
                    onChange={attachFileHandler}
                  />
                  <Button
                    className="editProfileButton"
                    color="success"
                    type=""
                    onClick={updatePicture}
                  >
                    <span class="material-symbols-outlined">upload</span>
                  </Button>
                </form>
                <Button
                  className="deleteProfileButton"
                  color="success"
                  type=""
                  onClick={(e) => removeProfile(e, userProfile)}
                >
                  <span class="material-symbols-outlined deleteProfileButton">
                    delete
                  </span>
                </Button>
              </div>
            )}
            {error && <p>you have to login first</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
