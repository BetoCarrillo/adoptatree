import React from "react";
import useFetch from "../hooks/useFetch";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

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
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={tree.img} height="280rem" />
                  <Card.Body>
                    <Card.Title>{tree.name}</Card.Title>
                    <Card.Text>
                      Location: {tree.location}
                      <br />
                      Type: {tree.type} <br /> {tree.date}
                      <br />
                      {tree.user ? <>{tree.user[0].userName}</> : ""}
                      {console.log(tree.user[0].userName)}
                    </Card.Text>
                    <Button variant="primary">Comment</Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })
        : "...loading adopted trees..."}
      {/*   {data && <p>{data.allTrees[0].name}</p>} */}
    </div>
  );
}

export default Trees;
