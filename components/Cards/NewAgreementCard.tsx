import { Box, Button, CardContent, Theme } from "@mui/material";
import { Card, Typography, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import React, { FormEvent, useContext, useRef, useState } from "react";
import BundlrContext from "../../contexts/BundlrContext";
import Web3Context from "../../contexts/Web3Context";
import { AppName } from "../../pages/_app";
import { allowedFileType, createPdfMetadata } from "../../utils/utils";
import AgreementStepsForm from "../Forms/AgreementStepsForm";

const uploadResponse = ""; // ==========================> TODO: Upload message logic
// const busyMssg = "Please wait";

const NewAgreementCard = () => {
  const [role, setRole] = useState("Contractor");
  const [fileName, setFileName] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  const { bundlr, uploadBuffer } = useContext(BundlrContext);
  const { walletAddr } = useContext(Web3Context);

  const uploadRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const files = uploadRef.current?.files;
    let reader = new FileReader();

    if (files && files.length > 0) {
      const tags = [
        { name: "Content-Type", value: allowedFileType },
        { name: "App-Name", value: AppName },
        { name: "dg_fname", value: files[0].name },
        { name: "dg_fsize", value: files[0].size.toString() },
        { name: "dg_date", value: (Date.now() / 1000).toString() },
      ];

      reader.onload = async function () {
        if (reader.result) {
          const fileBuffer = Buffer.from(reader.result as ArrayBuffer);

          await uploadBuffer(fileBuffer, files[0].name, walletAddr, tags);
        }
      };

      createPdfMetadata(files[0], { ethAddr: walletAddr, role })
        .then((file) => {
          reader.readAsArrayBuffer(file);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const stepsContent = AgreementStepsForm({
    walletAddr,
    role,
    setRole,
    uploadResponse,
    fileName,
    setFileName,
    handleUpload,
    allowedFileType,
    uploadRef,
  });

  return (
    <Card
      variant="outlined"
      sx={{
        p: ".5em",
        borderColor: "info.main",
        borderRadius: "1em",
        minWidth: "280px",
        "&:hover": {
          boxShadow: (theme: Theme) => "0 0 1em " + theme.palette.info.main,
        },
      }}
    >
      <CardContent sx={{ ":last-child": { pb: "16px" } }}>
        <Box sx={{ maxWidth: 400 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {stepsContent.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === stepsContent.length - 1 ? <Typography variant="caption">Last step</Typography> : null
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  {step.body}
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={() => setActiveStep((step) => step + 1)}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={(walletAddr ? false : index === 2) || (bundlr ? false : index === 1)}
                      >
                        {index === stepsContent.length - 1 ? "Finish" : "Continue"}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={() => setActiveStep((step) => step - 1)}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>

          {activeStep === stepsContent.length && (
            <Box textAlign="center" p={3}>
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={() => setActiveStep(0)} sx={{ mt: 1, mr: 1 }}>
                Start Again
              </Button>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewAgreementCard;
