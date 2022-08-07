import { Box, Button, TextField, Typography } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { FormatParagraphs } from "./FormatParagraphs";
import styles from "../../styles/news/ArticlePage.module.scss";

const ArticleContent = ({ post }: any) => {
  const { data: session, status } = useSession();
  const [editPressed, setEditPressed] = useState(false);
  const [text, setText] = useState("");
  const [body, setBody] = useState(post.body);

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/news/${post.id}`, {
      method: "PATCH",
      body: JSON.stringify({ body: text }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setBody(data.newPost.body);
          setEditPressed(false);
        });
      } else {
        console.log("Uh oh. Something happened");
      }
    });
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.article_body_container}>
        {FormatParagraphs(body)}
      </Box>

      {session && status === "authenticated" ? (
        editPressed ? (
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className={styles.edit_form_container}
          >
            <TextField
              className={styles.text_field}
              multiline
              fullWidth
              rows={30}
              defaultValue={body}
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
