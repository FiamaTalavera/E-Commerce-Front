import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


export const CardDetails = ({ product, onClose, addToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <img src={product.imageURL} alt={`Foto de ${product.name}`} style={{ width: '100%', height: 'auto' }} />
                    {product.description}
                    <br />
                    STOCK: {product.stock}
                    <br />
                    PRECIO: {product.price}
                </DialogContentText>
                <div>
                    <label>Cantidad: {quantity}</label>
                    <div style={{ marginTop: '20px' }}>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: 'orange', color: 'black' }}
                            onClick={handleDecrement}
                            disabled={quantity === 1}
                        >
                            -
                        </Button>
                        <Button variant="outlined" onClick={() => addToCart(product, quantity)}>
                            Agregar {quantity} al chango
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: 'orange', color: 'black' }}
                            onClick={handleIncrement}
                            disabled={quantity === product.stock}
                        >
                            +
                        </Button>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};
