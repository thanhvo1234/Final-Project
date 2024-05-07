import React, { useState, useEffect } from "react";
import { useGetProduct } from "../../hooks/useProduct";
import CardProduct from "../../components/product/Product";
import "./SearchPage.css";
import { getCategoryAPI } from "../../api/apiUrl";

const SearchPage = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategoryAPI()
      .then((response) => {
        if (response && response.data && response.data.categories) {
          setCategories(response.data.categories.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const initialSearchParams = {
    page: 1,
    take: 10,
    searchByName: "",
    categoryId: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
  };
  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const { data: products, isLoading, isError } = useGetProduct(searchParams);

  const handleSearchInputChange = (e) => {
    setSearchParams({...searchParams, searchByName: e.target.value});
  };

  const handleCategoryChange = (e) => {
    setSearchParams({...searchParams, categoryId: e.target.value});
  };

  const handlePriceRangeChange = (e) => {
    const [minPrice, maxPrice] = e.target.value.split("-");
    setSearchParams({...searchParams, minPrice, maxPrice});
  };

  const handleSortChange = (e) => {
    setSearchParams({...searchParams, sortBy: e.target.value});
  };

  const clearFilters = () => {
    setSearchParams(initialSearchParams);
  };

  return (
    <div className="search-page-container">
      <div className="filters">
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={searchParams.searchByName}
          onChange={handleSearchInputChange}
        />
        <div className="category-filters">
          <p>Select Category</p>
          {categories.map((category) => (
            <div key={category.id}>
              <input
                type="radio"
                id={`cat-${category.id}`}
                name="category"
                value={category.id}
                checked={searchParams.categoryId === category.id}
                onChange={handleCategoryChange}
              />
              <label htmlFor={`cat-${category.id}`}>{category.nameCategory}</label>
            </div>
          ))}
        </div>
        <div className="price-filters">
          <p>Select Price Range</p>
          {["0-100000", "100000-250000", "250000-500000", "500000-up"].map((range, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`price-${index}`}
                name="price"
                value={range}
                onChange={handlePriceRangeChange}
                checked={searchParams.minPrice + '-' + searchParams.maxPrice === range}
              />
              <label htmlFor={`price-${index}`}>{range.replace("-", " to ").replace("up", "and up")}</label>
            </div>
          ))}
        </div>
        <div className="sort-filters">
          <p>Sort By</p>
          <div>
            <input
              type="radio"
              id="sort-price_asc"
              name="sort"
              value="price_asc"
              checked={searchParams.sortBy === "price_asc"}
              onChange={handleSortChange}
            />
            <label htmlFor="sort-price_asc">Price Low to High</label>
          </div>
          <div>
            <input
              type="radio"
              id="sort-price_desc"
              name="sort"
              value="price_desc"
              checked={searchParams.sortBy === "price_desc"}
              onChange={handleSortChange}
            />
            <label htmlFor="sort-price_desc">Price High to Low</label>
          </div>
        </div>
        <button className="clear-filters-button" onClick={clearFilters}>Clear Filters</button>
      </div>
      <div className="products-list">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error occurred while fetching products.</p>
        ) : (
          products?.data?.data.map((product) => (
            <CardProduct key={product.id} data={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
