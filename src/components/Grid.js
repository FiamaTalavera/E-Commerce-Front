import React, { useState, useEffect } from 'react';
import Card from '../commons/Card';
import { CardDetails } from '../commons/CardDetails';

import axios from 'axios';

const Grid = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);

    const handleShowMore = (product) => {
        axios
            .get(`http://localhost:3001/products/${product.id}`)
            .then((res) => {
                setSelectedProduct(res.data);
            })
            .catch((error) => {
            console.error('Error al traer detalles del producto:', error)
        })
    };

    useEffect(() => {
        axios
            .get('http://localhost:3001/products')
            .then((res) => {
                console.log('res.data --> ', res.data); /* sacar console log? */
                setProducts(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <div className="container text-center">
                <h1 className="title is-3 has-text-centered p-6">Menu</h1>
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
                    {selectedProduct && <CardDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
                </div>
            </div>
        </>
    );
};

export default Grid;
