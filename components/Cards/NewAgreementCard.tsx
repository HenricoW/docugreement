import { Box, Button, CardContent, Theme } from "@mui/material";
import { Card, Typography, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import React, { FormEvent, useRef, useState } from "react";
import AgreementStepsForm from "../Forms/AgreementStepsForm";

// temp
const uploadResponse = "";
const walletAddr = "0x81745b7339D5067E82B93ca6BBAd125F214525d3";
const busyMssg = "Please wait";
// end temp

const NewAgreementCard = () => {
  const [role, setRole] = useState("Contractor");
  const [fileName, setFileName] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  const uploadRef = useRef<HTMLInputElement>(null);
  const handleUpload = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const stepsContent = AgreementStepsForm({
    walletAddr,
    role,
    setRole,
    uploadResponse,
    fileName,
    setFileName,
    handleUpload,
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
                        disabled={walletAddr ? false : index === 2}
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
