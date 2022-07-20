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
import { ProductType, ProductReviewType } from "../../types/productTypes";
import { useRouter } from "next/router";
import IngredientsAccordion from "./IngredientsAccordion";
import ProductReviews from "./ProductReviews";
import CheckoutButton from "./Mobile/MobileCheckoutButton";

const ProductModal = ({
  productModalOpen,
  setProductModalOpen,
  selectedProduct,
}: any) => {
  const [product, setProduct] = useState<ProductType>(selectedProduct);
  const [description, setDescription] = useState<any[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();
  const [numberOfReviews, setNumberOfreviews] = useState(8);
  const [loadMoreReviews, setLoadMoreReviews] = useState(false);
  const [options, setOptions] = useState("");

  //Sets description from selected product
  useEffect(() => {
    setProduct(selectedProduct);
    setNumberOfreviews(8);
    setLoadMoreReviews(false);
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
    router.beforePopState(({ url }) => {
      closeModalHandler(url);
      return true;
    });
  }, []); //eslint-disable-line

  const closeModalHandler = async (url: string) => {
    setProductModalOpen(false);

    if (url.includes("modal_open=true")) {
      await router.replace(
        {
          pathname: "/products",
        },
        {},
        { scroll: false, shallow: true }
      );

      setQuantity(1);
      setDescription([]);
    }
  };

  const sortedReviews = selectedProduct?.reviews?.sort(
    (a: ProductReviewType, b: ProductReviewType) => {
      return b.helpful - a.helpful;
    }
  );

  const reviews = sortedReviews?.map((review: ProductReviewType) => {
    return <ProductReviews review={review} key={review.createdAt} />;
  });

  const mostHelpfulReviews = reviews?.slice(0, 3);
  const allReviews = reviews?.slice(3, numberOfReviews);

  return (
    <Modal
      open={productModalOpen}
      onClose={() => setProductModalOpen(false)}
      sx={{
        display: "flex",
        justifyContent: "center",
        zIndex: 0,
      }}
      hideBackdrop
    >
      <Fade in={productModalOpen}>
        <Paper
          square
          elevation={0}
          sx={{
            width: "100%",
            display: "flex",
            pl: 2,
            pr: 2,
            pt: "10vh",
            maxWidth: 1500,
            outline: "none",
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
            ></Box>
          </Box>

          {/* Right Side */}
          <Box
            sx={{
              width: "56%",
              height: "100%",
              overflowY: "scroll",
              pb: 20,
              pr: 3,
            }}
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
                <Divider sx={{ mt: 2 }} />

                <IngredientsAccordion product={product} />

                <Divider />

                <Box>
                  <Typography>{reviews?.length} Reviews</Typography>
                  <Box>
                    <Typography>Voted most helpful review</Typography>
                    {mostHelpfulReviews}
                  </Box>
                </Box>
                {loadMoreReviews ? (
                  <Box>{allReviews}</Box>
                ) : (
                  <Button
                    onClick={() => {
                      setLoadMoreReviews(true);
                    }}
                  >
                    See more reviews
                  </Button>
                )}
                {numberOfReviews <= reviews?.length && loadMoreReviews ? (
                  <Button
                    onClick={() => {
                      setNumberOfreviews(numberOfReviews + 5);
                    }}
                  >
                    See more reviews
                  </Button>
                ) : null}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default ProductModal;
