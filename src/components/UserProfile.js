import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Alert,
} from "@mui/material";

function UserProfile({ user, updateUser }) {
  const [userData, setUserData] = useState({
    email: user?.email || "", // Si user es null o undefined, establece una cadena vacía como valor predeterminado.
    name: user?.name || "",
    last_name: user?.last_name || "",
    address: user?.address || "",
  });

  const navigate = useNavigate();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [nameErrorMessage, setNameErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    // Validación del email
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValidEmail(emailRegex.test(value));
    }

    // Validación del nombre (solo letras, sin números y no vacío)
    const nameRegex = /^[A-Za-z\s]+$/;
    const isValid = nameRegex.test(value) && value.trim() !== ""; // Nombre no vacío
    setIsValidName(isValid);

    // Actualiza el mensaje de error si el nombre no es válido
    if (!isValid) {
      setNameErrorMessage(
        "El nombre debe contener solo letras y no puede estar vacío."
      );
    } else {
      setNameErrorMessage(""); // Borra el mensaje de error si el nombre es válido
    }
  };

  const handleProfileUpdate = () => {
    console.log("Botón de guardar clickeado");
    // Realiza una solicitud al servidor para actualizar el perfil (como se mencionó en la respuesta anterior).
    axios
      .put("http://localhost:3001/user/profile", userData, {
        withCredentials: true,
      })
      .then((response) => {
        // Actualiza el estado del usuario en la aplicación mediante la función updateUser.
        updateUser(response.data);

        // Redirige al usuario a la página de inicio.
        navigate("/");
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error);
      });
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Perfil de Usuario
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                error={!isValidEmail} // Cambiar el borde a rojo si el email no es válido
                helperText={!isValidEmail ? "Email no válido" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                error={!isValidName}
                helperText={nameErrorMessage}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Apellido"
                variant="outlined"
                fullWidth
                name="last_name"
                value={userData.last_name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Dirección"
                variant="outlined"
                fullWidth
                name="address"
                value={userData.address}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <div style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleProfileUpdate}
              disabled={!isValidEmail || !isValidName}
            >
              Guardar Cambios
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
}

export default UserProfile;
