import React, { useEffect, useState } from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { PostType } from "../../types/newsTypes";
import { DateFormatter } from "../DateFormatter";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const News = ({ post, index }: any) => {
  gsap.registerPlugin(ScrollTrigger);
  const [imageLoaded, setImageLoaded] = useState(false);
  const date = DateFormatter(post.createdAt);
  const even = index % 2 === 0;

  useEffect(() => {
    gsap.set("#main-image", { opacity: 0, x: 30 });
    gsap.set("#main-title", { opacity: 0, y: -20 });
    gsap.set("#main-subtitle", { opacity: 0, y: -20 });
    gsap.set("#main-date", { opacity: 0 });
    if (even) {
      gsap.set(".trigger", { opacity: 0, x: 50 });
    } else {
      gsap.set(".trigger", { opacity: 0, x: -50 });
    }

    if (imageLoaded) {
      gsap
        .timeline()
        .to("#main-title", { opacity: 1, y: 0, duration: 1 }, 0.7)
        .to("#main-subtitle", { opacity: 1, y: 0 }, 1)
        .to("#main-date", { opacity: 1 }, 1.3)
        .to(
          "#main-image",
          {
            opacity: 1,
            x: 0,
            duration: 2,
            ease: "power4.out",
          },
          1.5
        );
    }
  }, [imageLoaded]); //eslint-disable-line

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
        startAt: { x: -50 },
      });
    });
  }, []);

  if (index === 0) {
    return (
      <Box
        sx={{
          width: "90%",
          height: "75vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%", mb: 5 }}>
          <Divider />
        </Box>
        <Link href={`/news/${post.id}`}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#dfdfdf",
                transition: "0.3s",
                cursor: "pointer",
                ".image": { opacity: 0.9, transition: "0.3s" },
              },
            }}
            key={index}
          >
            <Box
              sx={{
                width: "50%",
                height: "40%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Box sx={{ width: "70%", textAlign: "center" }}>
                <Typography
                  variant="overline"
                  sx={{
                    fontWeight: "400",
                    fontSize: "2rem",
                    lineHeight: "2rem",
                  }}
                  id="main-title"
                >
                  {post.title}
                </Typography>
              </Box>
              <Box sx={{ width: "70%", textAlign: "center" }}>
                <Typography
                  variant="overline"
                  sx={{
                    fontWeight: "100",
                    fontSize: "1rem",
                    lineHeight: "1rem",
                  }}
                  id="main-subtitle"
                >
                  {post.subtitle}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="secondary" id="main-date">
                  Posted: {date}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: "50%", height: "100%", position: "relative" }}>
              <Image
                className="image"
                src={post.image}
                objectPosition={"50% 50%"}
                layout="fill"
                objectFit="cover"
                alt={post.image}
                priority
                onLoadingComplete={() => {
                  setImageLoaded(true);
                }}
                id="main-image"
              />
            </Box>
          </Box>
        </Link>
        <Box sx={{ width: "100%", mt: 10 }}>
          <Divider />
        </Box>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          height: "25vh",
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
                    width: "80%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row-reverse",
                    mx: 20,
                    my: 2,
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: "#dfdfdf",
                      transition: "0.3s",
                      cursor: "pointer",
                      ".image": { opacity: 0.8, transition: "0.3s" },
                    },
                  }
                : {
                    height: "100%",
                    width: "80%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    mx: 20,
                    my: 2,
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
                minWidth: 300,
                maxHeight: 400,
                height: "20vh",
                flex: 0.7,
              }}
            >
              <Image
                src={post.image}
                alt={post.image}
                layout="fill"
                objectFit="cover"
                className="image"
              />
            </Box>
            <Box
              sx={{
                flex: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 200 }}>
                {post.title}
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 200 }}>
                {post.subtitle}
              </Typography>
              <Box>
                <Typography variant="caption" color="secondary">
                  Posted: {date}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Link>
        <Box sx={{ width: "50%", m: 1 }}>
          <Divider />
        </Box>
      </Box>
    );
  }
};

export default News;
