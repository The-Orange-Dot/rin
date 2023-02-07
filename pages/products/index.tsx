import React, { useState, useEffect } from "react";
import styles from "../../styles/Products.module.scss";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Button, Container, Grid, Box, Drawer } from "@mui/material";
import { server } from "../../config";
import ProductCards from "../../components/Products/ProductCards";
import { useMediaQuery } from "@mui/material";
import MobileProductNavBar from "../../components/Products/MobileProductNavBar";
import FilterListIcon from "@mui/icons-material/FilterList";
import gsap from "gsap";
import { useSession, getSession } from "next-auth/react";
import { ProductType, CountType } from "../../types/productTypes";
import ShoppingCartButton from "../../components/Products/Mobile/ShoppingCartButton";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MobileCheckout from "../../components/Products/Mobile/MobileCheckout";
import PaginationButtons from "../../components/Products/PaginationButtons";
import { useDispatch } from "react-redux";
import { setPages } from "../../redux/reducers/productsFilterReducer";
import dynamic from "next/dynamic";

const ProductModal = dynamic(
  () => import("../../components/Products/ProductModal"),
  {
    ssr: false,
  }
);

const MobileProductsModal = dynamic(
  () => import("../../components/Products/Mobile/MobileProductsModal"),
  {
    ssr: false,
  }
);

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
    instructions: [],
    id: "",
    reviews: [],
    _count: { reviews: 0 },
  });
  const [filterDrawerOpened, setFilterDrawerOpened] = useState(false);
  const { data: session, status } = useSession();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [paginationNum, setPaginationNum] = useState(totalProducts);
  const dispatch = useDispatch();

  const shoppingCart = useSelector(
    (state: RootState) => state.shoppingCart.value
  );

  //Sets up initial state for animation
  //When session loads, pageLoaded set to true
  useEffect(() => {
    dispatch(setPages(totalProducts));

    const tl = gsap
      .timeline({ paused: true })
      .fromTo(".filter", { opacity: 0 }, { opacity: 1 }, 0)
      .fromTo(".pagnation-buttons", { opacity: 0 }, { opacity: 1 }, 0);

    if (status === "loading") {
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
  }, [status]); //eslint-disable-line

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
        instructions: [],
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
      <Box className={`${styles.product_page_filter} filter`}>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => setFilterDrawerOpened(true)}
        >
          Filter <FilterListIcon color="primary" />
        </Button>
      </Box>

      <Container className={styles.product_page_container}>
        <Grid
          container
          columns={isMobile ? 8 : 15}
          className={styles.product_grid}
        >
          {productCards}
        </Grid>
        <PaginationButtons
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
          setPaginationNum={setPaginationNum}
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

    let { products } = productsData;
    const { totalProducts } = productsData;
    const { brands } = productsData;

    return {
      props: {
        productsData: products as ProductType,
        totalProducts: totalProducts as CountType,
        brands: JSON.parse(brands),
      },
      revalidate: 20,
    };
  } catch {
    return { notFound: true };
  }
};

export default Products;
