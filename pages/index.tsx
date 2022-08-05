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
    {
      text: "Purchase and try products that arrive directly from Japan",
      image: "/face_mask.png",
    },
    {
      text: "Review the products and receive large discounts on your next purchase!",
      image: "/suggest.png",
    },
  ];

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
      <Box
        sx={{ width: "80%", textAlign: "center", mb: 2 }}
        key={index}
        className="trigger"
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

  const panels = [
    {
      jpn: "東京",
      eng: "Tokyo Born",
      bodyTitle: "Founded and headquartered in Tokyo",
      bodyText:
        "Established in the center of Japan's fashion and modern culture. Our dedicated team keeps an eye out for the latest and most popular trends before it hits our store for you to enjoy too.",
      image: "/tokyo_tower.jpg",
    },
    {
      jpn: "最新コスメ",
      eng: "Bountifully Exclusive",
      bodyTitle: "Ever-growing catalogue of exclusive products",
      bodyText:
        "Packed to the brim with the latest and most popular J-cosmetics, from skin care to make-up, products that are exclusive only to Japan are here at our store for you to be the first to experience.",
      image: "/cosmetics.jpg",
    },
    {
      jpn: "クチコミ",
      eng: "Sharing is caring",
      bodyTitle: "Tell others what you think",
      bodyText:
        "We believe in the power of word-of-mouth and the community that it brings. Review products that you bought to share how you feel about them. You'll also receive coupons for large discounts to use or share with others.",
      image: "/cute_phone_2.jpg",
    },
  ];

  const cards = panels.map((panel, index) => {
    const even = index === 0 || index % 2 === 0;

    return isMobile ? (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        key={index}
      >
        <Box
          sx={{
            width: "100%",
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Paper
            square
            sx={{
              position: "relative",
              width: "90%",
              height: "70%",
              borderRadius: ".5rem",
            }}
            className="trigger"
          >
            <Image
              src={panel.image}
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
            height: "15vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Typography
            className={`${styles.kanji} trigger`}
            sx={{
              width: "100%",
              position: "absolute",
              fontSize: "4rem",
              fontFamily: "Montserrat",

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

        <Box
          sx={{
            width: "100%",
            height: "15vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            textAlign: "center",
          }}
        >
          <Typography
            variant="body1"
            color="primary"
            className="trigger"
            sx={{ fontWeight: 600 }}
          >
            {panel.bodyTitle}
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            className="trigger"
            sx={{ width: "90%" }}
          >
            {panel.bodyText}
          </Typography>
        </Box>
      </Box>
    ) : (
      <Box
        sx={
          even
            ? {
                width: "100%",
                height: "50vh",
                display: "flex",
                m: 5,
                mt: 10,
                flexDirection: "row-reverse",
              }
            : {
                width: "100%",
                height: "50vh",
                display: "flex",
                m: 5,
                mt: 10,
              }
        }
        key={index}
      >
        <Paper
          square
          sx={
            even
              ? {
                  position: "relative",
                  width: "45%",
                  height: "100%",
                  mr: 5,
                  borderRadius: ".5rem",
                }
              : {
                  position: "relative",
                  width: "45%",
                  height: "100%",
                  ml: 5,
                  borderRadius: ".5rem",
                }
          }
          className="trigger"
        >
          <Image
            src={panel.image}
            alt="packing"
            layout="fill"
            objectFit="cover"
            priority
            style={{ borderRadius: ".5rem" }}
          />
        </Paper>
        <Box sx={{ position: "relative", width: "50%", mr: 5, ml: 5 }}>
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
            <Typography
              variant="h4"
              color="primary"
              className="trigger"
              sx={{ fontWeight: 600 }}
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
      >
        <Typography
          sx={isMobile ? { color: "black", mb: 5 } : { color: "white" }}
          className="trigger"
          variant="h5"
        >
          Easy as 1-2-3
        </Typography>
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

      {cards}
    </div>
  );
};

export default Home;
