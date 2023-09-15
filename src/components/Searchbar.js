import React, { useState } from "react";
import Content from "./Content";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  Paper,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const Searchbar = ({ onSearch, searchedProducts }) => {
  const [searchProduct, setSearchProduct] = useState("");
  const navigate = useNavigate();

  const [categories, setCategories] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  const [storageCategory, setStorageCategory] = React.useState("");

  const handleSearch = () => {
    axios
      .get(`http://localhost:3001/products/search/${searchProduct}`)
      .then((res) => {
        onSearch(res.data);
      })
      .catch((error) => {
        toast.warn("No hay productos");
        console.error("No hay productos", error);
      });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchProduct) {
      handleSearch();
      navigate(`/search?query=${searchProduct}`);
    } else {
      toast.info("No buscaste nada!");
    }
  };

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    const lettersOnly = inputText.replace(/[^A-Za-z]/g, "");
    setSearchProduct(lettersOnly);
  };

  React.useEffect(() => {
    allCategories();
  }, []);

  const allCategories = () => {
    axios
      .get(`${process.env.REACT_APP_URLBACK}/admin/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error("Error al traer las categorías", error);
      });
  };

  const handleChange = (categoryId) => {
    axios
      .get(`${process.env.REACT_APP_URLBACK}/products/category/${categoryId}`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        setStorageCategory(categoryId);
        navigate(`/searchCategory?query=${categoryId}`);

      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  };

  return (
    <div>
      <Box
        component={Paper}
        elevation={3}
        className="header"
        p={3}
        width="93%"
        mx="auto"
      >
        <Container style={{ marginTop: "50px" }} maxWidth="md">
          <Typography variant="h3" align="center">
            En el horno
          </Typography>
          <Typography variant="subtitle1" align="center" mt={2}>
            Bienvenidos a nuestro humilde e-commerce
          </Typography>
          <form onSubmit={handleSearchSubmit}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt={4}
            >
              <TextField
                variant="outlined"
                type="text"
                name="search"
                placeholder="Qué se te antoja?"
                onChange={handleInputChange}
                mr={2}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginLeft: "10px" }}
              >
                BUSCAR
              </Button>
            </Box>
          </form>
        </Container>
        <Box sx={{ minWidth: 120 }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Categorías
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={storageCategory}
              onChange={(event) => handleChange(event.target.value)}
              label="Productos"
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      {searchedProducts.length === 0 ? (
        storageCategory ? (
          <Content products={products} />
        ) : null
      ) : (
        <Content products={searchedProducts} />
      )}
    </div>
  );
};