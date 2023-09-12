import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import LayersIcon from "@mui/icons-material/Layers";
import BakeryDiningRoundedIcon from "@mui/icons-material/BakeryDiningRounded";
import { Categories } from "./Categories";
import React, { useState } from 'react'

const Sidebar = () => {
  const [showCategories, setShowCategories] = useState(false);

  const handleCategoriesClick = () => {
    setShowCategories(!showCategories);
  }
  
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 60,
          left: 0,
          width: "15%",
        }}
      >
        <React.Fragment>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Tablero" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Ordenes" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <BakeryDiningRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Productos" />
          </ListItemButton>
          <ListItemButton onClick={handleCategoriesClick}>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Categorías" />
          </ListItemButton>
        </React.Fragment>
      </div>
      {showCategories && <Categories />}
    </>
  );
}

export default Sidebar