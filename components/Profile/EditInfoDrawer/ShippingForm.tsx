import React from "react";
import {
  Paper,
  Box,
  Typography,
  Input,
  Checkbox,
  FormControl,
  FormControlLabel,
  Button,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { StateArray } from "../../StateArray";
import styles from "../../../styles/profile/editInfo.module.scss";

const ShippingForm = ({
  user,
  stateInput,
  billingChecked,
  setFirstNameInput,
  setZipcodeInput,
  setLastNameInput,
  setStateInput,
  setMobilePhoneInput,
  setAddress1Input,
  setAddress2Input,
  setCityInput,
  setHomePhoneInput,
}: any) => {
  const states = StateArray.map((state) => {
    return (
      <MenuItem value={state.id} key={state.id}>
        {state.name}
      </MenuItem>
    );
  });

  const formData = [
    {
      text: "First Name/Surname",
      userInfo: user.firstName,
      setState: setFirstNameInput,
    },
    {
      text: "Last Name/Family Name",
      userInfo: user.lastName,
      setState: setLastNameInput,
    },
    {
      text: "Street Address",
      userInfo: user.address1,
      setState: setAddress1Input,
    },
    {
      text: "Apartment Name/Room #",
      userInfo: user.address2,
      setState: setAddress2Input,
    },
    {
      text: "City",
      userInfo: user.city,
      setState: setCityInput,
    },
    {
      text: "Postal Code/Zipcode",
      userInfo: user.zipcode,
      setState: setZipcodeInput,
    },
    {
      text: "State",
      userInfo: stateInput,
      setState: setStateInput,
    },
    {
      text: "Home Phone",
      userInfo: user.phone,
      setState: setHomePhoneInput,
    },
    {
      text: "Mobile Phone",
      userInfo: user.mobile,
      setState: setMobilePhoneInput,
    },
  ];

  const formInputMap = formData.map((input, index: number) => {
    if (input.text === "State") {
      return (
        <Box className={styles.input_container} key={index}>
          <Typography className={styles.form_text}>{input.text}: </Typography>
          <Select
            variant="standard"
            id="state"
            onChange={(e) => input.setState(e.target.value)}
            required
            defaultValue={input.userInfo}
            sx={{ textAlign: "start", width: 150 }}
          >
            {states}
          </Select>
        </Box>
      );
    } else {
      return (
        <Box className={styles.input_container}>
          <Typography className={styles.form_text}>{input.text}: </Typography>
          <Input
            size="small"
            placeholder={input.userInfo}
            onChange={(e) => {
              input.setState(e.target.value);
            }}
            className={styles.form_input}
          />
        </Box>
      );
    }
  });

  return (
    <Box
      className={
        billingChecked
          ? styles.shipping_input_billing_checked
          : styles.shipping_input_container
      }
    >
      {formInputMap}
    </Box>
  );
};

export default ShippingForm;
