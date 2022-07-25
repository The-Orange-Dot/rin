import React, { useEffect, useState } from "react";
import {
  Modal,
  Fade,
  Paper,
  Box,
  Typography,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import styles from "../../../styles/products.module.css";
import { useRouter } from "next/router";
import MobileCheckoutButton from "./MobileCheckoutButton";
import { ProductReviewType, ProductType } from "../../../types/productTypes";
import MobileIngredientsAccordion from "./MobileIngredientsAccordian";
import MobileProductReview from "./MobileProductReview";

const MobileProductsModal = ({
  productModalOpen,
  setProductModalOpen,
  selectedProduct,
}: any) => {
  const [product, setProduct] = useState<ProductType>(selectedProduct);
  const [quantity, setQuantity] = useState<number>(1);
  const [description, setDescription] = useState<any[]>([]);
  const [options, setOptions] = useState("");
  const router = useRouter();
  const [loadMoreReviews, setLoadMoreReviews] = useState(false);
  const [reviewsData, setReviewsData] = useState<any[]>(
    selectedProduct?.reviews
  );
  const [numberOfReviews, setNumberOfreviews] = useState<number>(3);

  useEffect(() => {
    setLoadMoreReviews(false);
    setProduct(selectedProduct);
    setNumberOfreviews(3);
    setReviewsData(selectedProduct?.reviews);
    if (Object.keys(selectedProduct).length > 0) {
      setProductModalOpen(true);
    } else {
      setProductModalOpen(false);
    }
  }, [selectedProduct]); //eslint-disable-line

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
    router.beforePopState(({ url }) => {
      closeModalHandler(url);
      return false;
    });
  }, []); //eslint-disable-line

  const closeModalHandler = async (url: string) => {
    setProductModalOpen(false);

    if (url?.includes("modal_open=true")) {
      await router.replace(
        {
          pathname: "/products",
        },
        {},
        { scroll: false }
      );

      setQuantity(1);
      setDescription([]);
    }
  };

  const fetchMoreReviews = async () => {
    setLoadMoreReviews(true);
    const res = await fetch(`/api/productReviews/${selectedProduct.id}`, {
      method: "PATCH",
      body: JSON.stringify(numberOfReviews),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const reviews: any[] = await res.json();

    setNumberOfreviews(numberOfReviews + 5);
    setReviewsData([...reviewsData, ...reviews]);
    setLoadMoreReviews(false);
  };

  const reviews = reviewsData?.map((review: ProductReviewType) => {
    return <MobileProductReview review={review} key={review.createdAt} />;
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
                src={product.thumbnail}
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
                  {product?._count?.reviews} Reviews
                </Typography>
                <Typography>Top most helpful reviews</Typography>
                {reviews}
                {numberOfReviews <= selectedProduct?._count?.reviews ? (
                  <Button
                    disabled={loadMoreReviews}
                    sx={{ mt: 2 }}
                    onClick={() => fetchMoreReviews()}
                  >
                    {loadMoreReviews ? (
                      <CircularProgress color="inherit" size={25} />
                    ) : (
                      "See more reviews"
                    )}
                  </Button>
                ) : null}
              </Box>
            </Box>
          </Box>

          <MobileCheckoutButton
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
