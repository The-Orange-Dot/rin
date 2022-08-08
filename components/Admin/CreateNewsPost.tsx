import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { NextComponentType } from "next";
import React, { useState, SyntheticEvent, useEffect } from "react";
import PostPreview from "./PostPreview";
import { useSession } from "next-auth/react";
import styles from "../../styles/admin/CreateNewPost.module.scss";

const CreateNewsPost: NextComponentType = ({ setOpenImageDrawer }: any) => {
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
    <Box className={styles.container}>
      <Box className={styles.forms_container}>
        <Box className={styles.forms_input}>
          <TextField
            size="small"
            label="Title"
            fullWidth
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Box>
        <Box className={styles.forms_input}>
          <TextField
            size="small"
            label="Article Image"
            fullWidth
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </Box>
        <Box className={styles.forms_input}>
          <TextField
            size="small"
            label="Subtitle"
            fullWidth
            onChange={(e) => {
              setSubtitle(e.target.value);
            }}
          />
        </Box>
        <Box className={styles.forms_input}>
          <FormControl fullWidth>
            <InputLabel htmlFor="category-selector" size="small">
              Article Category
            </InputLabel>
            <Select
              size="small"
              labelId="category-selector"
              label="Article Category"
              value={categorySelector}
              onChange={(e: any) => setCategorySelector(e.target.value)}
            >
              {categoryItems}
            </Select>
          </FormControl>
        </Box>

        <Box className={styles.forms_input}>
          <TextField
            multiline
            rows={30}
            fullWidth
            size="small"
            label="Body"
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </Box>

        <Button
          onClick={() => {
            submitHandler();
          }}
          disabled={disableSubmit}
        >
          Submit
        </Button>
      </Box>
      <Box className={styles.post_preview_container}>
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
