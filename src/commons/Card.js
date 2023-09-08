import React from 'react';

const Card = ({ product, onShowMore }) => {
    return (
        <>
            <div className="card">
                <div className="card-image">
                    <figure className="image">
                        <img 
                        src={product.imageURL} 
                        alt="product img"
                        style={{ width: '432px', height: '432px' }}
                        />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-6">{product.name}</p>
                            <button onClick={onShowMore}>ver mas</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
