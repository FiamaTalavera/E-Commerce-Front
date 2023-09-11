import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");
// export const addToCart = createAction("ADD_TO_CART");
// export const removeFromCart = createAction("REMOVE_FROM_CART");
// MODIFICAR LA CANTIDAD DEL PRODUCTO +
// MODIFICAR LA CANTIDAD DEL PRODUCTO -

const initialState = {
  id: null,
  email: null,
  name: null,
  last_name: null,
  adress: null,
  is_admin: false,
};

export default createReducer(initialState, {
  [setUser]: (state, action) => action.payload,
})
