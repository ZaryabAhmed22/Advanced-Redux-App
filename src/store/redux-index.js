import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";
const { createSlice, configureStore } = require("@reduxjs/toolkit");

const initalCartState = { showCart: false, notification: null };

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store; // >> this store is provided in the Provider component as a store prop.
