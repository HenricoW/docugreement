import { Box, Button, Card, Theme, Typography, TextField } from "@mui/material";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import SideMenu from "../components/Navbars/SideMenu";
import Web3Context from "../contexts/Web3Context";
import { capatalize, shortAddress, formatBytes, one_mb } from "../utils/utils";
import { requiredChainID, requiredChainName, toDecimals, tokenName } from "../utils/utils";
import { AppName } from "./_app";
import { ethers } from "ethers";
import BundlrContext from "../contexts/BundlrContext";

const Account: NextPage = () => {
  const { walletAddr, chainId } = useContext(Web3Context);
  const { bundlr, bundlrEstimate } = useContext(BundlrContext);

  const [bundlr_bal, setBundlr_bal] = useState("0");
  const [dataSize, setDataSize] = useState(one_mb);
  const [costEstimate, setCostEstimate] = useState("0");
  const [depVal, setDepVal] = useState("0");
  const [withdVal, setWithdVal] = useState("0");

  const getBundlrEstimate = async (size: number) => {
    try {
      const est = await bundlrEstimate(size);
      setCostEstimate(est);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFund = async () => {
    if (bundlr) {
      const val = ethers.utils.parseEther(depVal);
      console.log("deposit value: ", val.toString());
      bundlr
        .fund(val.toString())
        .then((resp) => {
          console.log(resp);
          return bundlr.getLoadedBalance();
        })
        .then((balVal) => {
          const load_bal = bundlr.utils.unitConverter(balVal);
          setBundlr_bal(load_bal.toString());
        })
        .catch((err) => console.log(err));
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
                        <Typography variant="body2" fontSize="h6.fontSize">
                          Your bundler balance: {bundlr_bal} {capatalize(tokenName)}
                        </Typography>
                        <Box mb="2em" className="deposit_funds">
                          <Typography color="text.secondary" mt="1em">
                            Fund your account:
                          </Typography>
                          <TextField
                            sx={{ my: ".5em" }}
                            type="number"
                            fullWidth
                            //   label={`Amount of ${capatalize(tokenName)}`}
                            variant="outlined"
                            value={depVal}
                            onChange={(e) => setDepVal(e.target.value)}
                          />
                          <Button variant="outlined" color="info" onClick={handleFund}>
                            Fund Account
                          </Button>
                        </Box>
                        <Box mb="2em" className="withdraw_funds">
                          <Typography color="text.secondary" mt="1em">
                            Withdraw from account:
                          </Typography>
                          <TextField
                            sx={{ my: ".5em" }}
                            type="number"
                            fullWidth
                            //   label={`Amount of ${capatalize(tokenName)}`}
                            variant="outlined"
                            value={withdVal}
                            onChange={(e) => setWithdVal(e.target.value)}
                          />
                          <Button variant="outlined" color="info" onClick={() => {}}>
                            Withdraw
                          </Button>
                        </Box>
                        <Box mb="2em" textAlign="center" className="cost_estimate">
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
                          <Button variant="outlined" color="info" onClick={() => getBundlrEstimate(dataSize)}>
                            Get estimate
                          </Button>
                        </Box>
                      </>
                    ) : (
                      <Typography variant="body2" color="orange" fontSize="h6.fontSize">
                        Please connect to Bundlr
                      </Typography>
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
