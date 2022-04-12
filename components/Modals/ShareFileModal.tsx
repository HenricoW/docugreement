import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";

interface ShareFileModalProps {
  fileRef: string;
  modalOpen: boolean;
  handleModalClose: () => void;
}

const ShareFileModal = ({ fileRef, modalOpen, handleModalClose }: ShareFileModalProps) => {
  const [btnTxt, setBtnTxt] = useState("COPY");
  const url = "https://arweave.net/" + fileRef;

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setBtnTxt("Copied!");
  };

  return (
    <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="md">
      <DialogTitle>Share File</DialogTitle>
      <DialogContent>
        <DialogContentText mt="1em">Share this URL with a friend for them to access this file:</DialogContentText>
        <Typography my="1em">{url}</Typography>
        <Button variant="contained" onClick={onCopy}>
          {btnTxt}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ShareFileModal;
