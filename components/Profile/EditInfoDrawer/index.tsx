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
import React, { useState } from "react";
import styles from "../../../styles/profile/editInfo.module.scss";
import ShippingForm from "./ShippingForm";
import BillingForm from "./BillingForm";

const EditInfoDrawer = ({ user }: any) => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [address1Input, setAddress1Input] = useState("");
  const [address2Input, setAddress2Input] = useState("");
  const [stateInput, setStateInput] = useState("");
  const [zipcodeInput, setZipcodeInput] = useState("");
  const [homePhoneInput, setHomePhoneInput] = useState("");
  const [mobilePhoneInput, setMobilePhoneInput] = useState("");
  const [billingChecked, setBillingChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBillingChecked(event.target.checked);
  };

  const submitHandler = async () => {
    const userData = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      address: {
        line1: address1Input,
        line2: address2Input,
        city: cityInput,
        state: stateInput,
        zipcode: zipcodeInput,
        country: "US",
        homePhone: homePhoneInput,
      },
      phone: homePhoneInput,
      mobilePhone: mobilePhoneInput,
    };

    await fetch(`/api/user/${user.id}`, {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <Paper className={styles.paper_container}>
      <Box
        className={
          billingChecked ? styles.billing_checked_forms : styles.forms_container
        }
      >
        <Box className={styles.shipping_form}>
          <Typography sx={{ mb: 2 }}>
            {billingChecked ? "Shipping + Billing Address" : "Shipping Address"}
          </Typography>

          <ShippingForm
            user={user}
            stateInput={stateInput}
            setFirstNameInput={setFirstNameInput}
            setLastNameInput={setLastNameInput}
            setAddress1Input={setAddress1Input}
            setAddress2Input={setAddress2Input}
            setCityInput={setCityInput}
            setZipcodeInput={setZipcodeInput}
            setStateInput={setStateInput}
            setHomePhoneInput={setHomePhoneInput}
            setMobilePhoneInput={setMobilePhoneInput}
            billingChecked={billingChecked}
          />
        </Box>

        {billingChecked ? null : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ mb: 2 }}>Billing Address</Typography>
            <BillingForm
              user={user}
              stateInput={stateInput}
              setFirstNameInput={setFirstNameInput}
              setLastNameInput={setLastNameInput}
              setAddress1Input={setAddress1Input}
              setAddress2Input={setAddress2Input}
              setCityInput={setCityInput}
              setZipcodeInput={setZipcodeInput}
              setStateInput={setStateInput}
              setHomePhoneInput={setHomePhoneInput}
              setMobilePhoneInput={setMobilePhoneInput}
              billingChecked={billingChecked}
            />
          </Box>
        )}
      </Box>
      <FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={billingChecked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="My shipping and billing address are the same"
        />
      </FormControl>

      <Button variant="contained" sx={{ width: 200, height: 50 }}>
        Submit
      </Button>
    </Paper>
  );
};

export default EditInfoDrawer;
