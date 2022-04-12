import { Box, Typography } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import NewAgreementCard from "../components/Cards/NewAgreementCard";
import SideMenu from "../components/Navbars/SideMenu";
import { AppName } from "./_app";

const NewAgreement: NextPage = () => {
  return (
    <>
      <Head>
        <title>{AppName} | New Agreement</title>
        <meta name="description" content="Add a new agreement" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ mx: "3em", p: "1em", display: "grid", gridTemplateColumns: "250px 1fr" }}>
        <SideMenu />

        <Box sx={{ m: "1em" }}>
          <Box display="flex" justifyContent="space-between" mt="1em">
            <Box ml=".5em">
              <Box fontWeight="fontWeightLight" fontSize="h4.fontSize" className="title">
                New Agreement
              </Box>
              <Typography variant="body2" color="text.secondary" fontSize="h6.fontSize">
                Take the following steps to set up your new agreement. Be sure to have your agreement pdf file ready.
              </Typography>
            </Box>
          </Box>
          <Box display="block" m="2em auto" width="fit-content" height="600px">
            <NewAgreementCard />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NewAgreement;
