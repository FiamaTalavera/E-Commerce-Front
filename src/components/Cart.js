import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import axios from 'axios';

export const Cart = () => {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/order`, {withCredentials: true})
            .then((res) => {
                console.log('LA DATA ------>',res.data);
                setCartItems(res.data)
            })
            .catch((error) => {
            console.log('ERROR =------>', error);
        })
    },[])

    return (
        <div>
            <h1>Tus Productos</h1>

            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        {item.product.name} - Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};
