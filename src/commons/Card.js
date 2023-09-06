import React from 'react'

const Card = ({product}) => {
  return (
    <>
      <div className="card">
        <div className="card-image">
          <figure className="image">
            <img
              src={product.img}
              alt="product img"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-6">{product.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card