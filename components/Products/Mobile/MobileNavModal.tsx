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
import MobileLoginForm from "./MobileLoginForm";
import { signOut } from "next-auth/react";

const MobileNavModal = ({ mobileNavModalOpen, setMobileNavModalOpen }: any) => {
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const { data: session, status } = useSession();
  const [signoutLoader, setSignoutLoader] = useState(false);

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
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "flex-end",
        textAlign: "center",
      }}
      anchor="top"
      open={mobileNavModalOpen}
      onClose={() => {
        closeDrawerHandler();
      }}
    >
      <Paper
        square
        sx={
          openLoginForm
            ? {
                width: "100%",
                height: 280,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                pb: 2,
                transition: ".3s",
              }
            : status === "authenticated"
            ? {
                width: "100%",
                height: 250,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                pb: 6,
              }
            : {
                width: "100%",
                height: 230,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                pb: 6,
              }
        }
      >
        {openLoginForm ? (
          <MobileLoginForm
            setMobileNavModalOpen={setMobileNavModalOpen}
            setOpenLoginForm={setOpenLoginForm}
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
            <Link href="/about">
              <Typography variant="body1" sx={{ m: 0.5, fontWeight: 200 }}>
                About
              </Typography>
            </Link>
            <Link
            // href="/subscription"
            >
              <Typography variant="body1" sx={{ m: 0.5, fontWeight: 200 }}>
                Subscription
              </Typography>
            </Link>
            <Link href="/products">
              <Typography variant="body1" sx={{ m: 0.5, fontWeight: 200 }}>
                Products
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
