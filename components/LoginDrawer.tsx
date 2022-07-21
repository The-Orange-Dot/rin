import {
  Paper,
  Box,
  Button,
  FormControl,
  InputAdornment,
  IconButton,
  InputLabel,
  Input,
  Divider,
  Typography,
  CircularProgress,
} from "@mui/material";
import { signIn, SignInResponse } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import gsap from "gsap";
import { style, width } from "@mui/system";

const LoginDrawer = ({ setOpenLoginDrawer }: any) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const session = useSession();

  const tl = gsap
    .timeline({ paused: true })
    .to("#login-error", { opacity: 1, duration: 0.2 })
    .to("#login-error", { opacity: 0, delay: 3, duration: 0.2 });

  const signInHandler = async () => {
    setSignInLoading(true);

    await signIn("credentials", {
      redirect: false,
      username: usernameInput,
      password: "password",
    }).then((res: SignInResponse | undefined) => {
      if (res === undefined) {
        console.log("Error: Next-auth response is undefined");
        tl.play();
        return;
      }

      if (res.ok) {
        setOpenLoginDrawer(false);
        setSignInLoading(false);
      } else {
        console.log(res.error);
        setSignInLoading(false);
        tl.play();
      }
    });
  };

  return (
    <Paper
      sx={{ maxWidth: 350, width: "30vw", height: "100%", textAlign: "center" }}
      square
    >
      <Typography variant="overline" sx={{ fontSize: "1rem" }}>
        Sign In
      </Typography>

      <Divider />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 10,
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
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="username">Username</InputLabel>

            <Input
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
        </Box>
      </Box>
      <Box>
        <Typography
          variant="overline"
          sx={{ color: "red", fontSize: ".7rem", opacity: 0 }}
          id="login-error"
        >
          Username or Password incorrect
        </Typography>
      </Box>
      <Box
        sx={{ width: "100%", display: "flex", flexDirection: "column", p: 2 }}
      >
        <Button
          disabled={signInLoading}
          disableElevation
          sx={{ borderRadius: 0, height: 50, mb: 2 }}
          variant="contained"
          onClick={() => signInHandler()}
        >
          {signInLoading ? (
            <CircularProgress color="inherit" size={25} />
          ) : (
            "Sign In"
          )}
        </Button>

        <Button
          sx={{ borderRadius: 0, height: 50, mb: 2 }}
          variant="outlined"
          onClick={() =>
            signIn("credentials", {
              redirect: false,
              username: usernameInput,
              password: "password",
            })
          }
        >
          Create Account
        </Button>
        <Typography variant="overline" sx={{ fontSize: ".7rem" }}>
          I forgot my password
        </Typography>
      </Box>
      <Divider />
    </Paper>
  );
};

export default LoginDrawer;
