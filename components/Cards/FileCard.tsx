import { Box, Card, CardContent, Divider, Theme, Typography } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import React, { useContext, useState } from "react";
import { formatBytes } from "../../utils/utils";
import { downloadFile } from "../../utils/bundlr-utils";
import { useRouter } from "next/router";
import FileContext from "../../contexts/fileContext";

interface FileCardProps {
  name: string;
  size: string;
  created: string;
}

const FileCard = ({ name, size, created }: FileCardProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const { setFiles } = useContext(FileContext);

  const fetchFile = () => {
    downloadFile()
      .then((blob) => {
        const newBlob = new Blob([blob], { type: "application/pdf" });
        const newFile = new File([newBlob], name, { type: newBlob.type });

        setFiles([{ fileName: name, file: newFile }]);
        router.push("/document");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card
      variant="outlined"
      sx={{
        px: ".5em",
        background: "rgba(0, 0, 0, 0.45)",
        backdropFilter: "blur(20px)",
        borderColor: "info.main",
        borderRadius: "1em",
        width: "300px",
        "&:hover": {
          cursor: "pointer",
          boxShadow: (theme: Theme) => "0 0 1em " + theme.palette.info.main,
          background: "rgba(0, 0, 0, 0.65)",
        },
      }}
      onClick={() => fetchFile()}
    >
      <CardContent sx={{ ":last-child": { pb: "16px" } }}>
        <InsertDriveFileIcon sx={{ fontSize: "4em", mb: "20px", color: "lightgray" }} />
        <Typography variant="h5">{name}</Typography>
        <Divider sx={{ my: "1em" }} />
        <Box display="flex" justifyContent="space-between">
          <Typography fontSize=".9em">File Size</Typography>
          <Typography fontSize=".9em" color="text.secondary">
            {formatBytes(size)}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography fontSize=".9em">Date Created</Typography>
          <Typography fontSize=".9em" color="text.secondary">
            {new Date(+created * 1000).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </Typography>
        </Box>
        <Divider sx={{ my: "1em" }} />
        {errorMessage ? (
          <Typography mb="2em" color="orange">
            {errorMessage}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default FileCard;
