import React from 'react'
import "./Popular.css"
import data_product from "../../assets/data"
import Item from "../product/Product"

const Popular = () => {
  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-product">
        {data_product.map((product,i)=>{
            return <Item key={i} id={product.id} name={product.name} image={product.image} new_price={product.new_price} old_price={product.old_price}/>
        })}
      </div>
    </div>
  )
}

export default Popular
