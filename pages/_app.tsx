import "../styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { useRouter } from "next/router";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f312b",
      contrastText: "#fff",
    },
    secondary: {
      main: "#949495",
    },
  },
});
// #2b2b2b

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Provider store={store}>
        <SessionProvider session={session}>
          <ThemeProvider theme={theme}>
            {router.pathname.includes("/payment") ? (
              <Component {...pageProps} />
            ) : (
              <>
                <Navbar />
                <Component {...pageProps} />
                <Footer />
              </>
            )}
          </ThemeProvider>
        </SessionProvider>
      </Provider>
    </>
  );
}

export default MyApp;
