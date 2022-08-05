import {
  Paper,
  Tooltip,
  Drawer,
  Box,
  Grid,
  Button,
  LinearProgress,
} from "@mui/material";
import React, { useEffect, useState, ElementType } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useS3Upload } from "next-s3-upload";
import FuseSearch from "./FuseSearch";
import Image from "next/image";

const ImagesDrawer = ({
  imagesData,
  setOpenImageDrawer,
  openImageDrawer,
}: any) => {
  const [selectImage, setSelectImage] = useState("");
  const [deleteSelector, setDeleteSelector] = useState("");
  const [filesData, setFilesData] = useState<any[]>(imagesData.images);
  const [images, setImages] = useState<any[]>();
  const { uploadToS3, files } = useS3Upload();
  const fileTypes = ["JPG", "JPEG", "PNG"];

  const uploadFile = async (event: any) => {
    const file = event.target.files[0];

    let { url } = await uploadToS3(file);

    const data = {
      image: url,
      name: url.slice(86),
    };
    setFilesData([...filesData, data]);
  };

  const copyHandler = () => {
    navigator.clipboard.writeText(selectImage);
  };

  const deleteHandler = async () => {
    const res = await fetch("/api/s3/s3Fetch", {
      method: "DELETE",
      body: JSON.stringify({ deleteSelector }),
      headers: { "Content-Type": "application/json" },
    });

    const deletedImage = await res.json();

    const updatedImages = filesData.filter((image) => {
      return image.name !== deletedImage.deleteSelector;
    });

    setFilesData(updatedImages);
  };

  useEffect(() => {
    if (filesData.length) {
      const bucketImages = filesData.map((image, i) => {
        return (
          <Tooltip title={image.name} placement="top" key={i}>
            <Grid item xs={1} sx={{ cursor: "pointer" }}>
              <Image
                src={image.image}
                alt={image.name}
                width={100}
                height={100}
                objectFit="contain"
                key={i}
                onClick={() => {
                  setSelectImage(image.image);
                  setDeleteSelector(image.name);
                }}
              />
            </Grid>
          </Tooltip>
        );
      });

      setImages(bucketImages);
    }
  }, [filesData, openImageDrawer]);

  console.log(filesData);
  return (
    <Drawer
      anchor="bottom"
      open={openImageDrawer}
      onClose={() => {
        setOpenImageDrawer(false);
        setSelectImage("");
        setDeleteSelector("");
      }}
    >
      <Paper
        sx={{
          width: "100%",
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "70%",
            height: "20%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <FuseSearch imagesData={imagesData} setFilesData={setFilesData} />
          <FileUploader
            handleChange={uploadFile}
            name="file"
            types={fileTypes}
          />
        </Box>
        <Box sx={{ width: "100%", mb: 1 }}>
          {files.map((file, index) => (
            <LinearProgress
              variant="determinate"
              value={file.progress}
              key={index}
            />
          ))}
        </Box>
        <Grid container spacing={2} sx={{ overflowY: "scroll", pb: 10 }}>
          {images}
        </Grid>
        <Box
          sx={{
            position: "absolute",
            height: 70,
            bottom: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "50%",
              display: "flex",
              justifyContent: "space-around",
              mb: 1,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: 150 }}
              onClick={copyHandler}
              disabled={selectImage === ""}
            >
              Copy link
            </Button>
            <Button
              variant="contained"
              color="error"
              disabled={deleteSelector === ""}
              onClick={deleteHandler}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Paper>
    </Drawer>
  );
};

export default ImagesDrawer;
