import { Box } from "@mui/material";
import React from "react";
import Collaborators from "./collaborators";
import Repositories from "./repositories";

interface ContentsProps {
  currentOption: number;
  setCurrentOption: React.Dispatch<number>;
}

const Contents: React.FC<ContentsProps> = ({currentOption}) => {

  const Content = () => {
    switch (currentOption) {
      case 0:
        
        return <Repositories/>

      case 3: 
        return <Collaborators/>
    
      default:
        break;
    }
  }


  return (
    <Box
      sx={{
        margin: { sm: 4, xs: 2 },
        display: "flex",
        
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: { md: "70%" },
        }}
      >
        <Content/>
      </Box>
    </Box>
  );
};

export default Contents;
