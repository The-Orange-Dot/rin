import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useState, SyntheticEvent, useEffect } from "react";
import PostPreview from "./PostPreview";
import { useSession } from "next-auth/react";

const CreateNewsPost = ({ setOpenImageDrawer }: any) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const { data: session } = useSession();
  const [categorySelector, setCategorySelector] = useState("blog");
  const [disableSubmit, setDisableSubmit] = useState(true);

  const categories = [
    { text: "Blog", value: "blog" },
    { text: "Fashion", value: "fashion" },
    { text: "News", value: "news" },
    { text: "Food", value: "food" },
  ];

  const categoryItems = categories.map((category: any, index: number) => {
    return (
      <MenuItem value={category.value} key={index}>
        {category.text}
      </MenuItem>
    );
  });

  useEffect(() => {
    if (!title || !image || !subtitle || !body) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [title, image, subtitle, body]);

  const submitHandler = async () => {
    if (session) {
      const writer = `${session.firstName} ${session.lastName}`;

      const articleData = {
        title: title,
        subtitle: subtitle,
        body: body,
        image: image,
        category: categorySelector,
        writer: writer,
      };

      const res = await fetch(`/api/news`, {
        method: "POST",
        body: JSON.stringify(articleData),
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log(data.message);
            console.log(data.post);
          });
        }
      });
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
      <Box
        sx={{
          width: "50%",
          height: "100%",
          p: 5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          sx={{ width: "100%", mb: 1 }}
          size="small"
          label="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          sx={{ width: "100%", mb: 1 }}
          size="small"
          label="Article Image"
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
        <TextField
          sx={{ width: "100%", mb: 1 }}
          size="small"
          label="Subtitle"
          onChange={(e) => {
            setSubtitle(e.target.value);
          }}
        />
        <FormControl>
          <InputLabel htmlFor="category-selector" size="small">
            Article Category
          </InputLabel>
          <Select
            size="small"
            sx={{ mb: 1 }}
            labelId="category-selector"
            label="Article Category"
            value={categorySelector}
            onChange={(e: any) => setCategorySelector(e.target.value)}
          >
            {categoryItems}
          </Select>
        </FormControl>

        <TextField
          sx={{ width: "100%" }}
          multiline
          rows={30}
          size="small"
          label="Body"
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />

        <Button
          sx={{ mt: 5 }}
          onClick={() => {
            submitHandler();
          }}
          disabled={disableSubmit}
        >
          Submit
        </Button>
      </Box>
      <Box
        sx={{
          width: "50%",
          height: "100%",
          p: 5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <PostPreview
          title={title}
          subtitle={subtitle}
          image={image}
          body={body}
          setOpenImageDrawer={setOpenImageDrawer}
        />
      </Box>
    </Box>
  );
};

export default CreateNewsPost;
