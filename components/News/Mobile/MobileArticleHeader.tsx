import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import { DateFormatter } from "../../DateFormatter";

const MobileArticle = ({ post }: any) => {
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
          sx={{ fontWeight: 600, fontSize: "1.5rem", lineHeight: "1.5rem" }}
        >
          {post.title}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Typography
          variant="overline"
          sx={{ fontWeight: 200, fontSize: ".8rem", lineHeight: "1rem" }}
        >
          {post.subtitle}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Typography variant="caption" color="secondary">
          Posted: {date}
        </Typography>
      </Box>
      <Box sx={{ position: "relative", width: "100%", height: "50vh", mt: 3 }}>
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
      <Box sx={{ width: "50%", height: 1, my: 5 }}>
        <Divider />
      </Box>
    </Box>
  );
};

export default MobileArticle;
