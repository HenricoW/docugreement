import { Button, Card, Typography } from "@mui/material";
import React from "react";
import { AppName } from "../../pages/_app";

const NoFilesCard = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        background: "rgba(0, 0, 0, 0.45)",
        backdropFilter: "blur(20px)",
        borderColor: "#999",
        p: "3em",
        m: "0 auto",
        width: "fit-content",
      }}
    >
      <Typography variant="h4" mb=".5em">
        No {AppName} files were found on your account
      </Typography>
      <Typography variant="h5" mb="1em">
        Upload your first file now
      </Typography>
      <Button variant="contained" size="large" onClick={() => {}}>
        Start
      </Button>
    </Card>
  );
};

export default NoFilesCard;
