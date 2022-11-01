import React from "react";
import UserInfo from "../Components/UserInfo";

import { useNavigate } from "react-router-dom";

import UsersProfileInfo from "../Components/UsersProfileInfo";

import { Button } from "@mui/material";

function Profile() {
  const redirectAdopt = useNavigate();

  const handleRedirect = () => {
    redirectAdopt("/adopt");
  };

  return (
    <div>
      <UserInfo />
      <UsersProfileInfo />

      <div className="adoptButtonDiv">
        <Button
          className="adoptButton"
          color="success"
          type=""
          onClick={handleRedirect}
        >
          &nbsp;{" "}
          <span className="material-symbols-outlined aProfile">park</span>
          dopt &nbsp;
        </Button>
      </div>
    </div>
  );
}

export default Profile;
