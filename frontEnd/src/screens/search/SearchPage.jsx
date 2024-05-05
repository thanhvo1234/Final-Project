/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useGetProduct } from "../../hooks/useProduct";
import "./SearchPage.css";
import CardProduct from "../../components/product/Product";
const SearchPage = () => {
    const [searchParams, setSearchParams] = useState({
        page: 1,
        take: 10,
        searchByName: "",
        categoryId: "",
        priceRange: "",
        rating: "",
        sortBy: "",
      });
  const { data: products, isLoading, isError } = useGetProduct(searchParams);
      console.log(products,"aaaa")
  const handleSearchInputChange = (e) => {
    setSearchParams({
      ...searchParams,
      searchByName: e.target.value,
    });
  };

  const handleSearch = () => {
    // Here you can call the search function or simply let the useGetProduct hook trigger the search
    // because it is already listening to the searchParams changes.
  };

  return (
    <div className="search-screen">
      <div className="filters">
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={searchParams.searchByName}
          onChange={handleSearchInputChange}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>

      </div>

      <div className="products-list">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error occurred while fetching products.</p>
        ) : (
          products?.data.data.map((product) => (
            <CardProduct key={product.id} data={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;