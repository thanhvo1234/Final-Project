/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import "./Product.css";
import { Link } from 'react-router-dom';

const CardProduct = ({ data }) => {
  const { id, sku, nameProduct, image, price, old_price } = data;

  // Format price using USD currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <div className='product'>
      <Link to={`/productDetail/${sku}`}>
        <img src={image || 'placeholder-image-url'} alt={nameProduct || 'CardProduct Image'} />
      </Link>
      <p>{nameProduct}</p>
      <div className="product-prices">
        <div className="product-price-new">
          {formatPrice(price)}
        </div>
        {old_price && (
          <div className="product-price-old">
            {formatPrice(old_price)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardProduct;