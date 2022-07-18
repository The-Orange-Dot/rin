import React from "react";
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
import { useMediaQuery } from "@mui/material";
import { display, fontSize } from "@mui/system";

const ProductCards = ({ product, setProductModalOpen }: any) => {
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <Grid item xs={4} md={4}>
      <Box
        sx={
          isMobile
            ? {
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: 330,
                maxHeight: 330,
              }
            : {
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: 620,
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
          }}
          elevation={0}
          square
        >
          <CardMedia
            component="img"
            alt={product.name}
            image={product.image}
            height={400}
            sx={{ objectFit: "contain", cursor: "pointer" }}
            onClick={() => setProductModalOpen(true)}
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
            onClick={() => setProductModalOpen(true)}
          >
            <Box sx={{ width: "100%" }}>
              <Typography
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
                  : { width: "100%", minHeight: "80px" }
              }
            >
              <Typography variant={isMobile ? "body2" : "h5"}>
                {product.name}
              </Typography>
            </Box>
            <Box sx={{ width: "100%", minHeight: "35px" }}>
              <Typography
                variant="body2"
                color="gray"
                sx={isMobile ? { fontSize: ".7rem" } : {}}
              >
                {product.subtitle}
              </Typography>
            </Box>
            {isMobile ? null : (
              <Typography>${product.price}.00 (tax included)</Typography>
            )}
          </CardContent>
          <Button
            variant="contained"
            disableElevation
            sx={
              isMobile
                ? {
                    m: 0,
                    p: 0,
                    borderRadius: 0,
                    height: 90,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
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
            <Typography variant="caption" sx={{ fontSize: ".6rem" }}>
              Add to cart
            </Typography>
          </Button>
        </Card>
      </Box>
    </Grid>
  );
};

export default ProductCards;
