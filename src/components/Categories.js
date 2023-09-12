import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit'

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Nombre de Categoría', width: 200 },
  {
    field: 'edit',
    headerName: 'Editar',
    width: 100,
    renderCell: (params) => (
      <div style={{ cursor: 'pointer' }}>
        <EditIcon color="primary" />
      </div>
    ),
  },
];


const rows = [
  { id: 1, name: 'Salado' },
  { id: 2, name: 'Dulce' },
  { id: 3, name: 'Bebidas' }
];


export const Categories = () => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/admin/categories", { name })
      .then((res) => {
        console.log("Categoría creada:", res.data);
        setName("");
      })
      .catch((error) => {
        console.error("Error al crear categoría:", error);
      });
  };


  return (
    <>
      <div style={{ position: "fixed", top: 100, right: 15, height: 400, width: "70%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
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
