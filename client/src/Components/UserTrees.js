import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { TreeContext } from "../Context/TreeContext";

function UserTrees() {
  const { user } = useContext(AuthContext);
  // const {
  //   photo,
  //   trees,
  //   setTrees,
  //   loading,
  //   setLoading,
  //   error,
  //   setError,
  //   comments,
  //   newComment,
  //   decrementPhoto,
  //   incrementPhoto,
  //   likes,
  //   unlikes,
  //   removeTree,
  //   handleChangeHandler,
  // } = useContext(TreeContext);
  const [myTrees, setMyTrees] = useState();

  console.log("user", user);

  const fetchUserTrees = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("email", user.email);

    var urlencoded = new URLSearchParams();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    try {
      const response = await fetch(
        "http://localhost:5005/api/users/mytrees",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);

      //   setLoading(false);

      setMyTrees(result);
    } catch (error) {
      console.log("erorr", error);
      //   setLoading(false);
      //   setError(error);
    }
  };

  console.log("trees", myTrees);
  // fetchUserTrees();
  useEffect(() => {
    fetchUserTrees();
  }, []);

  return (
    <div>
      {/* <button type="" onClick={fetchUserTrees}></button>{" "} */}
      <div>
        {/* {trees &&
          trees.allTrees.map((tree, i) => {
            return (
              <div key={i}>
                <div className="cardsDiv"></div>
              </div>
            );
          })} */}
      </div>
    </div>
  );
}

export default UserTrees;