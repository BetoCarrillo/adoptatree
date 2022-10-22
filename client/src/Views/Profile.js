import React, { useContext, useState } from "react";
import UserInfo from "../Components/UserInfo";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import UsersProfileInfo from "../Components/UsersProfileInfo";
import UserTrees from "../Components/UserTrees";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <UserInfo />
      <UsersProfileInfo />
      <UserTrees />
      <NavLink to="/adopt">Adopt a new Tree here</NavLink>
    </div>
  );
}

export default Profile;
