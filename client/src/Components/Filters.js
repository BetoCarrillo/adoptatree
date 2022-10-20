import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default function Filters({
  fetchTrees,
  fetchType,
  data,
  setTrees,
  setData,
}) {
  return (
    <div>
      {" "}
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">Type</Dropdown.Toggle>
        <Dropdown.Menu>
          {/* <Dropdown.Item onClick={(e) => fetchTrees(data, e)}>
            All
          </Dropdown.Item> */}
          {data &&
            data.allTrees.map((tree, i) => (
              <div key={i}>
                <Dropdown.Item onClick={(e) => fetchType(data, e, tree)}>
                  {tree.type}
                </Dropdown.Item>
              </div>
            ))}
        </Dropdown.Menu>
      </Dropdown>
      <span
        class="material-symbols-outlined"
        onClick={(e) => fetchTrees(data, e)}
      >
        refresh
      </span>
    </div>
  );
}
