import React, { useState } from "react";
import styles from "../../styles/products.module.css";
import ProductsNavBar from "../../components/ProductsNavBar";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Button, Container, Grid, Box } from "@mui/material";
import { server } from "../../config";
import ProductCards from "../../components/Products/ProductCards";
import ProductModal from "../../components/Products/ProductModal";
import { useMediaQuery } from "@mui/material";
import MobileProductNavBar from "../../components/MobileProductNavBar";
import FilterListIcon from "@mui/icons-material/FilterList";
import MobileProductsModal from "../../components/Products/MobileProductsModal";

const Products = ({
  productsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [products, setProducts] = useState(productsData);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [filterDrawerOpened, setFilterDrawerOpened] = useState(false);
  let brands: string[] = [];

  const productCards = products.map((product: any) => {
    if (!brands.includes(product.brand)) {
      brands = [...brands, product.brand];
    }

    return (
      <ProductCards
        product={product}
        key={product.name}
        setProductModalOpen={setProductModalOpen}
      />
    );
  });

  return (
    <div className={styles.main}>
      {isMobile ? (
        <Box sx={{ width: "80%", display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => setFilterDrawerOpened(true)}
          >
            Filter <FilterListIcon />
          </Button>
        </Box>
      ) : (
        <ProductsNavBar />
      )}
      <Container
        sx={
          isMobile
            ? {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
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
          columns={isMobile ? 8 : 15}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            maxWidth: 2000,
          }}
        >
          {productCards}
        </Grid>
        {isMobile ? (
          <MobileProductsModal
            productModalOpen={productModalOpen}
            setProductModalOpen={setProductModalOpen}
            selectedProduct={selectedProduct}
          />
        ) : (
          <ProductModal
            productModalOpen={productModalOpen}
            setProductModalOpen={setProductModalOpen}
            selectedProduct={selectedProduct}
          />
        )}
        <MobileProductNavBar
          setFilterDrawerOpened={setFilterDrawerOpened}
          filterDrawerOpened={filterDrawerOpened}
          brands={brands}
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
