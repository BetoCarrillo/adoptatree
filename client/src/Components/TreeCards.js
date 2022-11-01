import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { TreeContext } from "../Context/TreeContext";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

function TreeCards() {
  const {
    trees,
    setTrees,
    photo,
    incrementPhoto,
    decrementPhoto,
    removeTree,
    newComment,
    comments,
    handleChangeHandler,
    commentStyle,
    like,
    setLike,
    likes,
    unlikes,
    setChangeLike,
    changeLike,
    functionChangeLikes,
  } = useContext(TreeContext);
  const [loading, setloading] = useState(false);

  const [error, setError] = useState(null);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    console.log("treecards refresh");
  }, []);

  return (
    <div>
      {" "}
      {/* {console.log("TREES CARDS", trees)} */}
      {loading ? (
        trees &&
        trees.allTrees.map((tree, i) => {
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
                        <span
                          className="material-symbols-outlined liked"
                          onClick={(e) => {
                            likes(e, tree);
                            // functionChangeLikes();
                          }}
                        >
                          favorite
                        </span>
                        <span
                          className="material-symbols-outlined unliked"
                          onClick={(e) => {
                            unlikes(e, tree);
                            // functionChangeLikes();
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

export default TreeCards;
