import {
  Typography,
  Container,
  Box,
  Drawer,
  Paper,
  Backdrop,
} from "@mui/material";
import MobileNavModal from "./Products/Mobile/MobileNavModal";
import React, { useEffect, useState } from "react";
import styles from "../styles/navbar.module.css";
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
    <div
      className={
        isMobile ? styles.mobileNavbarContainer : styles.navbarContainer
      }
      style={
        router.pathname.includes("/products") ||
        router.pathname.includes("/profile")
          ? { background: "white", opacity: 0 }
          : { opacity: 0 }
      }
      id={"container"}
    >
      <div>
        <Link href="/">
          <Typography
            color="primary"
            sx={{
              width: "100%",
              fontWeight: 200,
              cursor: "pointer",
              letterSpacing: 4,
              fontSize: "2.5rem",
            }}
            variant="h4"
          >
            rin
          </Typography>
        </Link>
      </div>
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
            >
              Home
            </Typography>
          </Link>
          <Link href="/about">
            <Typography
              className={
                textColor === "white"
                  ? styles.selector_text_white
                  : styles.selector_text
              }
              variant="overline"
            >
              About
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
            >
              Products
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
            sx={{ display: "flex", width: "10%" }}
            onClick={() => {
              if (shoppingCart?.length > 0) {
                setOpenCheckoutDrawer(true);
              }
            }}
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
