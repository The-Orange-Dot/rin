import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import HeaderImage from "../components/HeaderImage";
import { Box, Container } from "@mui/system";
import { Typography } from "@mui/material";

const Home: NextPage = () => {
  return (
    <div className={styles.main}>
      <HeaderImage />
      <Box
        sx={{
          backgroundColor: "#312f2f",
          width: "100%",
          height: "20vh",
          mt: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "white" }}>
          This is a test for this box
        </Typography>
      </Box>
    </div>
  );
};

export default Home;
