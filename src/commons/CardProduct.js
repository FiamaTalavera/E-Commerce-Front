import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const CardProduct = ({ product, onShowMore }) => {
    return (
        <Card style={{height:''}}>
            <CardMedia component="img" alt={`Foto de ${product.name}`} style={{height:'430px', objectFit: ''}} image={product.imageURL} />
            <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Button variant="outlined" onClick={onShowMore}>
                    Ver Más
                </Button>
            </CardContent>
        </Card>
    );
};

export default CardProduct;