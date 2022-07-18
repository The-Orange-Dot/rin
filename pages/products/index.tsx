import React, { useState } from "react";
import styles from "../../styles/products.module.css";
import ProductsNavBar from "../../components/ProductsNavBar";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Container, Grid } from "@mui/material";
import { server } from "../../config";
import ProductCards from "../../components/Products/ProductCards";
import ProductModal from "../../components/Products/ProductModal";
import { useMediaQuery } from "@mui/material";

const Products = ({
  productsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [products, setProducts] = useState(productsData);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const productCards = products.map((product: any) => (
    <ProductCards
      product={product}
      key={product.name}
      setProductModalOpen={setProductModalOpen}
    />
  ));

  return (
    <div className={styles.main}>
      <ProductsNavBar />
      <Container
        sx={
          isMobile
            ? {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }
            : {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 5,
              }
        }
      >
        <Grid
          container
          columns={isMobile ? 8 : 12}
          spacing={{ xs: 2, md: 3 }}
          sx={{ display: "flex", justifyContent: "center", maxWidth: 2000 }}
        >
          {productCards}
        </Grid>
        <ProductModal
          productModalOpen={productModalOpen}
          setProductModalOpen={setProductModalOpen}
          selectedProduct={selectedProduct}
        />
      </Container>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch(`${server}/api/products`);
    const productsData = await res.json();
    return {
      props: {
        productsData,
      },
    };
  } catch {
    return { notFound: true };
  }
};

export default Products;
