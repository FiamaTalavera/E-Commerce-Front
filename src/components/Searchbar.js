import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const Searchbar = ({ onSearch, searchedProducts }) => {
    const [searchProduct, setSearchProduct] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        axios
            .get(`http://localhost:3001/products/search/${searchProduct}`)
            .then((res) => {
                if (res.data.length === 0) {
                    console.log('No hay productos');
                } else {
                    onSearch(res.data);
                }
            })
            .catch((error) => {
                console.error('No hay producto', error);
            });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchProduct) {
            handleSearch();
            navigate(`/search?query=${searchProduct}`);
        } else {
            console.log('No buscaste nada!!!');
            // onSearch([]);
            // navigate('/');
        }
    };

    const handleInputChange = (e) => {
        const inputText = e.target.value;
        const lettersOnly = inputText.replace(/[^A-Za-z]/g, '');
        setSearchProduct(lettersOnly);
    };

    return (
        <div>
            <div className="search-container">
                <h1>En el horno</h1>
                <p>Bienvenidos a nuestro humilde e-commerce</p>
                <div className="searchbar">
                    <input type="text" name="search" placeholder="Que se te antoja?" onChange={handleInputChange}></input>
                    <button onClick={handleSearchSubmit}>BUSCAR</button>
                </div>
            </div>
            {searchedProducts.length === 0 ? null : <Grid products={searchedProducts} />}
        </div>
    );
};
