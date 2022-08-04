import { Box, Typography } from "@mui/material";
import React from "react";

const NewsFilter = () => {
  const selectorArray = [
    {
      text: "Fashion",
      value: "fashion",
    },
    { text: "Culture", value: "culture" },
    { text: "Food", value: "food" },
  ];

  const selector = selectorArray.map((selector: any, index: number) => {
    return (
      <Box
        key={index}
        sx={{
          width: 150,
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: ".2s",
          "&:hover": {
            textDecoration: "underline",
            transition: ".2s",
            cursor: "pointer",

            ".text": { fontWeight: 600, transition: "0.2s" },
          },
        }}
      >
        <Typography
          className="text"
          variant="overline"
          sx={{ fontSize: "1rem" }}
        >
          {selector.text}
        </Typography>
      </Box>
    );
  });

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {selector}
    </Box>
  );
};

export default NewsFilter;
