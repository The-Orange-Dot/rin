import React from "react";
import styles from "../../styles/products.module.css";
import ProductsNavBar from "../../components/ProductsNavBar";
import {
  Typography,
  Container,
  Grid,
  Box,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import Image from "next/image";

const products = () => {
  return (
    <div className={styles.main}>
      <ProductsNavBar />

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{ display: "flex", justifyContent: "center", maxWidth: 2000 }}
        >
          <Grid item xs={4} md={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                border: "1px solid black",
                width: "100%",
                height: 500,
              }}
            >
              Test
            </Box>
          </Grid>
          <Grid item xs={4} md={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: 500,
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
                elevation={0}
                square
              >
                <CardMedia
                  component="img"
                  alt="product-name"
                  image="/facemask-main.webp"
                  height={250}
                  sx={{ objectFit: "contain" }}
                />
                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <Typography variant="caption">
                      The Brand or maker
                    </Typography>
                  </Box>
                  <Typography variant="h5">Test product</Typography>
                  <Typography variant="body2">
                    This is a test desciption for the product. I want to see how
                    much I can fit in this text box
                  </Typography>
                  <Typography>$10.00 (tax included)</Typography>
                </CardContent>
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    m: 0,
                    p: 0,
                    borderRadius: 0,
                    height: 50,
                    width: "100%",
                  }}
                >
                  Add to shopping cart
                </Button>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={4} md={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                border: "1px solid black",
                width: "100%",
                height: 500,
              }}
            >
              Test
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default products;
