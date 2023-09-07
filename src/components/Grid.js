import React, { useState } from 'react';
import fakeData from '../utils/fakeData';
import Card from '../commons/Card';
import { CardDetails } from '../commons/CardDetails';

const Grid = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleShowMore = (product) => {
        setSelectedProduct(product);
    };

    return (
        <>
            <div className="container text-center">
                <h1 className="title is-3 has-text-centered">Menu</h1>
                <div className="columns is-multiline">
                    {fakeData.products.map((product, i) => (
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
