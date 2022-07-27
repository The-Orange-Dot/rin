import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import Email from "next-auth/providers/email";
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
  value: { name: string; address: Address; phone: string };
  saveAddress: boolean;
  email: "";
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
    phone: "",
  },
  saveAddress: false,
  email: "",
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
    saveAddress: (state: User, action) => {
      state.saveAddress = action.payload;
    },
    saveEmail: (state: User, action) => {
      state.email = action.payload;
    },
  },
});

export const { saveEmail, addShipping, removeShipping, saveAddress } =
  guestShippingSlice.actions;

export const guestShipping = (state: RootState) => state.guestShipping.value;

export default guestShippingSlice.reducer;
