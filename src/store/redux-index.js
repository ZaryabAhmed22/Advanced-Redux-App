import cartSlice from "./cart-slice";

const { createSlice, configureStore } = require("@reduxjs/toolkit");

const initalCartState = { showCart: false };

export const uiSlice = createSlice({
  name: "ui",
  initialState: initalCartState,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export const uiActions = uiSlice.actions;

export default store; // >> this store is provided in the Provider component as a store prop.
