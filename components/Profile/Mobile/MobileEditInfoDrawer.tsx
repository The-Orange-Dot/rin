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
import { StateArray } from "../../StateArray";

const MobileEditInfoDrawer = () => {
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

  const states = StateArray.map((state) => {
    return (
      <MenuItem value={state.id} key={state.id}>
        {state.name}
      </MenuItem>
    );
  });

  return <div>MobileEditInfoDrawer</div>;
};

export default MobileEditInfoDrawer;
