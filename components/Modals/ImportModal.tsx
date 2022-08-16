import React, { useContext, useState } from "react";
import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { downloadFile, postUpload } from "../../utils/bundlr-utils";
import { useRouter } from "next/router";
import FileContext from "../../contexts/fileContext";
import Web3Context from "../../contexts/Web3Context";

interface ImportModalProps {
  modalOpen: boolean;
  handleModalClose: () => void;
}

const ImportModal = ({ modalOpen, handleModalClose }: ImportModalProps) => {
  const [btnTxt, setBtnTxt] = useState("IMPORT");
  const [refID, setRefID] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { setCurrFiles } = useContext(FileContext);
  const { walletAddr } = useContext(Web3Context);

  const onImport = async () => {
    setLoading(true);
    console.log("ref id: ", refID);
    const [name, id] = refID.split("/");

    downloadFile(id)
      .then((blob) => {
        const newBlob = new Blob([blob], { type: "application/pdf" });
        const newFile = new File([newBlob], name, { type: newBlob.type });

        setCurrFiles([{ fileName: name, file: newFile, id }]);
        postUpload(newFile, id, walletAddr);
        router.push("/document");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="md">
      <DialogTitle>Import File</DialogTitle>
      <DialogContent>
        <DialogContentText mt="1em">Use the file reference shared with you to access that document:</DialogContentText>
        <Typography mt="1em">Paste your file reference here:</Typography>
        <TextField
          sx={{ my: "1em" }}
          fullWidth
          label="File reference"
          variant="outlined"
          value={refID}
          onChange={(e) => setRefID(e.target.value)}
        />
        <LoadingButton onClick={onImport} loading={loading} disabled={loading} variant="contained">
          {btnTxt + " "}
        </LoadingButton>
      </DialogContent>
    </Dialog>
  );
};

export default ImportModal;
