import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "../../styles/Home.module.scss";
import { instructions } from "./Texts";
import type { NextComponentType } from "next";

const Instructions: NextComponentType = () => {
  const instructionsElement = instructions.map((item, index) => {
    const lastCard = index === instructions.length - 1;
    return (
      <Box
        key={index}
        className={
          lastCard
            ? styles.instructions_card_container
            : styles.instructions_last_card_container
        }
      >
        <Box
          className={`${
            lastCard ? styles.screen_last_card : styles.screen_cards
          } trigger`}
        >
          <Typography color="white">{item.text}</Typography>
        </Box>
        {index === instructions.length - 1 ? null : (
          <Box className={styles.arrows}>
            <ArrowForwardIosIcon color="info" />
          </Box>
        )}
      </Box>
    );
  });

  return <>{instructionsElement}</>;
};

export default Instructions;
