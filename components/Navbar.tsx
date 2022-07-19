import { Typography, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../styles/navbar.module.css";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import MobileNavModal from "./Products/MobileNavModal";
import { useSession } from "next-auth/react";
import gsap from "gsap";

const Navbar = () => {
  const [textColor, setTextColor] = useState("black");
  const [mobileNavModalOpen, setMobileNavModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const query = useRouter();
  const [pageLoaded, setPageLoaded] = useState(false);
  const session = useSession();

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
      id={"container"}
    >
      <div>
        <Link href="/">
          <Typography
            sx={{
              width: "100%",
              color: "#312f2f",
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
