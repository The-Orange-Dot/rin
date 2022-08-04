import { Box, Paper, Typography } from "@mui/material";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import React, { useState } from "react";
import News from "../components/News";
import { server } from "../config";
import styles from "../styles/news.module.css";
import { PostType } from "../types/newsTypes";
import MobileNews from "../components/News/Mobile";
import { useMediaQuery } from "@mui/material";

const About = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [postsArray, setPostsArray] = useState(posts);

  return (
    <div className={styles.main}>
      <Box sx={{ width: "100%", mt: 10, textAlign: "center" }}>
        <Typography
          variant="overline"
          sx={{ fontWeight: 100, lineHeight: 1, fontSize: "1rem" }}
        >
          News
        </Typography>
        {isMobile ? (
          <MobileNews postsArray={posts} />
        ) : (
          <News postsArray={posts} />
        )}
      </Box>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch(`${server}/api/news`);
    const posts = await res.json();
    return {
      props: { posts: posts },
    };
  } catch {
    return { notFound: true };
  }
};

export default About;
