import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import styles from "../../styles/home.module.scss";
import Image from "next/image";
import { instructions } from "./Texts";
import type { NextComponentType } from "next";

const MobileInstructions: NextComponentType = () => {
  const mobileInstructions = instructions.map((item, index) => {
    const lastCard = index === instructions.length - 1;

    return (
      <Box
        sx={{ width: "80%", textAlign: "center", mb: 2 }}
        key={index}
        className={`${styles.mobile_instructions_card} trigger`}
      >
        {item.image ? (
          <Image
            width={150}
            height={150}
            objectFit="contain"
            src={item.image}
            alt="test"
          />
        ) : null}
        <Box className={styles.mobile_instructions_card_text}>
          <Typography color="primary">{item.text}</Typography>
        </Box>
        {lastCard ? null : (
          <Box className={styles.mobile_arrows}>
            <ArrowDownwardIcon color="primary" />
          </Box>
        )}
      </Box>
    );
  });

  return <>{mobileInstructions}</>;
};

export default MobileInstructions;
