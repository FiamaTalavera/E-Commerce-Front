import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import RegisterImg from "../assets/RegisterImg.png";

const Register = ({ updateUser }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    last_name: "",
    address: "",
    is_admin: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Verifica si el tipo de campo es un checkbox
    const newValue = type === "checkbox" ? checked : value;

    setData({
      ...data,
      [name]: newValue,
    });

    // Llama a la validación de contraseña aquí
    if (name === "password") {
      validatePassword();
    } else if (name === "name") {
      validateName(newValue);
    }
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    // Actualiza el valor del campo de correo electrónico en el estado
    setData({
      ...data,
      [name]: value,
    });

    // Valida el correo electrónico
    validateEmail(value);
  };

  const validateEmail = (emailValue) => {
    if (!emailValue) {
      setEmailError("El correo electrónico es obligatorio");
    } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
      setEmailError("El correo electrónico no es válido");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (!data.password) {
      setPasswordError("La contraseña es obligatoria.");
    } else if (data.password.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres.");
    } else {
      setPasswordError("");
    }
  };

  const validateName = (nameValue) => {
    if (!nameValue) {
      setNameError("El nombre es obligatorio");
    } else if (!/^[a-zA-Z]+$/.test(nameValue)) {
      setNameError("El nombre debe contener solo letras");
    } else {
      setNameError("");
    }
  };

  const validateLastName = (nameValue) => {
    if (!nameValue) {
      setLastNameError("El apellido es obligatorio");
    } else if (!/^[a-zA-Z]+$/.test(nameValue)) {
      setLastNameError("El apellido debe contener solo letras");
    } else {
      setLastNameError("");
    }
  };

  const validateAddress = (addressValue) => {
    if (!addressValue) {
      setAddressError("La dirección es obligatoria");
    } else {
      setAddressError(""); // Reinicia el mensaje de error si la dirección está presente
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail(data.email);
    validatePassword(data.password);
    validateName(data.name);
    validateLastName(data.last_name);
    validateAddress(data.address);

    if (data.password !== data.confirmPassword) {
      // Las contraseñas no coinciden, muestro un mensaje de error
      setError("Las contraseñas no coinciden");
      return;
    }

    if (
      !data.name ||
      typeof data.name !== "string" ||
      data.name.trim().length < 3 ||
      !/^[a-zA-Z]+$/.test(data.name)
    ) {
      setNameError("El nombre es obligatorio y no puede contener números.");
      return;
    }

    if (
      !data.last_name ||
      typeof data.last_name !== "string" ||
      data.last_name.trim().length < 2 ||
      !/^[a-zA-Z]+$/.test(data.last_name)
    ) {
      setLastNameError("El apellido es obligatorio");
      return; // Evita continuar con el registro
    }

    // Validación adicional para el campo "Dirección"
    if (
      !data.address ||
      typeof data.address !== "string" ||
      data.address.trim().length === 0
    ) {
      setAddressError("La dirección es obligatoria");
      return; // Evita continuar con el registro
    }

    axios
      .post(`${process.env.REACT_APP_URLBACK}/user/register`, data)
      .then((response) => {
        const responseData = response.data;
        console.log("Registro exitoso!", responseData);
        setIsRegistered(true);
        navigate("/user/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (isRegistered) {
    return null;
  }

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${RegisterImg})`,
            objectFit: "contain",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, backgroundColor: "#BD8544" }}>
              <LocalCafeIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Crea tu cuenta
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                id="name"
                label="Nombre"
                name="name"
                value={data.name}
                onChange={handleChange}
                autoComplete="name"
                autoFocus
                error={!!nameError}
                helperText={nameError}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                type="email"
                id="email"
                label="Correo electrónico"
                name="email"
                value={data.email}
                onChange={handleEmailChange}
                error={!!emailError} // Indica si hay un error
                helperText={emailError} // Muestra el mensaje de error
                autoComplete="email"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                name="password"
                label="Contraseña"
                id="password"
                autoComplete="current-password"
                value={data.password}
                onChange={handleChange}
                error={!!passwordError}
                helperText={passwordError}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                name="confirmPassword"
                label="Confirmar Contraseña"
                id="confirmPassword"
                autoComplete="new-password"
                value={data.confirmPassword}
                onChange={handleChange}
              />
              {/* {error && <p style={{ color: "red" }}>{error}</p>} */}

              <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                id="last_name"
                label="Apellido"
                name="last_name"
                value={data.last_name}
                onChange={handleChange}
                autoComplete="last_name"
                autoFocus
                error={!!lastNameError}
                helperText={lastNameError}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                id="address"
                label="Dirección"
                name="address"
                value={data.address}
                onChange={handleChange}
                autoComplete="address"
                autoFocus
                error={!!addressError}
                helperText={addressError}
              />

              <TextField
                margin="normal"
                fullWidth
                type="text"
                id="is_admin"
                label="Administrador"
                name="is_admin"
                value={data.is_admin}
                onChange={handleChange}
                autoComplete="is_admin"
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={data.password.length < 8}
              >
                Registrarse
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Register;
