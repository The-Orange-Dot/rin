import { Box } from "@mui/material";
import React from "react";

const Article = ({ post }: any) => {
  return (
    <Box>
      <Box>{post.title}</Box>
    </Box>
  );
};

export default Article;
