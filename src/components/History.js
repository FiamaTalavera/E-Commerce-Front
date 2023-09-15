import React, { useEffect, useState } from "react";
import axios from "axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import formatDistanceToNow from "./utils";
import {
  Box,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
} from "@mui/material";

const History = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URLBACK}/user/history`, {
        withCredentials: true,
      })
      .then((res) => {
        setProducts(res.data);
        // console.log("ESTO TRAE ----->", products);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ width: "50%" }}>
        <CardHeader title="Historial de pedidos" />
        <List>
          {products.map((product, index) => {
            const hasDivider = index < products.length - 1;
            const ago = formatDistanceToNow(product.updatedAt);
            
            return (
              <ListItem divider={hasDivider} key={product.id}>
                <ListItemAvatar>
                  {product.product.imageURL ? (
                    <Box
                      component="img"
                      src={product.product.imageURL}
                      sx={{
                        borderRadius: 1,
                        height: 48,
                        width: 48,
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        borderRadius: 1,
                        backgroundColor: "neutral.200",
                        height: 48,
                        width: 48,
                      }}
                    />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={product.product.name}
                  primaryTypographyProps={{ variant: "subtitle1" }}
                  secondary={[`Hace ${ago}, `, `Precio: $${product.product.price}`]}
                  secondaryTypographyProps={{ variant: "body2" }}
                />
                <IconButton edge="end">
                  <SvgIcon>
                    <MoreVertIcon />
                  </SvgIcon>
                </IconButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
        </CardActions>
      </Card>
    </Box>
  );
};

export default History;
