import React from 'react'
import "./Product.css"
import { Link } from 'react-router-dom';

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
        <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image || 'placeholder-image-url'} alt={props.name} /></Link>
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
