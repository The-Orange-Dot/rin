import React, { SyntheticEvent, useEffect, useState } from "react";
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
  Button,
  CircularProgress,
} from "@mui/material";
import { VisibilityOff } from "@mui/icons-material";
import { Visibility } from "@mui/icons-material";
import { signIn } from "next-auth/react";

const CreateAccountForm = ({ setOpenLoginDrawer }: any) => {
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
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notUniqueError, setNotUniqueError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPasswordNotMatch(false);
    }, 5000);

    setTimeout(() => {
      setNotUniqueError(false);
    }, 5000);
  }, [passwordNotMatch, errorMessage]);

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const userData = {
      username: usernameInput,
      password: passwordInput,
      firstName: firstNameInput,
      lastName: lastNameInput,
      address1: address1,
      address2: address2,
      city: cityInput,
      state: stateInput,
      zipcode: zipcodeInput,
      email: emailInput,
    };

    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        userData: userData,
        passwordConfirm: passwordConfirmInput,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        res.json().then(async (data) => {
          console.log(data);
          await signIn("credentials", {
            redirect: false,
            username: data.loginDetails.username,
            password: data.loginDetails.password,
          });
          setOpenLoginDrawer(false);
          setIsLoading(false);
        });
      } else if (res.status === 500) {
        res.json().then((data) => {
          console.log(data.error);
          setErrorMessage(data.error);
          setPasswordNotMatch(true);
          setIsLoading(false);
        });
      } else if (res.status === 406) {
        res.json().then((data) => {
          setErrorMessage(`${data.error} already taken`);
          setNotUniqueError(true);
          setIsLoading(false);
        });
      }
    });
  };

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
        <Typography sx={{ mb: 2 }}>New User Registration</Typography>

        <form onSubmit={(e) => submitHandler(e)}>
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
            <InputLabel error={passwordNotMatch} htmlFor="password">
              Confirm Password *
            </InputLabel>
            <Input
              error={passwordNotMatch}
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
            <InputLabel htmlFor="last-name">
              Last Name / Family Name *
            </InputLabel>
            <Input
              required
              id="last-name"
              value={lastNameInput}
              inputProps={{ style: { paddingLeft: 10 } }}
              onChange={(e) => setLastNameInput(e.target.value)}
            />
          </FormControl>

          {/* <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
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

            <Select
              id="state"
              onChange={(e) => setStateInput(e.target.value as string)}
              defaultValue={stateInput}
              sx={{ textAlign: "start", pl: 1 }}
            >
              {states}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
            <InputLabel htmlFor="zipcode">Zipcode / Postal code</InputLabel>
            <Input
              id="zipcode"
              value={zipcodeInput}
              inputProps={{ style: { paddingLeft: 10 } }}
              onChange={(e) => setZipcodeInput(e.target.value)}
            />
          </FormControl> */}

          <Box
            sx={
              passwordNotMatch || notUniqueError
                ? {
                    width: "100%",
                    height: "5vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 1,
                    transition: ".3s",
                  }
                : {
                    width: "100%",
                    height: "5vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: ".3s",
                  }
            }
          >
            <Typography color="error" variant="overline">
              * {errorMessage}
            </Typography>
          </Box>

          <Button disabled={isLoading} type="submit" variant="contained">
            {isLoading ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CreateAccountForm;
