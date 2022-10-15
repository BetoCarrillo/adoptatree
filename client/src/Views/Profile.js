import React, { useState } from "react";
import UserInfo from "../Components/UserInfo";

import { NavLink } from "react-router-dom";

function Profile() {
  return (
    <div>
      <UserInfo />
      <p>My Trees</p>
      <NavLink to="/adopt">Adopt a Tree</NavLink>
    </div>
  );
}

export default Profile;
