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
import styles from "./styles/ProductCards.module.scss";

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
      <Box className={styles.card_container}>
        <Card className={`${styles.card} card`} elevation={0} square>
          <CardMedia
            className={styles.card_media}
            onClick={async () => {
              routerHandler();
            }}
          >
            <Box className={styles.image}>
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
            </Box>
          </CardMedia>
          <CardContent className={styles.card_content} sx={{ p: 0 }}>
            <Box>
              <Typography
                color="primary"
                variant="caption"
                sx={isMobile ? { fontSize: ".6rem" } : {}}
              >
                {product.brand}
              </Typography>
            </Box>
            <Box className={styles.card_name}>
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
            <Box className={styles.card_info}>
              <Typography
                variant="body2"
                color="secondary"
                sx={isMobile ? { fontSize: ".6rem" } : {}}
              >
                {product.size}
                {product?.details?.length ? ` - ${product.details}` : null}
              </Typography>
            </Box>

            <Box className={styles.rating_container}>
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
                  color="secondary"
                  fontSize=".7rem"
                  sx={{
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
            fullWidth
            disabled={product.quantity <= 0}
            color="primary"
            onClick={() => {
              addItemToCartHandler();
            }}
            className={styles.add_item_button}
          >
            {product.quantity <= 0 ? (
              <Typography variant="body2" color="white">
                Sold out
              </Typography>
            ) : isMobile ? (
              <Box className={styles.mobile_add_button_text}>
                <Typography variant="caption">${product.price}.00</Typography>
                <Typography variant="caption" fontSize=".6rem" fontWeight={200}>
                  Add to cart
                </Typography>
              </Box>
            ) : (
              <Typography variant="body2" color="white">
                Add to shopping cart
              </Typography>
            )}
          </Button>
        </Card>
      </Box>
    </Grid>
  );
};

export default ProductCards;
