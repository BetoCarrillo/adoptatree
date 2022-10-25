import React, { useContext, useEffect, useState } from "react";
import tree from "../styles/images/tree.png";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import "../styles/adopt.css";
import { Button } from "@mui/material";

function Profile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newTree, setNewTree] = useState({});
  const [Id, setId] = useState({});
  const [error, setError] = useState(null);
  const redirectProfile = useNavigate();
  const redirectTrees = useNavigate();
  const { user } = useContext(AuthContext);

  const handleChangeHandler = (e) => {
    setNewTree({ ...newTree, [e.target.name]: e.target.value });
  };

  const attachFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log("selectedFile", selectedFile);
    formData.append("images", selectedFile);
    console.log("formData :>> ", formData);

    const requestOptions = {
      method: "Post",
      body: formData,
      enctype: "multipart/form-data",
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/trees/imgUpload",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      setNewTree({ ...newTree, img: result.imageUrl });
    } catch (error) {}
  };

  const getToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptionsOne = {
        method: "GET",
        headers: myHeaders,
      };
      try {
        const response = await fetch(
          "http://localhost:5005/api/users/profile",
          requestOptionsOne
        );
        const result = await response.json();
        console.log("result", result.id);
        setId(result.id);
        return Id;
      } catch (error) {
        console.log("error getting user's profile", error);
      }
    } else {
      setError(true);
      console.log("no token for this user");
    }
  };

  const adopt = async () => {
    console.log("userID", user._id);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("name", newTree.name);
    urlencoded.append("type", newTree.type);
    urlencoded.append("location", newTree.location);
    urlencoded.append("comment", newTree.comment);
    urlencoded.append("date", newTree.date);
    urlencoded.append("_id", user._id);
    urlencoded.append(
      "img",
      newTree.img
        ? newTree.img
        : "http://res.cloudinary.com/dc9ff1idq/image/upload/v1666012775/adoptedtrees/mm8midda6ld9ppn1pheo.png"
    );
    urlencoded.append("likes", 0);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };
    try {
      const response = await fetch(
        "http://localhost:5005/api/trees/adopt",
        requestOptions
      );
      const results = await response.json();
      if (results.msg === "name already exists") {
        alert("Name already in use");
      }
      if (results.msg === "Tree adopted successfully") {
        redirectTrees("/trees");
      }
      console.log("results", results);
    } catch (error) {
      console.log("error fetching", error);
    }
  };

  const handleClose = () => {
    redirectProfile("/home");
  };

  useEffect(() => {
    // getToken();
  }, []);

  return (
    <div>
      <div className="adopt">
        {user ? (
          <div className="adoptDiv">
            <div className="backButton">
              <span
                className="material-symbols-outlined backButton"
                onClick={handleClose}
              >
                arrow_back
              </span>
            </div>
            <div>
              <label htmlFor="name" className="adoptText">
                Tree name
              </label>
            </div>
            <div>
              <input
                className="adoptInput"
                id="name"
                type="text"
                value={newTree.name ? newTree.name : ""}
                name="name"
                onChange={handleChangeHandler}
              />
            </div>
            <br />
            <div>
              <label htmlFor="type" className="adoptText">
                Tree type
              </label>
            </div>
            <div>
              <input
                className="adoptInput"
                id="type"
                type="text"
                value={newTree.type ? newTree.type : ""}
                name="type"
                onChange={handleChangeHandler}
              />
            </div>
            <br />
            <div>
              {" "}
              <label htmlFor="location" className="adoptText">
                Tree location
              </label>
            </div>
            <div>
              <input
                className="adoptInput"
                id="location"
                type="text"
                value={newTree.location ? newTree.location : ""}
                name="location"
                onChange={handleChangeHandler}
              />
            </div>{" "}
            <br />
            <div>
              {" "}
              <label htmlFor="comment" className="adoptText">
                Comment
              </label>
            </div>
            <div>
              <input
                className="adoptInput"
                id="comment"
                type="text"
                value={newTree.comment ? newTree.comment : ""}
                name="comment"
                onChange={handleChangeHandler}
              />
            </div>{" "}
            <br />
            <div>
              <label htmlFor="date" className="adoptText">
                Date
              </label>
            </div>
            <div>
              <input
                className="adoptInput"
                id="date"
                type="date"
                value={newTree.date ? newTree.date : ""}
                name="date"
                onChange={handleChangeHandler}
              />
            </div>
            <br />
            <div className="adoptPhotoFormDiv">
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
                  <span class="material-symbols-outlined">upload</span>
                </Button>
              </form>
            </div>
            <br />
            <div className="userPictureDiv">
              {newTree.img && <img src={newTree.img} alt="userTreePic" />}
            </div>
            <div>
              <Button
                className="adoptButton"
                color="success"
                type=""
                onClick={adopt}
              >
                Adopt
              </Button>
            </div>
          </div>
        ) : (
          <NavLink to="/login">Please login first</NavLink>
        )}
      </div>
    </div>
  );
}

export default Profile;
