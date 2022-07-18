import { Typography, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../styles/navbar.module.css";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const [textColor, setTextColor] = useState("black");
  const isMobile = useMediaQuery("(max-width: 900px)");
  const query = useRouter();

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
    </div>
  );
};

export default Navbar;
