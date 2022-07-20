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
import styles from "../styles/footer.module.css";
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
  const session = useSession();

  useEffect(() => {
    if (session.status !== "loading") {
      setPageLoaded(true);
    }
  }, [session.status]);

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
    <div
      className={
        isMobile ? styles.mobile_footer_container : styles.footer_container
      }
    >
      <Box
        sx={
          isMobile
            ? {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                ml: 1,
                mr: 1,
                flex: 0.7,
              }
            : { display: "flex", ml: 1, mr: 1, flex: 0.7 }
        }
      >
        <Typography
          color="primary"
          sx={{
            fontWeight: 200,
            cursor: "pointer",
            letterSpacing: 4,
          }}
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
      <Grid
        sx={
          isMobile
            ? {
                m: "10px 0",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                minWidth: "20%",
              }
            : {
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                minWidth: "20%",
                flex: 1,
              }
        }
        container
        spacing={2}
      >
        <Grid item xl={4}>
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", mb: 1 }}
            color="primary"
          >
            Explore
          </Typography>
          <Link href="/">
            <Typography
              color="primary"
              variant="body2"
              sx={{ cursor: "pointer", "&:hover": { opacity: 0.5 } }}
            >
              Home
            </Typography>
          </Link>
          <Link href="/products">
            <Typography
              color="primary"
              variant="body2"
              sx={{ cursor: "pointer", "&:hover": { opacity: 0.5 } }}
            >
              Products
            </Typography>
          </Link>
        </Grid>
        <Grid item xl={4}>
          <Typography
            variant="body2"
            color="primary"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            Company
          </Typography>
          <Link href={"/about"}>
            <Typography
              variant="body2"
              color="primary"
              sx={{ cursor: "pointer", "&:hover": { opacity: 0.5 } }}
            >
              About
            </Typography>
          </Link>
        </Grid>
        <Grid item xl={4}>
          <Typography
            variant="body2"
            color="primary"
            sx={{ fontWeight: "bold", mb: 1, min: "30%" }}
          >
            Services
          </Typography>
          {/* <Link href={"/contact"}> */}
          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: "pointer", "&:hover": { opacity: 0.5 } }}
          >
            Contact us
          </Typography>
          {/* </Link> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
