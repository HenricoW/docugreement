import { Box, Button, Card, Theme, Typography, TextField } from "@mui/material";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import SideMenu from "../components/Navbars/SideMenu";
import Web3Context from "../contexts/Web3Context";
import { WebBundlr } from "@bundlr-network/client";
import { bundlrUrl, capatalize, formatBytes, shortAddress, toDecimals, tokenName } from "../utils/utils";
import { AppName } from "./_app";

const requiredChainID = 137;
const requiredChainName = "Polygon";
const one_mb = 1024 ** 2;

const Account: NextPage = () => {
  const { walletAddr, provider, chainId } = useContext(Web3Context);
  const [bundlr, setBundlr] = useState<WebBundlr>();
  const [bundlr_bal, setBundlr_bal] = useState("0");
  const [dataSize, setDataSize] = useState(one_mb);
  const [costEstimate, setCostEstimate] = useState("0");

  console.log("chainId: ", chainId);
  console.log("chainId: ", parseInt(chainId.toString()));

  // TODO: move to own context
  const bundlrConnect = async () => {
    const _bundlr = new WebBundlr(bundlrUrl, tokenName, provider);
    _bundlr
      .ready()
      .then(() => setBundlr(_bundlr))
      .catch((err) => console.log(err));
  };

  const bundlrTest = async (size: number) => {
    let val;
    try {
      val = await bundlr?.getPrice(size);
      val = bundlr?.utils.unitConverter(val || 0);
      setCostEstimate(val?.toString() || "0");
    } catch (err) {
      console.log(err);
    }
  };
  // end: move to context

  useEffect(() => {
    (async () => {
      try {
        const loaded_bal = bundlr?.utils.unitConverter(await bundlr?.getLoadedBalance());
        setBundlr_bal((loaded_bal || 0).toString());
      } catch (err) {
        console.log(err);
      }
    })();
  }, [bundlr?.address]);

  return (
    <>
      <Head>
        <title>{AppName} | Account</title>
        <meta name="description" content="Manage your account credits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ mx: "3em", p: "1em", display: "grid", gridTemplateColumns: "250px 1fr" }}>
        <SideMenu />

        <Box sx={{ m: "1em" }}>
          <Box display="flex" justifyContent="space-between" mt="1em">
            <Box ml=".5em">
              <Box fontWeight="fontWeightLight" fontSize="h4.fontSize" className="title">
                Your Account
              </Box>
              <Typography variant="body2" color="text.secondary" fontSize="h6.fontSize">
                Manage your credit for uploading files to permanent storage
              </Typography>
              {walletAddr ? (
                <Typography variant="body2" color="text.secondary" fontSize="h6.fontSize" my=".5em">
                  Connected wallet: {shortAddress(walletAddr, 6)}
                </Typography>
              ) : null}
            </Box>
          </Box>

          <Box display="block" m="2em auto" width="fit-content" height="600px">
            <Card
              variant="outlined"
              sx={{
                p: "1.5em",
                borderColor: "info.main",
                borderRadius: "1em",
                minWidth: "500px",
                "&:hover": {
                  boxShadow: (theme: Theme) => "0 0 1em " + theme.palette.info.main,
                },
              }}
            >
              {walletAddr ? (
                parseInt(chainId.toString()) === requiredChainID ? (
                  <>
                    {bundlr ? (
                      <>
                        {/* <Button variant="outlined" color="info" onClick={bundlrTest}>
                          Test Bundlr
                        </Button> */}
                        <Typography variant="body2" fontSize="h6.fontSize">
                          Your bundler balance: {bundlr_bal} {capatalize(tokenName)}
                        </Typography>
                        <Box mb="2em">
                          <Typography color="text.secondary" mt="1em">
                            Fund your account:
                          </Typography>
                          <TextField
                            sx={{ my: ".5em" }}
                            type="number"
                            fullWidth
                            //   label={`Amount of ${capatalize(tokenName)}`}
                            variant="outlined"
                          />
                          <Button variant="outlined" color="info" onClick={() => {}}>
                            Fund Account
                          </Button>
                        </Box>
                        <Box mb="2em">
                          <Typography color="text.secondary" mt="1em">
                            Withdraw from account:
                          </Typography>
                          <TextField
                            sx={{ my: ".5em" }}
                            type="number"
                            fullWidth
                            //   label={`Amount of ${capatalize(tokenName)}`}
                            variant="outlined"
                          />
                          <Button variant="outlined" color="info" onClick={() => {}}>
                            Withdraw
                          </Button>
                        </Box>
                        <Box mb="2em" textAlign="center">
                          <Typography color="text.secondary" mb=".5em">
                            Estimate the cost per file size:
                          </Typography>
                          <ToggleButtonGroup
                            color="primary"
                            value={dataSize}
                            exclusive
                            onChange={(e, val) => setDataSize(val as number)}
                          >
                            <ToggleButton value={one_mb}>{formatBytes(one_mb)}</ToggleButton>
                            <ToggleButton value={10 * one_mb}>{formatBytes(10 * one_mb)}</ToggleButton>
                            <ToggleButton value={100 * one_mb}>{formatBytes(100 * one_mb)}</ToggleButton>
                          </ToggleButtonGroup>
                          <Typography my=".5em">
                            Estimated cost: {toDecimals(costEstimate, 5)} {capatalize(tokenName)}
                          </Typography>
                          <Button variant="outlined" color="info" onClick={() => bundlrTest(dataSize)}>
                            Get estimate
                          </Button>
                        </Box>
                      </>
                    ) : (
                      <Button variant="outlined" color="info" onClick={bundlrConnect}>
                        Connect Bundlr
                      </Button>
                    )}
                  </>
                ) : (
                  <Typography variant="body2" color="orange" fontSize="h6.fontSize">
                    Please switch your wallet to the {requiredChainName} network
                  </Typography>
                )
              ) : (
                <Typography variant="body2" color="orange" fontSize="h6.fontSize">
                  Please connect your wallet
                </Typography>
              )}
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Account;