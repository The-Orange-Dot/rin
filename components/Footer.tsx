import {
  Paper,
  Typography,
  IconButton,
  InputBase,
  Divider,
  Grid,
  Box,
  Container,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../styles/Footer.module.scss";
import EmailIcon from "@mui/icons-material/Email";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";
import type { NextComponentType } from "next";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useSession } from "next-auth/react";
import gsap from "gsap";

const Footer: NextComponentType = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [pageLoaded, setPageLoaded] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      setPageLoaded(true);
    }
  }, [status]);

  useEffect(() => {
    if (document.querySelector(".footer")) {
      const tl = gsap
        .timeline({ paused: true })
        .fromTo(".footer", { opacity: 0 }, { opacity: 1 });

      if (pageLoaded) {
        tl.play(0);
      }
    }
  }, [pageLoaded]);

  return (
    <div className={styles.footer_container}>
      <Box className={styles.footer_logo_sns_container}>
        <Typography
          color="primary"
          letterSpacing={4}
          fontWeight={200}
          variant="h4"
        >
          rin
        </Typography>
        <Box>
          <IconButton color="secondary">
            <TwitterIcon />
          </IconButton>
          <IconButton color="secondary">
            <InstagramIcon />
          </IconButton>
        </Box>
      </Box>
      <Grid className={styles.footer_nav_container}>
        <Grid item xl={4}>
          <Typography variant="body2" color="primary" fontWeight="bold">
            Explore
          </Typography>
          <Box className={styles.nav_links}>
            <Link href="/">
              <Typography color="primary" variant="body2">
                Home
              </Typography>
            </Link>
          </Box>
          <Box className={styles.nav_links}>
            <Link href="/products">
              <Typography color="primary" variant="body2">
                Store
              </Typography>
            </Link>
          </Box>
          <Box className={styles.nav_links}>
            <Link href="/news">
              <Typography color="primary" variant="body2">
                News
              </Typography>
            </Link>
          </Box>
        </Grid>
        <Grid item xl={4}>
          <Typography variant="body2" color="primary" fontWeight="bold">
            Company
          </Typography>

          <Box className={styles.nav_links}>
            <Link href={"/about"}>
              <Typography variant="body2" color="primary">
                About
              </Typography>
            </Link>
          </Box>
        </Grid>
        <Grid item xl={4}>
          <Typography variant="body2" color="primary" fontWeight="bold">
            Services
          </Typography>
          {/* <Link href={"/contact"}> */}
          <Typography variant="body2" color="primary">
            Contact us
          </Typography>
          {/* </Link> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
