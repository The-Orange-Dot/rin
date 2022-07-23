import React, { useState } from "react";
import { Paper, Modal, Fade, Link, Typography, Drawer } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import styled from "@emotion/styled/types/base";
import { useSession } from "next-auth/react";
import MobileLoginForm from "./MobileLoginForm";

const MobileNavModal = ({ mobileNavModalOpen, setMobileNavModalOpen }: any) => {
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const session = useSession();

  const closeDrawerHandler = () => {
    setMobileNavModalOpen(false);
    setTimeout(() => {
      setOpenLoginForm(false);
    }, 500);
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
                height: "38vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                pb: 2,
                transition: ".3s",
              }
            : {
                width: "100%",
                height: "29vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                pb: 6,
              }
        }
      >
        {openLoginForm ? (
          <MobileLoginForm />
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
            </Link>{" "}
            <Link href="/subscription">
              <Typography variant="body1" sx={{ m: 0.5, fontWeight: 200 }}>
                Subscription
              </Typography>
            </Link>
            <Link href="/products">
              <Typography variant="body1" sx={{ m: 0.5, fontWeight: 200 }}>
                Products
              </Typography>
            </Link>
            {session.status === "authenticated" ? (
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
          </>
        )}
      </Paper>
    </Drawer>
  );
};

export default MobileNavModal;
