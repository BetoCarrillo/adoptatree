import React from "react";
import useFetch from "../hooks/useFetch";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../styles/trees.css";
import Accordion from "react-bootstrap/Accordion";

function Trees() {
  const { data, loading, error } = useFetch(
    "http://localhost:5005/api/trees/all/"
  );

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
                        {tree.likes ? <>{tree.likes}</> : ""}
                        <br />
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
                        {tree.user ? <>{tree.user[0].userName}</> : ""}
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
