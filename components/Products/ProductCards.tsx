import React, { useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Box,
  Card,
  CardMedia,
  CardContent,
  Button,
  createTheme,
  Rating,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { ProductReviewType } from "../../types/productTypes";
import { addItem } from "../../redux/reducers/shoppingCartReducer";
import { useSelector, useDispatch } from "react-redux";

const ProductCards = ({
  product,
  setProductModalOpen,
  setSelectedProduct,
}: any) => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const router = useRouter();
  const shoppingCart = useSelector((state: any) => state.shoppingCart.value);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(shoppingCart);
  }, [shoppingCart]);

  const addItemToCartHandler = () => {
    const item = {
      name: product.name,
      quantity: 1,
      price: product.price,
    };

    dispatch(addItem(item));
  };

  const routerHandler = async () => {
    setSelectedProduct(product);
    setProductModalOpen(true);
    router.push({
      pathname: "/products",
      query: { ...router.query, view_product: product.id, modal_open: "true" },
    });
  };

  const ratingArray = product?.reviews.map((review: ProductReviewType) => {
    return review.rating;
  });

  const summedRating = ratingArray.reduce((val: number, total: number) => {
    return val + total;
  }, 0);

  const averageRating = summedRating / ratingArray.length;

  return (
    <Grid item xs={3.8} md={3.5}>
      <Box
        sx={
          isMobile
            ? {
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: 360,
                maxHeight: 360,
                mb: 3,
              }
            : {
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: 550,
                mb: 8,
              }
        }
      >
        <Card
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: 0,
          }}
          elevation={0}
          square
          className="card"
        >
          <CardMedia
            component="img"
            alt={product.name}
            image={product.image}
            height={280}
            sx={
              isMobile
                ? { objectFit: "contain", cursor: "pointer" }
                : {
                    maxHeight: 280,
                    minHeight: 280,
                    objectFit: "contain",
                    cursor: "pointer",
                  }
            }
            onClick={async () => {
              routerHandler();
            }}
          />
          <CardContent
            sx={
              isMobile
                ? {
                    m: 0,
                    p: 0,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    cursor: "pointer",
                  }
                : {
                    m: 0,
                    pl: 0,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    cursor: "pointer",
                  }
            }
          >
            <Box sx={{ width: "100%" }}>
              <Typography
                color="primary"
                variant="caption"
                sx={isMobile ? { fontSize: ".6rem" } : {}}
              >
                {product.brand}
              </Typography>
            </Box>
            <Box
              sx={
                isMobile
                  ? { width: "100%", minHeight: "40px" }
                  : { width: "100%", minHeight: "50px" }
              }
            >
              <Typography
                onClick={() => {
                  routerHandler();
                }}
                color="primary"
                variant={isMobile ? "body2" : "h6"}
              >
                {product.name}
              </Typography>
            </Box>
            <Box sx={{ width: "100%", minHeight: "35px" }}>
              <Typography
                variant="body2"
                color="secondary"
                sx={isMobile ? { fontSize: ".7rem" } : {}}
              >
                {product.size}
                {product?.details?.length ? ` - ${product.details}` : null}
              </Typography>
            </Box>
            <Box
              sx={
                isMobile
                  ? {
                      width: "100%",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                    }
                  : {
                      width: "100%",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                    }
              }
            >
              <Rating
                size="small"
                readOnly={true}
                sx={{ mr: 0.5, color: "#3f312b" }}
                precision={0.25}
                value={averageRating}
              />
              {isMobile ? (
                <Typography variant="overline" color="secondary">
                  ({product?.reviews.length})
                </Typography>
              ) : (
                <Typography
                  variant="caption"
                  sx={{
                    color: "gray",
                    fontSize: ".7rem",
                    textDecoration: "underline",
                  }}
                >
                  {product?.reviews.length} Reviews
                </Typography>
              )}
            </Box>

            {isMobile ? null : <Typography>${product.price}.00 </Typography>}
          </CardContent>

          <Button
            variant="contained"
            disableElevation
            color="primary"
            onClick={() => {
              addItemToCartHandler();
            }}
            sx={
              isMobile
                ? {
                    m: 0,
                    p: 0,
                    maxHeight: 40,
                    minHeight: 40,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    color: "white",
                  }
                : {
                    m: 0,
                    p: 0,
                    borderRadius: 0,
                    height: 50,
                    width: "100%",
                  }
            }
          >
            {isMobile ? `$${product.price}.00` : "Add to shopping cart"}
            {isMobile ? (
              <Typography
                variant="caption"
                sx={{ fontSize: ".6rem", fontWeight: 200 }}
              >
                Add to cart
              </Typography>
            ) : null}
          </Button>
        </Card>
      </Box>
    </Grid>
  );
};

export default ProductCards;
