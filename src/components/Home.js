import React from 'react';
import { Searchbar } from './Searchbar';
import Content from './Content';

export const Home = ({ products, onSearch, searchedProducts }) => {
    return (
        <div>
            <Searchbar onSearch={onSearch} searchedProducts={searchedProducts} />
            <Content products={products} />
        </div>
    );
};
