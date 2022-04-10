import { gql, useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import React from "react";
import FileCard from "../Cards/FileCard";
import NoFilesCard from "../Cards/NoFilesCard";

const no_results = 6;

const get_sribe = gql`
  {
    transactions(tags: [{ name: "App-Name", values: ["scribe-alpha-00"] }], first: ${no_results}) {
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

const FilesViewer = () => {
  const { loading, error, data } = useQuery(get_sribe);

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>Error fetching data</h3>;

  const name = "It's%20been%20a%20while".replaceAll("%20", " ");

  const fileList = data.transactions.edges.map((edge: any) => ({
    size: edge.node.data.size,
    creation_time: edge.node.block.timestamp,
    id: edge.node.id,
    tags: edge.node.tags.map((tag: any) => ({ name: tag.name, value: tag.value })),
    name: edge.node.tags.filter((tag: any) => tag.name === "scribe-alpha-00-title")[0].value as string,
  }));

  return (
    <Box my="2em" sx={{ display: "flex", gap: "1em", flexWrap: "wrap" }}>
      {fileList.length > 0 ? (
        fileList.map((file: any) => (
          <FileCard
            key={file.name}
            name={file.name.replaceAll("%20", " ")}
            created={file.creation_time}
            size={file.size}
          />
        ))
      ) : (
        <NoFilesCard />
      )}
    </Box>
  );
};

export default FilesViewer;
