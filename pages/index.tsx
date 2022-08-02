import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import HeaderImage from "../components/HeaderImage";
import { Typography, Box, Container, Paper } from "@mui/material";
import { GetStaticProps, GetStaticPaths } from "next";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMediaQuery } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Home: NextPage = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");

  const instructions = [
    "Discover exclusive Japanese brands of cosmetics and skincare products",
    "Purchase and review products that arrive directly from Japan",
    "Review the products and receive large discounts on your next purchase!",
  ];

  const instructionsElement = instructions.map((item, index) => {
    return (
      <Box
        sx={
          isMobile
            ? { width: "80%", textAlign: "center", mb: 2 }
            : index === instructions.length - 1
            ? {
                width: "10%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }
            : {
                width: "20%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }
        }
        key={index}
      >
        <Box
          sx={
            index === instructions.length - 1
              ? { width: "100%", textAlign: "center" }
              : { width: "50%", textAlign: "center" }
          }
        >
          <Typography sx={{ color: "white" }}>{item}</Typography>
        </Box>
        {index === instructions.length - 1 ? null : (
          <Box sx={{ width: "50%", textAlign: "end" }}>
            <ArrowForwardIosIcon sx={{ color: "white" }} />
          </Box>
        )}
      </Box>
    );
  });

  const mobileInstructions = instructions.map((item, index) => {
    return (
      <Box sx={{ width: "80%", textAlign: "center", mb: 2 }} key={index}>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography sx={{ color: "white" }}>{item}</Typography>
        </Box>
        {index === instructions.length - 1 ? null : (
          <Box sx={{ width: "50%", textAlign: "end" }}>
            <ArrowDownwardIcon sx={{ color: "white", mb: 2, mt: 2 }} />
          </Box>
        )}
      </Box>
    );
  });

  return (
    <div className={styles.main}>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <HeaderImage isMobile={isMobile} />
      </Box>
      <Box
        sx={
          isMobile
            ? {
                backgroundColor: "#312f2f",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                pt: 5,
                pb: 5,
              }
            : {
                backgroundColor: "#312f2f",
                width: "100%",
                height: "25vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }
        }
      >
        <Typography sx={{ color: "white", mb: 5 }}>Easy as 1-2-3</Typography>
        <Box
          sx={
            isMobile
              ? {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }
              : {
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }
          }
        >
          {isMobile ? mobileInstructions : instructionsElement}
        </Box>
      </Box>
    </div>
  );
};

export default Home;
