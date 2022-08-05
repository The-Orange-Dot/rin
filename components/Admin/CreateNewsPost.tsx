import { Box, TextField, Button } from "@mui/material";
import React, { useState, SyntheticEvent } from "react";

const CreateNewsPost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [body, setBody] = useState("");

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/news`, {
      method: "POST",
      body: JSON.stringify({ body: body }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setBody(data.newPost.body);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        p: 5,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        sx={{ width: "50vw", mb: 1 }}
        size="small"
        label="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <TextField
        sx={{ width: "50vw", mb: 1 }}
        size="small"
        label="Article Image"
        onChange={(e) => {
          setImage(e.target.value);
        }}
      />
      <TextField
        sx={{ width: "50vw", mb: 1 }}
        size="small"
        label="Subtitle"
        onChange={(e) => {
          setSubTitle(e.target.value);
        }}
      />
      <TextField
        sx={{ width: "50vw" }}
        multiline
        rows={30}
        size="small"
        label="Body"
        onChange={(e) => {
          setBody(e.target.value);
        }}
      />

      <Button>Submit</Button>
    </Box>
  );
};

export default CreateNewsPost;
