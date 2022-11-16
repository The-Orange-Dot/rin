import React, { useState } from "react";
import {
  Paper,
  Modal,
  Fade,
  Link,
  Typography,
  Drawer,
  CircularProgress,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import styled from "@emotion/styled/types/base";
import { useSession } from "next-auth/react";
import MobileLoginForm from "./Products/Mobile/MobileLoginForm";
import { signOut } from "next-auth/react";
import styles from "../styles/Navbar.module.scss";

const MobileNavModal = ({ mobileNavModalOpen, setMobileNavModalOpen }: any) => {
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const { data: session, status } = useSession();
  const [signoutLoader, setSignoutLoader] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);

  const closeDrawerHandler = () => {
    setMobileNavModalOpen(false);
    setTimeout(() => {
      setOpenLoginForm(false);
    }, 500);
  };

  const signOutHandler = async () => {
    setSignoutLoader(true);
    await signOut({ callbackUrl: `/` });
  };

  return (
    <Drawer
      className={styles.nav_menu}
      anchor="top"
      open={mobileNavModalOpen}
      onClose={() => {
        closeDrawerHandler();
      }}
    >
      <Paper
        square
        className={
          openLoginForm
            ? createAccount
              ? styles.navMenu__create_account_form
              : styles.navMenu__default_container
            : status === "authenticated"
            ? styles.navMenu__authenticated_container
            : styles.navMenu__unauthenticated_container
        }
      >
        {openLoginForm ? (
          <MobileLoginForm
            setMobileNavModalOpen={setMobileNavModalOpen}
            setOpenLoginForm={setOpenLoginForm}
            setCreateAccount={setCreateAccount}
            createAccount={createAccount}
          />
        ) : (
          <>
            <Typography
              sx={{
                width: "100%",
                color: "#312f2f",
                fontWeight: 200,
                cursor: "pointer",
                letterSpacing: 4,
                fontSize: "2.5rem",
              }}
              variant="h4"
            >
              rin
            </Typography>
            <Link href="/">
              <Typography variant="body1" sx={{ m: 0.5, fontWeight: 200 }}>
                Home
              </Typography>
            </Link>
            <Link href="/news">
              <Typography variant="body1" sx={{ m: 0.5, fontWeight: 200 }}>
                News
              </Typography>
            </Link>
            {/* <Link
            // href="/subscription"
            >
              <Typography variant="body1" sx={{ m: 0.5, fontWeight: 200 }}>
                Subscription
              </Typography>
            </Link> */}
            <Link href="/products">
              <Typography variant="body1" sx={{ m: 0.5, fontWeight: 200 }}>
                Store
              </Typography>
            </Link>
            {status === "authenticated" ? (
              <Link href="/profile">
                <Typography sx={{ m: 0.5, fontWeight: 200 }} variant="body1">
                  Profile
                </Typography>
              </Link>
            ) : (
              <Link>
                <Typography
                  sx={{ m: 0.5, fontWeight: 200, mb: 3 }}
                  variant="body1"
                  onClick={() => setOpenLoginForm(true)}
                >
                  Login
                </Typography>
              </Link>
            )}
            {status === "authenticated" ? (
              <Link>
                <Typography
                  sx={{ m: 0.5, fontWeight: 200, mb: 3 }}
                  variant="body1"
                  onClick={() => signOutHandler()}
                >
                  {signoutLoader ? (
                    <CircularProgress color="inherit" size={25} />
                  ) : (
                    "Log Out"
                  )}
                </Typography>
              </Link>
            ) : null}
          </>
        )}
      </Paper>
    </Drawer>
  );
};

export default MobileNavModal;
