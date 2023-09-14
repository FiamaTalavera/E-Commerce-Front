import React, { useState, useEffect } from 'react';
import Card from '../commons/Card';
import { CardDetails } from '../commons/CardDetails';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../state/cart';

const Grid = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch()

    const handleShowMore = (product) => {
        axios
            .get(`${process.env.REACT_APP_URLBACK}/products/${product.id}`)
            .then((res) => {
                setSelectedProduct(res.data);
            })
            .catch((error) => {
                console.error('Error al traer detalles del producto:', error);
            });
    };

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_URLBACK}/products`)
            .then((res) => {
                console.log('Los productos --> ', res.data); /* sacar console log? */
                setProducts(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleAddToCart = (product, quantity) => {
        axios
            .post(`${process.env.REACT_APP_URLBACK}/products/addToCart/${product.id}`, { quantity }, { withCredentials: true })
            .then((response) => {
                console.log(`Se agrego ${product.name} al chango`);
                dispatch(addToCart({product, quantity}))
            })
            .catch((error) => {
                console.error('Error al agregar al chango:', error);
            });
    };

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
                    {selectedProduct && <CardDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} addToCart={handleAddToCart} />}
                </div>
            </div>
        </>
    );
};

export default Grid;
