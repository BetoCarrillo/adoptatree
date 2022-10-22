import React, { useContext, useEffect, useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import Card from "react-bootstrap/Card";
import "../styles/trees.css";
import Accordion from "react-bootstrap/Accordion";
import { AuthContext } from "../Context/AuthContext";
// import Search from "../Components/Search";
import Filters from "../Components/Filters";
import { TreeContext } from "../Context/TreeContext";
// import SearchBar from "../Components/SearchBar";

function Trees() {
  const { user, setUser } = useContext(AuthContext);
  const {
    changeLike,
    setChangeLike,
    likes,
    unlikes,
    like,
    setLike,
    functionChangeLikes,
    // setCheckLike,
    // checklike,
  } = useContext(TreeContext);
  const [newComment, setNewComment] = useState("");
  // const [commentStyle, setCommentStyle] = useState(false);
  const [photo, setPhoto] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
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
      setData(result);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChangeHandler = (e) => {
    setNewComment(e.target.value);
  };

  const comments = async (e, tree) => {
    console.log("tree._id", tree._id);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("_id", tree._id);
    urlencoded.append("comment", newComment);

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

  // const toggleClassComment = () => {
  //   if (commentStyle === true) {
  //     setCommentStyle("first");
  //     return;
  //   }
  //   setCommentStyle("second");
  //   return;
  // };

  const incrementPhoto = (e, tree) => {
    setPhoto(photo + 1);
  };

  const decrementPhoto = (e, tree) => {
    setPhoto(photo - 1);
    if (photo === 0) {
      setPhoto(1);
    }
  };

  // const checkIfLiked = () => {
  //   const check =
  //     data &&
  //     data.allTrees.map((tree, i) => {
  //       console.log("comparison ", tree, like, user._id);
  //       // like === user._id ? setCheckLike(true) : setCheckLike(false);
  //       // eslint-disable-next-line no-lone-blocks
  //       {
  //         tree.likes.map((like) => {
  //           console.log("LIKE", like);
  //           console.log("comparison ", like, user._id);
  //           like === user._id ? setChangeLike(true) : setChangeLike(false);
  //           // console.log("checkinglike", checklike);
  //         });
  //       }
  //     });
  // };

  useEffect(() => {
    console.log("trees refresh");
    fetchTrees();
    // checkIfLiked();
  }, []);

  return (
    <div>
      {!loading ? (
        data &&
        data.allTrees.map((tree, i) => {
          return (
            <div key={i}>
              <div className="cardsDiv">
                <Card style={{ width: "18rem" }}>
                  {tree &&
                    tree.img.map((image, i) => (
                      <Card.Img
                        variant="top"
                        src={tree.img[photo]}
                        height="280rem"
                      />
                    ))}{" "}
                  <Card.Body>
                    {" "}
                    <Card.Title>
                      {" "}
                      <button type="" onClick={(e) => decrementPhoto(e, tree)}>
                        prev
                      </button>
                      <button type="" onClick={(e) => incrementPhoto(e, tree)}>
                        next
                      </button>
                    </Card.Title>
                    <Card.Text>
                      <div className="likesDiv">
                        {tree.likes.length !== 0 ? (
                          <>{tree.likes.length}</>
                        ) : (
                          ""
                        )}
                        {/* {changeLike ? (
                          <span
                            class="material-symbols-outlined liked"
                            onClick={(e) => {
                              console.log("liked");
                              likes(e, tree);
                              checkIfLiked();
                            }}
                          >
                            favorite
                          </span>
                        ) : (
                          <span
                            class="material-symbols-outlined unliked"
                            onClick={(e) => {
                              unlikes(e, tree);
                              checkIfLiked();
                            }}
                          >
                            favorite
                          </span>
                        )} */}
                        <span
                          class="material-symbols-outlined liked"
                          onClick={(e) => {
                            console.log("liked");
                            likes(e, tree);
                            // checkIfLiked();
                          }}
                        >
                          favorite
                        </span>
                        <span
                          class="material-symbols-outlined unliked"
                          onClick={(e) => {
                            unlikes(e, tree);
                            // checkIfLiked();
                          }}
                        >
                          favorite
                        </span>
                      </div>
                      <Accordion flush>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>{tree.name}</Accordion.Header>
                          <Accordion.Body>
                            Location: {tree.location}
                            <br />
                            Type: {tree.type} <br />{" "}
                            {new Date(tree.date).toLocaleString("de-DE", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            })}
                            <br />
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      &nbsp; &nbsp; &nbsp;
                      {tree.user ? (
                        <>
                          {/* {tree.user[0].name} */}
                          {tree.user[0].email}
                        </>
                      ) : (
                        ""
                      )}
                      {""}
                      <br></br>
                      {tree &&
                        tree.comment.map((comment, i) => (
                          <div key={i}>
                            <div>{comment}</div>
                          </div>
                        ))}
                      {tree.user.name}
                    </Card.Text>
                    <div>
                      <label htmlFor="comment"></label>
                      <input
                        id="comment"
                        type="text"
                        name="comment"
                        onChange={handleChangeHandler}
                      />
                    </div>
                    <button onClick={(e) => comments(e, tree)}>
                      Add a comment..
                    </button>
                    <button onClick={(e) => removeTree(e, tree)}>delete</button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          );
        })
      ) : (
        <div>...loading adopted trees...</div>
      )}
    </div>
  );
}

export default Trees;
