/* eslint-disable no-unused-vars */
import React from 'react';
import './CartItems.css';
import { useGetCartData, useRemoveCartItemFromCart, useIncreaseProductQuantity, useDecreaseProductQuantity } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import { formatCurrency } from '../../helpers/format';

const CartItems = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const cartId = user?.cart.id;

  const { data: cartData, refetch } = useGetCartData(cartId);
  console.log(cartData,"cart")
  const removeCartItemMutation = useRemoveCartItemFromCart();
  const increaseProductQuantityMutation = useIncreaseProductQuantity();
  const decreaseProductQuantityMutation = useDecreaseProductQuantity();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    navigate("/shippingAddress");
  };
  const handleRemoveItem = async (itemId) => {
    try {
      await removeCartItemMutation.mutateAsync(itemId);
      refetch();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleIncreaseQuantity = async (itemId) => {
    try {
      await increaseProductQuantityMutation.mutateAsync({ cartId, productId: itemId });
      refetch();
    } catch (error) {
      console.error('Error increasing item quantity:', error);
    }
  };

  const handleDecreaseQuantity = async (itemId) => {
    try {
      await decreaseProductQuantityMutation.mutateAsync({ cartId, productId: itemId });
      refetch();
    } catch (error) {
      console.error('Error decreasing item quantity:', error);
    }
  };

  if (!cartData || !cartData?.data.items || cartData?.data?.items?.length === 0) {
    return <div className='cartitems'>Your cart is empty</div>;
  }

  return (
    <div className='cartitems'>
      <div className='cartitems-format-main'>
        <p>Products</p>
        <p></p>
        <p>Price</p>
        <p>Discount(%)</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Action</p>
      </div>
      <hr />

      {cartData?.data.items.map((item) => (
        <div key={item.id}>
          <div className='cartitems-format cartitems-format-main'>
            <img src={item.product.image} alt='' className='carticon-product-icon' />
            <p>{item.product.nameProduct}</p>
            <p>{formatCurrency(item.product.price)}</p>
            <p>{item.product.coupon}%</p>
            <div className='quantity-controls'>
            <button onClick={() => handleDecreaseQuantity(item.id)}> - </button>
            <span>{item.quantity}</span>
            <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
          </div>
            <p>{formatCurrency(item.total)}</p>
            <button className='buttonRemoveItem' onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </div>
          <hr />
        </div>
      ))}

      <div className='cartitems-down'>
        <div className='cartitems-total'>
          <h1>Cart Totals</h1>
          <div className='showCart'>
            <div className='cartitems-total-item'>
              <p>Product for Product</p>
              <p>{formatCurrency(cartData?.data.totalPrice)}</p>
            </div>
            <hr />
            <div className='cartitems-total-item'>
              <p>Shipping Fee</p>
              <p>{formatCurrency(20000)}</p>
            </div>
            <hr />
            <div className='cartitems-total-item'>
              <p>Tax Fee</p>
              <p>{formatCurrency(cartData?.data.totalPrice * 0.01)}</p>
            </div>

            <hr />
            <div className='cartitems-total-item'>
              <h3>Total</h3>
              <h3>{formatCurrency(cartData?.data.totalPrice*1.01+20000)}</h3>
            </div>
          </div>
          <div className='create-order-container'>
              <button onClick={handleProceedToCheckout}>Create Order</button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CartItems;
