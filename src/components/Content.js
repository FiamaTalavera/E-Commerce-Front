import React, { useState } from 'react';
import CardProduct from '../commons/CardProduct';
import { CardDetails } from '../commons/CardDetails';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../state/cart';
import { toast } from 'react-toastify';

const Content = ({products}) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const dispatch = useDispatch();
    // console.log('PRODUCTS --->', products);

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


    const handleAddToCart = (product, quantity) => {
        axios
            .post(`${process.env.REACT_APP_URLBACK}/products/addToCart/${product.id}`, { quantity }, { withCredentials: true })
            .then((response) => {
                toast.success(`Se agrego ${product.name} al chango`)
                dispatch(addToCart({ product, quantity }));
            })
            .catch((error) => {
                console.error('Error al agregar al chango:', error);
                toast.warn(`Necesitas loguearte.`);
            });
    };

    return (
        <>
            <div className="container text-center">
                <h1 className="title is-3 has-text-centered p-6">Menu</h1>
                <div className="columns is-multiline">
                    {products.map((product, i) => (
                        <div className="column is-4" key={i}>
                            <CardProduct
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

export default Content;
