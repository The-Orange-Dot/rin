import { Paper, Container, Typography, Box } from "@mui/material";
import Image from "next/image";
import React from "react";

const HeaderImage = () => {
  return (
    <Paper
      sx={{
        width: "100%",
        height: "50vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: "20%",
          minWidth: 100,
          maxWidth: 500,
          height: 200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Typography
          sx={{
            fontWeight: 100,
            color: "#312f2f",
          }}
          variant="h3"
        >
          This is a test text for a product
        </Typography>
        <Typography
          sx={{
            fontWeight: 100,
            color: "#312f2f",
          }}
          variant="h6"
        >
          This is a test description for this product that hooks the users
        </Typography>
      </Box>
      {
        /* eslint-disable */
        <img
          style={{
            objectFit: "contain",
          }}
          src="/facemasks-test.jpg"
          alt="masks"
        />

        /* eslint-enable */
      }
    </Paper>
  );
};

export default HeaderImage;
