import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const TreeContext = createContext();

export const TreeContextProvider = (props) => {
  // console.log("%ctrees context run", "color:red");
  const [trees, setTrees] = useState({});
  const [error, setError] = useState(null);
  // const [loading, setLoading] = useState({});
  const [newComment, setNewComment] = useState("");
  const { user, setUser } = useContext(AuthContext);
  // const [changeLike, setChangeLike] = useState(false);
  // const [like, setLike] = useState(false);
  // const [checklike, setCheckLike] = useState(false);
  const [foo, setFoo] = useState(false);
  // const [liked, setLiked] = useState(false);
  // const [myTrees, setMyTrees] = useState();

  // const fetchTrees = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:5005/api/trees/all/`);
  //     const result = await response.json();
  //     console.log("result", result);
  //     // setLoading(false);
  //     setTrees(result);
  //   } catch (error) {
  //     // setLoading(false);
  //     setError(error);
  //   }
  // };
  // const likes = async (e, tree) => {
  //   console.log("run like funct", like);
  //   let myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  //   var urlencoded = new URLSearchParams();
  //   urlencoded.append("user_id", user._id);
  //   urlencoded.append("tree_id", tree._id);

  //   var requestOptions = {
  //     method: "PUT",
  //     headers: myHeaders,
  //     body: urlencoded,
  //   };
  //   try {
  //     const response = await fetch(
  //       "http://localhost:5005/api/users/likes",
  //       requestOptions
  //     );
  //     const results = await response.json();
  //     console.log("results liked", results);
  //     setLike(true);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // const unlikes = async (e, tree) => {
  //   console.log("run unlike funct", like);
  //   let myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  //   var urlencoded = new URLSearchParams();
  //   urlencoded.append("user_id", user._id);
  //   urlencoded.append("tree_id", tree._id);

  //   var requestOptions = {
  //     method: "PUT",
  //     headers: myHeaders,
  //     body: urlencoded,
  //   };
  //   try {
  //     const response = await fetch(
  //       "http://localhost:5005/api/users/unlikes",
  //       requestOptions
  //     );
  //     const results = await response.json();
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const handleChangeHandler = (e) => {
    setNewComment(e.target.value);
  };

  const comments = async (e, tree) => {
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

  // const getProfile = async () => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const myHeaders = new Headers();
  //     myHeaders.append("Authorization", `Bearer ${token}`);

  //     const requestOptionsOne = {
  //       method: "GET",
  //       headers: myHeaders,
  //     };
  //     try {
  //       const response = await fetch(
  //         "http://localhost:5005/api/users/profile",
  //         requestOptionsOne
  //       );
  //       const result = await response.json();
  //       console.log("result", result.creater);
  //       setMyTrees(result.createdTrees);
  //     } catch (error) {
  //       console.log("error getting user's profile", error);
  //     }
  //   } else {
  //     console.log("no token for this user");
  //   }
  // };

  // const functionChangeLikes = () => {
  //   setLike(!like);
  //   console.log("functionChangeLikes", like);
  // };

  // const checkIfLiked = () => {
  //   trees &&
  //     trees.allTrees.map((tree, i) => {
  //       console.log("comparison ", tree, like, user._id);
  //       // like === user._id ? setCheckLike(true) : setCheckLike(false);
  //       // eslint-disable-next-line no-lone-blocks
  //       {
  //         tree.likes.map((like) => {
  //           console.log("LIKE", like);
  //           console.log("comparison ", like, user._id);
  //           if (like === user._id) {
  //             // setLike(!like);
  //           }
  //           // console.log("checkinglike", checklike);
  //         });
  //       }
  //     });
  // };

  useEffect(() => {
    // console.log("treecontext refresh");
    // changeLike();
  }, [foo]);

  return (
    <TreeContext.Provider
      value={{
        trees,
        setTrees,
        // fetchTrees,
        removeTree,
        newComment,
        setNewComment,
        comments,
        handleChangeHandler,
        // setLoading,
        // like,
        // setLike,
        // likes,
        // unlikes,
        // setLiked,
        // liked,
        // setChangeLike,
        // changeLike,
        // functionChangeLikes,
        // checkIfLiked,
        // setCheckLike,
        // checklike,
        setFoo,
        foo,
        // setMyTrees,
        // myTrees,
      }}
    >
      {props.children}
    </TreeContext.Provider>
  );
};
