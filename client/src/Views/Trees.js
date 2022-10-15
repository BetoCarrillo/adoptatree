import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../styles/trees.css";
import Accordion from "react-bootstrap/Accordion";

function Trees() {
  const [like, setLike] = useState(true);

  const { data, loading, error } = useFetch(
    "http://localhost:5005/api/trees/all/"
  );

  const likes = async (e, tree, req, res) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("name", tree.name);
    console.log("name", tree.name);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
    };
    setLike(false);
    console.log(like);
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
    setLike(true);
    console.log(like);
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
      console.log("results", results);
    } catch (error) {
      console.log("error", error);
    }
  };

  /*  useEffect(() => {

  }, [like]); */

  /*  console.log("data", data); */

  /*   let date = new Date(tree.date).toLocaleString();
  console.log("date", date); */

  return (
    <div>
      {!loading
        ? data &&
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

                          {like === true ? (
                            <span
                              class="material-symbols-outlined liked"
                              onClick={(e) => likes(e, tree)}
                            >
                              favorite
                            </span>
                          ) : (
                            <span
                              class="material-symbols-outlined unliked"
                              onClick={(e) => unlikes(e, tree)}
                            >
                              favorite
                            </span>
                          )}
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
                        )}
                      </Card.Text>
                      <Button variant="primary">Add a comment..</Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            );
          })
        : "...loading adopted trees..."}
      {/*   {data && <p>{data.allTrees[0].name}</p>} */}
    </div>
  );
}

export default Trees;
