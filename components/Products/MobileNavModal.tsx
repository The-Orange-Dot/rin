import React from "react";
import { Paper, Modal, Fade, Link, Typography, Drawer } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import styled from "@emotion/styled/types/base";

const MobileNavModal = ({ mobileNavModalOpen, setMobileNavModalOpen }: any) => {
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
        setMobileNavModalOpen(false);
      }}
    >
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
    </Drawer>
  );
};

export default MobileNavModal;
