import {
  Box,
  Typography,
  IconButton,
  InputAdornment,
  FormControl,
  Button,
  InputLabel,
  CircularProgress,
  Input,
} from "@mui/material";
import React, { useState } from "react";
import { signIn, SignInResponse } from "next-auth/react";
import { VisibilityOff } from "@mui/icons-material";
import { Visibility } from "@mui/icons-material";

const MobileLoginForm = ({ setMobileNavModalOpen }: any) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);

  const signInHandler = async () => {
    setSignInLoading(true);

    await signIn("credentials", {
      redirect: false,
      username: usernameInput,
      password: "password",
    }).then((res: SignInResponse | undefined) => {
      if (res === undefined) {
        console.log("Error: Next-auth response is undefined");
        return;
      }

      if (res.ok) {
        setSignInLoading(false);
        setMobileNavModalOpen(false);
      } else {
        setSignInLoading(false);
      }
    });
  };

  return (
    <>
      <Typography variant="overline" sx={{ fontSize: "1rem" }}>
        Sign In
      </Typography>

      <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
        <InputLabel htmlFor="username">Username</InputLabel>

        <Input
          autoFocus
          id="username"
          value={usernameInput}
          inputProps={{ style: { paddingLeft: 10 } }}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
      </FormControl>

      <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
        <InputLabel htmlFor="password">Password</InputLabel>

        <Input
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          mt: 3,
          mb: 1,
        }}
      >
        <Button
          sx={{ borderRadius: 0, height: 50, mb: 2, width: 160 }}
          variant="outlined"
          // onClick={() => setCreateAccount(true)}
        >
          Create Account
        </Button>

        <Button
          disabled={signInLoading}
          disableElevation
          sx={{ borderRadius: 0, height: 50, mb: 2, width: 160 }}
          variant="contained"
          onClick={() => signInHandler()}
        >
          {signInLoading ? (
            <CircularProgress color="inherit" size={25} />
          ) : (
            "Sign In"
          )}
        </Button>
      </Box>
    </>
  );
};

export default MobileLoginForm;
