import { Typography, Container, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../styles/navbar.module.css";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import MobileNavModal from "./Products/Mobile/MobileNavModal";
import { useSession } from "next-auth/react";
import gsap from "gsap";
import { useRouter } from "next/router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [textColor, setTextColor] = useState("black");
  const [mobileNavModalOpen, setMobileNavModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const query = useRouter();
  const [pageLoaded, setPageLoaded] = useState(false);
  const session = useSession();
  const router = useRouter();
  const shoppingCart = useSelector((state: any) => state.shoppingCart.value);

  useEffect(() => {
    if (session.status !== "loading") {
      setPageLoaded(true);
    }
  }, [session.status]);

  useEffect(() => {
    gsap.set("#container", { opacity: 0 });
    const tl = gsap
      .timeline({ paused: true })
      .fromTo("#container", { opacity: 0 }, { opacity: 1, delay: 0.5 });
    if (pageLoaded) {
      tl.play(0);
    }
  }, [pageLoaded]);

  return (
    <div
      className={
        isMobile ? styles.mobileNavbarContainer : styles.navbarContainer
      }
      style={
        router.pathname.includes("/products") ? { background: "white" } : {}
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
          <Link href="/subscriptions">
            <Typography
              className={
                textColor === "white"
                  ? styles.selector_text_white
                  : styles.selector_text
              }
              variant="overline"
            >
              Subscriptions
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
          <Box sx={{ display: "flex" }}>
            <ShoppingCartIcon />
            {shoppingCart?.length > 0 ? (
              <Typography>{shoppingCart?.length}</Typography>
            ) : null}
          </Box>
        </div>
      )}
      <MobileNavModal
        setMobileNavModalOpen={setMobileNavModalOpen}
        mobileNavModalOpen={mobileNavModalOpen}
      />
    </div>
  );
};

export default Navbar;
