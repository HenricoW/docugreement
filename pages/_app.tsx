import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";
import MainNavBar from "../components/Navbars/MainNavBar";
import { Web3Provider } from "../contexts/Web3Context";
import { BundlrProvider } from "../contexts/BundlrContext";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { argql } from "../utils/utils";
import { FileProvider } from "../contexts/fileContext";

export const AppName = "DocuGree";

const apolloClient = new ApolloClient({
  uri: argql,
  cache: new InMemoryCache(),
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "#fff",
      secondary: grey[500],
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <ApolloProvider client={apolloClient}>
          <Web3Provider>
            <BundlrProvider>
              <FileProvider>
                <MainNavBar />
                <Component {...pageProps} />
              </FileProvider>
            </BundlrProvider>
          </Web3Provider>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
