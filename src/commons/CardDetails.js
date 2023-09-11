import axios from 'axios';
import React, { useState } from 'react';

export const CardDetails = ({ product, onClose, addToCart }) => {

    const [quantity, setQuantity] = useState(1)

    const handleIncrement = () => {
        setQuantity(quantity + 1)
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

        const handleAddToCart = (product, quantity) => {
            axios
                .post(`http://localhost:3001/products/addToCart/${product.id}`, { quantity }, { withCredentials: true })
                .then((response) => {
                    console.log(`Se agrego ${product.name} al chango`);
                })
                .catch((error) => {
                    console.error('Error al agregar al chango:', error);
                });
        };

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
                            <img style={{ height: '200px' }} src={product.imageURL} alt="no hay fotito" />
                            <h5 className="title is-5">{product.description}</h5>
                            <p>STOCK: {product.stock}</p>
                            <h4 className="subtitle is-4">PRECIO: {product.price}</h4>
                            <div>
                                <label>Cantidad:</label>
                                <div>
                                    <button onClick={handleDecrement}>-</button>
                                    <button onClick={() => addToCart(product, quantity)}>Agregar {quantity} al chango</button>
                                    <button onClick={handleIncrement}>+</button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};
