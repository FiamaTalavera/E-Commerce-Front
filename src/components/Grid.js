import React from "react";
import fakeData from "../utils/fakeData";
import Card from "../commons/Card";

const Grid = () => {
  return (
    <>
      <div className="container text-center">
        <h1 className="title is-3 has-text-centered">Menu</h1>
        <div className="columns is-multiline">
          {fakeData.products.map((product, i) => (
            <div className="column is-4" key={i}>
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Grid;
