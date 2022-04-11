import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const initialCartState = {
  items: [],
  totalQty: 0,
  // totalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      //Updating total quantity
      state.totalQty++;

      //Adding item to the items array
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      console.log(state.items, existingItem);
      //Updating total quantity
      state.totalQty--;
      //
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

//Action Creators
//moved to cart-action.js

export const cartActions = cartSlice.actions;
export default cartSlice;
