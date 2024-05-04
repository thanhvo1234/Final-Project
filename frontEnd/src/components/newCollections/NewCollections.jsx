/* eslint-disable no-unused-vars */
import React from 'react';
import "./NewCollections.css";  // Ensure the CSS file name is correct
import { useGetProducts } from '../../hooks/useProduct';
import CardProduct from '../product/Product';

const NewCollections = () => {
    const { data, isLoading, error } = useGetProducts();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading products!</p>;
    if (!data || !data.data || !data.data.data.length) return <p>No products found!</p>;

    return (
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {data.data.data.map((product) => (
                    <CardProduct
                        key={product.id}
                        data={product}
                    />
                ))}
            </div>
        </div>
    );
};

export default NewCollections;