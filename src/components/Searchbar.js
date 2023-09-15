import React, { useState } from 'react';
import Grid from './Grid';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Typography, TextField, Button, Container, Box, Paper } from '@mui/material';

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
            toast.info('No buscaste nada!');
        }
    };

    const handleInputChange = (e) => {
        const inputText = e.target.value;
        const lettersOnly = inputText.replace(/[^A-Za-z]/g, '');
        setSearchProduct(lettersOnly);
    };

    return (
        <div>
            <Box component={Paper} elevation={3} className="header" p={3} width="93%" mx="auto">
                <Container style={{marginTop:'50px'}} maxWidth="md">
                    <Typography variant="h3" align="center">
                        En el horno
                    </Typography>
                    <Typography variant="subtitle1" align="center" mt={2}>
                        Bienvenidos a nuestro humilde e-commerce
                    </Typography>
                    <form onSubmit={handleSearchSubmit}>
                        <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
                            <TextField variant="outlined" type="text" name="search" placeholder="Qué se te antoja?" onChange={handleInputChange} mr={2} />
                            <Button variant="contained" color="primary" type="submit" style={{marginLeft:'10px'}}>
                                BUSCAR
                            </Button>
                        </Box>
                    </form>
                </Container>
            </Box>
                {searchedProducts.length === 0 ? null : <Grid products={searchedProducts} />}
        </div>
    );
};
        {/* <div className='header'>
            <Container maxWidth="md">
                <Box mt={4} p={3} boxShadow={3}>
                    <Typography variant="h4" align="center">
                        En el horno
                    </Typography>
                    <Typography variant="subtitle1" align="center" mt={2}>
                        Bienvenidos a nuestro humilde e-commerce
                    </Typography>
                    <form onSubmit={handleSearchSubmit}>
                        <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
                            <TextField fullWidth variant="outlined" type="text" name="search" placeholder="Qué se te antoja?" onChange={handleInputChange} />
                            <Button variant="contained" color="primary" type="submit">
                                BUSCAR
                            </Button>
                        </Box>
                    </form>
                </Box>
                {searchedProducts.length === 0 ? null : <Grid products={searchedProducts} />}
            </Container>
        </div> */}


   /*      <div>
            <div className="search-container">
                <h1>En el horno</h1>
                <p>Bienvenidos a nuestro humilde e-commerce</p>
                <div className="searchbar">
                    <input type="text" name="search" placeholder="Que se te antoja?" onChange={handleInputChange}></input>
                    <button onClick={handleSearchSubmit}>BUSCAR</button>
                </div>
            </div>
            {searchedProducts.length === 0 ? null : <Grid products={searchedProducts} />}
        </div> */