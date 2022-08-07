import React, { useEffect, useState } from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { PostType } from "../../types/newsTypes";
import { DateFormatter } from "../DateFormatter";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import styles from "../../styles/news/articles.module.scss";

const News = ({ post, index, filterSelected }: any) => {
  gsap.registerPlugin(ScrollTrigger);
  const [imageLoaded, setImageLoaded] = useState(false);
  const date = DateFormatter(post.createdAt);
  const even = index % 2 === 0;
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (document.querySelector("#main-image")) {
      gsap.set("#main-image", {
        opacity: 0,
        x: 30,
      });
      gsap.set("#main-title", { opacity: 0, y: -20 });
      gsap.set("#main-subtitle", { opacity: 0, y: -20 });
      gsap.set("#main-date", { opacity: 0 });
    }
    if (even && document.querySelector(".trigger")) {
      gsap.set(".trigger", { opacity: 0, x: 50 });
    } else if (document.querySelector(".trigger")) {
      gsap.set(".trigger", { opacity: 0, x: -50 });
    }

    if (imageLoaded) {
      gsap
        .timeline({
          onStart: setAnimationComplete,
          onStartParams: [false],
          onComplete: setAnimationComplete,
          onCompleteParams: [true],
        })
        .to(
          "#main-title",
          { opacity: 1, y: 0, duration: 1, overwrite: true },
          0.7
        )
        .to("#main-subtitle", { opacity: 1, y: 0, overwrite: true }, 1)
        .to("#main-date", { opacity: 1, overwrite: true }, 1.3)
        .to(
          "#main-image",
          {
            opacity: 1,
            x: 0,
            duration: 2,
            ease: "power4.out",
            overwrite: true,
          },
          1.5
        );
    }
  }, [imageLoaded, filterSelected]); //eslint-disable-line

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
      <Box className={styles.main_post_container}>
        <Box className={styles.main_post_top_divider}>
          <Divider />
        </Box>
        <Link href={`/news/${post.id}`}>
          <Box
            className={
              animationComplete
                ? styles.main_post_card_anim_complete
                : styles.main_post_card
            }
            key={index}
          >
            <Box className={styles.main_post_card_content}>
              <Box className={styles.main_post_title_container}>
                <Typography
                  variant="overline"
                  fontWeight="400"
                  fontSize="2rem"
                  lineHeight="2rem"
                  id="main-title"
                >
                  {post.title}
                </Typography>
              </Box>
              <Box className={styles.main_post_subtitle_container}>
                <Typography
                  variant="overline"
                  fontWeight="100"
                  fontSize="1rem"
                  lineHeight="1rem"
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
            <Box className={styles.main_post_image_container}>
              <Image
                className={styles.image}
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
        <Box className={styles.main_post_bottom_divider}>
          <Divider />
        </Box>
      </Box>
    );
  } else {
    return (
      <Box className={`${styles.post_container} trigger`}>
        <Link href={`/news/${post.id}`}>
          <Box className={even ? styles.post_even : styles.post_odd}>
            <Box className={styles.image_container}>
              <Image
                src={post.image}
                alt={post.image}
                layout="fill"
                objectFit="cover"
                className={styles.image}
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
