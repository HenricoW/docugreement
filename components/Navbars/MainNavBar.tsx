import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import React from "react";
import { shortAddress } from "../../utils/utils";
import { AppName } from "../../pages/_app";
import { useRouter } from "next/router";

// temp
// const walletAddr = "0x81745b7339D5067E82B93ca6BBAd125F214525d3";
const walletAddr = "";

const MainNavBar = () => {
  const router = useRouter();

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
            <Box display="flex" alignItems="center" mr="auto" onClick={() => router.push("/")}>
              <BlurOnIcon sx={{ fontSize: "2em", margin: "0 auto" }} />
              <Typography align="center" variant="h5" my=".5em" ml=".5em">
                {AppName}
              </Typography>
            </Box>
            {walletAddr ? (
              <Typography variant="h6">{shortAddress(walletAddr)}</Typography>
            ) : (
              <Button variant="outlined" color="info" onClick={() => {}}>
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
