import { Box, Button, Typography } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import FilesViewer from "../components/Layouts/FilesViewer";
import SideMenu from "../components/Navbars/SideMenu";
import { AppName } from "./_app";

// temp
const address = "0x81745b7339D5067E82B93ca6BBAd125F214525d3";
const user = "Ricky Bobby";
const projPodAvailable = true;
const fetchDirsAndFiles = async (isTrue: boolean) => {};
const setShowImport = async (isTrue: boolean) => {};
// end temp

const Dashboard: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{AppName} | Dashboard</title>
        <meta name="description" content="View your agreements" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ mx: "3em", p: "1em", display: "grid", gridTemplateColumns: "250px 1fr" }}>
        <SideMenu />
        <Box sx={{ m: "1em" }}>
          <Box display="flex" justifyContent="space-between" mt="1em">
            <Box ml=".5em">
              <Box fontWeight="fontWeightLight" fontSize="h4.fontSize" className="title">
                {AppName} documents for {user}
              </Box>

              <Typography variant="body2" color="text.secondary" fontSize="h6.fontSize">
                An overview of your latest documents.
              </Typography>
            </Box>
            <Box display="flex" gap="1em" className="dashboard-header">
              {projPodAvailable ? (
                <>
                  <Button
                    variant="outlined"
                    sx={{ alignSelf: "center" }}
                    onClick={async () => await fetchDirsAndFiles(true)}
                  >
                    Refresh File Listing
                  </Button>
                  <Button variant="outlined" sx={{ alignSelf: "center" }} onClick={() => setShowImport(true)}>
                    Import file
                  </Button>
                  <Button variant="contained" sx={{ alignSelf: "center" }} onClick={() => router.push("/newagreement")}>
                    Create Agreement
                  </Button>
                </>
              ) : null}
            </Box>
          </Box>

          <Box textAlign="center" my="3em">
            <FilesViewer />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
