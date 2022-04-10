import cartSlice from "./cart-slice";

const { createSlice, configureStore } = require("@reduxjs/toolkit");

const initalCartState = { showCart: false, notification: null };

export const uiSlice = createSlice({
  name: "ui",
  initialState: initalCartState,
  reducers: {
    //reducer for showing and hiding the cart
    toggleCart(state) {
      state.showCart = !state.showCart;
    },

    //reducer for showing http notifcation
    setNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
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
