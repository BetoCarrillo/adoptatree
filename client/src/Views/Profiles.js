import React from "react";
import { useLocation } from "react-router-dom";

function Profiles() {
  const location = useLocation();
  const user = location.state;
  console.log("first", user);
  return (
    <div className="profilesDiv">
      <img
        src={user.avatarPicture}
        alt={user.userName}
        className="profilePic"
      />
      <br /> <br />
      {user.userName !== undefined ? (
        <h2 className="profileNameTitle">{user.email}</h2>
      ) : (
        <h2 className="profileNameTitle">{user.userName}</h2>
      )}
      <div>
        {" "}
        <a className="usersEmailLink" href={`mailto:${user.email}`}>
          {" "}
          <span class="material-symbols-outlined">mail</span>
        </a>
        <br /> <br />
      </div>
      <br /> <br /> <br /> <br />
      <span class="material-symbols-outlined">park</span>
      <span className="material-symbols-outlined usersTreesTitle">
        {" "}
        {user.userName !== undefined ? (
          <span>{user.email}</span>
        ) : (
          <span>{user.userName}</span>
        )}{" "}
        trees:
      </span>
      {user.tree}
    </div>
  );
}

export default Profiles;
