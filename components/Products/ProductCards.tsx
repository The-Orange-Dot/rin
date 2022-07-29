import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { ProductReviewType, ProductType } from "../../types/productTypes";
import { addItem } from "../../redux/reducers/shoppingCartReducer";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

interface ProductCardType {
  product: ProductType;
  setSelectedProduct: Dispatch<SetStateAction<ProductType>>;
}

const ProductCards = ({ product, setSelectedProduct }: ProductCardType) => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const router = useRouter();
  const shoppingCart = useSelector((state: any) => state.shoppingCart.value);
  const dispatch = useDispatch();

  const addItemToCartHandler = () => {
    const item = {
      id: product.id,
      name: product.name,
      quantity: 1,
      brand: product.brand,
      price: product.price,
      image: product.thumbnail,
      stock: product.quantity,
      size: product.size,
      details: product.details,
    };
    let foundItem = shoppingCart.find((item: any) => {
      return item.id === product.id;
    });
    if (foundItem) {
      const updatedCart = shoppingCart.filter((item: any) => {
        return item.id !== product.id;
      });
      const updatedItem = {
        id: product.id,
        image: product.thumbnail,
        name: product.name,
        quantity: foundItem.quantity + 1,
        price: product.price,
        size: product.size,
        brand: product.brand,
        stock: product.quantity,
      };
      if (updatedItem.quantity < product.quantity) {
        dispatch(addItem([...updatedCart, updatedItem]));
      }
    } else {
      dispatch(addItem([...shoppingCart, item]));
    }
  };

  const routerHandler = async () => {
    await router.push({
      pathname: "/products",
      query: {
        ...router.query,
        view_product: product.id,
        modal_open: "true",
      },
    });
    setSelectedProduct(product);
  };

  const ratingArray = product?.reviews?.map((review: ProductReviewType) => {
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
            sx={
              isMobile
                ? {
                    objectFit: "contain",
                    cursor: "pointer",
                    maxHeight: 180,
                    minHeight: 180,
                    width: 180,
                  }
                : {
                    maxHeight: 280,
                    minHeight: 280,
                    width: 280,
                    objectFit: "contain",
                    cursor: "pointer",
                  }
            }
            onClick={async () => {
              routerHandler();
            }}
          >
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <Image
                src={product.thumbnail}
                layout="fill"
                objectFit="contain"
                alt={product.name}
                blurDataURL={product.thumbnail}
                placeholder="blur"
                quality={50}
                priority
              />
            </div>
          </CardMedia>
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
                  ({product?._count?.reviews})
                </Typography>
              ) : (
                <Typography
                  variant="caption"
                  sx={{
                    color: "#949495",
                    fontSize: ".7rem",
                    textDecoration: "underline",
                  }}
                >
                  {product?._count?.reviews} Reviews
                </Typography>
              )}
            </Box>

            {isMobile ? null : <Typography>${product.price}.00 </Typography>}
          </CardContent>

          <Button
            variant="contained"
            disableElevation
            disabled={product.quantity <= 0}
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
            {product.quantity <= 0 ? (
              <Typography variant="body2">Sold out</Typography>
            ) : (
              <>
                {isMobile ? `$${product.price}.00` : "Add to shopping cart"}
                {isMobile ? (
                  <Typography
                    variant="caption"
                    sx={{ fontSize: ".6rem", fontWeight: 200 }}
                  >
                    Add to cart
                  </Typography>
                ) : null}
              </>
            )}
          </Button>
        </Card>
      </Box>
    </Grid>
  );
};

export default ProductCards;
