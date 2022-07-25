import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
  stock: number;
  details: string;
  size: string;
  thumbnail: string;
}

interface ShoppingCart {
  value: Item[];
}

const initialState: ShoppingCart = {
  value: [],
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addItem: (state: ShoppingCart, action) => {
      state.value = action.payload;
    },
    removeItem: (state: ShoppingCart, action) => {
      state.value = action.payload;
    },
    editQuantity: (state: ShoppingCart, action) => {
      const item = state.value.find((item) => {
        return item.name === action.payload.name;
      });
      if (item && item.quantity >= 1 && item.stock >= action.payload.quantity) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addItem, removeItem, editQuantity } = shoppingCartSlice.actions;

export const shoppingCart = (state: RootState) => state.shoppingCart.value;

export default shoppingCartSlice.reducer;
