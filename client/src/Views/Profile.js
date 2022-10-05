import React, { useState } from "react";
import tree from "../styles/images/tree.png";

function Profile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newTree, setNewTree] = useState({});

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

  const adopt = async () => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("name", newTree.name);
    urlencoded.append("type", newTree.type);
    urlencoded.append("location", newTree.location);
    urlencoded.append("date", newTree.date);
    urlencoded.append("img", newTree.img ? newTree.img : { tree });

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
      console.log("results", results);
    } catch (error) {
      console.log("error fetching", error);
    }
  };

  return (
    <div>
      Profile
      <button onClick={adopt}>adopt</button>
      <div>
        adopt a tree form
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
  );
}

export default Profile;
