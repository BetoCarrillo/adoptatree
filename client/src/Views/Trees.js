import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "../styles/trees.css";
import Accordion from "react-bootstrap/Accordion";
import { AuthContext } from "../Context/AuthContext";
import { TreeContext } from "../Context/TreeContext";
import SearchBar from "../Components/SearchBar";
import Carousel from "react-bootstrap/Carousel";
import { Button } from "@mui/material";
import { baseURL } from "../utils/getServerUrl";

function Trees() {
  // console.log("%cComponent run", "color:red");
  const { user } = useContext(AuthContext);

  const { trees, setTrees, newComment, setNewComment } =
    useContext(TreeContext);
  const [commentDivShown, setCommentDivShown] = useState(false);
  const [commentInputShown, setCommentInputShown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [change, setChange] = useState(false);

  const fetchTrees = async () => {
    try {
      const response = await fetch(baseURL + `/api/trees/all/`, {});
      const result = await response.json();
      const mytrees = result.allTrees;
      setTrees(result.allTrees);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  const handleClick = (e) => {
    setCommentInputShown((current) => !current);
  };

  const handleCommentDiv = (e) => {
    setCommentDivShown((current) => !current);
  };

  const handleChangeHandler = (e) => {
    setNewComment(e.target.value);
  };

  const comments = async (e, tree) => {
    const token = localStorage.getItem("token");
    if (token) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("tree_id", tree._id);
      urlencoded.append("comment", newComment);
      urlencoded.append("user_id", user._id);

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
      };

      try {
        const response = await fetch(
          baseURL + "/api/trees/comments",
          requestOptions
        );
        const results = await response.json();

        fetchTrees();
        if (results) {
          setChange(!change);
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      alert("please login to comment");
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

    if (tree.user[0].email !== user.email) {
      alert("this is not your tree");
    } else if (
      window.confirm("Are you sure you want to delete the adopted tree?") ===
      true
    ) {
      try {
        const response = await fetch(
          baseURL + "/api/trees/delete",
          requestOptions
        );
        const results = await response.json();
        setChange(!change);
        if (results.msg === "Tree deleted successfully") {
          alert("Tree given for adoption");
          fetchTrees();
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const fetchDataSearch = async (e) => {
    e.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("$text", e.target.value);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    if (e.target.value === "") {
      try {
        const response = await fetch(baseURL + `/api/trees/all/`);
        const result = await response.json();
        setTrees(result.allTrees);
      } catch (error) {}
    } else {
      try {
        const response = await fetch(
          baseURL + "/api/trees/search",
          requestOptions
        );
        const results = await response.json();
        console.log("result", results);
        setTrees(results.allTrees);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const likes = async (e, tree) => {
    const token = localStorage.getItem("token");
    if (token) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("user_id", user._id);
      urlencoded.append("tree_id", tree._id);

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
      };
      try {
        const response = await fetch(
          baseURL + "/api/users/likes",
          requestOptions
        );
        const results = await response.json();
        console.log("results liked", results);
        fetchTrees();
        if (results) {
          setLiked(true);
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      alert("Please login to like");
    }
  };

  useEffect(() => {
    fetchTrees();
  }, [liked]);

  return (
    <div>
      <br />
      <SearchBar fetchDataSearch={fetchDataSearch} />
      <br />
      <br />
      <div className="treesDiv">
        {!loading ? (
          trees &&
          trees?.map((tree, i) => {
            return (
              <div key={i}>
                <div className="cardsDiv">
                  <Card className="cardDiv">
                    <Card.Body>
                      <Carousel variant="dark" interval={null}>
                        {tree &&
                          tree.img.map((image, i) => (
                            <Carousel.Item key={i}>
                              <img
                                className="d-block w-100 cardImg"
                                src={tree.img[i]}
                                alt="First slide"
                              />
                            </Carousel.Item>
                          ))}{" "}
                      </Carousel>
                      <div>
                        <div className="cardTitleText">
                          <div>
                            {" "}
                            <span className="material-symbols-outlined parentLogo">
                              local_florist
                            </span>
                            {tree.user[0].userName ? (
                              <>{tree.user[0].userName}</>
                            ) : (
                              tree.user[0].email
                            )}
                          </div>
                          <div className="likesDiv">
                            <span className="likesCount">
                              {" "}
                              {tree.likes.length !== 0 ? (
                                <>{tree.likes.length}</>
                              ) : (
                                ""
                              )}
                            </span>
                            {tree.likes.includes(user._id) ? (
                              <span
                                className="material-symbols-outlined liked"
                                onClick={(e) => {
                                  setLiked(!liked);
                                  likes(e, tree);
                                }}
                              >
                                park
                              </span>
                            ) : (
                              <span
                                className="material-symbols-outlined unliked"
                                onClick={(e) => {
                                  setLiked(!liked);
                                  likes(e, tree);
                                }}
                              >
                                park
                              </span>
                            )}{" "}
                            &nbsp;{" "}
                            <span
                              className="material-symbols-outlined commentAddLogo"
                              onClick={handleClick}
                            >
                              maps_ugc
                            </span>{" "}
                          </div>
                        </div>
                        <div>
                          {" "}
                          {commentInputShown ? (
                            <div className="commentDiv">
                              <label htmlFor="comment"></label>
                              <input
                                className="inputComment"
                                id="comment"
                                type="text"
                                name="comment"
                                onChange={handleChangeHandler}
                              />
                              <Button
                                className="editProfileButton"
                                color="success"
                                type=""
                                onClick={(e) => {
                                  setChange(!change);
                                  comments(e, tree);
                                }}
                              >
                                <span className="material-symbols-outlined">
                                  add
                                </span>
                              </Button>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <Accordion flush>
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>
                              {" "}
                              <span className="material-symbols-outlined">
                                park
                              </span>
                              &nbsp;{" "}
                              <span className="boldText cardsTreeName">
                                {tree.name}
                              </span>
                            </Accordion.Header>
                            <Accordion.Body>
                              <span className="boldText">Location:</span>{" "}
                              {tree.location}
                              <br /> <span className="boldText">
                                Type:
                              </span>{" "}
                              {tree.type} <br />{" "}
                              <span className="boldText">Date:</span>
                              {new Date(tree.date).toLocaleString("de-DE", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                              })}
                              <br />
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>{" "}
                        &nbsp; &nbsp;
                        <span className="description">
                          {" "}
                          {tree.comment[0]}
                        </span>{" "}
                        &nbsp; &nbsp;
                        {tree.comment.length >= 3 ? (
                          <Accordion flush>
                            {" "}
                            <Accordion.Item eventKey="0">
                              <Accordion.Header onClick={handleCommentDiv}>
                                <div>
                                  {!commentDivShown ? (
                                    <div className="firstComment">
                                      {" "}
                                      {tree.comment[1]
                                        ? tree.comment[1]
                                        : ""}{" "}
                                      <br />
                                      <span className="boldText">
                                        {tree.comment[2] ? tree.comment[2] : ""}
                                      </span>
                                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                      &nbsp; &nbsp; &nbsp;
                                      <span className="seeMoreComments">
                                        {tree.comment.length >= 2 ? (
                                          <>
                                            {" "}
                                            see all{" "}
                                            {tree.comment.length / 2 - 0.5}{" "}
                                            comments
                                          </>
                                        ) : (
                                          ""
                                        )}
                                      </span>{" "}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                {tree &&
                                  tree.comment.map((comment, i) => (
                                    <div className="individualComment" key={i}>
                                      <div>{comment}</div>
                                    </div>
                                  ))}
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        ) : (
                          ""
                        )}
                      </div>
                      {tree.user[0].email !== user.email ? (
                        ""
                      ) : (
                        <div className="deleteTreeButtonDiv">
                          <Button
                            className="deleteTreeButton"
                            color="success"
                            type=""
                            onClick={(e) => removeTree(e, tree)}
                          >
                            <span className="material-symbols-outlined deleteTreeButton">
                              delete
                            </span>
                          </Button>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              </div>
            );
          })
        ) : (
          <div className="loadingDiv">
            ...
            <span className="material-symbols-outlined loadingTree">park</span>
            <span className="material-symbols-outlined loadingTree">park</span>
            loading
            <span className="material-symbols-outlined loadingTree">park</span>
            <span className="material-symbols-outlined loadingTree">park</span>
            ...
          </div>
        )}
      </div>
    </div>
  );
}
<span className="material-symbols-outlined">park</span>;
export default Trees;
