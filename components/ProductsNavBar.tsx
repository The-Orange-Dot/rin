import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import gsap from "gsap";
import { useMediaQuery } from "@mui/material";

const ProductsNavBar = () => {
  const categories = ["BATH", "SKINCARE", "HAIRCARE", "LOTION"];
  const [highlighted, setHighlighted] = useState("");
  const isMobile = useMediaQuery("(max-width: 900px)");

  const mouseHoverSelectorHandler = (
    id: string,
    action: string,
    width: string
  ) => {
    const tl = gsap
      .timeline({ paused: true })
      .fromTo(
        `.${id}_line`,
        { width: 0, duration: ".2" },
        { width: width, duration: ".2" }
      );

    if (action === "enter") {
      tl.play(0);
    } else {
      tl.reverse(0);
    }
  };

  const categorySelector = categories.map((category) => {
    const width = `${category.length / 1.5}rem`;
    return (
      <Box
        key={category}
        sx={{
          width: `${90 / categories.length}%`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onMouseEnter={() => mouseHoverSelectorHandler(category, "enter", width)}
        onMouseLeave={() => mouseHoverSelectorHandler(category, "leave", width)}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: 200,
          }}
          className={`${category}_text`}
        >
          {category}
        </Typography>
        <Box
          className={`${category}_line`}
          sx={{
            borderBottom: "3px solid black",
          }}
        />
      </Box>
    );
  });

  return (
    <Container
      sx={
        isMobile
          ? {
              mb: 4,
              width: "100%",
              flex: "display",
              justifyContent: "space-between",
            }
          : {
              width: "100%",
              flex: "display",
              justifyContent: "space-between",
            }
      }
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          {categorySelector}
        </Box>
        <ShoppingCartIcon />
      </Container>
    </Container>
  );
};

export default ProductsNavBar;
