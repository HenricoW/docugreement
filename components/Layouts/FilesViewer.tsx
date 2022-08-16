import { gql, useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import FileContext, { FileListData } from "../../contexts/fileContext";
import Web3Context from "../../contexts/Web3Context";
import { AppName } from "../../pages/_app";
import FileCard from "../Cards/FileCard";
import NoFilesCard from "../Cards/NoFilesCard";

const no_results = 6;

const FilesViewer = () => {
  const { walletAddr } = useContext(Web3Context);
  const { fileList, setFileList } = useContext(FileContext);

  const get_files = gql`
  {
    transactions(
      tags: [{ name: "App-Name", values: ["${AppName}"] }],
      owners: ["${walletAddr}"]
      first: ${no_results}
      ) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          owner {
            address
          }
          block {
            timestamp
          }
          data {
            size
            type
          }
          tags {
            name
            value
          }
          quantity {
            ar
          }
          bundledIn {
            id
          }
        }
      }
    }
  }
`;
  const { loading, error, data } = useQuery(get_files);

  useEffect(() => {
    const fileListSt = localStorage.getItem(`${AppName}_ufl-${walletAddr}`) || "[]";
    const filesJson: FileListData[] = JSON.parse(fileListSt);

    setFileList(filesJson);
    console.log("local file list: ", filesJson);
  }, []);

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>Error fetching data</h3>;

  const theFileList = data.transactions.edges.map((edge: any) => {
    const nametag = edge.node.tags.filter((tag: any) => tag.name === "dg_fname");
    const name = nametag.length > 0 ? nametag[0].value : "No file name";

    return {
      size: edge.node.data.size,
      creation_time: edge.node.block ? edge.node.block.timestamp : Date.now() / 1000,
      id: edge.node.id,
      tags: edge.node.tags.map((tag: any) => ({ name: tag.name, value: tag.value })),
      name,
    };
  });

  return (
    <Box my="2em" sx={{ display: "flex", gap: "1em", flexWrap: "wrap" }}>
      {fileList.length > 0 ? (
        fileList.map((file: any) => (
          <FileCard
            key={file.id}
            name={file.name.replaceAll("%20", " ")}
            created={file.creation_time}
            size={file.size}
            id={file.id}
          />
        ))
      ) : (
        <NoFilesCard />
      )}
    </Box>
  );
};

export default FilesViewer;
