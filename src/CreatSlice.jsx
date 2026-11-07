import { createSlice } from "@reduxjs/toolkit";

const getProductKey = (product) => product.id ?? product.name;

const initialState = {
  items: [],
};

export const CreatSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItem: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => getProductKey(item) === getProductKey(product),
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action) => {
      const productKey =
        typeof action.payload === "object"
          ? getProductKey(action.payload)
          : action.payload;

      const existingItem = state.items.find(
        (item) => getProductKey(item) === productKey,
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => getProductKey(item) !== productKey,
          );
        }
      }
    },

    deleteItem: (state, action) => {
      const productKey =
        typeof action.payload === "object"
          ? getProductKey(action.payload)
          : action.payload;

      state.items = state.items.filter(
        (item) => getProductKey(item) !== productKey,
      );
    },

    updateQuantity: (state, action) => {
      const { id, name, quantity } = action.payload;

      const productKey = id ?? name;

      const existingItem = state.items.find(
        (item) => getProductKey(item) === productKey,
      );

      if (existingItem && quantity >= 1) {
        existingItem.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, deleteItem, updateQuantity, clearCart } =
  CreatSlice.actions;

export default CreatSlice.reducer;
