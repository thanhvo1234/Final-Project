/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../components/productDisplay/ProductDisplay';
import { useGetOneProductBySku } from '../hooks/useProduct';

const Product = () => {
    const { sku } = useParams();
    const { data: product, isLoading, isError } = useGetOneProductBySku(sku);
    console.log(product)
    
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching product data</div>;
    
    if (!product) return null; // Or handle this case as needed

    return (
        <div>
            <ProductDisplay product={product} />
        </div>
    );
};

export default Product;