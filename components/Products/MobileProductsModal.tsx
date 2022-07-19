import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Modal,
  Fade,
  Paper,
  Box,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import styles from "../../styles/products.module.css";
import { useRouter } from "next/router";
import CheckoutButton from "./CheckoutButton";
import { server } from "../../config";

const MobileProductsModal = ({
  productModalOpen,
  setProductModalOpen,
  product,
}: any) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [description, setDescription] = useState([]);
  const [options, setOptions] = useState("");
  const [reviews, setReviews] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (product) {
      fetch(`api/productReviews/${product.id}`)
        .then((res) => res.json())
        .then((data) => setReviews(data));
    }
  }, [product]);

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

  const closeModalHandler = async () => {
    setProductModalOpen(false);
    await router.push({
      pathname: "/products",
    });
    setQuantity(1);
    setDescription([]);
  };

  useEffect(() => {
    router.beforePopState(() => {
      closeModalHandler();
      return false;
    });
  }, []); //eslint-disable-line

  const ingredients = product?.ingredients?.map((item: string) => {
    const itemSplit = item.split(" ");
    const itemName = itemSplit
      .map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
      .join(" ");
    return (
      <Grid item key={item} xs={12}>
        <Typography variant="caption">{itemName}</Typography>
      </Grid>
    );
  });

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
            <Box sx={{ display: "flex", flexDirection: "column", mb: 20 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                What it is:
              </Typography>
              {description}
              <Divider sx={{ mt: 2 }} />
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 2, mt: 2 }}
              >
                What&apos;s in it:
              </Typography>
              <Grid container sx={{ width: "100%" }}>
                {ingredients}
              </Grid>
              <Divider sx={{ mt: 2 }} />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, mt: 1, fontSize: "1.2rem" }}
                >
                  {reviews.length} Reviews
                </Typography>
              </Box>
            </Box>
          </Box>

          <CheckoutButton
            closeModalHandler={closeModalHandler}
            quantity={quantity}
            setQuantity={setQuantity}
            options={options}
            product={product}
          />
        </Paper>
      </Fade>
    </Modal>
  );
};

export default MobileProductsModal;
