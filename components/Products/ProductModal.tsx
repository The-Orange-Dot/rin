import {
  Modal,
  Paper,
  Fade,
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  styled,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { ProductType } from "../../types/productTypes";
import { useRouter } from "next/router";
import IngredientsAccordion from "./IngredientsAccordion";

const ProductModal = ({
  productModalOpen,
  setProductModalOpen,
  selectedProduct,
}: any) => {
  const [product, setProduct] = useState<ProductType>(selectedProduct);
  const [description, setDescription] = useState<any[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();

  //Sets description from selected product
  useEffect(() => {
    setProduct(selectedProduct);
  }, [selectedProduct]); //eslint-disable-line

  //Maps through product description to render
  useEffect(() => {
    if (product?.description?.length > 0) {
      const productDescriptionArray = product.description.map(
        (text: string) => {
          return (
            <Typography
              key={text.length}
              variant="caption"
              sx={{ mb: 2, textAlign: "start", fontSize: ".85rem" }}
            >
              - {text}
            </Typography>
          );
        }
      );
      setDescription(productDescriptionArray);
    }
  }, [product.description]);

  //Disables back button if modal is open
  useEffect(() => {
    router.beforePopState(() => {
      closeModalHandler();
      return false;
    });
  }, []); //eslint-disable-line

  const closeModalHandler = async () => {
    setProductModalOpen(false);
    await router.push(
      {
        pathname: "/products",
      },
      {},
      { scroll: false }
    );
    setQuantity(1);
    setDescription([]);
  };

  return (
    <Modal
      open={productModalOpen}
      onClose={() => setProductModalOpen(false)}
      sx={{ display: "flex", justifyContent: "center", zIndex: 0 }}
      hideBackdrop
    >
      <Fade in={productModalOpen}>
        <Paper
          square
          sx={{
            width: "100%",
            display: "flex",
            pl: 2,
            pr: 2,
            pt: "10vh",
          }}
        >
          {/* Left side */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100vh",
              width: "45%",
            }}
          >
            <Box
              sx={{
                width: 600,
                height: 600,
                display: "flex",
                flexDirection: "column",
                mt: 2,
              }}
            >
              {/* eslint-disable */}
              <img
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
              />
              {/* eslint-enable */}
            </Box>

            <Box
              sx={{
                width: 600,
                height: 200,
                border: "1px solid black",
                position: "absolute",
                left: 0,
                bottom: 0,
              }}
            >
              <Button color="primary">Add to card</Button>
            </Box>
          </Box>

          {/* Right Side */}
          <Box
            sx={{ width: "55%", height: "100%", overflowY: "scroll", pb: 20 }}
          >
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                pt: 5,
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontWidth: 200, mb: 1 }}
                color="primary"
              >
                {product.name}
              </Typography>
              <Typography variant="caption">by</Typography>
              <Typography variant="overline">{product.brand}</Typography>
              <Box>
                <Typography
                  variant="body1"
                  color="secondary"
                  sx={{ fontWeight: 200, mb: 3 }}
                >
                  {product.size}
                  {product.details ? ` - ${product.details}` : ""}
                </Typography>
                <Divider />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 4,
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{ mb: 2, fontWeight: 600, alignSelf: "flex-start" }}
                  >
                    What it is:{" "}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: "90%",
                    }}
                  >
                    {description}
                  </Box>
                </Box>
                <Divider sx={{ mt: 5 }} />

                <IngredientsAccordion product={product} />

                <Divider />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default ProductModal;
