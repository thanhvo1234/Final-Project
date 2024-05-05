/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import "./ProductDisplay.css";
import { useAddToCart } from '../../hooks/useCart';

const ProductDisplay = ({ product }) => {
  const addToCartMutation = useAddToCart();
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };
  const user = JSON.parse(localStorage.getItem('user'));
  const cartId = user?.cart?.id;  // Use optional chaining to avoid errors if 'user' or 'cart' is undefined

  const handleAddToCart = () => {
    if (cartId && product?.id) {  // Check if both cartId and productId are available
      addToCartMutation.mutate({ cartId, productId: product.id });
    } else {
      console.error('Cart ID or Product ID is missing');  // Error handling if IDs are not available
    }
  };

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt={product.nameProduct} />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.nameProduct}</h1>
        <div className="productdisplay-right-stars">
          <p>({product.quantity})</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-new">{formatPrice(product.price)}</div>
        </div>
        <div className="productdisplay-right-description">
          {product.description}
        </div>
        <button onClick={handleAddToCart} disabled={addToCartMutation.isLoading}>ADD TO CART</button>
        {addToCartMutation.isError && <p>Error adding product to cart.</p>}
        <p className='productdisplay-right-category'><span>Category :</span>{product.category.nameCategory}</p>
        <p className='productdisplay-right-category'><span>Brand :</span>{product.brand.nameBrand}</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
