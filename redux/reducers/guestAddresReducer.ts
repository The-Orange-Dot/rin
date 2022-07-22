import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Address {
  line1: string;
  line2: string | "";
  city: string;
  state: string;
  postal_code: string;
  country: "US";
}

interface User {
  value: { name: string; address: Address };
}

const initialState: User = {
  value: {
    name: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "US",
    },
  },
};

export const guestShippingSlice = createSlice({
  name: "guestShipping",
  initialState,
  reducers: {
    addShipping: (state: User, action) => {
      state.value = action.payload;
    },
    removeShipping: (state: User, action) => {
      state.value = action.payload;
    },
  },
});

export const { addShipping, removeShipping } = guestShippingSlice.actions;

export const guestShipping = (state: RootState) => state.guestShipping.value;

export default guestShippingSlice.reducer;
