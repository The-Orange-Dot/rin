import React, { SyntheticEvent, useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addShipping,
  saveAddress,
  saveEmail,
} from "../../redux/reducers/guestAddresReducer";
import { RootState } from "../../redux/store";
import { useRouter } from "next/router";
import { StateArray } from "../StateArray";

const GuestAddressInput = ({
  setGuestShippingForm,
  guestShippingForm,
}: any) => {
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTosChecked(false);
  }, [guestShippingForm]);

  const states = StateArray.map((state) => {
    return (
      <MenuItem value={state.id} key={state.id}>
        {state.name}
      </MenuItem>
    );
  });

  const submitGuestShippingHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

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
        p: 5,
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
          <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
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

          <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
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

          <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
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

          <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
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

          <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
            <InputLabel htmlFor="address-2">Apt building / etc.</InputLabel>
            <Input
              id="address-2"
              value={address2}
              inputProps={{ style: { paddingLeft: 10 } }}
              onChange={(e) => setAddress2(e.target.value)}
              defaultValue={address2}
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
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

          <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
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

          <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
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
            sx={{ mt: 2, width: "95%" }}
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
            sx={{ mt: 2, width: "95%" }}
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
            onClick={() => setGuestShippingForm(false)}
          >
            Back
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "50%", height: 50, ml: 1 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              "Checkout"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default GuestAddressInput;
