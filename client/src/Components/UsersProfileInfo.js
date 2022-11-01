import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/profile.css";
import { baseURL } from "../utils/getServerUrl";

function UsersProfileInfo() {
  const [usersInfo, setUsersInfo] = useState(null);

  const fetchDataUserSearch = async (e) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("$text", e.target.value);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        baseURL + "/api/users/search",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      setUsersInfo(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSearch = (e) => {
    console.log(e.target.value);
    fetchDataUserSearch(e);
  };

  return (
    <div>
      <div className="communityDiv">
        <div className="communityText">Grow your community</div> &nbsp;&nbsp;
        &nbsp;&nbsp;
        <div>
          <div className="userSearchInputDiv">
            <input
              className="userSearchInput"
              // ref={inputRef}
              placeholder="search for users"
              type="text"
              name=""
              onChange={(e) => handleSearch(e)}
            ></input>
          </div>

          {usersInfo &&
            usersInfo.allUsers.map((user, i) => (
              <div key={i}>
                <div>
                  <Link state={user} to="/profiles">
                    {" "}
                    {user.userName} {user.email}
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default UsersProfileInfo;
