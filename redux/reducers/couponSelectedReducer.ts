import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import Email from "next-auth/providers/email";
import { RootState } from "../store";

interface RestrictionsType {
  first_time_transaction: boolean;
  minimum_amount: null;
  minimum_amount_currency: null;
}

export interface CouponType {
  amount_off: null;
  created: number;
  currency: null;
  duration: string;
  duration_in_months: null;
  id: string;
  livemode: false;
  max_redemptions: null;
  metadata: {};
  name: string;
  object: string;
  percent_off: number;
  redeem_by: null;
  times_redeemed: number;
  valid: boolean;
}

interface PromotionCodeType {
  active: boolean;
  code: string;
  coupon: CouponType;
  created: number;
  customer: string;
  expires_at: null;
  id: string;
  livemode: boolean;
  max_redemptions: number;
  metadata: {};
  object: string;
  restrictions: RestrictionsType;
  times_redeemed: number;
}

interface CouponSliceType {
  value: PromotionCodeType;
}

const initialState: CouponSliceType = {
  value: {
    active: false,
    code: "",
    coupon: {
      amount_off: null,
      created: 0,
      currency: null,
      duration: "",
      duration_in_months: null,
      id: "",
      livemode: false,
      max_redemptions: null,
      metadata: {},
      name: "",
      object: "",
      percent_off: 0,
      redeem_by: null,
      times_redeemed: 0,
      valid: false,
    },
    created: 0,
    customer: "",
    expires_at: null,
    id: "",
    livemode: false,
    max_redemptions: 0,
    metadata: {},
    object: "",
    restrictions: {
      first_time_transaction: false,
      minimum_amount: null,
      minimum_amount_currency: null,
    },
    times_redeemed: 0,
  },
};

export const couponSelectedSlice = createSlice({
  name: "couponSelected",
  initialState,
  reducers: {
    selectCoupon: (state, action) => {
      state.value = action.payload;
    },
    unselectCoupon: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { selectCoupon, unselectCoupon } = couponSelectedSlice.actions;

export const couponSelected = (state: RootState) => state.couponSelected.value;

export default couponSelectedSlice.reducer;
