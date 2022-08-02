import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import HeaderImage from "../components/HeaderImage";
import { Typography, Box, Container, Paper } from "@mui/material";
import { GetStaticProps, GetStaticPaths } from "next";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMediaQuery } from "@mui/material";

const Home: NextPage = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");

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
        sx={{
          backgroundColor: "#312f2f",
          width: "100%",
          height: "25vh",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "white", mb: 3 }}>Easy as 1-2-3</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "10%" }}>
            <Typography sx={{ color: "white" }}>
              Register an account with us
            </Typography>
          </Box>
          <ArrowForwardIosIcon sx={{ color: "white", width: "5%" }} />
          <Box sx={{ width: "10%" }}>
            <Typography sx={{ color: "white" }}>
              Discover exclusive Japanese brands of cosmetics and skincare
              products
            </Typography>
          </Box>
          <ArrowForwardIosIcon sx={{ color: "white", width: "5%" }} />
          <Box sx={{ width: "10%" }}>
            <Typography sx={{ color: "white" }}>
              Purchase and review products that arrive directly from Japan
            </Typography>
          </Box>
          <ArrowForwardIosIcon sx={{ color: "white", width: "5%" }} />

          <Box sx={{ width: "10%" }}>
            <Typography sx={{ color: "white" }}>
              Review the products and receive large discounts on your next
              purchase!
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
