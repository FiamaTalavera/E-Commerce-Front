import React from "react";

export const CardDetails = ({ product, onClose }) => {
  return (
    <div className="modal is-active ">
      <div className="modal-background">
        <div className="modal-content custom-modal-content">
          <div className="column is-vcentered">
            <header className="modal-card-head">
              <h2 className="modal-card-title has-text-centered">{product.name}</h2>
              <button className="delete" onClick={onClose} />
            </header>
            <section className="modal-card-body">
              <div className="columns">
                <div className="column is-half is-flex is-justify-content-center">
                  <img 
                  src={product.imageURL}
                  alt="no hay fotito"
                  style={{ width: '320px', height: '320px' }}
                  />
                </div>
                <div className="column is-half">
                  <h5 className="title is-5">{product.description}</h5>
                  <p>STOCK: {product.stock}</p>
                  <h4 className="subtitle is-4">PRECIO: {product.price}</h4>
                  <br/>
                  <p>PUNTUACION: </p>
                  <p>BOTON AGREGAR AL CARRITO</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
