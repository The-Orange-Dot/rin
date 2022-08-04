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
    return (
      <MenuItem value={state.id} key={state.id}>
        {state.name}
      </MenuItem>
    );
  });

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

  console.log(user);
  return (
    <Paper
      sx={{
        width: "100%",
        height: "65vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={
          billingChecked
            ? { width: "100%", display: "flex", justifyContent: "center" }
            : { width: "70%", display: "flex", justifyContent: "center" }
        }
      >
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
          <Typography sx={{ mb: 2 }}>
            {billingChecked ? "Shipping + Billing Address" : "Shipping Address"}
          </Typography>
          <Box
            sx={
              billingChecked
                ? {
                    width: "25%",
                    height: "80%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    transition: 0.2,
                  }
                : {
                    width: "80%",
                    height: "80%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    transition: 0.2,
                  }
            }
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: 50,
                alignItems: "center",
              }}
            >
              <Typography sx={{ width: 200 }}>First Name/Surname: </Typography>
              <Input
                size="small"
                placeholder={user.firstName}
                onChange={(e) => {
                  setFirstNameInput(e.target.value);
                }}
                sx={{ width: 150 }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: 50,
                alignItems: "center",
              }}
            >
              <Typography sx={{ width: 200 }}>
                Last Name/Family Name:{" "}
              </Typography>
              <Input
                size="small"
                placeholder={user.lastName}
                onChange={(e) => {
                  setLastNameInput(e.target.value);
                }}
                sx={{ width: 150 }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: 50,
                alignItems: "center",
              }}
            >
              <Typography sx={{ width: 200 }}>Street Address: </Typography>
              <Input
                size="small"
                placeholder={user.address1}
                onChange={(e) => {
                  setAddress1Input(e.target.value);
                }}
                sx={{ width: 150 }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: 50,
                alignItems: "center",
              }}
            >
              <Typography sx={{ width: 200 }}>
                Apartment Name/Room #:{" "}
              </Typography>
              <Input
                size="small"
                placeholder={user.address2}
                onChange={(e) => {
                  setAddress2Input(e.target.value);
                }}
                sx={{ width: 150 }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: 50,
                alignItems: "center",
              }}
            >
              <Typography sx={{ width: 200 }}>City: </Typography>
              <Input
                size="small"
                placeholder={user.city}
                onChange={(e) => {
                  setCityInput(e.target.value);
                }}
                sx={{ width: 150 }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: 50,
                alignItems: "center",
              }}
            >
              <Typography sx={{ width: 200 }}>State: </Typography>
              <Select
                variant="standard"
                id="state"
                onChange={(e) => setStateInput(e.target.value)}
                required
                defaultValue={stateInput}
                sx={{ textAlign: "start", width: 150 }}
              >
                {states}
              </Select>
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: 50,
                alignItems: "center",
              }}
            >
              <Typography sx={{ width: 200 }}>Postal Code/Zipcode: </Typography>
              <Input
                size="small"
                placeholder={user.zipcode}
                onChange={(e) => {
                  setZipcodeInput(e.target.value);
                }}
                sx={{ width: 150 }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: 50,
                alignItems: "center",
              }}
            >
              <Typography sx={{ width: 200 }}>Home Phone: </Typography>
              <Input
                size="small"
                placeholder={user.phone}
                onChange={(e) => {
                  setHomePhoneInput(e.target.value);
                }}
                sx={{ width: 150 }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: 50,
                alignItems: "center",
              }}
            >
              <Typography sx={{ width: 200 }}>Mobile Phone: </Typography>
              <Input
                size="small"
                placeholder={user.mobile}
                onChange={(e) => {
                  setMobilePhoneInput(e.target.value);
                }}
                sx={{ width: 150 }}
              />
            </Box>
          </Box>
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
            <Box
              sx={
                billingChecked
                  ? {
                      width: "25%",
                      height: "80%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      transition: 0.2,
                    }
                  : {
                      width: "80%",
                      height: "80%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      transition: 0.2,
                    }
              }
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                }}
              >
                <Typography sx={{ width: 200 }}>
                  First Name/Surname:{" "}
                </Typography>
                <Input
                  size="small"
                  placeholder={user.firstName}
                  onChange={(e) => {
                    setFirstNameInput(e.target.value);
                  }}
                  sx={{ width: 150 }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                }}
              >
                <Typography sx={{ width: 200 }}>
                  Last Name/Family Name:{" "}
                </Typography>
                <Input
                  size="small"
                  placeholder={user.lastName}
                  onChange={(e) => {
                    setLastNameInput(e.target.value);
                  }}
                  sx={{ width: 150 }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                }}
              >
                <Typography sx={{ width: 200 }}>Street Address: </Typography>
                <Input
                  size="small"
                  placeholder={user.address1}
                  onChange={(e) => {
                    setAddress1Input(e.target.value);
                  }}
                  sx={{ width: 150 }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                }}
              >
                <Typography sx={{ width: 200 }}>
                  Apartment Name/Room #:{" "}
                </Typography>
                <Input
                  size="small"
                  placeholder={user.address2}
                  onChange={(e) => {
                    setAddress2Input(e.target.value);
                  }}
                  sx={{ width: 150 }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                }}
              >
                <Typography sx={{ width: 200 }}>City: </Typography>
                <Input
                  size="small"
                  placeholder={user.city}
                  onChange={(e) => {
                    setCityInput(e.target.value);
                  }}
                  sx={{ width: 150 }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                }}
              >
                <Typography sx={{ width: 200 }}>State: </Typography>
                <Select
                  variant="standard"
                  id="state"
                  onChange={(e) => setStateInput(e.target.value)}
                  required
                  defaultValue={stateInput}
                  sx={{ textAlign: "start", width: 150 }}
                >
                  {states}
                </Select>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                }}
              >
                <Typography sx={{ width: 200 }}>
                  Postal Code/Zipcode:{" "}
                </Typography>
                <Input
                  size="small"
                  placeholder={user.zipcode}
                  onChange={(e) => {
                    setZipcodeInput(e.target.value);
                  }}
                  sx={{ width: 150 }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                }}
              >
                <Typography sx={{ width: 200 }}>Home Phone: </Typography>
                <Input
                  size="small"
                  placeholder={user.phone}
                  onChange={(e) => {
                    setHomePhoneInput(e.target.value);
                  }}
                  sx={{ width: 150 }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                }}
              >
                <Typography sx={{ width: 200 }}>Mobile Phone: </Typography>
                <Input
                  size="small"
                  placeholder={user.mobile}
                  onChange={(e) => {
                    setMobilePhoneInput(e.target.value);
                  }}
                  sx={{ width: 150 }}
                />
              </Box>
            </Box>
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
