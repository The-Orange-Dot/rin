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
  createTheme,
  Rating,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { display, fontSize } from "@mui/system";

const ProductCards = ({ product, setProductModalOpen }: any) => {
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <Grid item xs={3.8} md={3.5}>
      <Box
        sx={
          isMobile
            ? {
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: 330,
                maxHeight: 330,
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
          }}
          elevation={0}
          square
        >
          <CardMedia
            component="img"
            alt={product.name}
            image={product.image}
            height={350}
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
                onClick={() => setProductModalOpen(true)}
                color="primary"
                variant={isMobile ? "body2" : "h6"}
              >
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
            <Box
              sx={{
                width: "100%",
                height: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                size="small"
                readOnly={true}
                sx={{ mr: 0.5, color: "#3f312b" }}
                precision={0.5}
                value={product.rating}
              />
              {isMobile ? null : (
                <Typography
                  variant="caption"
                  sx={{
                    color: "gray",
                    fontSize: ".7rem",
                    textDecoration: "underline",
                  }}
                >
                  Reviews 0
                </Typography>
              )}
            </Box>

            {isMobile ? null : <Typography>${product.price}.00 </Typography>}
          </CardContent>

          <Button
            variant="contained"
            disableElevation
            color="primary"
            sx={
              isMobile
                ? {
                    m: 0,
                    p: 0,
                    height: 90,
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
