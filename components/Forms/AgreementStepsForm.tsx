import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { FormEvent } from "react";
import { capatalize, shortAddress } from "../../utils/utils";

interface AgreementStepsFormProps {
  walletAddr: string;
  role: string;
  setRole: (val: string) => void;
  uploadResponse: string;
  fileName: string;
  setFileName: (val: string) => void;
  handleUpload: (e: FormEvent<HTMLFormElement>) => void;
  uploadRef: React.RefObject<HTMLInputElement>;
}

const AgreementStepsForm = (props: AgreementStepsFormProps) => {
  const { walletAddr, role, setRole, uploadResponse } = props;
  const { fileName, setFileName, handleUpload, uploadRef } = props;

  const stepContent = [
    {
      label: "Select your account",
      body: (
        <Typography>
          In Metamask (your browser wallet), select the account you would like to associate with this agreement.
        </Typography>
      ),
    },
    {
      label: "Connect your wallet",
      body: <Typography>Click on &quot;Connect&quot; in the top-right of this page to connect your wallet.</Typography>,
    },
    {
      label: "Your role",
      body: (
        <>
          <Typography mt="1em">Your wallet address:</Typography>
          <TextField
            sx={{ mt: "1em" }}
            fullWidth
            disabled
            label="Your wallet address"
            variant="outlined"
            value={walletAddr ? shortAddress(walletAddr, 8) : "Please connect"}
          />
          <Typography mt="2em">Select your role for this agreement:</Typography>
          <FormControl sx={{ my: "1em" }} fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select value={role} label="Age" labelId="role-label" onChange={(e) => setRole(e.target.value)}>
              <MenuItem value={"Contractor"}>Contractor</MenuItem>
              <MenuItem value={"Client"}>Client</MenuItem>
            </Select>
          </FormControl>
        </>
      ),
    },
    {
      label: "Upload the agreement",
      body: (
        <>
          <Typography mt="1em">Select a pdf file to use as the agreement.</Typography>
          {uploadResponse ? (
            <Box height="6em" display="flex" alignItems="center">
              <Typography m="0 auto" color="success.main" variant="h5">
                {capatalize(uploadResponse)}
              </Typography>
            </Box>
          ) : (
            <form onSubmit={(e) => handleUpload(e)}>
              <label htmlFor="upload-btn" style={{ textAlign: "center" }}>
                <input
                  type="file"
                  accept="application/pdf"
                  id="upload-btn"
                  name="upload"
                  ref={uploadRef}
                  onChange={(e) => setFileName(e.target.files?.[0].name ?? "")}
                  style={{ display: "none" }}
                />
                <Button
                  variant="outlined"
                  component="span"
                  sx={{ display: "block", width: "fit-content", margin: "1em auto 2em" }}
                >
                  Choose File
                </Button>
              </label>
              {fileName ? (
                <Typography align="center" m="1em 0 .5em">
                  {fileName}
                </Typography>
              ) : null}
              <Button type="submit" variant="outlined" color="success" sx={{ display: "block", m: "0 auto 2em" }}>
                Upload
              </Button>
            </form>
          )}
        </>
      ),
    },
  ];

  return stepContent;
};

export default AgreementStepsForm;
