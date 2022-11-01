import { createContext, useContext, useState } from "react";
import { baseURL } from "../utils/getServerUrl";
import { AuthContext } from "./AuthContext";

export const TreeContext = createContext();

export const TreeContextProvider = (props) => {
  // console.log("%ctrees context run", "color:red");
  const [trees, setTrees] = useState({});
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(AuthContext);

  const handleChangeHandler = (e) => {
    setNewComment(e.target.value);
  };

  // const comments = async (e, tree) => {
  //   let myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  //   var urlencoded = new URLSearchParams();
  //   urlencoded.append("comment", newComment);

  //   var requestOptions = {
  //     method: "PUT",
  //     headers: myHeaders,
  //     body: urlencoded,
  //   };

  //   try {
  //     const response = await fetch(
  //       baseURL + "/api/trees/comments",
  //       requestOptions
  //     );
  //     const results = await response.json();
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

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

        if (results.msg === "Tree deleted successfully") {
          alert("Tree given for adoption");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

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

  return (
    <TreeContext.Provider
      value={{
        trees,
        setTrees,
        removeTree,
        newComment,
        setNewComment,
        // comments,
        handleChangeHandler,
      }}
    >
      {props.children}
    </TreeContext.Provider>
  );
};
