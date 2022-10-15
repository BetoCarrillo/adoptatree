import React, { useState } from "react";

function UserInfo() {
  const [userProfile, setUserProfile] = useState({});
  const [error, setError] = useState(null);
  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    // 👇️ toggle shown state

    setIsShown((current) => !current);
    getProfile();
    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    console.log("token", token);

    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      try {
        const response = await fetch(
          "http://localhost:5005/api/users/profile",
          requestOptions
        );
        const result = await response.json();
        setUserProfile({
          email: result.email,
          userName: result.userName,
          avatarPicture: result.avatarPicture,
        });
      } catch (error) {
        console.log("error getting user's profile", error);
      }
    } else {
      setError(true);
      console.log("no token for this user");
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <img src={userProfile.avatarPicture} alt={userProfile.userName} />
      {!isShown ? (
        <button onClick={handleClick}>+</button>
      ) : (
        <button onClick={handleClick}>-</button>
      )}

      {isShown && (
        <div>
          {userProfile && (
            <div>
              <p>{userProfile.userName}</p>
              <p>{userProfile.email}</p>
            </div>
          )}
          {error && <p>you have to login first</p>}
        </div>
      )}
    </div>
  );
}

export default UserInfo;
