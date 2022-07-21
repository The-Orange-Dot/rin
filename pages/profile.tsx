import { Button, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";
import styles from "../styles/profile.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const profile = () => {
  const session = useSession();
  const router = useRouter();

  const signOutHandler = () => {
    signOut({ redirect: false });
  };

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/");
    }
  }, [session.status]);

  if (session.status === "loading") {
    return (
      <div className={styles.mainStatusScreen}>
        <Typography>Fetching your info</Typography>
      </div>
    );
  } else if (session.status === "authenticated") {
    return (
      <div className={styles.main}>
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

export default profile;
