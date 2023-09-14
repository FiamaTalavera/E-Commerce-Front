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

export const Categories = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editingCategoryName, setEditingCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const handleKeyDown = (event, id) => {
    if (event.key === "Enter") {
      handleSave(id);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "name",
      headerName: "Categoría",
      width: 200,
      renderCell: (params) => (
        <>
          <input
            value={
              edit && editingCategoryId === params.row.id
                ? editingCategoryName
                : params.row.name
            }
            disabled={!edit || editingCategoryId !== params.row.id}
            style={{
              width: 100,
              border: "none",
              background: "white",
              color: "black",
              padding: "8px",
            }}
            onChange={(e) => setEditingCategoryName(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, params.row.id)}
          />
        </>
      ),
    },
    {
      field: "edit",
      headerName: "Editar",
      width: 200,
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
      width: 150,
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
    allCategories();
  }, []);

  const handleEdit = (id, categoryName) => {
    setEditingCategoryId(id);
    setEditingCategoryName(categoryName);
    setEdit(true);
  };

  const handleSave = () => {
    axios
      .put(`${process.env.REACT_APP_URLBACK}/admin/categories/${editingCategoryId}`, {
        name: editingCategoryName,
      })
      .then((res) => {
        console.log("Categoría modificada:", res.data);
        setEdit(false);
        setEditingCategoryId(null);
        setEditingCategoryName("");
        allCategories();
      })
      .catch((error) => {
        console.error("Error al modificar categoría:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_URLBACK}/admin/categories`, { name })
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
      .get(`${process.env.REACT_APP_URLBACK}/admin/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error("Error al traer las categorías", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_URLBACK}/admin/categories/${id}`)
      .then((res) => {
        console.log("Categoría eliminada:", res.data);
        allCategories();
      })
      .catch((error) => {
        console.error("Error al eliminar categoría:", error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "10%"
      }}
    >
      <div>
        <DataGrid
          rows={categories}
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
    </div>
  );
};
