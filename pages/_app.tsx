import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";
import MainNavBar from "../components/Navbars/MainNavBar";
import { Web3Provider } from "../contexts/Web3Context";

export const AppName = "DocuGree";

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
        <Web3Provider>
          <MainNavBar />
          <Component {...pageProps} />
        </Web3Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
