import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Item {
  name: string;
  quantity: number;
  price: number;
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
      state.value = [...state.value, action.payload];
    },
  },
});

export const { addItem } = shoppingCartSlice.actions;

export const shoppingCart = (state: RootState) => state.shoppingCart.value;

export default shoppingCartSlice.reducer;
