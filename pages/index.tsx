import type { NextPage } from "next";
import styles from "../styles/home.module.scss";
import Image from "next/image";
import HeaderImage from "../components/HeaderImage";
import { Typography, Box, Paper } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";
import { panels, instructions } from "../components/Home/Texts";
import Instructions from "../components/Home/Instructions";
import MobileInstructions from "../components/Home/MobileInstructions";
import AboutUsPanels from "../components/Home/AboutUsPanels";

const Home: NextPage = () => {
  gsap.registerPlugin(ScrollTrigger);
  const isMobile = useMediaQuery("(max-width: 900px)");

  useEffect(() => {
    gsap.utils.toArray(".trigger").forEach((title: any) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: title,
          start: "center 90%",
          end: "+=100",
          scrub: 2,
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(title, { opacity: 0 }, { opacity: 1 });
    });
  }, []);

  return (
    <div className={styles.main}>
      <Box className={styles.header_container}>
        <HeaderImage isMobile={isMobile} />
      </Box>
      <Box className={styles.main_page_container}>
        <Typography
          className={`trigger`}
          variant="h5"
          color={isMobile ? "primary" : "white"}
        >
          Easy as 1-2-3
        </Typography>
        <Box className={styles.instructions_container}>
          {isMobile ? <MobileInstructions /> : <Instructions />}
        </Box>
      </Box>

      <AboutUsPanels />
    </div>
  );
};

export default Home;
