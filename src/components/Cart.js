import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const calculateTotalPrice = () => {
        let total = 0;

        cartItems.forEach((item) => {
            total += item.quantity * item.product.price;
        });

        setTotalPrice(total);
    };

    const handleIncrement = (item) => {
        const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
                const updatedQuantity = cartItem.quantity + 1;

                axios
                    .put(`${process.env.REACT_APP_URLBACK}/order/updateQuantity/${item.id}`, { quantity: updatedQuantity }, { withCredentials: true })
                    .then((res) => {
                        console.log('Cantidad actualizada en el back');
                        cartItem.quantity = updatedQuantity;
                        calculateTotalPrice();
                    })
                    .catch((error) => {
                        console.error('Error actualizando cantidad en el back', error);
                    });

                return {
                    ...cartItem,
                    quantity: updatedQuantity,
                };
            }
            return cartItem;
        });
        setCartItems(updatedCart);
    };

    const handleDecrement = (item) => {
        const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id && cartItem.quantity > 1) {
                const updatedQuantity = cartItem.quantity - 1;

                axios
                    .put(`${process.env.REACT_APP_URLBACK}/order/updateQuantity/${item.id}`, { quantity: updatedQuantity }, { withCredentials: true })
                    .then((res) => {
                        console.log('Cantidad actualizada en el back');
                        cartItem.quantity = updatedQuantity;
                        calculateTotalPrice();
                    })
                    .catch((error) => {
                        console.error('Error actualizando cantidad en el back', error);
                    });

                return {
                    ...cartItem,
                    quantity: updatedQuantity,
                };
            }
            return cartItem;
        });
        setCartItems(updatedCart);
    };

    const handleRemove = (item) => {
        const orderId = item.id;
        const productId = item.product.id;

        axios
            .delete(`${process.env.REACT_APP_URLBACK}/order/remove/${orderId}/${productId}`)
            .then((res) => {
                console.log(`Producto removido --> ${res.data.message}`);

                const updatedCart = cartItems.filter((cartItem) => cartItem.id !== orderId);
                setCartItems(updatedCart);
            })
            .catch((error) => {
                console.error('Error al remover producto', error);
            });
    };

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_URLBACK}/order`, { withCredentials: true })
            .then((res) => {
                console.log('LA DATA ------>', res.data);
                setCartItems(res.data);
                let initialTotal = 0;
                res.data.forEach((item) => {
                    initialTotal += item.quantity * item.product.price;
                });
                setTotalPrice(initialTotal);
            })
            .catch((error) => {
                console.log('ERROR ------>', error);
            });
    }, []);

    return (
        <div>
            <h1>Tus Productos</h1>

            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        <img style={{ height: '100px' }} src={`${item.product.imageURL}`} alt="no hay fotito" />
                        {item.product.name} - Cantidad: {item.quantity} - Precio Total: {item.product.price * item.quantity}
                        <button onClick={() => handleDecrement(item)}>-</button>
                        <button onClick={() => handleIncrement(item)}>+</button>
                        <button onClick={() => handleRemove(item)}>ELIMINAR</button>
                    </li>
                ))}
            </ul>
            <h4>TOTAL A PAGAR: {cartItems.length > 0 ? totalPrice : 0} </h4>
            <Link to="/checkout">
                <button>Ir a pagar</button>
            </Link>
        </div>
    );
};
