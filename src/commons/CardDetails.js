import React from 'react';

export const CardDetails = ({ product, onClose, addToCart }) => {
    return (
        <div className="modal is-active">
            <div className="modal-background">
                <div className="modal-content">
                    <div className="column is-vcentered">
                        <header className="modal-card-head">
                            <h2 className="modal-card-title">{product.name}</h2>
                            <button className="delete" onClick={onClose} />
                        </header>
                        <section className="modal-card-body">
                            <img style={{height:'200px'}} src={product.imageURL} alt="no hay fotito" />
                            <h5 className="title is-5">{product.description}</h5>
                            <p>STOCK: {product.stock}</p>
                            <h4 className="subtitle is-4">PRECIO: {product.price}</h4>
                        <button onClick={()=>addToCart(product)}>Agregar al chango</button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};
