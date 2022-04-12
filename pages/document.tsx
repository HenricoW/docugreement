import React, { useContext, useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Backdrop, Box, Button, CircularProgress, Link as MuiLink, Typography } from "@mui/material";
import SideMenu from "../components/Navbars/SideMenu";
import { AppName } from "./_app";
import FileContext from "../contexts/fileContext";
import Web3Context from "../contexts/Web3Context";
import { allowedFileType, DocPhase, getMetadata, signPdf } from "../utils/utils";
import { useRouter } from "next/router";
import BundlrContext from "../contexts/BundlrContext";
import { PDFDocument } from "pdf-lib";

const Document: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [pdfURL, setPdfURL] = useState("");
  const [showSign, setShowSign] = useState(true);
  const [showShare, setShowShare] = useState(false);
  const [dlLink, setDlLink] = useState("");
  const [busyMssg, setBusyMssg] = useState("Please wait");
  const [pendingOpen, setPendingOpen] = useState(false);

  const { walletAddr, provider } = useContext(Web3Context);
  const { files } = useContext(FileContext);
  const { uploadBuffer } = useContext(BundlrContext);
  const srcRef = useRef(files.length > 0 ? URL.createObjectURL(files[0].file) : "");
  const router = useRouter();

  const getMData = async () => {
    const pdfBuffer = await files[0].file.arrayBuffer();
    const doc = await PDFDocument.load(pdfBuffer);

    return getMetadata(doc);
  };

  useEffect(() => {
    if (files.length < 1) {
      router.push("/dashboard");
      return;
    }
  });

  useEffect(() => {
    (async () => {
      if (files.length > 0) {
        const metaData = await getMData();
        setDlLink(URL.createObjectURL(files[0].file));

        if (metaData.includes(DocPhase.signed1) || metaData.includes(DocPhase.signed2)) setShowShare(true);
        if (metaData.includes(DocPhase.signed2)) {
          setShowSign(false);
        }
      }
    })();

    return () => {
      URL.revokeObjectURL(srcRef.current);
    };
  }, [files.length]);

  const onSign = async () => {
    setErrorMessage("");
    if (files.length < 1) return;
    if (!walletAddr) {
      setErrorMessage("Please connect your wallet before signing");
      return;
    }

    signPdf(files[0].file, {
      ethAddr: walletAddr,
      docTitle: files[0].fileName,
      provider,
    })
      .then(async ({ url, newPdf }) => {
        setPdfURL(url);

        const fileBuffer = await newPdf.arrayBuffer();
        const tags = [
          { name: "Content-Type", value: allowedFileType },
          { name: "App-Name", value: AppName },
          { name: "dg_fname", value: files[0].fileName },
          { name: "dg_date", value: (Date.now() / 1000).toString() },
        ];
        return uploadBuffer(Buffer.from(fileBuffer), tags);
      })
      .then((id) => {
        console.log("transaction id: ", id);
        setErrorMessage(id ? "Sign & upload successful" : "Error uploading document");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("There was a problem signing the document: " + err);
      });
  };

  const onShare = async () => {};

  //   const onPublish = () => {};

  return (
    <>
      <Head>
        <title>{AppName} | Dashboard</title>
        <meta name="description" content="View your agreements" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{ mx: "3em", p: "1em", display: "grid", gridTemplateColumns: "250px 1fr", height: "calc(100vh - 64px)" }}
      >
        <SideMenu />

        <Box m="1em" display="flex" flexDirection="column">
          <Box ml=".5em">
            <Box fontWeight="fontWeightLight" fontSize="h4.fontSize" className="title">
              Document {files.length > 0 ? files[0].fileName : "[no file]"}
            </Box>
            <Typography variant="body2" color="text.secondary" fontSize="h6.fontSize">
              Review the agreement document and share it with the other party when you&apos;re satisfied. When both
              parties accept the document, signing can commence.
            </Typography>
            {errorMessage ? (
              <Typography mb="2em" color="orange">
                {errorMessage}
              </Typography>
            ) : null}
          </Box>
          {srcRef.current ? (
            <Box m="1.5em .5em" flexGrow={1}>
              <embed src={srcRef.current} type="application/pdf" width="100%" height="100%" />
            </Box>
          ) : (
            "No file to display"
          )}

          <Box display="flex" justifyContent="space-around">
            {showSign ? (
              <Box textAlign="center">
                <Typography fontSize="h5.fontSize" mb=".5em">
                  Sign this document
                </Typography>

                {pdfURL ? (
                  <MuiLink
                    href={pdfURL}
                    target="_blank"
                    underline="none"
                    sx={{ color: "#111", backgroundColor: "info.main", p: ".5em 1em", my: "1em", borderRadius: "7px" }}
                  >
                    VIEW SIGNED DOCUMENT
                  </MuiLink>
                ) : (
                  <Button variant="contained" onClick={onSign}>
                    SIGN
                  </Button>
                )}
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
      {/* <ShareFileModal fileRef={shareRef} modalOpen={showShareModal} handleModalClose={() => setShowShareModal(false)} />
      {files.length > 0 ? (
        <PublishModal file={files[0].file} modalOpen={showPubModal} handleModalClose={() => setShowPubModal(false)} />
      ) : null} */}
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={pendingOpen}>
        <Typography mr="2em">{busyMssg}</Typography>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Document;
