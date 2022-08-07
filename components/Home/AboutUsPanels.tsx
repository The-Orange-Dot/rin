import React from "react";
import Image from "next/image";
import { panels, instructions } from "./Texts";
import styles from "../../styles/Home.module.scss";
import { Typography, Box, Paper } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import type { NextComponentType } from "next";

const AboutUsPanels: NextComponentType = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");

  const AboutUsCards = panels.map((panel, index) => {
    const even = index === 0 || index % 2 === 0;

    return isMobile ? (
      <Box key={index}>
        <Box className={styles.panels_container}>
          <Paper square className={`${styles.panels_image_container} trigger`}>
            <Image
              src={panel.image}
              alt="packing"
              layout="fill"
              objectFit="cover"
              priority
              className={styles.image_border}
            />
          </Paper>
        </Box>
        <Box className={styles.panel_content_container}>
          <Typography
            className={`${styles.kanji} trigger`}
            sx={{
              width: "100%",
              position: "absolute",
              fontSize: "4rem",
              fontFamily: "游ゴシック体",
              opacity: 0.1,
              fontWeight: 700,
              textAlign: "center",
              top: "0",
              color: "rgba(0,0,0,.1)",
            }}
          >
            {panel.jpn}
          </Typography>
          <Typography
            className="trigger"
            sx={{
              width: "100%",
              position: "absolute",
              fontSize: "2rem",
              fontWeight: 700,
              left: "0%",
              right: "0%",
              ml: "auto",
              mr: "auto",
              textAlign: "center",
              top: "20%",
            }}
            color="primary"
          >
            {panel.eng}
          </Typography>
        </Box>

        <Box className={styles.body_title}>
          <Typography
            variant="body1"
            color="primary"
            className="trigger"
            fontWeight={600}
          >
            {panel.bodyTitle}
          </Typography>
          <Typography variant="body2" color="primary" className="trigger">
            {panel.bodyText}
          </Typography>
        </Box>
      </Box>
    ) : (
      <Box
        className={
          even ? styles.panels_container_even : styles.panels_container
        }
        key={index}
      >
        <Paper
          square
          className={`${
            even
              ? styles.panels_image_container
              : styles.panels_image_container_even
          } trigger`}
        >
          <Image
            src={panel.image}
            alt="packing"
            layout="fill"
            objectFit="cover"
            priority
            className={styles.image_border}
          />
        </Paper>
        <Box className={styles.panel_content_container}>
          <Typography
            className={`${styles.kanji} trigger`}
            sx={{
              width: "100%",
              position: "absolute",
              fontSize: "7rem",
              fontFamily: "游ゴシック体",
              opacity: 0.1,
              fontWeight: 700,
              left: "15%",
              right: "0%",
              ml: "auto",
              mr: "auto",
              textAlign: "center",
              top: 50,
              color: "rgba(0,0,0,.1)",
            }}
          >
            {panel.jpn}
          </Typography>
          <Typography
            className="trigger"
            sx={{
              width: "100%",
              position: "absolute",
              fontSize: "3rem",
              fontWeight: 700,
              left: "0%",
              right: "0%",
              ml: "auto",
              mr: "auto",
              textAlign: "center",
              top: "11%",
            }}
            color="primary"
          >
            {panel.eng}
          </Typography>
          <Box className={styles.body_title} color="primary">
            <Typography
              variant="h4"
              color="primary"
              className="trigger"
              fontWeight={600}
            >
              {panel.bodyTitle}
            </Typography>
            <Typography variant="h5" color="primary" className="trigger">
              {panel.bodyText}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  });

  return <>{AboutUsCards}</>;
};

export default AboutUsPanels;
