import React, { useState, useEffect } from "react";
import fakeData from "../utils/fakeData";
import Card from "../commons/Card";
import { CardDetails } from "../commons/CardDetails";

import axios from "axios";

const Grid = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const handleShowMore = (product) => {
    setSelectedProduct(product);
  };


  useEffect(() => {
    axios.get("http://localhost:3001/products")
    .then((res) => {
      console.log("res.data --> ", res.data);
      setProducts(res.data)
    })
    .catch(err => console.log(err))
  }, []);

  return (
    <>
      <div className="container text-center">
        <h1 className="title is-3 has-text-centered">Menu</h1>
        <div className="columns is-multiline">
          {products.map((product, i) => (
            <div className="column is-4" key={i}>
              <Card
                product={product}
                onShowMore={() => {
                  handleShowMore(product);
                }}
              />
            </div>
          ))}
          {selectedProduct && (
            <CardDetails
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Grid;
