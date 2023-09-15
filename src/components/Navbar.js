import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import logo from "../assets/Diseño sin título.png";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";


function ResponsiveAppBar({ user, handleLogout, clearSearch }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [age, setAge] = React.useState("");
  const [categories, setCategories] = React.useState([]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
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

  return (
    <AppBar position="static" sx={{ backgroundColor: "#BD8544" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters color="color">
          <img
            src={logo}
            alt="Nombre de tu sitio web"
            width="50"
            height="330"
            style={{ marginRight: "30px" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            onClick={clearSearch}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EN EL HORNO
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Categorías
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
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

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            onClick={clearSearch}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EN EL HORNO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              user.is_admin ? (
                <Link to="/admin">
                  <Tooltip title="Tablero">
                    <IconButton sx={{ marginRight: 5 }}>
                      <SpaceDashboardIcon />{" "}
                    </IconButton>
                  </Tooltip>
                </Link>
              ) : (
                <Link to="/order">
                  <Tooltip title="Carrito">
                    <IconButton sx={{ marginRight: 5 }}>
                      <ShoppingCartIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
              )
            ) : (
              ""
            )}
            <Tooltip title="Opciones">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? (
                  <Avatar
                    alt={user.name}
                    src="https://media.istockphoto.com/id/1145853297/es/vector/icono-plano-de-croissant-pixel-perfect-para-m%C3%B3vil-y-web.jpg?s=612x612&w=0&k=20&c=BMxQ22rww2sSlBwZf-4i9YBkZGgmM4MziDVQon_YdEI="
                  />
                ) : (
                  <Avatar
                    alt="Remy Sharp"
                    src="https://static.vecteezy.com/system/resources/previews/007/214/842/non_2x/croissant-glyph-icon-crescent-roll-silhouette-symbol-negative-space-isolated-illustration-vector.jpg"
                  />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user
                ? [
                    <MenuItem key="profile">
                      <Link to="/user/profile">
                        <Typography textAlign="center" sx={{ color: "black" }}>
                          Perfil
                        </Typography>
                      </Link>
                    </MenuItem>,
                    user.is_admin ? null : ( // Verifica si el usuario no es un administrador
                      <MenuItem key="history">
                        <Link to="/user/history">
                          <Typography
                            textAlign="center"
                            sx={{ color: "black" }}
                          >
                            Historial
                          </Typography>
                        </Link>
                      </MenuItem>
                    ),
                    <MenuItem key="logout" onClick={handleLogout}>
                      <Link to="/">
                        <Typography textAlign="center" sx={{ color: "black" }}>
                          Salir
                        </Typography>
                      </Link>
                    </MenuItem>,
                  ]
                : [
                    <MenuItem key="register" onClick={handleCloseUserMenu}>
                      <Link to="/user/register">
                        <Typography textAlign="center" sx={{ color: "black" }}>
                          Registrarse
                        </Typography>
                      </Link>
                    </MenuItem>,
                    <MenuItem key="login" onClick={handleCloseUserMenu}>
                      <Link to="/user/login">
                        <Typography textAlign="center" sx={{ color: "black" }}>
                          Ingresar
                        </Typography>
                      </Link>
                    </MenuItem>,
                  ]}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
