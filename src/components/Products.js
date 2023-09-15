import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { toast } from 'react-toastify';

export const Products = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageURL, setImageURL] = useState("");
  const [stock, setStock] = useState(0);
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState(null)


  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "description", headerName: "Descripcion", width: 250 },
    { field: "price", headerName: "Precio", width: 100 },
    { field: "imageURL", headerName: "URL Imagen", width: 600 },
    { field: "stock", headerName: "Stock", width: 100 },
    { field: "categoryId", headerName: "Categoria", width: 150},

    {
      field: "edit",
      headerName: "Editar",
      width: 100,
      renderCell: (params) => (
        <div style={{ cursor: "pointer" }}>
          <EditIcon
            color="primary"
            onClick={() => handleEdit(params.row.id, params.row.name)}
          />
        </div>
      ),
    },
    {
      field: "delete",
      headerName: "Eliminar",
      width: 100,
      renderCell: (params) => (
        <div style={{ cursor: "pointer" }}>
          <DeleteIcon
            color="primary"
            onClick={() => handleDelete(params.row.id)}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  //

  const clearForm = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setImageURL("");
    setStock(0);
    setCategoryId(null);
  };

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    if (productToEdit) {
      setEditingProductId(id);
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setPrice(productToEdit.price);
      setImageURL(productToEdit.imageURL);
      setStock(productToEdit.stock);
      setEdit(true);
    }
  };

  const handleSave = () => {
    if (!name || !description || price <= 0 || !imageURL || stock < 0) {
      toast.warn('Completa todos los campos.')
      return;
    }

    if (editingProductId) {
      // Editar producto existente
      axios
        .put(`http://localhost:3001/admin/products/modify/${editingProductId}`, {
          name,
          description,
          price,
          imageURL,
          stock,
          categoryId
        })
        .then((res) => {
          // console.log("Producto modificado:", res.data);
          toast.success('Producto modificado correctamente')
          setEdit(false);
          setEditingProductId(null);
          clearForm();
          getAllProducts();
        })
        .catch((error) => {
          toast.error('Error al modificar producto');
          console.error("Error al modificar producto:", error);
        });
    } else {
      // Crear nuevo producto
      axios
        .post("http://localhost:3001/admin/products/addProduct", {
          name,
          description,
          price,
          imageURL,
          stock,
          categoryId
        })
        .then((res) => {
          // console.log("Producto creado:", res.data);
          toast.success('Producto creado correctamente');
          clearForm();
          getAllProducts();
        })
        .catch((error) => {
          toast.error('Error al crear producto');
          console.error("Error al crear producto:", error);
        });
    }
  };

  // Eliminar producto
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/admin/products/${id}`)
      .then(() => {
        // console.log("Producto eliminado");
        toast.info('Producto eliminado correctamente')
        getAllProducts();
      })
      .catch((error) => {
        toast.error('Error al eliminar producto');
        console.error("Error al eliminar producto:", error);
      });
  };

  // Mostrar todos los productos
  const getAllProducts = () => {
    axios
      .get("http://localhost:3001/admin/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error al traer los productos", error);
      });
  };

  // Mostrar todas las categorias
  const getAllCategories = () => {
    axios
    .get("http://localhost:3001/admin/categories")
    .then((res) => {
      setCategories(res.data)
    })
    .catch((error) => {
      console.error("Error al traer las categorias", error)
    })
  }

  return (
    <div 
    style={{ 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      marginTop: "10%" }} >
      <div>
        <DataGrid 
        rows={products}
        columns={columns} 
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        />
      </div>

      <div style={{ marginTop: "3%", textAlign: "center" }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div>
            <TextField
              required
              helperText="Nombre del producto"
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              required
              helperText="Descripción del producto"
              label="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              required
              helperText="Precio del producto"
              label="Precio"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
            <TextField
              required
              helperText="URL de la imagen"
              label="URL de la Imagen"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
            <TextField
              required
              helperText="Stock del producto"
              label="Stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value))}
            />
            <Select
              required
              helperText="Categoria del producto"
              label="Categoria"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {`${category.id} - ${category.name}`}
                </MenuItem>
              ))}
            </Select>
          </div>
          <Fab color="primary" aria-label="add" type="submit">
            <AddIcon />
          </Fab>
        </Box>
      </div>
    </div>
  );
};
