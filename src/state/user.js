import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

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
