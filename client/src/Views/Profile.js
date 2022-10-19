import React, { useContext, useEffect, useState } from "react";
import UserInfo from "../Components/UserInfo";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Profile() {
  const { user, checkUserStatus } = useContext(AuthContext);

  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <div>
      <UserInfo />
      <p>My Trees</p>
      <NavLink to="/adopt">Adopt a Tree</NavLink>
    </div>
  );
}

export default Profile;
