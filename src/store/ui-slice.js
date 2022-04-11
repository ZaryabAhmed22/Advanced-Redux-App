const { createSlice } = require("@reduxjs/toolkit");

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
export const uiActions = uiSlice.actions;
export default uiSlice;
