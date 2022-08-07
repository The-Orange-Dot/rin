import { Box, Button, TextField, Typography } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { FormatParagraphs } from "./FormatParagraphs";

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
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{ width: "90%", display: "flex", flexDirection: "column", mt: 5 }}
      >
        {FormatParagraphs(body)}
      </Box>

      {session && status === "authenticated" ? (
        editPressed ? (
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            style={{ width: "95%", textAlign: "center" }}
          >
            <TextField
              sx={{ mt: 5, backgroundColor: "#dfdfdf" }}
              multiline
              fullWidth
              rows={30}
              defaultValue={body}
              onChange={(e) => setText(e.target.value)}
            />

            <Box
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <Typography variant="caption" color="secondary">
                Use &quot;/image/&quot; then a link after for images
              </Typography>
              <Typography variant="caption" color="secondary">
                ex. /image//cosmetics.jpg
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: 50,
                display: "flex",
                justifyContent: "space-evenly",
                mt: 5,
              }}
            >
              <Button
                onClick={() => {
                  setEditPressed(false);
                }}
                color="secondary"
                variant="contained"
                sx={{ width: 150 }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" sx={{ width: 150 }}>
                Submit
              </Button>
            </Box>
          </form>
        ) : (
          <Button
            onClick={() => {
              setEditPressed(true);
            }}
            sx={{ mt: 10 }}
          >
            Edit post
          </Button>
        )
      ) : null}
    </Box>
  );
};

export default ArticleContent;
