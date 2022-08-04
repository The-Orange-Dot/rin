import { Box, Paper, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import React, { useState } from "react";
import News from "../../components/News";
import { server } from "../../config";
import styles from "../../styles/news.module.css";
import { PostType } from "../../types/newsTypes";
import MobileNews from "../../components/News/Mobile";
import { useMediaQuery } from "@mui/material";
import NewsFilter from "../../components/News/NewsFilter";

const NewsPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [postsArray, setPostsArray] = useState(posts);

  const postElements = postsArray.map((post: PostType, index: number) => {
    return isMobile ? (
      <MobileNews post={post} index={index} key={index} />
    ) : (
      <News post={post} index={index} key={index} />
    );
  });

  return (
    <div className={styles.main}>
      <Box sx={{ width: "100%", mt: 10, textAlign: "center" }}>
        <Typography
          variant="overline"
          sx={{ fontWeight: 100, lineHeight: 1, fontSize: "1rem" }}
        >
          News
        </Typography>
        <Box sx={{ width: "90%", height: "5vh" }}>
          <NewsFilter />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            mt: 5,
          }}
        >
          {postElements}
        </Box>
      </Box>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${server}/api/news`);
  const posts = await res.json();

  try {
    return {
      props: { posts: posts },
    };
  } catch {
    return { notFound: true };
  }
};

export default NewsPage;
