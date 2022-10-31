import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import "../styles/mytrees.css";

import { AuthContext } from "../Context/AuthContext";
import { Button } from "@mui/material";
import { baseURL } from "../utils/getServerUrl";

function MyTrees() {
  const { user } = useContext(AuthContext);
  const [myTrees, setMyTrees] = useState({});
  const [modifyPictureShown, setModifyPictureShown] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleModifyPicture = (e) => {
    setModifyPictureShown((current) => !current);
  };

  const attachFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // console.log("user", user._id);

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptionsOne = {
        headers: myHeaders,
      };
      try {
        const response = await fetch(
          baseURL + "/api/users/profile",
          requestOptionsOne
        );
        const result = await response.json();
        // console.log("result", result);
        setMyTrees(result);
      } catch (error) {
        console.log("error getting user's profile", error);
      }
    } else {
      // console.log("no token for this user");
    }
  };

  const removeTree = async (e, tree) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("_id", tree._id);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
    };

    if (
      window.confirm("Are you sure you want to delete the adopted tree?") ===
      true
    ) {
      try {
        const response = await fetch(
          baseURL + "/api/trees/delete",
          requestOptions
        );
        const results = await response.json();

        if (results.msg === "Tree deleted successfully") {
          alert("Tree given for adoption");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const updatePicture = async (e, tree) => {
    e.preventDefault();
    console.log("selectedfile", selectedFile);
    console.log("user", user);
    let formdata = new FormData();
    formdata.append("images", selectedFile);
    formdata.append("_id", tree._id);

    var requestOptions = {
      method: "PUT",
      body: formdata,
    };

    try {
      const response = await fetch(
        baseURL + "/api/trees/moreImageUpload",
        requestOptions
      );
      const results = await response.json();
      console.log("results", results);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="myTreesDiv">
      {myTrees &&
        myTrees.createdTrees?.map((tree, i) => (
          <Card className="myTreesCard" key={i}>
            <Carousel variant="dark" interval={null}>
              {tree &&
                tree.img.map((image, i) => (
                  <Carousel.Item>
                    <img
                      className="d-block w-100 myTreescardImg"
                      src={tree.img[i]}
                      alt="First slide"
                    />
                  </Carousel.Item>
                ))}{" "}
            </Carousel>
            <Card.Body>
              <Card.Text className="myTreesCardTextDiv">
                <div className="myTreesCardText">
                  <div className="myTreesCardName">{tree.name}</div>

                  <div className="myTreesdeleteTreeButtonDiv">
                    <Button
                      className="myTreesdeleteTreeButton"
                      color="success"
                      type=""
                      onClick={handleModifyPicture}
                    >
                      <span class="material-symbols-outlined">
                        photo_camera
                      </span>
                    </Button>
                  </div>
                  <div>
                    <Button
                      className="myTreesdeleteTreeButton"
                      color="success"
                      type=""
                      onClick={(e) => removeTree(e, tree)}
                    >
                      <span class="material-symbols-outlined myTreesdeleteTreeButton">
                        delete
                      </span>
                    </Button>
                  </div>
                </div>
                {modifyPictureShown ? (
                  <div className="myTreesCardText">
                    <form>
                      <input
                        className="myTreesdeleteTreeButton"
                        type="file"
                        onChange={attachFileHandler}
                      />
                      <Button
                        className="myTreesdeleteTreeButton"
                        color="success"
                        type=""
                        onClick={(e) => {
                          updatePicture(e, tree);
                        }}
                      >
                        <span class="material-symbols-outlined myTreesdeleteTreeButton">
                          upload
                        </span>
                      </Button>
                    </form>
                  </div>
                ) : (
                  <div></div>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}

      {/* <div>{myTrees && myTrees.map((tree, i) => <div></div>)}</div> */}
    </div>
  );
}

export default MyTrees;
