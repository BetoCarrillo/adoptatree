import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const TreeContext = createContext();

export const TreeContextProvider = (props) => {
  const [trees, setTrees] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState({});
  const [photo, setPhoto] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [commentStyle, setCommentStyle] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [changeLike, setChangeLike] = useState(false);
  const [like, setLike] = useState(false);

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
  const likes = async (e, tree, req, res) => {
    console.log("run like funct", like);
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
      console.log("results liked", results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const unlikes = async (e, tree, req, res) => {
    console.log("run unlike funct", like);
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
  const functionChangeLikes = () => {
    setChangeLike(!like);
  };

  useEffect(() => {
    console.log("treecontext refresh");
  }, [changeLike]);

  return (
    <TreeContext.Provider
      value={{
        trees,
        setTrees,
        fetchTrees,
        decrementPhoto,
        incrementPhoto,
        removeTree,
        newComment,
        setNewComment,
        comments,
        handleChangeHandler,
        setCommentStyle,
        commentStyle,
        loading,
        setLoading,
        like,
        setLike,
        likes,
        unlikes,
        setChangeLike,
        changeLike,
        functionChangeLikes,
      }}
    >
      {props.children}
    </TreeContext.Provider>
  );
};
