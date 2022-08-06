import {
  Paper,
  Tooltip,
  Drawer,
  Box,
  Grid,
  Input,
  Button,
  LinearProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, ElementType } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useS3Upload } from "next-s3-upload";
import FuseSearch from "./FuseSearch";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";

const ImagesDrawer = ({
  imagesData,
  setOpenImageDrawer,
  openImageDrawer,
}: any) => {
  const [selectImage, setSelectImage] = useState("");
  const [deleteSelector, setDeleteSelector] = useState("");
  const [confirmDeleteDrawer, setConfirmDeleteDrawer] = useState(false);
  const [filesData, setFilesData] = useState<any[]>(imagesData.images);
  const [images, setImages] = useState<any[]>();
  const { uploadToS3, files } = useS3Upload();
  const [confirmDeleteInput, setConfirmDeleteInput] = useState("");
  const fileTypes = ["JPG", "JPEG", "PNG"];

  const uploadFile = async (file: any) => {
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

  const deleteModal = () => {
    setConfirmDeleteDrawer(true);
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
    setDeleteSelector("");
    setSelectImage("");
    setConfirmDeleteInput("");
    setConfirmDeleteDrawer(false);
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
              onClick={deleteModal}
            >
              Delete
            </Button>
            <Drawer
              anchor="bottom"
              open={confirmDeleteDrawer}
              onClose={() => {
                setConfirmDeleteDrawer(false);
              }}
            >
              <Paper
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  height: "30vh",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    height: "80%",
                    width: "40%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    textAlign: "center",
                  }}
                >
                  <Typography>
                    Please type <strong>&quot;delete&quot;</strong> to confirm
                    deleting &quot;
                    {deleteSelector}&quot;
                  </Typography>
                  <Input
                    autoFocus
                    onChange={(e) => {
                      setConfirmDeleteInput(e.target.value);
                    }}
                    inputProps={{
                      style: { textAlign: "center" },
                    }}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ height: 50 }}
                    disabled={confirmDeleteInput !== "delete"}
                    onClick={deleteHandler}
                  >
                    <DeleteIcon /> Confirm Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setConfirmDeleteDrawer(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              </Paper>
            </Drawer>
          </Box>
        </Box>
      </Paper>
    </Drawer>
  );
};

export default ImagesDrawer;
