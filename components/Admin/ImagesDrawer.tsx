import { Paper, Tooltip, Drawer, Box, Grid } from "@mui/material";
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
  const [filesData, setFilesData] = useState<any[]>(imagesData.images);
  const [images, setImages] = useState<any[]>();
  const { uploadToS3, files } = useS3Upload();
  const fileTypes = ["JPG", "JPEG", "PNG"];

  const uploadFile = async (file: any) => {
    let { url } = await uploadToS3(file);
    setFilesData([...filesData, url]);
  };

  useEffect(() => {
    if (filesData.length) {
      const bucketImages = filesData.map((image, i) => {
        return (
          <Grid item xs={1} key={i}>
            <Tooltip title={image.name} placement="top">
              <Image
                src={image.image}
                alt={image.name}
                width={100}
                height={100}
                objectFit="contain"
                key={i}
                onClick={() => {
                  navigator.clipboard.writeText(image.image);
                }}
              />
            </Tooltip>
          </Grid>
        );
      });

      setImages(bucketImages);
    }
  }, [filesData]);

  return (
    <Drawer
      anchor="bottom"
      open={openImageDrawer}
      onClose={() => setOpenImageDrawer(false)}
    >
      <Paper
        sx={{
          width: "100%",
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "70%",
            height: "20%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            m: 1,
          }}
        >
          <FuseSearch imagesData={imagesData} setFilesData={setFilesData} />
          <FileUploader
            handleChange={uploadFile}
            name="file"
            types={fileTypes}
          />
        </Box>
        <Grid container spacing={2} sx={{ overflowY: "scroll" }}>
          {images}
        </Grid>
      </Paper>
    </Drawer>
  );
};

export default ImagesDrawer;
