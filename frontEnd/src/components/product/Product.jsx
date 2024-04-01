import React from 'react'
import "./Product.css"

const Product = (props) => {
  // Định dạng giá cả
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className='product'>
        <img src={props.image || 'placeholder-image-url'} alt={props.name} />
        <p>{props.name}</p>
        <div className="product-prices">
            <div className="product-price-new">
                {formatPrice(props.new_price)}
            </div>
            {props.old_price && <div className="product-price-old">
                {formatPrice(props.old_price)}
            </div>}
        </div>
    </div>
  )
}

export default Product
