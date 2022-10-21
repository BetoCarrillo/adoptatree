import React, { useContext, useState } from "react";
import UserInfo from "../Components/UserInfo";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import UsersProfileInfo from "../Components/UsersProfileInfo";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <UserInfo />
      <UsersProfileInfo />

      <p>Your Trees</p>
      <NavLink to="/adopt">Adopt a Tree</NavLink>
    </div>
  );
}

export default Profile;
