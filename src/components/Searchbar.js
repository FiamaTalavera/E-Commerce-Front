import React, { useState } from 'react';
import Grid from './Grid';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export const Searchbar = ({ onSearch, searchedProducts }) => {
    const [searchProduct, setSearchProduct] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        axios
            .get(`http://localhost:3001/products/search/${searchProduct}`)
            .then((res) => {
                    onSearch(res.data);
            })
            .catch((error) => {
                toast.warn('No hay productos');
                console.error('No hay productos', error);
            });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchProduct) {
            handleSearch();
            navigate(`/search?query=${searchProduct}`);
        } else {
            toast.info('No buscaste nada!')
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
