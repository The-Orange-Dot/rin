import React, { SyntheticEvent, useState, useEffect } from "react";
import {
  Typography,
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addShipping,
  saveAddress,
  saveEmail,
} from "../../../redux/reducers/guestAddresReducer";
import { RootState } from "../../../redux/store";
import { useRouter } from "next/router";

const MobileGuestAddressForm = ({ setOpenDrawer, openDrawer }: any) => {
  const storeInfo = useSelector(
    (state: RootState) => state.guestShipping.saveAddress
  );
  const storedAddress = useSelector(
    (state: RootState) => state.guestShipping.value
  );
  const storedEmail = useSelector(
    (state: RootState) => state.guestShipping.email
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const [firstNameInput, setFirstNameInput] = useState(
    storedAddress.name?.split(" ")[0]
  );
  const [lastNameInput, setLastNameInput] = useState(
    storedAddress.name?.split(" ")[1]
  );
  const [emailInput, setEmailInput] = useState<string>(storedEmail);
  const [address1, setAddress1] = useState(storedAddress.address?.line1);
  const [address2, setAddress2] = useState(storedAddress.address?.line2);
  const [cityInput, setCityInput] = useState(storedAddress.address?.city);
  const [zipcodeInput, setZipcodeInput] = useState(
    storedAddress.address?.postal_code
  );
  const [stateInput, setStateInput] = useState(storedAddress.address?.state);
  const [storeAddressChecked, setStoreAddressChecked] = useState(storeInfo);
  const [tosChecked, setTosChecked] = useState(false);

  useEffect(() => {
    setTosChecked(false);
  }, [openDrawer]);

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

  const submitGuestShippingHandler = (e: SyntheticEvent) => {
    e.preventDefault();

    const shipping = {
      name: `${firstNameInput} ${lastNameInput}`,
      address: {
        line1: address1,
        line2: address2,
        city: cityInput,
        state: stateInput,
        postal_code: zipcodeInput,
        country: "US",
      },
    };
    dispatch(addShipping(shipping));
    dispatch(saveEmail(emailInput));
    setTimeout(() => {
      router.push("/payment");
    }, 500);
  };

  const storeAddressHandler = (e: boolean) => {
    if (e) {
      setStoreAddressChecked(true);
      dispatch(saveAddress(true));
    } else {
      setStoreAddressChecked(false);
      dispatch(saveAddress(false));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "100%",
        p: 2,
      }}
    >
      <Box sx={{ height: "5%", display: "flex", alignItems: "center" }}>
        <Typography>Guest shipping info</Typography>
      </Box>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          height: "95%",
        }}
        onSubmit={(e) => submitGuestShippingHandler(e)}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormControl sx={{ mb: 1, width: "30ch" }} variant="standard">
            <InputLabel htmlFor="first-name">First Name / Surname</InputLabel>
            <Input
              required
              id="first-name"
              value={firstNameInput}
              inputProps={{ style: { paddingLeft: 10 } }}
              onChange={(e) => setFirstNameInput(e.target.value)}
              defaultValue={firstNameInput}
            />
          </FormControl>

          <FormControl sx={{ mb: 1, width: "30ch" }} variant="standard">
            <InputLabel htmlFor="last-name">Last Name / Family Name</InputLabel>
            <Input
              required
              id="last-name"
              value={lastNameInput}
              inputProps={{ style: { paddingLeft: 10 } }}
              onChange={(e) => setLastNameInput(e.target.value)}
              defaultValue={lastNameInput}
            />
          </FormControl>

          <FormControl sx={{ mb: 1, width: "30ch" }} variant="standard">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              required
              id="email"
              value={emailInput}
              inputProps={{ style: { paddingLeft: 10 } }}
              onChange={(e) => setEmailInput(e.target.value as string)}
              defaultValue={emailInput}
            />
          </FormControl>

          <FormControl sx={{ mb: 1, width: "30ch" }} variant="standard">
            <InputLabel htmlFor="address-1">Street address</InputLabel>
            <Input
              required
              id="address-1"
              value={address1}
              inputProps={{ style: { paddingLeft: 10 } }}
              onChange={(e) => setAddress1(e.target.value)}
              defaultValue={address1}
            />
          </FormControl>

          <FormControl sx={{ mb: 1, width: "30ch" }} variant="standard">
            <InputLabel htmlFor="address-2">Apt building / etc.</InputLabel>
            <Input
              id="address-2"
              value={address2}
              inputProps={{ style: { paddingLeft: 10 } }}
              onChange={(e) => setAddress2(e.target.value)}
              defaultValue={address2}
            />
          </FormControl>

          <FormControl sx={{ mb: 1, width: "30ch" }} variant="standard">
            <InputLabel htmlFor="city">City</InputLabel>
            <Input
              required
              id="city"
              value={cityInput}
              inputProps={{ style: { paddingLeft: 10 } }}
              onChange={(e) => setCityInput(e.target.value)}
              defaultValue={cityInput}
            />
          </FormControl>

          <FormControl sx={{ mb: 1, width: "30ch" }} variant="standard">
            <InputLabel htmlFor="state">State</InputLabel>

            <Select
              id="state"
              onChange={(e) => setStateInput(e.target.value)}
              required
              defaultValue={stateInput}
              sx={{ textAlign: "start", pl: 1 }}
            >
              {states}
            </Select>
          </FormControl>

          <FormControl sx={{ mb: 1, width: "30ch" }} variant="standard">
            <InputLabel htmlFor="zipcode">Zipcode / Postal code</InputLabel>
            <Input
              required
              id="zipcode"
              value={zipcodeInput}
              defaultValue={zipcodeInput}
              inputProps={{ style: { paddingLeft: 10 } }}
              onChange={(e) => setZipcodeInput(e.target.value)}
            />
          </FormControl>

          <FormControlLabel
            sx={{ mt: 1, width: "95%" }}
            control={
              <Checkbox
                defaultChecked={storeAddressChecked}
                onChange={(e) => {
                  storeAddressHandler(e.target.checked);
                }}
              />
            }
            label={
              <Typography
                variant="overline"
                sx={{ fontSize: ".6rem", lineHeight: "1rem" }}
              >
                Save my address for quicker purchases
              </Typography>
            }
          />

          <FormControlLabel
            sx={{ mt: 1, width: "95%" }}
            control={<Checkbox defaultChecked={tosChecked} required />}
            label={
              <Typography
                variant="overline"
                sx={{ fontSize: ".6rem", lineHeight: "1rem" }}
              >
                By continuing to checkout, I confirm I have read and agreed with
                the Terms of Use and Privacy Policy
              </Typography>
            }
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "50%", height: 50, mr: 1 }}
            onClick={() => setOpenDrawer(false)}
          >
            Back
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "50%", height: 50, ml: 1 }}
          >
            Checkout
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default MobileGuestAddressForm;
