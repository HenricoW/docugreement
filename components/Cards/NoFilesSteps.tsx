import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const stepTitles = ["Uploads", "How it works", "Preparations"];
const stepContent = [
  <>
    <Typography variant="h4" mb=".5em">
      Permanent Decentralized storage
    </Typography>
    <Typography variant="h6" mb="1em" color="text.secondary">
      Make your documents unstoppable! DocuGree uses Arweave&apos;s low rates to pay for storage.
    </Typography>
    <Typography variant="h6" mb="1em" color="text.secondary">
      DocuGree helps you manage these files, with a focus on PDF agreements signed with your Web3 wallet.
    </Typography>
  </>,
  <>
    <Typography variant="h4" mb=".5em">
      Uploads without paying gas
    </Typography>
    <Typography variant="h6" mb="1em" color="text.secondary">
      DocuGree on Bundlr allows for FAST uploads to Arweave, while avoiding the gas fees for each upload. This works by
      loading credit upfront in Boba Tokens.
    </Typography>
    <Typography variant="h6" mb="1em" color="text.secondary">
      Add or Remove tokens and Estimate how many tokens to preload in the &quot;My Account&quot; page
    </Typography>
  </>,
  <>
    <Typography variant="h4" mb=".5em">
      The Dashboard
    </Typography>
    <Typography variant="h6" mb="1em" color="text.secondary">
      You are currently on the dashboard page and you have no DocuGree files yet.
    </Typography>
    <Typography variant="h6" mb="1em" color="text.secondary">
      You can start by connecting your MetaMask, then connecting to Bundlr (needed for uploading documents). Then, check
      your credit balance and load tokens in the &quot;My Account&quot; section
    </Typography>
  </>,
  ,
];

export default function NoFilesSteps() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {stepTitles.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === stepTitles.length ? (
        <>
          <>
            <Typography variant="h5" mb=".5em" mt="2em">
              You are now ready to use the app.
            </Typography>
            <Typography variant="h6" mb="1em" color="text.secondary">
              After completing the steps you can upload a pdf by clicking &quot;Create Agreement&quot;.
            </Typography>
            <Typography variant="h3" my=".5em" color="green">
              Let&apos;s Go!
            </Typography>
          </>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={() => setActiveStep((currStep) => currStep - 1)}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={() => setActiveStep(0)}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Box p="4em 1.5em 1.5em">{stepContent[activeStep]}</Box>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={() => setActiveStep((currStep) => currStep - 1)}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={() => setActiveStep((currStep) => currStep + 1)}>
              {activeStep === stepTitles.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
