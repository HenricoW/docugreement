import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import React, { useContext } from "react";
import { chainData, shortAddress } from "../../utils/utils";
import { AppName } from "../../pages/_app";
import { useRouter } from "next/router";
import Web3Context from "../../contexts/Web3Context";
import BundlrContext from "../../contexts/BundlrContext";

const MainNavBar = () => {
  const router = useRouter();
  const { walletAddr, w3connect, provider, chainId } = useContext(Web3Context);
  const { bundlr, bundlrConnect } = useContext(BundlrContext);

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

            {bundlr ? (
              <Button variant="outlined" color="success">
                Bundlr Active
              </Button>
            ) : provider ? (
              chainData.hasOwnProperty(chainId.toString()) ? (
                <Button variant="outlined" color="warning" onClick={() => bundlrConnect(provider, chainId)}>
                  Connect to Bundlr
                </Button>
              ) : (
                <Typography variant="body2" color="orange" fontSize="h6.fontSize">
                  Please switch your wallet to Boba/Polygon Mainnet/Testnet
                </Typography>
              )
            ) : null}

            <Box ml="1em">
              {walletAddr ? (
                <Typography variant="h6">{shortAddress(walletAddr)}</Typography>
              ) : (
                <Button variant="outlined" color="info" onClick={w3connect}>
                  CONNECT
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar></Toolbar>
    </>
  );
};

export default MainNavBar;
