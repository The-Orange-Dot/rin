import "../styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "../redux/store";
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

let persistor = persistStore(store);

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SessionProvider session={session}>
            <ThemeProvider theme={theme}>
              {router.pathname.includes("/payment") ||
              router.pathname.includes("/stripeSuccess") ? (
                <Component {...pageProps} />
              ) : (
                <>
                  <Navbar />
                  <Component {...pageProps} session={session} />
                  <Footer />
                </>
              )}
            </ThemeProvider>
          </SessionProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
