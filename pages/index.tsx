import { Box, Button, Card, Theme, Typography } from "@mui/material";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { AppName } from "./_app";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{AppName}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box height="calc(100vh - 64px)" display="flex" alignItems="center">
        <Box textAlign="center" m="0 auto">
          <Card
            variant="outlined"
            sx={{
              borderRadius: "1em",
              borderColor: "info.main",
              p: "4em 6em",
              "&:hover": {
                boxShadow: (theme: Theme) => "0 0 3em " + theme.palette.info.main,
              },
            }}
          >
            <BlurOnIcon sx={{ fontSize: "10em", margin: "0 auto" }} />
            <Typography variant="h3" mb=".5em">
              Welcome to DocuGree
            </Typography>
            <Typography variant="h5">
              Manage your files on Arweave and sign escrow agreement contracts with your Ethereum wallet.
            </Typography>
            <Typography variant="h5" my=".5em">
              All while on the Boba Layer 2 Network!.
            </Typography>
            <Typography variant="h6" mt="1.5em">
              Enforce those agreements on Decentralized courts, such as Kleros.{" "}
            </Typography>
            <Button size="large" variant="contained" onClick={() => router.push("/dashboard")} sx={{ mt: "2em" }}>
              Start Now
            </Button>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default Home;
