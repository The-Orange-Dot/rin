import {
  Typography,
  Container,
  Box,
  Drawer,
  Paper,
  Backdrop,
} from "@mui/material";
import MobileNavModal from "./MobileNavModal";
import React, { useEffect, useState } from "react";
import styles from "../styles/Navbar.module.scss";
import { useMediaQuery } from "@mui/material";
import { useSession } from "next-auth/react";
import gsap from "gsap";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckoutDrawer from "./Products/CheckoutDrawer";
import LoginDrawer from "./LoginDrawer";

const Navbar = () => {
  const [textColor, setTextColor] = useState("black");
  const [mobileNavModalOpen, setMobileNavModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const query = useRouter();
  const [pageLoaded, setPageLoaded] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const shoppingCart = useSelector((state: any) => state.shoppingCart.value);
  const [itemsInCart, setItemsInCart] = useState(0);
  const [openCheckoutDrawer, setOpenCheckoutDrawer] = useState<boolean>(false);
  const [openLoginDrawer, setOpenLoginDrawer] = useState(false);

  useEffect(() => {
    const totalItems = shoppingCart?.reduce((total: number, item: any) => {
      return (total = total + item.quantity);
    }, 0);
    setItemsInCart(totalItems);
  }, [shoppingCart]);

  useEffect(() => {
    gsap.timeline().to("#container", { opacity: 1, delay: 0.5 });

    if (status !== "loading") {
      setPageLoaded(true);
    }
  }, [status]);

  return (
    <div className={styles.navbarContainer} id={"container"}>
      <Box className={styles.logo_container}>
        <Link href="/">
          <Typography
            color="primary"
            fontSize="2.5rem"
            letterSpacing={4}
            fontWeight={200}
            variant="h4"
          >
            rin
          </Typography>
        </Link>
      </Box>
      {isMobile ? (
        <MenuIcon
          color="primary"
          fontSize="large"
          onClick={() => setMobileNavModalOpen(true)}
        />
      ) : (
        <div className={styles.navbar_selector}>
          {session && session.status === "admin" ? (
            <Link href="/admin">
              <Typography
                className={
                  textColor === "white"
                    ? styles.selector_text_white
                    : styles.selector_text
                }
                variant="overline"
              >
                ADMIN
              </Typography>
            </Link>
          ) : null}
          <Link href="/">
            <Typography
              className={
                textColor === "white"
                  ? styles.selector_text_white
                  : styles.selector_text
              }
              variant="overline"
              id="home"
            >
              Home
            </Typography>
          </Link>
          <Link href="/news">
            <Typography
              className={
                textColor === "white"
                  ? styles.selector_text_white
                  : styles.selector_text
              }
              variant="overline"
              id="news"
            >
              News
            </Typography>
          </Link>

          <Link href="/products">
            <Typography
              className={
                textColor === "white"
                  ? styles.selector_text_white
                  : styles.selector_text
              }
              variant="overline"
              id="store"
            >
              Store
            </Typography>
          </Link>

          {status === "authenticated" ? (
            <Link href="/profile">
              <Typography
                className={
                  textColor === "white"
                    ? styles.selector_text_white
                    : styles.selector_text
                }
                variant="overline"
              >
                Profile
              </Typography>
            </Link>
          ) : (
            <Typography
              className={
                textColor === "white"
                  ? styles.selector_text_white
                  : styles.selector_text
              }
              variant="overline"
              onClick={() => setOpenLoginDrawer(true)}
            >
              Login
            </Typography>
          )}
          <Box
            onClick={() => {
              if (shoppingCart?.length > 0) {
                setOpenCheckoutDrawer(true);
              }
            }}
            className={styles.nav_shopping_cart}
          >
            <ShoppingCartIcon />
            {shoppingCart?.length > 0 ? (
              <Typography>{itemsInCart}</Typography>
            ) : null}
          </Box>
        </div>
      )}

      <MobileNavModal
        setMobileNavModalOpen={setMobileNavModalOpen}
        mobileNavModalOpen={mobileNavModalOpen}
      />
      <Drawer
        open={openCheckoutDrawer}
        onClose={() => {
          setOpenCheckoutDrawer(false);
        }}
        anchor="right"
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
      >
        <CheckoutDrawer />
      </Drawer>
      <Drawer
        open={openLoginDrawer}
        anchor="right"
        onClose={() => setOpenLoginDrawer(false)}
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
      >
        <LoginDrawer setOpenLoginDrawer={setOpenLoginDrawer} />
      </Drawer>
    </div>
  );
};

export default Navbar;
