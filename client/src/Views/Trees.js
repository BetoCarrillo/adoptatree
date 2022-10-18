import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Card from "react-bootstrap/Card";
import "../styles/trees.css";
import Accordion from "react-bootstrap/Accordion";
import { AuthContext } from "../Context/AuthContext";

function Trees() {
  const [like, setLike] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [newComment, setNewComment] = useState("");
  const [commentStyle, setCommentStyle] = useState(false);

  const { data, loading, error } = useFetch(
    "http://localhost:5005/api/trees/all/"
  );

  const likes = async (e, tree, req, res) => {
    setLike(true);
    console.log("first", like);
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

      console.log("results", results);
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

      console.log(like);
      console.log("results", results);
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
      console.log("results", results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const removeTree = async (e, tree, req, res) => {
    console.log("user...", user);
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
        console.log("results", results);

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

  const checkLikes = (like) => {
    if (!like) {
      setLike(true);
    }
    if (like) {
      setLike(false);
    }
  };

  useEffect(() => {
    console.log("refresh");
  }, [checkLikes]);
  /*   console.log("data.allTrees.comment", data.allTrees[0].comment); */

  /*   let date = new Date(tree.date).toLocaleString();
  console.log("date", date); */

  return (
    <div>
      {!loading ? (
        data &&
        data.allTrees.map((tree, i) => {
          return (
            <div key={i}>
              <div className="cardsDiv">
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={tree.img} height="280rem" />
                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                      <div className="likesDiv">
                        {tree.likes ? <>{tree.likes}</> : ""}
                        <button
                          type=""
                          onClick={() => setLike((prevState) => !prevState)}
                        ></button>
                        <span
                          class="material-symbols-outlined liked"
                          onClick={(e) => likes(e, tree)}
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
