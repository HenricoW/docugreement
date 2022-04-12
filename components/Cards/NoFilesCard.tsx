import { Button, Card, Typography } from "@mui/material";
import React from "react";
import { AppName } from "../../pages/_app";
import NoFilesSteps from "./NoFilesSteps";

const NoFilesCard = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(20px)",
        borderColor: "#999",
        p: "3em",
        m: "0 auto",
        width: "700px",
      }}
    >
      <NoFilesSteps />
    </Card>
  );
};

export default NoFilesCard;
