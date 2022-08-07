import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Divider } from "@mui/material";
import Image from "next/image";
import { PostType } from "../../../types/newsTypes";
import { DateFormatter } from "../../DateFormatter";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import styles from "../../../styles/news/Articles.module.scss";

const MobileNews = ({ post, index, filterSelected }: any) => {
  gsap.registerPlugin(ScrollTrigger);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const date = DateFormatter(post.createdAt);
  const even = index % 2 === 0;

  useEffect(() => {
    if (document.querySelector("#main-image")) {
      gsap.set("#main-image", { opacity: 0, x: 30 });
      gsap.set("#main-title", { opacity: 0, y: 20 });
      gsap.set("#main-subtitle", { opacity: 0, y: 20 });
      gsap.set("#main-date", { opacity: 0, y: 20 });
      gsap.set(".trigger", { opacity: 0, x: 50 });
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
          0.5
        )
        .to(
          "#main-subtitle",
          { opacity: 1, y: 0, duration: 1, overwrite: true },
          0.5
        )
        .to(
          "#main-date",
          { opacity: 1, y: 0, duration: 1, overwrite: true },
          0.5
        )
        .to(
          "#main-image",
          {
            opacity: 1,
            x: 0,
            duration: 2,
            overwrite: true,
            ease: "power4.out",
          },
          1
        );
    }
  }, [imageLoaded, filterSelected]);

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
      <Box className={styles.main_post_container} key={index}>
        <Link href={`/news/${post.id}`}>
          <Box className={styles.main_post_card}>
            <Box className={styles.main_post_top_divider}>
              <Divider />
            </Box>
            <Box className={styles.main_post_image_container}>
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
            <Box className={styles.main_post_title_container} id="main-title">
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
              className={styles.main_post_subtitle_container}
              id="main-subtitle"
            >
              <Typography
                variant="overline"
                fontWeight={100}
                fontSize=".8rem"
                lineHeight=".8rem"
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
                className="image"
                quality={20}
                priority
              />
            </Box>
            <Box className={styles.post_content_container}>
              <Box className={styles.post_title_container}>
                <Typography variant="body1" lineHeight="1rem" fontWeight={600}>
                  {post.title}
                </Typography>
              </Box>

              <Box className={styles.post_subtitle_container}>
                <Typography
                  variant="body2"
                  fontWeight={100}
                  lineHeight="1rem"
                  fontSize=".7rem"
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
