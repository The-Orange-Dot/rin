import React, { useState } from "react";
import { Box } from "@mui/system";
import {
  Typography,
  FormControl,
  Input,
  InputLabel,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
  NativeSelect,
} from "@mui/material";
import { VisibilityOff } from "@mui/icons-material";
import { Visibility } from "@mui/icons-material";

const CreateAccountForm = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [zipcodeInput, setZipcodeInput] = useState("");
  const [stateInput, setStateInput] = useState("");

  const stateArray = [
    { id: "AL", name: "Alabama" },
    { id: "AK", name: "Alaska" },
    { id: "AZ", name: "Arizona" },
    { id: "AR", name: "Arkansas" },
    { id: "CA", name: "California" },
    { id: "CO", name: "Colorado" },
    { id: "CT", name: "Connecticut" },
    { id: "DE", name: "Delaware" },
    { id: "FL", name: "Florida" },
    { id: "GA", name: "Georgia" },
    { id: "HI", name: "Hawaii" },
    { id: "ID", name: "Idaho" },
    { id: "IL", name: "Illinois" },
    { id: "IN", name: "Indiana" },
    { id: "IA", name: "Iowa" },
    { id: "KS", name: "Kansas" },
    { id: "KY", name: "Kentucky" },
    { id: "LA", name: "Louisiana" },
    { id: "ME", name: "Maine" },
    { id: "MD", name: "Maryland" },
    { id: "MA", name: "Massachusetts" },
    { id: "MI", name: "Michigan" },
    { id: "MN", name: "Minnesota" },
    { id: "MS", name: "Mississippi" },
    { id: "MO", name: "Missouri" },
    { id: "MT", name: "Montana" },
    { id: "NE", name: "Nebraska" },
    { id: "NV", name: "Nevada" },
    { id: "NH", name: "New Hampshire" },
    { id: "NJ", name: "New Jersey" },
    { id: "NM", name: "New Mexico" },
    { id: "NY", name: "New York" },
    { id: "NC", name: "North Carolina" },
    { id: "ND", name: "North Dakota" },
    { id: "OH", name: "Ohio" },
    { id: "OK", name: "Oklahoma" },
    { id: "OR", name: "Oregon" },
    { id: "PA", name: "Pennsylvania" },
    { id: "RI", name: "Rhode Island" },
    { id: "SC", name: "South Carolina" },
    { id: "SD", name: "South Dakota" },
    { id: "TN", name: "Tennessee" },
    { id: "TX", name: "Texas" },
    { id: "UT", name: "Utah" },
    { id: "VT", name: "Vermont" },
    { id: "VA", name: "Virginia" },
    { id: "WA", name: "Washington" },
    { id: "WV", name: "West Virginia" },
    { id: "WI", name: "Wisconsin" },
    { id: "WY", name: "Wyoming" },
  ];

  const states = stateArray.map((state) => {
    return <MenuItem value={state.id}>{state.name}</MenuItem>;
  });

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography>New User Registration</Typography>

        <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
          <InputLabel htmlFor="username">Username *</InputLabel>

          <Input
            required
            autoFocus
            id="username"
            value={usernameInput}
            inputProps={{ style: { paddingLeft: 10 } }}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
          <InputLabel htmlFor="email">Email *</InputLabel>
          <Input
            required
            id="email"
            value={emailInput}
            inputProps={{ style: { paddingLeft: 10 } }}
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
          <InputLabel htmlFor="password">Password *</InputLabel>
          <Input
            required
            id="password"
            onChange={(e) => setPasswordInput(e.target.value)}
            value={passwordInput}
            inputProps={{ style: { paddingLeft: 10 } }}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
          <InputLabel htmlFor="password">Confirm Password *</InputLabel>
          <Input
            required
            id="password"
            onChange={(e) => setPasswordConfirmInput(e.target.value)}
            value={passwordConfirmInput}
            inputProps={{ style: { paddingLeft: 10 } }}
            type={showConfirmPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
          <InputLabel htmlFor="first-name">First Name / Surname *</InputLabel>
          <Input
            required
            id="first-name"
            value={firstNameInput}
            inputProps={{ style: { paddingLeft: 10 } }}
            onChange={(e) => setFirstNameInput(e.target.value)}
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
          <InputLabel htmlFor="last-name">Last Name / Family Name *</InputLabel>
          <Input
            required
            id="last-name"
            value={lastNameInput}
            inputProps={{ style: { paddingLeft: 10 } }}
            onChange={(e) => setLastNameInput(e.target.value)}
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
          <InputLabel htmlFor="address-1">Street address</InputLabel>
          <Input
            id="address-1"
            value={address1}
            inputProps={{ style: { paddingLeft: 10 } }}
            onChange={(e) => setAddress1(e.target.value)}
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
          <InputLabel htmlFor="address-2">Apt building / etc.</InputLabel>
          <Input
            id="address-2"
            value={address2}
            inputProps={{ style: { paddingLeft: 10 } }}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
          <InputLabel htmlFor="city">City</InputLabel>
          <Input
            id="city"
            value={cityInput}
            inputProps={{ style: { paddingLeft: 10 } }}
            onChange={(e) => setCityInput(e.target.value)}
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
          <InputLabel htmlFor="state">State</InputLabel>

          <NativeSelect
            id="state"
            onChange={(e) => setStateInput(e.target.value as string)}
          >
            {states}
          </NativeSelect>
        </FormControl>

        <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
          <InputLabel htmlFor="zipcode">Zipcode / Postal code</InputLabel>
          <Input
            id="zipcode"
            value={zipcodeInput}
            inputProps={{ style: { paddingLeft: 10 } }}
            onChange={(e) => setZipcodeInput(e.target.value)}
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default CreateAccountForm;
