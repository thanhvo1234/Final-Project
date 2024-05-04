import React, { useContext } from 'react'
import "../shopCategory/ShopCategory.css"
import { ShopContext } from '../../context/ShopContext'
import dropdown_icon from "../../assets/dropdown_icon.png"
import Item from "../../components/product/Product"
import all_product from "../../assets/all_product"
import CartItems from '../../components/cartItems/CartItems'


const ShopCategory = (props) => {
  console.log(props.someProperty);
  const {all_product} = useContext(ShopContext);
  return (
    <div className='shop-category'>
      <img src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {Array.isArray(all_product) && all_product.map((product, i) => {
          // Chỉ render sản phẩm nếu chúng thuộc danh mục được chọn
          if (props.category === product.category) {
            return (
              <CartItems 
                key={i} 
                id={product.id} 
                name={product.name} 
                image={product.image} 
                new_price={product.new_price} 
                old_price={product.old_price} 
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
}

export default ShopCategory;