import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Divider } from "@mui/material";
import Image from "next/image";
import { PostType } from "../../../types/newsTypes";
import { DateFormatter } from "../../DateFormatter";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const MobileNews = ({ post, index, filterSelected }: any) => {
  gsap.registerPlugin(ScrollTrigger);
  const [imageLoaded, setImageLoaded] = useState(false);
  const date = DateFormatter(post.createdAt);
  const even = index % 2 === 0;

  useEffect(() => {
    gsap.set("#main-image", { opacity: 0, x: 30 });
    gsap.set("#main-title", { opacity: 0, y: 20 });
    gsap.set("#main-subtitle", { opacity: 0, y: 20 });
    gsap.set("#main-date", { opacity: 0, y: 20 });
    gsap.set(".trigger", { opacity: 0, x: 50 });

    if (imageLoaded) {
      gsap
        .timeline()
        .to(
          "#main-title",
          { opacity: 1, y: 0, duration: 1, overwrite: true },
          1
        )
        .to(
          "#main-subtitle",
          { opacity: 1, y: 0, duration: 1, overwrite: true },
          1
        )
        .to("#main-date", { opacity: 1, y: 0, duration: 1, overwrite: true }, 1)
        .to(
          "#main-image",
          {
            opacity: 1,
            x: 0,
            duration: 2,
            overwrite: true,
            ease: "power4.out",
          },
          1.5
        );
    }
  }, [imageLoaded]);

  useEffect(() => {
    gsap.utils.toArray(".trigger").forEach((title: any) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: title,
          start: "center: 90%",
          end: "+=100",
          toggleActions: "play none none none",
        },
      });

      tl.to(title, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power4.out",
      });
    });
  }, []); //eslint-disable-line

  if (index === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
        key={index}
      >
        <Link href={`/news/${post.id}`}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%", mb: 5 }}>
              <Divider />
            </Box>
            <Box sx={{ width: "100%", height: "80%", position: "relative" }}>
              <Image
                src={post.image}
                layout="fill"
                objectFit="cover"
                alt={post.image}
                objectPosition="50% 0"
                priority
                onLoadingComplete={() => {
                  setImageLoaded(true);
                }}
                id="main-image"
              />
            </Box>
            <Box
              sx={{
                width: "90%",
                height: "10vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
              id="main-title"
            >
              <Typography
                variant="overline"
                sx={{
                  fontWeight: "400",
                  fontSize: "1.5rem",
                  lineHeight: "1.5rem",
                  my: 2,
                }}
              >
                {post.title}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "90%",
                height: "5vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
              id="main-subtitle"
            >
              <Typography
                variant="overline"
                sx={{
                  fontWeight: "100",
                  fontSize: ".8rem",
                  lineHeight: ".8rem",
                }}
              >
                {post.subtitle}
              </Typography>{" "}
            </Box>
            <Box>
              <Typography variant="caption" color="secondary" id="main-date">
                Posted: {date}
              </Typography>
            </Box>
          </Box>
        </Link>
        <Box sx={{ width: "100%", mt: 5 }}>
          <Divider />
        </Box>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          height: "15vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="trigger"
      >
        <Link href={`/news/${post.id}`}>
          <Box
            sx={
              even
                ? {
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row-reverse",
                    mx: 5,
                    py: 2,
                    transition: "0.3s",
                    overflowX: "hidden",
                    "&:hover": {
                      backgroundColor: "#dfdfdf",
                      transition: "0.3s",
                      cursor: "pointer",
                      ".image": { opacity: 0.8, transition: "0.3s" },
                    },
                  }
                : {
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    overflowX: "hidden",
                    mx: 5,
                    py: 2,
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: "#dfdfdf",
                      transition: "0.3s",
                      cursor: "pointer",
                      ".image": { opacity: 0.8, transition: "0.3s" },
                    },
                  }
            }
          >
            <Box
              sx={{
                position: "relative",
                height: "100%",
                flex: 0.5,
              }}
            >
              <Image
                src={post.image}
                alt={post.image}
                layout="fill"
                objectFit="cover"
                className="image"
                quality={20}
                priority
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ textAlign: "center", width: "80%" }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, lineHeight: "1rem" }}
                >
                  {post.title}
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center", width: "90%" }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 100,
                    lineHeight: "1rem",
                    fontSize: ".7rem",
                  }}
                >
                  {post.subtitle}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Link>
        <Box sx={{ width: "50%" }}>
          <Divider />
        </Box>
      </Box>
    );
  }
};

export default MobileNews;
