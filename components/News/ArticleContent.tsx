import { Box, Button, TextField, Typography } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { FormatParagraphs } from "./FormatParagraphs";
import styles from "./styles/ArticleContent.module.scss";
import { PostAddOutlined } from "@mui/icons-material";

const ArticleContent = ({ post, setPost }: any) => {
  const { data: session, status } = useSession();
  const [editPressed, setEditPressed] = useState(false);
  const [text, setText] = useState(post.body);
  const [title, setTitle] = useState(post.title);
  const [image, setImage] = useState(post.image);
  const [subtitle, setSubtitle] = useState(post.subtitle);

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    //Validates forms to ensure there are no blank textfields
    if (text && title && image && subtitle) {
      //Validated images to include jpg, jpeg, or png
      if (
        image.includes(".jpg") ||
        image.includes(".jpeg") ||
        image.includes(".png")
      ) {
        await fetch(`/api/news/${post.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            body: text,
            subtitle: subtitle,
            title: title,
            image: image,
          }),
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              setTitle(data.newPost.title);
              setSubtitle(data.newPost.subtitle);
              setPost(data.newPost);
              setImage(data.image);
              setEditPressed(false);
            });
          } else {
            console.log("Uh oh. Something happened");
          }
        });
      }
    }
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.article_body_container}>
        {FormatParagraphs(post.body)}
      </Box>

      {session && status === "authenticated" ? (
        editPressed ? (
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className={styles.edit_form_container}
          >
            <Typography className={styles.text_field__label}>Title</Typography>
            <TextField
              className={styles.text_field}
              multiline
              fullWidth
              rows={1}
              defaultValue={post.title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Typography className={styles.text_field__label}>
              Subtitle
            </Typography>
            <TextField
              className={styles.text_field}
              multiline
              fullWidth
              rows={1}
              defaultValue={post.subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />

            <Typography className={styles.text_field__label}>Image</Typography>
            <TextField
              className={styles.text_field}
              multiline
              fullWidth
              rows={1}
              defaultValue={post.image}
              onChange={(e) => setImage(e.target.value)}
            />

            <Typography className={styles.text_field__label}>Body</Typography>
            <TextField
              className={styles.text_field}
              multiline
              fullWidth
              rows={30}
              defaultValue={post.body}
              onChange={(e) => setText(e.target.value)}
            />

            <Box className={styles.edit_buttons_container}>
              <Button
                onClick={() => {
                  setEditPressed(false);
                }}
                color="secondary"
                variant="contained"
                className={styles.button}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                className={styles.button}
              >
                Submit
              </Button>
            </Box>
          </form>
        ) : (
          <Box className={styles.edit_button}>
            <Button
              onClick={() => {
                setEditPressed(true);
              }}
              fullWidth
            >
              Edit post
            </Button>
          </Box>
        )
      ) : null}
    </Box>
  );
};

export default ArticleContent;
