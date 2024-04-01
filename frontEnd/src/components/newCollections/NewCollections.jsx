import React from 'react'
import "./NewCollections.css"
import new_collection from "../../assets/new_collections"
import Item from "../product/Product"

const NewCollections = () => {
  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {new_collection.map((product,i)=>{
                return <Item key={i} id={product.id} name={product.name} image={product.image} new_price={product.new_price} old_price={product.old_price}/>
            })}

        </div>
    </div>
  )
}

export default NewCollections

