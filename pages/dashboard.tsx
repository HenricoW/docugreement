import { Box, Button, Typography } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import FilesViewer from "../components/Layouts/FilesViewer";
import ImportModal from "../components/Modals/ImportModal";
import SideMenu from "../components/Navbars/SideMenu";
import FileContext from "../contexts/fileContext";
import Web3Context from "../contexts/Web3Context";
import { shortAddress } from "../utils/utils";
import { AppName } from "./_app";

// temp
const fetchDirsAndFiles = async (isTrue: boolean) => {};
// const setShowImport = async (isTrue: boolean) => {};
// end temp

const Dashboard: NextPage = () => {
  const [showImport, setShowImport] = useState(false);
  const { walletAddr } = useContext(Web3Context);
  const { fileList } = useContext(FileContext);

  const router = useRouter();

  // const readFileList = () => {
  //   const fileListSt = localStorage.getItem(`${AppName}_ufl`) || "[]"
  // }

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
                {walletAddr ? `${AppName}ments for ${shortAddress(walletAddr, 6)}` : "Please Connect"}
              </Box>

              <Typography variant="body2" color="text.secondary" fontSize="h6.fontSize">
                An overview of your latest documents.
              </Typography>
            </Box>
            <Box display="flex" gap="1em" className="dashboard-header">
              {fileList.length > 0 ? (
                <>
                  <Button
                    variant="outlined"
                    sx={{ alignSelf: "center" }}
                    onClick={async () => await fetchDirsAndFiles(true)}
                  >
                    Refresh File Listing
                  </Button>
                </>
              ) : null}
              <Button variant="outlined" sx={{ alignSelf: "center" }} onClick={() => setShowImport(true)}>
                Import file
              </Button>
              <Button variant="contained" sx={{ alignSelf: "center" }} onClick={() => router.push("/newagreement")}>
                Create Agreement
              </Button>
            </Box>
          </Box>

          <Box textAlign="center" my="3em">
            <FilesViewer />
          </Box>
        </Box>
      </Box>
      <ImportModal modalOpen={showImport} handleModalClose={() => setShowImport(false)} />
    </>
  );
};

export default Dashboard;
