import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import Email from "next-auth/providers/email";
import { RootState } from "../store";

interface FilterType {
  value: { category: string; brand: string; totalProducts: number };
}

const initialState: FilterType = {
  value: {
    category: "",
    brand: "",
    totalProducts: 0,
  },
};

export const productFilterSlice = createSlice({
  name: "productFilter",
  initialState,
  reducers: {
    filterCategory: (state: FilterType, action) => {
      state.value.category = action.payload;
    },
    filterBrand: (state: FilterType, action) => {
      state.value.brand = action.payload;
    },
    setPages: (state: FilterType, action) => {
      state.value.totalProducts = action.payload;
    },
  },
});

export const { filterCategory, filterBrand, setPages } =
  productFilterSlice.actions;

export const productFilter = (state: RootState) => state.productFilter.value;

export default productFilterSlice.reducer;
