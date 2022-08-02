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
    gsap.set("#title", { opacity: 0, y: -10 });
    gsap.set("#subtitle", { opacity: 0, x: -10 });
    gsap.set("#image", { opacity: 0, x: -10 });
    gsap.set(".buttons", { opacity: 0 });
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
        "Japanese cosmetics and skincare products, delivered from Japan right to your door in just a few simple clicks",
    },
    {
      image: "/face_wash.jpg",
      title: "Find new routines for your morning",
      subtitle:
        "Try products that can only be found in Japan, rate them and suggest them to others to to enjoy.",
    },
    {
      image: "/makeup.jpg",
      title: "Be beautiful. Be fierce. Be you.",
      subtitle:
        "Browse through hundreds of products to find what you need to be the best you that you can be.",
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
              mt: 10,
              width: "70%",
              height: "70%",
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
                mt: 15,
                top: 0,
                left: "0%",
                width: "100%",
                height: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: 1,
              }
            : {
                position: "absolute",
                left: "10%",
                minWidth: 100,
                maxWidth: 550,
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
                  minHeight: "55%",
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
              (isMobile && imagesCounter === 0) || imagesCounter === 2
                ? { fontWeight: 600, color: "#fff", mb: 2 }
                : {
                    fontWeight: 600,
                    color: "#312f2f",
                    mb: 2,
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
                  minHeight: "40%",
                  display: "flex",
                  ml: 1,
                  width: "90%",
                  alignItems: "flex-start",
                }
              : {}
          }
        >
          <Typography
            sx={
              (isMobile && imagesCounter === 0) || imagesCounter === 2
                ? { fontWeight: 100, color: "#fff", mb: 2, ml: 2 }
                : {
                    fontWeight: 100,
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
                  justifyContent: "space-between",
                  mt: 5,
                }
              : {
                  width: "90%",
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 5,
                }
          }
        >
          <Button
            sx={
              isMobile
                ? { width: 200, height: 50, mr: 1 }
                : { width: 200, height: 50 }
            }
            variant="contained"
            disableElevation
            className="buttons"
          >
            Register Account
          </Button>
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
              "See store"
            )}
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          src={images[imagesCounter].image}
          alt="image"
          layout="fill"
          objectFit="cover"
          id="image"
          quality={50}
          priority
          onLoadingComplete={() => setImageLoaded(true)}
        />
      </Box>
      <Paper
        square
        sx={{
          position: "absolute",
          right: "0%",
          width: "100%",
          height: "70%",
          zIndex: -1,
          backgroundColor: "#949495",
        }}
      />
    </Box>
  );
};

export default HeaderImage;
