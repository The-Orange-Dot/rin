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

export interface PromotionCodeType {
  active: true;
  code: string;
  coupon: CouponType;
  created: 1659159936;
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
