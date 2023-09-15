import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartItems,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "../state/cart";
import { toast } from "react-toastify";

import {
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

export const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.total);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URLBACK}/order`, { withCredentials: true })
      .then((res) => {
        dispatch(fetchCartItems(res.data));
      });
  }, [dispatch]);

  const handleIncrement = (item) => {
    const updatedQuantity = item.quantity + 1;
    axios
      .put(
        `${process.env.REACT_APP_URLBACK}/order/updateQuantity/${item.id}`,
        { quantity: updatedQuantity },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Cantidad aumentada");
        dispatch(incrementQuantity(item.id, updatedQuantity));
      })
      .catch((error) => {
        toast.error("Error al aumentar");
        console.error("Error actualizando cantidad en el back", error);
      });
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const updatedQuantity = item.quantity - 1;
      axios
        .put(
          `${process.env.REACT_APP_URLBACK}/order/updateQuantity/${item.id}`,
          { quantity: updatedQuantity },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Cantidad disminuida");
          dispatch(decrementQuantity(item.id, updatedQuantity));
        })
        .catch((error) => {
          toast.error("Error al disminuir");
          console.error("Error actualizando cantidad en el back", error);
        });
    } else {
      toast.warn("1 es el minimo!");
    }
  };

  const handleRemove = (item) => {
    const orderId = item.id;
    const productId = item.product.id;

    axios
      .delete(
        `${process.env.REACT_APP_URLBACK}/order/remove/${orderId}/${productId}`
      )
      .then((res) => {
        toast.warn("Producto removido :(");
        dispatch(removeFromCart({ orderId, productId }));
      })
      .catch((error) => {
        toast.error("Error al remover");
        console.error("Error al remover producto", error);
      });
  };

  const handleClear = (item) => {
    const userId = item.userId;
    axios
      .delete(`${process.env.REACT_APP_URLBACK}/order/clearCart/${userId}`)
      .then((res) => {
        toast.success("Chango eliminado correctamente!");
        dispatch(clearCart());
      })
      .catch((error) => {
        console.error("Error al borrar");
      });
  };

  const handleClearCartWithItem = () => {
    if (cartItems.length > 0) {
      const itemToClear = cartItems[0];
      handleClear(itemToClear);
    } else {
      toast.error("No tenes nada para borrar!");
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom sx={{ marginTop: "20px" }}>
        Tus Productos
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Foto</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio Unitario</TableCell>
              <TableCell>Precio Total</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={`${item.id}-${item.product.id}`}>
                <TableCell>
                  <img
                    style={{ height: "100px", width: "100px" }}
                    src={`${item.product.imageURL}`}
                    alt="no hay fotito"
                  />
                </TableCell>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>$ {item.product.price}</TableCell>
                <TableCell>$ {item.product.price * item.quantity}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemove(item)}
                  >
                    ELIMINAR
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" sx={{ margin: "20px" }}>
        TOTAL A PAGAR: $ {cartItems.length > 0 ? totalPrice : 0}
      </Typography>
      <Link to="/checkout">
        <Button variant="contained" color="primary">
          Ir a pagar
        </Button>
      </Link>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClearCartWithItem}
      >
        ELIMINAR TODO
      </Button>
    </div>
  );
};
