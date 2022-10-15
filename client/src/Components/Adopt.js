import React, { useContext, useEffect, useState } from "react";
import tree from "../styles/images/tree.png";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Profile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newTree, setNewTree] = useState({});
  const [Id, setId] = useState({});
  const [error, setError] = useState(null);
  const redirectProfile = useNavigate();
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
    formData.append("image", selectedFile);
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
    let urlencoded = new URLSearchParams();
    urlencoded.append("name", newTree.name);
    urlencoded.append("type", newTree.type);
    urlencoded.append("location", newTree.location);
    urlencoded.append("date", newTree.date);
    urlencoded.append("img", newTree.img ? newTree.img : { tree });
    urlencoded.append("likes", 0);
    urlencoded.append("user", Id);

    var requestOptions = {
      method: "POST",
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
      console.log("results", results);
    } catch (error) {
      console.log("error fetching", error);
    }
  };

  const handleClose = () => {
    redirectProfile(-1);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <button type="" onClick={handleClose}>
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <button onClick={adopt}>Adopt</button>
          <div>
            <div>
              <label htmlFor="name">Tree name</label>
              <input
                id="name"
                type="text"
                value={newTree.name ? newTree.name : ""}
                name="name"
                onChange={handleChangeHandler}
              />
            </div>
            <div>
              <label htmlFor="type">Tree type</label>
              <input
                id="type"
                type="text"
                value={newTree.type ? newTree.type : ""}
                name="type"
                onChange={handleChangeHandler}
              />
            </div>
            <div>
              <label htmlFor="location">Tree location</label>
              <input
                id="location"
                type="text"
                value={newTree.location ? newTree.location : ""}
                name="location"
                onChange={handleChangeHandler}
              />
            </div>
            <div>
              <label htmlFor="date">adoption date</label>
              <input
                id="date"
                type="date"
                value={newTree.date ? newTree.date : ""}
                name="date"
                onChange={handleChangeHandler}
              />
            </div>
            <form>
              <input type="file" onChange={attachFileHandler} />
              <button onClick={submitForm}>Upload Pictures</button>
            </form>
            {newTree.img && <img src={newTree.img} alt="userTreePic" />}
          </div>
        </div>
      ) : (
        <NavLink to="/login">Please login first</NavLink>
      )}
    </div>
  );
}

export default Profile;
