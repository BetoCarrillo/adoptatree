import React, { useContext, useState } from "react";
import UserInfo from "../Components/UserInfo";

import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import UsersProfileInfo from "../Components/UsersProfileInfo";
import UserTrees from "../Components/UserTrees";
import { Button } from "@mui/material";

function Profile() {
  const { user } = useContext(AuthContext);
  const redirectAdopt = useNavigate();

  const handleRedirect = () => {
    redirectAdopt("/adopt");
  };

  return (
    <div>
      <UserInfo />
      <UsersProfileInfo />
      <UserTrees />

      <div className="adoptButtonDiv">
        <Button
          className="adoptButton"
          color="success"
          type=""
          onClick={handleRedirect}
        >
          &nbsp; <span class="material-symbols-outlined aProfile">park</span>
          dopt &nbsp;
        </Button>
      </div>
    </div>
  );
}

export default Profile;
