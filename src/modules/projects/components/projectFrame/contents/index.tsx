import { Box } from "@mui/material";
import React from "react";
import Collaborators from "./collaborators";
import Repositories from "./repositories";
import Database from "./database";

interface ContentsProps {
  currentOption: number;
  setCurrentOption?: React.Dispatch<number>;
}

const Contents: React.FC<ContentsProps> = ({ currentOption }) => {
  const Content = () => {
    switch (currentOption) {
      case 0:
        return <Repositories />;

      case 2:
        return <Database />;

      case 3:
        return <Collaborators />;

      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        padding: { sm: 4, xs: 2 },
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Content />
    </Box>
  );
};

export default Contents;
