import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { TreeContext } from "../Context/TreeContext";
import { baseURL } from "../utils/getServerUrl";

function UserTrees() {
  const { user } = useContext(AuthContext);

  const [myTrees, setMyTrees] = useState();

  const fetchUserTrees = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("email", user.email);

    var urlencoded = new URLSearchParams();

    var requestOptions = {
      headers: myHeaders,
    };
    try {
      const response = await fetch(
        baseURL + "/api/users/mytrees",
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

  // console.log("trees", myTrees);
  // fetchUserTrees();
  useEffect(() => {
    // fetchUserTrees();
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
