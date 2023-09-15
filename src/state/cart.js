import { createAction, createReducer } from "@reduxjs/toolkit";

export const fetchCartItems = createAction("FETCH_CART_ITEMS");
export const addToCart = createAction("ADD_TO_CART");
export const removeFromCart = createAction("REMOVE_FROM_CART");
export const incrementQuantity = createAction("INCREMENT_QUANTITY");
export const decrementQuantity = createAction("DECREMENT_QUANTITY");
export const clearCart = createAction("CLEAR_CART");

const initialState = {
  cartItems: [],
  total: 0,
};

const calculateInitialPrice = (cartItems) => {
  let initialTotal = 0;
  cartItems.forEach((item) => {
    if (item.state === "in_cart") {
      initialTotal += item.quantity * item.product.price;
    }
  });
  return initialTotal;
};

const cartReducer = createReducer(initialState, {
  [fetchCartItems]: (state, action) => {
    const cartItems = action.payload;
    const initialTotal = calculateInitialPrice(cartItems);
    return {
      ...state,
      cartItems,
      total: initialTotal,
    };
  },
  [addToCart]: (state, action) => {
    const { product, quantity } = action.payload;

    const existingItem = state.cartItems.find(
      (item) => item.product.id === product.id
    );

    let updatedCartItems;

    if (existingItem) {

      updatedCartItems = state.cartItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {

      updatedCartItems = [...state.cartItems, { product, quantity }];
    }

    const updatedTotal = state.total + product.price * quantity;

    return {
      ...state,
      cartItems: updatedCartItems,
      total: updatedTotal,
    };
  },
  [removeFromCart]: (state, action) => {
    const { orderId, productId } = action.payload;

    const updatedCartItems = state.cartItems.filter(
      (item) => item.id !== orderId || item.product.id !== productId
    );

    const updatedTotal = updatedCartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    return {
      ...state,
      cartItems: updatedCartItems,
      total: updatedTotal,
    };
  },
  [incrementQuantity]: (state, action) => {
    const orderId = action.payload;

    const updatedCartItems = state.cartItems.map((item) => {
      if (item.id === orderId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    const updatedTotal = updatedCartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    return {
      ...state,
      cartItems: updatedCartItems,
      total: updatedTotal,
    };
  },
  [decrementQuantity]: (state, action) => {
    const orderId = action.payload;

    const updatedCartItems = state.cartItems.map((item) => {
      if (item.id === orderId && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    const updatedTotal = updatedCartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    return {
      ...state,
      cartItems: updatedCartItems,
      total: updatedTotal,
    };
  },
  [clearCart]: (state) => {
    return {
      ...state,
      cartItems: [],
      total: 0,
    };
  },
});

export default cartReducer;
