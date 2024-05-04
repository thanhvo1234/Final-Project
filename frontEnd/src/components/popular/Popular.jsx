/* eslint-disable no-unused-vars */
import React from 'react';
import "./Popular.css";
import { useGetProducts } from '../../hooks/useProduct';
import CardProduct from '../product/Product';

const Popular = () => {
    const { data: popular, isLoading, error } = useGetProducts();
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading products!</p>;
    return (
        <div className='popular'>
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="popular-product">
                {popular.data.data.slice(0, 4).map((product) => (
                    <CardProduct
                        key={product.id}
                        data={product}
                    />
                ))}
            </div>
        </div>
    );
};

export default Popular;