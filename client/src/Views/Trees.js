import React, { useContext, useEffect, useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import Card from "react-bootstrap/Card";
import "../styles/trees.css";

import Accordion from "react-bootstrap/Accordion";
import { AuthContext } from "../Context/AuthContext";
import { TreeContext } from "../Context/TreeContext";
import TreeCards from "../Components/TreeCards";
import SearchBar from "../Components/SearchBar";
import Carousel from "react-bootstrap/Carousel";

import { Button } from "@mui/material";

function Trees() {
  const { user, setUser } = useContext(AuthContext);
  const {
    // checkIfLiked,
    liked,
    setLiked,
    trees,
    setTrees,
    changeLike,
    setChangeLike,
    likes,
    unlikes,
    like,
    setLike,
    functionChangeLikes,
    newComment,
    setNewComment,
    // setCheckLike,
    // checklike,
    // /setFoo,
    //  foo,
  } = useContext(TreeContext);
  const [commentDivShown, setCommentDivShown] = useState(false);
  const [commentInputShown, setCommentInputShown] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [data, setData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState(false);
  const [searchName, setSearchName] = useState();

  // CUSTOM FETCH HOOK
  // const { setData, data, loading, error } = useFetch(
  //   "http://localhost:5005/api/trees/all/"
  // );

  const fetchTrees = async () => {
    try {
      const response = await fetch(`http://localhost:5005/api/trees/all/`);
      const result = await response.json();
      console.log("result", result);
      setLoading(false);
      setTrees(result);
    } catch (error) {
      setLoading(false);
      setError(error);
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
        "http://localhost:5005/api/trees/comments",
        requestOptions
      );
      const results = await response.json();
      // setCommentStyle((current) => !current);
    } catch (error) {
      console.log("error", error);
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
          "http://localhost:5005/api/trees/delete",
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
        const response = await fetch(`http://localhost:5005/api/trees/all/`);
        const result = await response.json();
        console.log("result", result);
        setLoading(false);
        setTrees(result);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    } else {
      try {
        const response = await fetch(
          "http://localhost:5005/api/trees/search",
          requestOptions
        );
        const results = await response.json();
        console.log("result", results);
        setLoading(false);

        setTrees(results);
      } catch (error) {
        console.log("error", error);
        setLoading(false);
        setError(error);
      }
    }
  };

  const checkIfLiked = () => {
    setLiked(!liked);
    trees &&
      trees.allTrees.map((tree, i) => {
        console.log("comparison ", tree, like, user._id);
        // like === user._id ? setCheckLike(true) : setCheckLike(false);
        // eslint-disable-next-line no-lone-blocks
        {
          tree.likes.map((like) => {
            console.log("LIKE", like);
            console.log("comparison ", like, user._id);
            if (like === user._id) {
              setLiked(!liked);
            }
            // console.log("checkinglike", checklike);
          });
        }
      });
  };

  useEffect(() => {
    console.log("trees refresh");
    fetchTrees();
    // checkIfLiked();
  }, [changeLike]);

  return (
    <div>
      <br />
      <SearchBar fetchDataSearch={fetchDataSearch} />
      <br />

      <br />
      {!loading ? (
        trees &&
        trees.allTrees.map((tree, i) => {
          return (
            <div key={i}>
              <div className="cardsDiv">
                <Card className="cardDiv">
                  {/* <Card.Img
                    variant="top"
                    src={tree.img[photo]}
                    height="280rem"
                  /> */}
                  <Card.Body>
                    <Carousel variant="dark" interval={null}>
                      {tree &&
                        tree.img.map((image, i) => (
                          <Carousel.Item>
                            <img
                              className="d-block w-100 cardImg"
                              src={tree.img[i]}
                              alt="First slide"
                            />
                          </Carousel.Item>
                        ))}{" "}
                    </Carousel>
                    <Card.Text>
                      <div className="cardTitleText">
                        <div>
                          {" "}
                          <span class="material-symbols-outlined parentLogo">
                            local_florist
                          </span>
                          {tree.user[0].name ? (
                            <>
                              {/* {tree.user[0].name} */}
                              {tree.user[0].name}
                            </>
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
                          {!liked ? (
                            <span
                              class="material-symbols-outlined liked"
                              onClick={(e) => {
                                setLiked(!liked);
                                likes(e, tree);
                                checkIfLiked();
                              }}
                            >
                              park
                            </span>
                          ) : (
                            <span
                              class="material-symbols-outlined unliked"
                              onClick={(e) => {
                                setLiked(!liked);
                                unlikes(e, tree);
                                checkIfLiked();
                              }}
                            >
                              park
                            </span>
                          )}{" "}
                          &nbsp;{" "}
                          {/* <button onClick={() => setFoo(!foo)}>
                            change Foo
                          </button> */}
                          <span
                            class="material-symbols-outlined commentAddLogo"
                            onClick={handleClick}
                          >
                            maps_ugc
                          </span>{" "}
                          {/* <span
                            class="material-symbols-outlined liked"
                            onClick={(e) => {
                              console.log("liked");
                              likes(e, tree);
                              checkIfLiked();
                            }}
                          >
                            favorite
                          </span>
                          <span
                            class="material-symbols-outlined unliked"
                            onClick={(e) => {
                              unlikes(e, tree);
                              checkIfLiked();
                            }}
                          > 
                            favorite
                          </span>*/}
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
                              onClick={(e) => comments(e, tree)}
                            >
                              <span class="material-symbols-outlined">add</span>
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
                            <span class="material-symbols-outlined">park</span>
                            &nbsp;{" "}
                            <span className="boldText cardsTreeName">
                              {tree.name}
                            </span>
                          </Accordion.Header>
                          <Accordion.Body>
                            <span className="boldText">Location:</span>{" "}
                            {tree.location}
                            <br /> <span className="boldText">Type:</span>{" "}
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
                      {tree.user[0].name ? (
                        <>
                          {" "}
                          <span className="boldText">{tree.user[0].name}</span>
                        </>
                      ) : (
                        <span className="boldText"> {tree.user[0].email}</span>
                      )}
                      <span> {tree.comment[0]}</span> &nbsp; &nbsp;
                      {tree.comment.length >= 3 ? (
                        <Accordion flush>
                          {" "}
                          <Accordion.Item eventKey="0">
                            <Accordion.Header onClick={handleCommentDiv}>
                              <div>
                                {!commentDivShown ? (
                                  <div className="firstComment">
                                    &nbsp;{" "}
                                    {tree.comment[2] ? tree.comment[2] : ""}{" "}
                                    <br />
                                    &nbsp;{" "}
                                    {tree.comment[2]
                                      ? tree.comment[3]
                                      : ""}{" "}
                                    <br />
                                    &nbsp;{" "}
                                    <span className="seeMoreComments">
                                      {tree.comment.length >= 2 ? (
                                        <>
                                          {" "}
                                          All {tree.comment.length / 2} comments
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
                              {tree.user.name}
                              <br />
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      ) : (
                        ""
                      )}
                    </Card.Text>

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
                          <span class="material-symbols-outlined deleteTreeButton">
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
          ...<span class="material-symbols-outlined loadingTree">park</span>
          <span class="material-symbols-outlined loadingTree">park</span>loading
          <span class="material-symbols-outlined loadingTree">park</span>
          <span class="material-symbols-outlined loadingTree">park</span>...
        </div>
      )}
    </div>
  );
}
<span class="material-symbols-outlined">park</span>;
export default Trees;
