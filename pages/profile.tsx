import { Button, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";
import styles from "../styles/profile.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Box } from "@mui/system";

const Profile = () => {
  const session = useSession();
  const router = useRouter();

  console.log(session);

  const signOutHandler = () => {
    signOut({ redirect: false });
  };

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/");
    }
  }, [session.status]); //eslint-disable-line

  if (session.status === "loading") {
    return (
      <div className={styles.mainStatusScreen}>
        <Typography>Fetching your info</Typography>
      </div>
    );
  } else if (session.status === "authenticated") {
    return (
      <div className={styles.main}>
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            pt: 20,
          }}
        >
          <Box sx={{ border: "1px solid black", height: "60%", width: "20vw" }}>
            {" "}
          </Box>
          <Box></Box>
        </Box>

        <Button onClick={() => signOutHandler()}>Sign Out</Button>
      </div>
    );
  } else {
    return (
      <div className={styles.mainStatusScreen}>
        <Typography>Redirecting you back to home</Typography>
        <Typography>Please log in</Typography>
      </div>
    );
  }
};

export default Profile;
