import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { DateFormatter } from "../DateFormatter";

const Article = ({ post }: any) => {
  const date = DateFormatter(post.createdAt);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Typography
          variant="overline"
          sx={{ fontWeight: 600, fontSize: "3rem", lineHeight: "3rem" }}
        >
          {post.title}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Typography
          variant="overline"
          sx={{ fontWeight: 100, fontSize: "1.5rem", lineHeight: "3rem" }}
        >
          {post.subtitle}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Typography variant="caption" color="secondary">
          Posted: {date}
        </Typography>
      </Box>
      <Box sx={{ position: "relative", width: "60%", height: "60vh", mt: 5 }}>
        <Image
          src={post.image}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          priority
          placeholder="blur"
          blurDataURL={post.image}
        />
      </Box>
    </Box>
  );
};

export default Article;
