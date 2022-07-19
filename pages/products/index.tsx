import React, { useState, useEffect } from "react";
import styles from "../../styles/products.module.css";
import ProductsNavBar from "../../components/ProductsNavBar";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Button, Container, Grid, Box, Typography } from "@mui/material";
import { server } from "../../config";
import ProductCards from "../../components/Products/ProductCards";
import ProductModal from "../../components/Products/ProductModal";
import { useMediaQuery } from "@mui/material";
import MobileProductNavBar from "../../components/MobileProductNavBar";
import FilterListIcon from "@mui/icons-material/FilterList";
import MobileProductsModal from "../../components/Products/MobileProductsModal";
import gsap from "gsap";
import { useSession } from "next-auth/react";

interface ProductData {
  id: string;
  category: string;
  createdAt: string;
  description: string[];
  details: string;
  brand: string;
  image: string;
  name: string;
  size: string;
  updatedAt: string;
  price: number;
  quantity: number;
  rating: number;
}

const Products = ({
  productsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [mobile, setMobile] = useState(isMobile);
  const [products, setProducts] = useState([]);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [filterDrawerOpened, setFilterDrawerOpened] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const session = useSession();
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    gsap.set(".card", { opacity: 0 });
    gsap.set(".filter", { opacity: 0 });

    if (session.status !== "loading") {
      setPageLoaded(true);
    }
  }, [session.status]);

  useEffect(() => {
    const tl = gsap
      .timeline({ paused: true })
      .fromTo(
        ".card",
        { opacity: 0, y: -10 },
        { opacity: 1, stagger: 0.2, duration: 0.5, delay: 0.5, y: 0 }
      )
      .fromTo(".filter", { opacity: 0 }, { opacity: 1, delay: 0.5 }, 0);

    if (pageLoaded) {
      tl.play(0);
    }
  }, [pageLoaded]);

  useEffect(
    () => {
      if (productsData) {
        const productCards = productsData.map((product: ProductData) => {
          if (!brands.includes(product.brand)) {
            setBrands([...brands, product.brand]);
          }

          return (
            <ProductCards
              product={product}
              key={product.name}
              setProductModalOpen={setProductModalOpen}
              setSelectedProduct={setSelectedProduct}
            />
          );
        });

        setProducts(productCards);
      }
    },
    [productsData] // eslint-disable-line
  );

  return (
    <div className={styles.main}>
      {pageLoaded ? (
        <Box
          className="filter"
          sx={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
            height: "40px",
            minHeight: "40px",
            opacity: 0,
          }}
        >
          {isMobile ? (
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => setFilterDrawerOpened(true)}
            >
              Filter <FilterListIcon />
            </Button>
          ) : (
            <ProductsNavBar />
          )}
        </Box>
      ) : null}

      <Container
        sx={
          isMobile
            ? {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
                minHeight: "100vh",
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
          {products}
        </Grid>
        {isMobile ? (
          <MobileProductsModal
            productModalOpen={productModalOpen}
            setProductModalOpen={setProductModalOpen}
            product={selectedProduct}
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
