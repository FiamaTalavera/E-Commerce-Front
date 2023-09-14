import React from 'react';
import { Searchbar } from './Searchbar';
import Grid from './Grid';

export const Home = ({ products, onSearch, searchedProducts }) => {
    return (
        <div>
            <Searchbar onSearch={onSearch} searchedProducts={searchedProducts} />
            <Grid products={products} />
        </div>
    );
};
