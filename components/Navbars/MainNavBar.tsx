import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import React, { useContext, useState } from "react";
import { bundlrUrl, shortAddress, tokenName } from "../../utils/utils";
import { AppName } from "../../pages/_app";
import { useRouter } from "next/router";
import Web3Context from "../../contexts/Web3Context";
import { WebBundlr } from "@bundlr-network/client";

const MainNavBar = () => {
  const router = useRouter();
  const { walletAddr, w3connect, provider } = useContext(Web3Context);
  const [bundlr, setBundlr] = useState<WebBundlr>();

  const bundlrConnect = async () => {
    const _bundlr = new WebBundlr(bundlrUrl, tokenName, provider);
    _bundlr
      .ready()
      .then(() => setBundlr(_bundlr))
      .catch((err) => console.log(err));
  };

  const bundlrTest = async () => {
    let val;
    try {
      val = await bundlr?.getPrice(1000);
      console.log(val);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: "rgba(0, 0, 0, 0.45)",
          backdropFilter: "blur(20px)",
          MozBackdropFilter: "blur(20px)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            <Box
              display="flex"
              alignItems="center"
              pr=".3em"
              mr="auto"
              onClick={() => router.push("/")}
              sx={{ ":hover": { cursor: "pointer" } }}
            >
              <BlurOnIcon sx={{ fontSize: "2em", margin: "0 auto" }} />
              <Typography align="center" variant="h5" my=".5em" ml=".5em">
                {AppName}
              </Typography>
            </Box>

            <Button variant="outlined" color="info" onClick={bundlrConnect}>
              Connect Bundlr
            </Button>

            {bundlr ? (
              <Button variant="outlined" color="info" onClick={bundlrTest}>
                Test Bundlr
              </Button>
            ) : null}

            {walletAddr ? (
              <Typography variant="h6">{shortAddress(walletAddr)}</Typography>
            ) : (
              <Button variant="outlined" color="info" onClick={w3connect}>
                CONNECT
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar></Toolbar>
    </>
  );
};

export default MainNavBar;
