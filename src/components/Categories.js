import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";



export const Categories = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Nombre de Categoría", width: 200 },
    {
      field: "edit",
      headerName: "Editar",
      width: 100,
      renderCell: (params) => (
        <div style={{ cursor: "pointer" }}>
          <EditIcon
            color="primary"
            onClick={() => handleEdit(params.row.id)}
            style={{ display: params.row.selected ? "block" : "none" }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    allCategories();
  }, []);

  const handleEdit = (id) => {
    
    console.log(`Editar la fila con ID ${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/admin/categories", { name })
      .then((res) => {
        console.log("Categoría creada:", res.data);
        setName("");
        allCategories();
      })
      .catch((error) => {
        console.error("Error al crear categoría:", error);
      });
  };

  const allCategories = () => {
    axios
      .get("http://localhost:3001/admin/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error("Error al traer las categorías", error);
      });
  };



  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 100,
          right: 15,
          height: 400,
          width: "70%",
        }}
      >
        <DataGrid
          rows={categories}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>

      <div style={{ marginTop: "500px", textAlign: "center" }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <TextField
              required
              helperText="Ingrese nueva categoría"
              id="demo-helper-text-aligned"
              label="Categoría"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Fab color="primary" aria-label="add" type="submit">
            <AddIcon />
          </Fab>
        </Box>
      </div>
    </>
  );
};