/* eslint-disable no-unused-vars */
import React from "react";
import { useParams } from "react-router-dom";
import ProductDisplay from "../components/productDisplay/ProductDisplay";
import { useGetOneProductBySku } from "../hooks/useProduct";
import CardProduct from "../components/product/Product";

const Product = () => {
  const { sku } = useParams();
  const { data: product, isLoading, isError } = useGetOneProductBySku(sku);
  console.log(product);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching product data</div>;

  if (!product) return null; // Or handle this case as needed

  return (
    <div>
      <ProductDisplay product={product.product} />
      <h1>Realated product by Brand:</h1>
      <div className="popular-product">
        {product.relatedProductsByBrand.map((product) => (
          <CardProduct key={product.id} data={product} />
        ))}
      </div>
      <h1>Realated product by Category:</h1>
      <div className="popular-product">
        {product.relatedProductsByCategory.map((product) => (
          <CardProduct key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Product;
