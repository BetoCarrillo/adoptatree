import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Card from "react-bootstrap/Card";
import "../styles/trees.css";
import Accordion from "react-bootstrap/Accordion";
import { AuthContext } from "../Context/AuthContext";
import Dropdown from "react-bootstrap/Dropdown";

import Search from "../Components/Search";

function Trees() {
  const [like, setLike] = useState(false);
  const { user, setUser, changeLike, foo } = useContext(AuthContext);
  const [newComment, setNewComment] = useState("");
  const [commentStyle, setCommentStyle] = useState(false);
  const [photo, setPhoto] = useState(0);
  const [trees, setTrees] = useState(false);

  /*   const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null); */

  const { setData, data, loading, error } = useFetch(
    "http://localhost:5005/api/trees/all/"
  );
  // console.log("data", data);
  const [myData, setMyData] = useState(data);
  // console.log("myData", myData);
  /*   const fetchTrees = async () => {
    try {
      const response = await fetch("http://localhost:5005/api/trees/all/");
      const result = await response.json();
      console.log("result", result);
      setLoading(false);
      setData(result);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }; */

  const likes = async (e, tree, req, res) => {
    // setLike(true);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("name", tree.name);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/trees/likes",
        requestOptions
      );
      const results = await response.json();

      // console.log("results", results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const unlikes = async (e, tree, req, res) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("name", tree.name);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/trees/unlikes",
        requestOptions
      );
      const results = await response.json();
      // console.log("results", results);
    } catch (error) {
      console.log("error", error);
    }
    setLike(false);
  };

  const handleChangeHandler = (e) => {
    setNewComment(e.target.value);

    /*     if (!isValidEmail(newUser.email)) {
      setError("invalid");
    } else {
      setError(null);
    } */

    /*     if (!isValidPass(newUser.password)) {
      setPassError("invalid password");
    } else {
      setPassError(null);
    } */
  };

  const comments = async (e, tree, req, res) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
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
      setCommentStyle((current) => !current);
      // console.log("results", results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const removeTree = async (e, tree, req, res) => {
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
        // console.log("results", results);

        if (results.msg === "Tree deleted successfully") {
          alert("Tree given for adoption");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const toggleClassComment = () => {
    if (commentStyle === true) {
      setCommentStyle("first");
      return;
    }
    setCommentStyle("second");
    return;
  };

  const incrementPhoto = (e, tree) => {
    // console.log(tree.img);
    setPhoto(photo + 1);

    /*  console.log("inc", photo); */
  };

  const decrementPhoto = (e, tree) => {
    // console.log(tree.img);
    setPhoto(photo - 1);
    if (photo === 0) {
      setPhoto(1);
    }
    // console.log(photo);

    /*     console.log("dec", photo); */
  };

  /*   console.log("photo JS", photo);
   */

  /*   const checkLikes = (like) => {
    if (!like) {
      setLike(true);
    }
    if (like) {
      setLike(false);
    }
  };

  useEffect(() => {}, [checkLikes]); */
  /*   console.log("data.allTrees.comment", data.allTrees[0].comment); */

  /*   let date = new Date(tree.date).toLocaleString();
  console.log("date", date); */

  const fetchType = async (data, e, tree) => {
    try {
      const response = await fetch(
        `http://localhost:5005/api/trees/all/${tree.type}`
      );
      const filteredResult = await response.json();
      console.log("filteredResult", filteredResult);
      /*       setLoading(false); */
      setTrees(true);
      setMyData(filteredResult);
    } catch (error) {
      /*       setLoading(false);
      setError(error); */
    }
  };

  useEffect(() => {
    //  fetchTrees()
    // console.log("refresh trees");
    console.log("useeffct trees run!", data);

    setMyData(data);

    // console.log("alltrees", allTrees);
    // console.log("myData>>>>>>>>>>>>", myData);
  }, [foo, data]);

  return (
    <div>
      {/* {console.log(" JSX run >>>")} */}
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">Type</Dropdown.Toggle>
        <Dropdown.Menu>
          {/* <Dropdown.Item onClick={(e) => fetchType(data, e, tree)}>
            all
          </Dropdown.Item> */}
          {/* {console.log("mydata", myData)} */}
          {myData &&
            myData.allTrees.map((tree, i) => (
              <div key={i}>
                <Dropdown.Item onClick={(e) => fetchType(data, e, tree)}>
                  {tree.type}
                </Dropdown.Item>
              </div>
            ))}
        </Dropdown.Menu>
      </Dropdown>
      <Search />

      {!loading ? (
        myData &&
        myData.allTrees.map((tree, i) => {
          console.log(" JSX run >>>");
          console.log("tree.likes", tree.likes);
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
                        {tree.likes ? <>{tree.likes}</> : ""}
                        <button
                          type=""
                          onClick={() => setLike((prevState) => !prevState)}
                        ></button>
                        <span
                          class="material-symbols-outlined liked"
                          onClick={(e) => {
                            console.log("liked");
                            likes(e, tree);
                            changeLike();
                          }}
                        >
                          favorite
                        </span>
                        <span
                          class="material-symbols-outlined unliked"
                          onClick={(e) => unlikes(e, tree)}
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
                            Type: {tree.type} <br /> {tree.date}
                            <br />
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      &nbsp; &nbsp; &nbsp;
                      {tree.user ? (
                        <>
                          {tree.user[0].name}
                          {tree.user[0].email}
                        </>
                      ) : (
                        ""
                      )}{" "}
                      <br></br>
                      {tree &&
                        tree.comment.map((comment, i) => (
                          <div key={i}>
                            <div className={commentStyle}>{comment}</div>
                          </div>
                        ))}
                      {tree.user.name}
                    </Card.Text>
                    <div>
                      <label htmlFor="comment"></label>
                      <input
                        id="comment"
                        type="text"
                        value={newComment}
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
      {/*   {data && <p>{data.allTrees[0].name}</p>} */}
    </div>
  );
}

export default Trees;
