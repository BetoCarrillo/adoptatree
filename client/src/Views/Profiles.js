import React from "react";
import { useLocation } from "react-router-dom";

function Profiles() {
  const location = useLocation();
  const user = location.state;
  console.log("first", user);
  return (
    <div>
      {user.userName}
      <br></br>
      {user.email} <br></br>
      <img src={user.avatarPicture} alt=""></img>
      <br></br>
      {user.tree}
    </div>
  );
}

export default Profiles;
