import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Card from "react-bootstrap/Card";
import "../styles/trees.css";
import Accordion from "react-bootstrap/Accordion";
import { AuthContext } from "../Context/AuthContext";
// import Search from "../Components/Search";
import Filters from "../Components/Filters";
import SearchBar from "../Components/SearchBar";

function Trees() {
  const { user, setUser, changeLike, foo, like, setLike } =
    useContext(AuthContext);
  const [newComment, setNewComment] = useState("");
  const [commentStyle, setCommentStyle] = useState(false);
  const [photo, setPhoto] = useState(0);
  const [trees, setTrees] = useState(false);
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
    } catch (error) {
      console.log("error", error);
    }
    setLike(false);
  };

  const handleChangeHandler = (e) => {
    setNewComment(e.target.value);
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
    setPhoto(photo + 1);
  };

  const decrementPhoto = (e, tree) => {
    setPhoto(photo - 1);
    if (photo === 0) {
      setPhoto(1);
    }
  };

  /*   console.log("data.allTrees.comment", data.allTrees[0].comment); */

  /*   let date = new Date(tree.date).toLocaleString();
  console.log("date", date); */

  // const fetchType = async (data, e, tree) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5005/api/trees/all/${tree.type}`
  //     );
  //     const typeResult = await response.json();
  //     console.log("filteredResult", typeResult);
  //     setLoading(false);
  //     setTrees(true);
  //     setData(typeResult);
  //   } catch (error) {
  //     setLoading(false);
  //     setError(error);
  //   }
  // };

  const fetchDataSearch = async (e) => {
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
        setData(result);
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
        setTrees(true);
        setData(results);
      } catch (error) {
        console.log("error", error);
        setLoading(false);
        setError(error);
      }
    }

    // console.log("works");
    // console.log(e.target.value);
    // // setSearchName(e.target.value);

    // try {
    //   const response = await fetch(
    //     `http://localhost:5005/api/trees/all/?&name=${e.target.value}`
    //   );
    //   const result = await response.json();
    //   console.log("result", result);
    //   setData(result);
    //   setLoading(false);
    // } catch (error) {
    //   setLoading(false);
    //   setError(error);
    // }
  };

  // const handleEnter = (e) => {
  //   if (e.key === "Enter") {
  //     setSearchName(e.target.value);
  //     // fetchDataSearch(e);
  //   }
  // };

  //  const handleSearch = (e) => {
  //    fetchDataSearch(e);
  //  };

  useEffect(() => {
    fetchTrees();
  }, [foo]);

  return (
    <div>
      {/* <Filters
        fetchTrees={fetchTrees}
        data={data}
        fetchType={fetchType}
        // handleEnter={handleEnter}
      /> */}
      <SearchBar fetchDataSearch={fetchDataSearch} />
      {/* <Search setSearchName={setSearchName} /> */}
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
    </div>
  );
}

export default Trees;
