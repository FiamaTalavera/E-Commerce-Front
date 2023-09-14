import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems, incrementQuantity, decrementQuantity, removeFromCart } from '../state/cart';

export const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalPrice = useSelector((state) => state.cart.total);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URLBACK}/order`, { withCredentials: true }).then((res) => {
            // este log muestra un array de objetos con todas las ordenes hechas
            console.log('ORDENES --->', res.data);
            dispatch(fetchCartItems(res.data));
        });
    }, [dispatch]);

    const handleIncrement = (item) => {
       const updatedQuantity = item.quantity + 1;
        axios
            .put(`${process.env.REACT_APP_URLBACK}/order/updateQuantity/${item.id}`, { quantity: updatedQuantity }, { withCredentials: true })
            .then((res) => {
                console.log('Cantidad actualizada en el back ( + )');
                dispatch(incrementQuantity(item.id, updatedQuantity));
            })
            .catch((error) => {
                console.error('Error actualizando cantidad en el back', error);
            });
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            const updatedQuantity = item.quantity - 1;
            axios
                .put(`${process.env.REACT_APP_URLBACK}/order/updateQuantity/${item.id}`, { quantity: updatedQuantity }, { withCredentials: true })
                .then((res) => {
                    console.log('Cantidad actualizada en el back ( - )');
                    dispatch(decrementQuantity(item.id, updatedQuantity));
                })
                .catch((error) => {
                    console.error('Error actualizando cantidad en el back', error);
                });
        } else {
            console.log('1 es el minimo');
        }
    };

    const handleRemove = (item) => {
        const orderId = item.id;
        const productId = item.product.id;

        axios
            .delete(`${process.env.REACT_APP_URLBACK}/order/remove/${orderId}/${productId}`)
            .then((res) => {
                console.log(`Producto removido --> `, item);
                dispatch(removeFromCart({ orderId, productId }));
            })
            .catch((error) => {
                console.error('Error al remover producto', error);
            });
    };

    return (
        <div>
            <h1>Tus Productos</h1>

            <ul>
                {cartItems.map((item) => (
                    <li key={`${item.id}-${item.product.id}`}>
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
