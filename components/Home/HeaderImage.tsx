import {
  Paper,
  Container,
  CircularProgress,
  Typography,
  Box,
  Button,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";
import { useSession } from "next-auth/react";

const HeaderImage = ({ isMobile }: any) => {
  const { status } = useSession();
  const router = useRouter();
  const [loadingStore, setLoadingStore] = useState(false);
  const [imagesCounter, setImagesCounter] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (document.querySelector("#title")) {
      gsap.set("#title", { opacity: 0, y: -10 });
      gsap.set("#subtitle", { opacity: 0, x: -10 });
      gsap.set("#image", { opacity: 0, x: -10 });
      gsap.set(".buttons", { opacity: 0 });
    }
  }, []);

  useEffect(() => {
    if (imageLoaded) {
      setTimeout(() => {
        gsap
          .timeline()
          .to("#image", { opacity: 1, x: 0 })
          .to("#title", { opacity: 1, y: 0 })
          .to("#subtitle", { opacity: 1, y: 0 })
          .to(".buttons", { opacity: 1 });
      }, 1000);
    }
  }, [imageLoaded, imagesCounter]);

  const images = [
    {
      image: "/kimono.jpg",
      title: "Discover the world of Japanese cosmetics",
      subtitle:
        "Hundreds of J-beauty and skincare products, delivered straight from Japan right to your door.",
    },
    {
      image: "/cute_pink.jpg",
      title: "Try the latest cosmetics popular in Japan",
      subtitle:
        "The latest brands in J-beauty ready for you to try. Don't just follow the trend. Be the trend.",
    },
    {
      image: "/mature_model_2.jpg",
      title: "Be the first to experience exclusive products",
      subtitle:
        "Exclusive cosmetics, only found in Japan, made easily accessible for you in just a few simple clicks.",
    },
  ];
  const routeHandler = () => {
    setLoadingStore(true);
    router.push("/products");
  };

  useEffect(() => {
    if (router.pathname === "/") {
      let counter = imagesCounter + 1;
      if (imagesCounter >= images.length - 1) {
        counter = 0;
      }
      setTimeout(() => {
        setImageLoaded(false);
        gsap
          .timeline({
            onComplete: setImagesCounter,
            onCompleteParams: [counter],
          })
          .to("#image", { opacity: 0, duration: 0.3, x: -10 }, 0)
          .to("#title", { opacity: 0, duration: 0.3, y: -10 }, 0)
          .to("#subtitle", { opacity: 0, duration: 0.3, y: -10 }, 0);
      }, 10000);
      console.log("Change!");
    }
  }, [imagesCounter]); //eslint-disable-line

  return (
    <Box
      sx={
        isMobile
          ? {
              width: "50%",
              height: "100%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
          : {
              mt: 10,
              width: "50%",
              height: "70%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
      }
    >
      <Box
        sx={
          isMobile
            ? {
                position: "absolute",
                mt: 5,
                top: 0,
                left: "0%",
                width: "100%",
                height: "70%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: 1,
              }
            : {
                position: "absolute",
                left: "5%",
                minWidth: 100,
                maxWidth: 630,
                height: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "flex-start",
                zIndex: 1,
              }
        }
      >
        <Box
          sx={
            isMobile
              ? {
                  minHeight: "60%",
                  display: "flex",
                  alignItems: "center",
                  ml: 1,
                  width: "90%",
                }
              : {}
          }
        >
          <Typography
            sx={
              isMobile
                ? { fontWeight: 600, color: "#fff", mb: 2 }
                : {
                    fontWeight: 600,
                    color: "#312f2f",
                    mb: 2,
                    fontSize: "3.2rem",
                  }
            }
            variant="h3"
            id="title"
          >
            {images[imagesCounter].title}
          </Typography>
        </Box>
        <Box
          sx={
            isMobile
              ? {
                  minHeight: "35%",
                  display: "flex",
                  ml: 1,
                  width: "90%",
                  alignItems: "flex-start",
                }
              : { width: "90%" }
          }
        >
          <Typography
            sx={
              isMobile
                ? { fontWeight: 200, color: "#fff", mb: 2, ml: 2 }
                : {
                    fontWeight: 200,
                    color: "#312f2f",
                    mb: 2,
                    ml: 2,
                  }
            }
            variant="h6"
            id="subtitle"
          >
            {images[imagesCounter].subtitle}
          </Typography>
        </Box>
        <Box
          sx={
            isMobile
              ? {
                  width: "80%",
                  display: "flex",
                  justifyContent: "center",
                  mt: 5,
                }
              : {
                  width: "90%",
                  display: "flex",
                  justifyContent: "center",
                  mt: 5,
                }
          }
        >
          <Button
            sx={
              isMobile
                ? { width: 200, height: 50, ml: 1 }
                : { width: 200, height: 50 }
            }
            variant="contained"
            disableElevation
            onClick={routeHandler}
            disabled={loadingStore}
            className="buttons"
          >
            {loadingStore ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              "Go to store"
            )}
          </Button>
        </Box>
      </Box>

      <Box
        sx={
          isMobile
            ? {
                position: "relative",
                width: "100%",
                height: "100%",
                opacity: 0.5,
              }
            : {
                position: "relative",
                width: "100%",
                height: "100%",
                transform: "scale(1.25, 1.25)",
              }
        }
      >
        <Image
          src={images[imagesCounter].image}
          alt="image"
          layout="fill"
          objectFit="cover"
          id="image"
          objectPosition={isMobile ? "50% 50%" : "0 0"}
          quality={50}
          priority
          onLoadingComplete={() => setImageLoaded(true)}
        />
      </Box>
      <Paper
        square
        sx={
          isMobile
            ? {
                position: "absolute",
                right: "0%",
                width: "100%",
                height: "100%",
                zIndex: -1,
                backgroundColor: "#949495",
              }
            : {
                position: "absolute",
                right: "0%",
                width: "100%",
                height: "90%",
                zIndex: -1,
                backgroundColor: "#949495",
              }
        }
      />
    </Box>
  );
};

export default HeaderImage;
