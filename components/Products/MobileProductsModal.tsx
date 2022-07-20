import React, { useEffect, useState } from "react";
import {
  Modal,
  Fade,
  Paper,
  Box,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import styles from "../../styles/products.module.css";
import { useRouter } from "next/router";
import CheckoutButton from "./CheckoutButton";
import { ProductReviewType } from "../../types/productTypes";
import MobileIngredientsAccordion from "./MobileIngredientsAccordian";
import MobileProductReview from "./MobileProductReview";

const MobileProductsModal = ({
  productModalOpen,
  setProductModalOpen,
  product,
}: any) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [description, setDescription] = useState([]);
  const [options, setOptions] = useState("");
  const router = useRouter();
  const [loadMoreReviews, setLoadMoreReviews] = useState(false);

  useEffect(() => {
    setLoadMoreReviews(false);
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
  };

  const sortedReviews = product?.reviews?.sort(
    (a: ProductReviewType, b: ProductReviewType) => {
      return b.helpful - a.helpful;
    }
  );

  const reviews = sortedReviews?.map((review: ProductReviewType) => {
    return <MobileProductReview review={review} key={review.createdAt} />;
  });

  const mostHelpfulReviews = reviews?.slice(0, 3);
  const allReviews = reviews?.slice(3);

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

              <MobileIngredientsAccordion product={product} />
              <Divider />
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
                  {product?.reviews?.length} Reviews
                </Typography>
                <Typography>Top most helpful reviews</Typography>
                {mostHelpfulReviews}
                {loadMoreReviews ? (
                  allReviews
                ) : (
                  <Button
                    sx={{ mt: 2 }}
                    onClick={() => setLoadMoreReviews(true)}
                  >
                    See more reviews
                  </Button>
                )}
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
