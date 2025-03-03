import { Box, Divider, Drawer, Typography } from "@mui/material";
import React, { SetStateAction, useEffect, useState } from "react";
import { ProductHistoryType } from "../../types/profileTypes";
import Image from "next/image";
import { DateFormatter } from "../DateFormatter";
import { Rating } from "@mui/material";
import ReviewDrawer from "./ReviewDrawer";
import { useMediaQuery } from "@mui/material";
import { useSession } from "next-auth/react";
import MobileReviewDrawer from "./Mobile/MobileReviewDrawer";

const MyReviews = ({ user, products, productsFetch }: any) => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const { data: session } = useSession();
  const [selectedProduct, setSelectedProduct] = useState<
    SetStateAction<ProductHistoryType> | {}
  >({});
  const [openReviewDrawer, setOpenReviewDrawer] = useState(false);
  const [productReviews, setProductReviews] = useState([]);
  const [queuedReviews, setQueuedReviews] = useState([]);

  useEffect(() => {
    if (session) {
      const productReviews = products.filter((product: ProductHistoryType) => {
        return product.reviewWritten === true && product.firstBuy;
      });

      const queuedReviews = products.filter((product: ProductHistoryType) => {
        return product.reviewWritten === false && product.firstBuy === true;
      });

      setProductReviews(productReviews);
      setQueuedReviews(queuedReviews);
    }
  }, [user, session]); //eslint-disable-line

  const queuedReviewsCards = queuedReviews.map(
    (product: ProductHistoryType, i: number) => {
      return (
        <Box key={product.id}>
          <Box
            sx={{
              width: "100%",
              height: 90,
              display: "flex",
              p: 1,
              "&:hover": {
                border: "1px solid black",
                cursor: "pointer",
                opacity: 0.7,
              },
            }}
            onClick={() => {
              openReviewHandler(product);
            }}
          >
            <Box
              sx={{
                width: 70,
                height: 70,
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                p: 1,
              }}
            >
              <Image
                src={product.image}
                layout="fill"
                objectFit="contain"
                alt={product.name}
                quality={10}
                priority
              />
            </Box>
            <Box
              sx={{
                width: "70%",
                height: 70,
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                flex: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="overline" sx={{ lineHeight: "1.5rem" }}>
                {product.brand}
              </Typography>
              <Typography
                variant="overline"
                sx={{ lineHeight: "1rem", fontWeight: "bold" }}
              >
                {product.name}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ ml: "10%", mr: "10%" }} />
        </Box>
      );
    }
  );

  const productReviewCards = productReviews.map(
    (product: ProductHistoryType) => {
      const reviewDate = DateFormatter(product?.review?.createdAt);
      return (
        <Box
          key={product?.id}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            p: 1,
          }}
        >
          <Box sx={{ display: "flex", width: "100%" }}>
            <Box
              sx={{
                width: 90,
                height: 90,
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                p: 1,
              }}
            >
              <Image
                src={product?.image}
                layout="fill"
                objectFit="contain"
                alt={product?.name}
                quality={10}
                priority
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 2,
                flexDirection: "column",
                p: 1,
              }}
            >
              <Typography>{`${product?.brand} - ${product?.name}`}</Typography>
              <Rating
                size="small"
                readOnly={true}
                sx={{ mr: 0.5, color: "#3f312b" }}
                precision={0.25}
                value={product?.review?.rating}
              />
              <Typography>Review Created: {reviewDate}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: 120,
              display: "flex",
              flexDirection: "column",
              border: "1px solid #dfdfdf",
              overflowY: "scroll",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography>{product?.review?.description}</Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: 30,
                backgroundColor: "#dfdfdf",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                pl: 1,
                pr: 1,
                position: "relative",
              }}
            >
              <Typography>
                {product?.review?.helpful} People found this useful
              </Typography>
            </Box>
          </Box>
        </Box>
      );
    }
  );

  const openReviewHandler = (product: ProductHistoryType) => {
    setSelectedProduct(product);
    setOpenReviewDrawer(true);
  };

  return (
    <Box
      sx={
        isMobile
          ? {
              width: "100%",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
            }
          : { width: "100%", height: "75vh", display: "flex" }
      }
    >
      <Box
        sx={
          isMobile
            ? {
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                border: "1px solid #dfdfdf",
                m: 0.5,
              }
            : {
                width: "30%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                border: "1px solid #dfdfdf",
                m: 0.5,
              }
        }
      >
        <Box
          sx={{
            width: "100%",
            height: 75,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#dfdfdf",
          }}
        >
          <Typography variant="overline" sx={{ fontWeight: "bold" }}>
            Queued reviews
          </Typography>
          <Typography variant="overline" sx={{ lineHeight: "1rem" }}>
            Review products for discounts on your next purchase!
          </Typography>
        </Box>
        <Box
          sx={
            isMobile
              ? { width: "100%", height: "25vh", overflowY: "scroll", pb: 1 }
              : { width: "100%" }
          }
        >
          {queuedReviewsCards}
        </Box>
      </Box>
      <Box
        sx={
          isMobile
            ? {
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                m: 0.5,
              }
            : {
                width: "70%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                m: 0.5,
              }
        }
      >
        <Box sx={{ width: "100%", height: 75, backgroundColor: "#dfdfdf" }}>
          <Typography variant="overline" sx={{ fontWeight: "bold" }}>
            Your Written Reviews
          </Typography>
        </Box>
        {productReviewCards}
      </Box>

      <Drawer
        anchor="bottom"
        onClose={() => {
          setOpenReviewDrawer(false);
        }}
        open={openReviewDrawer}
      >
        {isMobile ? (
          <MobileReviewDrawer
            selectedProduct={selectedProduct}
            setOpenReviewDrawer={setOpenReviewDrawer}
            user={user}
            openReviewDrawer={openReviewDrawer}
            queuedReviews={queuedReviews}
            setQueuedReviews={setQueuedReviews}
            productReviews={productReviews}
            setProductReviews={setProductReviews}
            productsFetch={productsFetch}
          />
        ) : (
          <ReviewDrawer
            selectedProduct={selectedProduct}
            setOpenReviewDrawer={setOpenReviewDrawer}
            user={user}
            openReviewDrawer={openReviewDrawer}
            queuedReviews={queuedReviews}
            setQueuedReviews={setQueuedReviews}
            productReviews={productReviews}
            setProductReviews={setProductReviews}
            productsFetch={productsFetch}
          />
        )}
      </Drawer>
    </Box>
  );
};

export default MyReviews;
