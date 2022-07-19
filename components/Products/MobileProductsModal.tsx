import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Modal,
  Fade,
  Paper,
  Button,
  Box,
  Typography,
  Divider,
  NativeSelect,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import styles from "../../styles/products.module.css";
import { useRouter } from "next/router";

const MobileProductsModal = ({
  productModalOpen,
  setProductModalOpen,
  product,
}: any) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [description, setDescription] = useState([]);
  const [options, setOptions] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (product?.description?.length > 0) {
      const productDescriptionArray = product.description.map(
        (text: string) => {
          return (
            <Typography key={text.length} variant="caption" sx={{ mb: 1 }}>
              - {text}
            </Typography>
          );
        }
      );
      setDescription(productDescriptionArray);
    }
  }, [product.description]);

  const closeModalHandler = () => {
    setProductModalOpen(false);
    router.push({
      pathname: "/products",
    });
  };

  /* eslint-disable */
  useEffect(() => {
    router.beforePopState(() => {
      closeModalHandler();
      return false;
    });
  }, []);

  /* eslint-enable */

  return (
    <Modal
      open={productModalOpen}
      sx={{ display: "flex", justifyContent: "center" }}
      hideBackdrop
    >
      <Fade in={productModalOpen} timeout={500}>
        <Paper
          square
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "90%",
              overflow: "scroll",
              pt: 5,
              pb: "15vh",
            }}
            className={styles.productModal}
          >
            {
              /*eslint-disable*/
              <img
                alt={product.name}
                src={product.image}
                width={300}
                height={300}
              />
              /*eslint-enable*/
            }
            <Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>
              {product.name}
            </Typography>
            <Box sx={{ minHeight: "40px" }}>
              <Typography variant="caption" color="secondary">
                {product.size}
              </Typography>
              {product.details ? (
                <Typography variant="caption" color="secondary">
                  {" "}
                  - {product.details}
                </Typography>
              ) : null}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                What it is:
              </Typography>
              {description}
              <Divider sx={{ mt: 2 }} />
            </Box>
          </Box>
          <Box sx={{ pt: 10 }}>
            <Divider />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "fixed",
              width: "100%",
              bottom: 0,
              backgroundColor: "white",
              height: "18vh",
              flexDirection: "column",
              pt: 1,
            }}
          >
            <Box
              sx={{
                width: "100%",
                pl: 1,
                pr: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "65%",
                  alignItems: "center",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="options-native">
                    Options
                  </InputLabel>
                  <NativeSelect size="small" defaultValue={options}>
                    <option value={"none"}>None</option>
                  </NativeSelect>
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: 100,
                  alignItems: "center",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="quantity-native">
                    Quantity
                  </InputLabel>
                  <NativeSelect size="small" defaultValue={1}>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                  </NativeSelect>
                </FormControl>
              </Box>
            </Box>
            <Box sx={{ width: "100%", display: "flex" }}>
              <Button
                onClick={() => {
                  closeModalHandler();
                }}
                variant="contained"
                sx={{ height: "50px", width: "50%", m: 1 }}
                color="secondary"
              >
                Back
              </Button>
              <Button
                variant="contained"
                sx={{ height: "50px", width: "50%", m: 1 }}
              >
                Add to Card
              </Button>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default MobileProductsModal;
