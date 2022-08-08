import { Box, Divider, Typography, Button } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FormatParagraphs } from "../News/FormatParagraphs";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "../../styles/admin/PostPreview.module.scss";

const PostPreview = ({
  title,
  subtitle,
  image,
  body,
  setOpenImageDrawer,
}: any) => {
  const [imagePreview, setImagePreview] = useState<any>();

  useEffect(() => {
    if (image) {
      if (
        image.includes(".jpg") ||
        image.includes(".jpeg") ||
        image.includes(".png")
      ) {
        setImagePreview(
          <Box className={styles.image}>
            <Image src={image} alt={image} layout="fill" objectFit="cover" />
          </Box>
        );
      }
    } else {
      setImagePreview(<Box />);
    }
  }, [image]);

  const preview = body.split("\n").map((text: string, index: number) => {
    if (text.includes(".jpg") || text.includes(".jpeg")) {
      return (
        <Box className={styles.body_image} key={index}>
          <Image
            src={text}
            layout="fill"
            objectFit="contain"
            alt="image_preview"
          />
        </Box>
      );
    }
    return (
      <Typography fontSize=".4rem" key={index}>
        &emsp;&emsp;{text}
      </Typography>
    );
  });

  return (
    <Box className={styles.container}>
      <Box>
        <Typography>PC SCREEN PREVIEW</Typography>
      </Box>
      <Box className={styles.screen_border}>
        <Box className={styles.gray_bar} />
        <Box className={styles.nav_bar_container}>
          <Typography>rin</Typography>
          <Box className={styles.nav_bar_selector_container}>
            <Typography variant="overline" fontSize=".4rem">
              Admin
            </Typography>
            <Typography variant="overline" fontSize=".4rem">
              Home
            </Typography>
            <Typography variant="overline" fontSize=".4rem">
              News
            </Typography>
            <Typography variant="overline" fontSize=".4rem">
              Store
            </Typography>
            <ShoppingCartIcon fontSize="small" />
          </Box>
        </Box>
        <Box className={styles.headers_container}>
          <Box className={styles.title_container}>
            <Typography
              variant="overline"
              lineHeight=".5rem"
              fontWeight={600}
              fontSize="1rem"
            >
              {title}
            </Typography>
          </Box>

          <Box className={styles.subtitle_container}>
            <Typography
              variant="overline"
              lineHeight="1rem"
              fontWeight={100}
              fontSize=".5rem"
            >
              {subtitle}
            </Typography>
          </Box>
          <Box className={styles.image_container}>{imagePreview}</Box>
          <Box className={styles.body_container}>{preview}</Box>
        </Box>
        <Box className={styles.bottom_divider}>
          <Divider />
        </Box>
      </Box>
      <Box className={styles.open_image_button}>
        <Button onClick={() => setOpenImageDrawer(true)} fullWidth>
          Open Image Drawer
        </Button>
      </Box>
    </Box>
  );
};

export default PostPreview;
