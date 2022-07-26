import React, { useState, useEffect } from "react";
import styles from "../../styles/products.module.css";
import ProductsNavBar from "../../components/ProductsNavBar";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import {
  Button,
  Container,
  Grid,
  Box,
  Typography,
  Drawer,
} from "@mui/material";
import { server } from "../../config";
import ProductCards from "../../components/Products/ProductCards";
import ProductModal from "../../components/Products/ProductModal";
import { useMediaQuery } from "@mui/material";
import MobileProductNavBar from "../../components/Products/MobileProductNavBar";
import FilterListIcon from "@mui/icons-material/FilterList";
import MobileProductsModal from "../../components/Products/Mobile/MobileProductsModal";
import gsap from "gsap";
import { useSession } from "next-auth/react";
import { ProductType, CountType } from "../../types/productTypes";
import ShoppingCartButton from "../../components/Products/Mobile/ShoppingCartButton";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MobileCheckout from "../../components/Products/Mobile/MobileCheckout";
import Pagination from "../../components/Products/PaginationButtons";

const Products = ({
  productsData,
  totalProducts,
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [products, setProducts] = useState(productsData);
  const [productCards, setProductCards] = useState([]);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType>({
    name: "",
    details: "",
    size: "",
    description: [],
    quantity: 0,
    price: 0,
    rating: 0,
    images: [],
    thumbnail: "",
    category: "",
    brand: "",
    ingredients: [],
    id: "",
    reviews: [],
    _count: { reviews: 0 },
  });
  const [filterDrawerOpened, setFilterDrawerOpened] = useState(false);
  const session = useSession();
  const [pageLoaded, setPageLoaded] = useState(false);

  const shoppingCart = useSelector(
    (state: RootState) => state.shoppingCart.value
  );

  //Sets up initial state for animation
  //When session loads, pageLoaded set to true
  useEffect(() => {
    const tl = gsap
      .timeline({ paused: true })
      .fromTo(".filter", { opacity: 0 }, { opacity: 1 }, 0)
      .fromTo(".pagnation-buttons", { opacity: 0 }, { opacity: 1 }, 0);

    if (session.status === "loading") {
      if (document.querySelector(".card")) {
        gsap.set(".card", { opacity: 0 });
      }
      if (document.querySelector(".filter")) {
        gsap.set(".filter", { opacity: 0 });
      }
    } else {
      setPageLoaded(true);
      tl.play(0);
    }
    setProductModalOpen(false);
  }, [session.status]);

  //Filter selectors animation once page is loaded
  useEffect(() => {
    if (!pageLoaded) {
      setTimeout(() => {
        setPageLoaded(true);
      }, 250);
    } else {
      gsap.fromTo(
        ".card",
        { y: -10, opacity: 0 },
        {
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          y: 0,
          ease: "power3.out",
        }
      );
    }
  }, [pageLoaded]);

  //Maps all products data into cards
  useEffect(
    () => {
      const productCards = products?.map((product: ProductType) => {
        return (
          <ProductCards
            product={product}
            key={product.name}
            setSelectedProduct={setSelectedProduct}
          />
        );
      });

      setProductCards(productCards);
    },
    [products] // eslint-disable-line
  );

  useEffect(() => {
    if (!productModalOpen) {
      setSelectedProduct({
        name: "",
        details: "",
        size: "",
        description: [],
        quantity: 0,
        price: 0,
        rating: 0,
        images: [],
        thumbnail: "",
        category: "",
        brand: "",
        ingredients: [],
        id: "",
        reviews: [],
        _count: { reviews: 0 },
      });
    }
  }, [productModalOpen]);

  useEffect(() => {
    if (shoppingCart.length <= 0) {
      setOpenDrawer(false);
    }
  }, [shoppingCart]);

  return (
    <div className={styles.main}>
      <Box
        className="filter"
        sx={{
          maxWidth: 800,
          width: "80%",
          display: "flex",
          justifyContent: "center",
          height: "40px",
          minHeight: "40px",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => setFilterDrawerOpened(true)}
        >
          Filter <FilterListIcon color="primary" />
        </Button>
      </Box>

      <Container
        sx={
          isMobile
            ? {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
                minHeight: "100vh",
                flexDirection: "column",
              }
            : {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 5,
                flexDirection: "column",
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
        <Pagination
          number={totalProducts}
          setProducts={setProducts}
          setPageLoaded={setPageLoaded}
        />
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
          setProducts={setProducts}
          setPageLoaded={setPageLoaded}
        />
        {isMobile && shoppingCart.length > 0 ? (
          <ShoppingCartButton setOpenDrawer={setOpenDrawer} />
        ) : null}
        <Drawer
          open={openDrawer}
          anchor="bottom"
          onClose={() => setOpenDrawer(false)}
        >
          <MobileCheckout
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
          />
        </Drawer>
      </Container>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch(`${server}/api/products`);
    const productsData = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to fetch products, status of ${res.status}`);
    }

    const { products } = productsData;
    const { totalProducts } = productsData;
    const { brands } = productsData;

    return {
      props: {
        productsData: products as ProductType,
        totalProducts: totalProducts as CountType,
        brands: brands,
      },
      revalidate: 20,
    };
  } catch {
    console.log("ERROR");
    return { notFound: true };
  }
};

export default Products;
