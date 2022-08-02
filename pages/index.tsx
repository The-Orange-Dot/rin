import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import HeaderImage from "../components/HeaderImage";
import {
  Typography,
  Box,
  Container,
  Paper,
  Card,
  CardMedia,
} from "@mui/material";
import { GetStaticProps, GetStaticPaths } from "next";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMediaQuery } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";

const Home: NextPage = () => {
  gsap.registerPlugin(ScrollTrigger);
  const isMobile = useMediaQuery("(max-width: 900px)");

  const instructions = [
    {
      text: "Discover exclusive Japanese brands of cosmetics and skincare products",
      image: "/smartphone.png",
    },
    { text: "Purchase and review products that arrive directly from Japan" },
    {
      text: "Review the products and receive large discounts on your next purchase!",
    },
  ];

  useEffect(() => {
    gsap.utils.toArray(".trigger").forEach((title: any) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: title,
          start: "center 70%",
          end: "+=100",
          scrub: 2,
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(title, { opacity: 0 }, { opacity: 1 });
    });
  }, []);

  const instructionsElement = instructions.map((item, index) => {
    return (
      <Box
        className="instructions"
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
          <Typography sx={{ color: "white" }}>{item.text}</Typography>
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
        {item.image ? (
          <Image width={150} height={150} src={item.image} alt="test" />
        ) : null}
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography sx={{ color: "black" }}>{item.text}</Typography>
        </Box>
        {index === instructions.length - 1 ? null : (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <ArrowDownwardIcon sx={{ color: "black", mb: 2, mt: 2 }} />
          </Box>
        )}
      </Box>
    );
  });

  return (
    <div className={styles.main}>
      <Box
        sx={
          isMobile
            ? {
                width: "100%",
                height: "70vh",
                overflow: "hidden",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                flexDirection: "column",
                position: "relative",
              }
            : {
                width: "100%",
                height: "100vh",
                overflow: "hidden",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                flexDirection: "column",
                position: "relative",
              }
        }
      >
        <HeaderImage isMobile={isMobile} />
      </Box>
      <Box
        sx={
          isMobile
            ? {
                backgroundColor: "white",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                pt: 5,
                pb: 5,
                mt: 5,
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
        className="trigger"
      >
        <Typography sx={{ color: "black", mb: 5 }}>Easy as 1-2-3</Typography>
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

      {isMobile ? (
        <>
          <Box
            sx={{
              width: "100%",
              height: "50vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: 5,
            }}
          >
            <Paper
              square
              sx={{
                position: "relative",
                width: "90%",
                height: "100%",
                borderRadius: ".5rem",
              }}
              className="trigger"
            >
              <Image
                src="/packing.jpg"
                alt="packing"
                layout="fill"
                objectFit="cover"
                priority
                style={{ borderRadius: ".5rem" }}
              />
            </Paper>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "10vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Typography
              className={`${styles.heartKanji} trigger`}
              sx={{
                width: "100%",
                position: "absolute",
                fontFamily: "Montserrat",
                fontSize: "4rem",
                opacity: 0.1,
                fontWeight: 700,
                textAlign: "center",
                top: "10%",
                color: "rgba(0,0,0,.1)",
              }}
            >
              まごころ
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
                top: "30%",
              }}
              color="primary"
            >
              From the heart
            </Typography>
          </Box>

          <Box
            sx={{
              width: "80%",
              height: "15vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              textAlign: "center",
            }}
          >
            <Typography variant="body1" color="primary" className="trigger">
              Hand-packed and never dropshipped.
            </Typography>
            <Typography variant="body2" color="primary" className="trigger">
              All products are sent directly from us, to you, with care.
            </Typography>
          </Box>
        </>
      ) : (
        <Box
          sx={{ width: "100%", height: "50vh", display: "flex", m: 5, mt: 10 }}
        >
          <Paper
            square
            sx={{
              position: "relative",
              width: "45%",
              height: "100%",
              ml: 5,
              borderRadius: ".5rem",
            }}
            className="trigger"
          >
            <Image
              src="/packing.jpg"
              alt="packing"
              layout="fill"
              objectFit="cover"
              priority
              style={{ borderRadius: ".5rem" }}
            />
          </Paper>
          <Box sx={{ position: "relative", width: "50%" }}>
            <Typography
              className={`${styles.heartKanji} trigger`}
              sx={{
                width: "100%",
                position: "absolute",
                fontFamily: "Montserrat",
                fontSize: "8rem",
                opacity: 0.1,
                fontWeight: 700,
                left: "10%",
                right: "0%",
                ml: "auto",
                mr: "auto",
                textAlign: "center",
                top: 0,
                color: "rgba(0,0,0,.1)",
              }}
            >
              まごころ
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
              From the heart
            </Typography>
            <Box
              sx={{
                width: "100%",
                position: "absolute",
                left: "0%",
                right: "0%",
                ml: "auto",
                mr: "auto",
                textAlign: "center",
                top: "50%",
              }}
              color="primary"
            >
              <Typography variant="h4" color="primary" className="trigger">
                Hand-packed and never dropshipped.
              </Typography>
              <Typography variant="h5" color="primary" className="trigger">
                All products are sent directly from us, to you, with care.
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Home;
