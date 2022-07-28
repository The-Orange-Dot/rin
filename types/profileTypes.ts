import { SvgIcon } from "@mui/material";

export type ProfileSelectorType = {
  icon: typeof SvgIcon;
  text: string;
};

export type UserDataType = {
  address1: string;
  address2: string | null;
  country: string;
  email: string;
  id: string;
  image: string;
  lastName: string;
  mobile: string;
  name: string;
  city: string;
  phone: string;
  state: string;
  username: string;
  zipcode: string;
};

export type ProductReviewType = {
  createdAt: string;
  description: string;
  helpful: number;
  id: string;
  productId: string;
  rating: number;
  report: number;
  updatedAt: string;
  userId: string;
};

export type ProductHistoryType = {
  brand: string;
  createdAt: string;
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  reviewId: string | null;
  reviewWritten: boolean;
  size: string;
  userId: string;
  review: ProductReviewType;
  firstBuy: boolean;
};
