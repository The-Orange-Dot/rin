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
