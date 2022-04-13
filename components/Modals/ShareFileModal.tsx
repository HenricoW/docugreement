import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";

interface ShareFileModalProps {
  fname: string;
  fileRef: string;
  modalOpen: boolean;
  handleModalClose: () => void;
}

const ShareFileModal = ({ fname, fileRef, modalOpen, handleModalClose }: ShareFileModalProps) => {
  const [btnTxt, setBtnTxt] = useState("COPY");
  const refID = [fname, fileRef].join("/");

  const onCopy = () => {
    navigator.clipboard.writeText(refID);
    setBtnTxt("Copied!");
  };

  return (
    <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="md">
      <DialogTitle>Share File</DialogTitle>
      <DialogContent>
        <DialogContentText mt="1em">Share this reference with a friend for them to access this file:</DialogContentText>
        <DialogContentText mt="1em">They should access it via DocuGree -&gt; &quot;Import File&quot;</DialogContentText>
        <Typography my="1em">{refID}</Typography>
        <Button variant="contained" onClick={onCopy}>
          {btnTxt}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ShareFileModal;
