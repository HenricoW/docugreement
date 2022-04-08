import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";

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
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
