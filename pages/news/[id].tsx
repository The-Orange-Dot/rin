import React from "react";
import { server } from "../../config";
import styles from "../../styles/news.module.css";
import { GetStaticPaths, GetStaticProps } from "next";
import { PostType } from "../../types/newsTypes";
import { InferGetStaticPropsType } from "next";
import { Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Article from "../../components/News/Article";
import MobileArticle from "../../components/News/Mobile/MobileArticle";

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <div className={styles.main}>
      <Box sx={{ mt: 20 }}>
        {isMobile ? <MobileArticle post={post} /> : <Article post={post} />}
      </Box>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${server}/api/news`);
  const posts = await res.json();

  const paths = posts.map((post: PostType) => ({
    params: { id: post.id.toString() },
  }));

  console.log("PATHS: ", paths);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  console.log("PARAMS: ", params);
  const res = await fetch(`${server}/api/news/${params.id}`);
  const post = await res.json();

  try {
    return {
      props: { post: post },
    };
  } catch {
    return { notFound: true };
  }
};

export default Post;
