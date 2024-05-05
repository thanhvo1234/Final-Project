/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import "./NewCollections.css";
import { useGetProducts } from '../../hooks/useProduct';
import Product from '../product/Product';
import Pagination from '../pagination/Pagination';

const NewCollections = () => {
    const [reload, setReload] = useState(false);
    const [table, setTable] = useState({
        page: 1,
        take: 8,
    });

    const paginateOptions = {
        page: table.page,
        take: table.take,
    };

    const {
        data: newCollection,
        isLoading,
        error,
        refetch // Function to refetch data from useGetProducts hook
    } = useGetProducts({ ...paginateOptions, reload });

    useEffect(() => {
        // Refetch data when pagination settings change
        refetch();
    }, [table, reload, refetch]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading products!</p>;

    return (
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {newCollection.data.data.map((product) => (
                    <Product
                        key={product.id}
                        data={product}
                    />
                ))}
            </div>
            <div className="pagination">
                <Pagination
                 items={newCollection?.data} table={table} setTable={setTable} />
            </div>
        </div>
    );
};

export default NewCollections;