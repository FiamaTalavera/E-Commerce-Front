import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Box } from '@mui/material';

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
  );
};
