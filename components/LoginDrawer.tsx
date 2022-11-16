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
import React, { SyntheticEvent, useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import gsap from "gsap";
import CreateAccountForm from "./CreateAccountForm";
import styles from "./Profile/styles/LoginDrawer.module.scss";

const LoginDrawer = ({ setOpenLoginDrawer }: any) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);

  const tl = gsap
    .timeline({ paused: true })
    .to("#login-error", { opacity: 1, duration: 0.2 })
    .to("#login-error", { opacity: 0, delay: 3, duration: 0.2 });

  const signInHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    setSignInLoading(true);

    await signIn("credentials", {
      redirect: false,
      username: usernameInput,
      password: passwordInput,
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
        setSignInLoading(false);
        tl.play();
      }
    });
  };

  return (
    <Paper
      className={
        createAccount ? styles.create_account_container : styles.login_container
      }
      square
    >
      {createAccount ? (
        <CreateAccountForm setOpenLoginDrawer={setOpenLoginDrawer} />
      ) : (
        <form onSubmit={(e: SyntheticEvent) => signInHandler(e)}>
          <Typography variant="overline" sx={{ fontSize: "1rem" }}>
            Sign In
          </Typography>

          <Divider />
          <Box className={styles.login_container__form}>
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
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              p: 2,
            }}
          >
            <Button
              disabled={signInLoading}
              disableElevation
              sx={{ borderRadius: 0, height: 50, mb: 2 }}
              variant="contained"
              type="submit"
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
              onClick={() => setCreateAccount(true)}
            >
              Create Account
            </Button>
            <Typography variant="overline" sx={{ fontSize: ".7rem" }}>
              I forgot my password
            </Typography>
          </Box>
          <Divider />
        </form>
      )}
    </Paper>
  );
};

export default LoginDrawer;
