import CustomSelect from "@modules/general/components/customSelect";
import {
  technologiesDummy,
  TypeTechnology,
} from "@modules/projects/utils/dataDummy/projects";
import { Box, Divider, Input, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";

function Repositories() {
  const [currentUrlBackend, setCurrentUrlBackend] = useState("");
  const [currentUrlFrontend, setCurrentUrlFrontend] = useState("");
  const [currentBackend, setCurrentBackend] = useState(
    technologiesDummy[0].text
  );
  const [currentFrontend, setCurrentFrontend] = useState(
    technologiesDummy[0].text
  );

  return (
    <Box>
      <RepositoryForm
        type="backend"
        technologies={technologiesDummy}
        currentUrl={currentUrlBackend}
        setCurrentUrl={setCurrentUrlBackend}
        currentTechnology={currentBackend}
        setCurrentTechnology={setCurrentBackend}
      />
      <RepositoryForm
        type="frontend"
        technologies={technologiesDummy}
        currentUrl={currentUrlFrontend}
        setCurrentUrl={setCurrentUrlFrontend}
        currentTechnology={currentFrontend}
        setCurrentTechnology={setCurrentFrontend}
      />
    </Box>
  );
}

interface RepositoryFormProps {
  type: TypeTechnology["type"];
  currentUrl: string;
  setCurrentUrl: React.Dispatch<string>;
  currentTechnology: string;
  technologies: TypeTechnology[];
  setCurrentTechnology: React.Dispatch<string>;
}

const RepositoryForm: React.FC<RepositoryFormProps> = ({
  type,
  currentUrl,
  setCurrentUrl,
  currentTechnology,
  setCurrentTechnology,
  technologies,
}: RepositoryFormProps) => {
  const marginRight = 2;

  return (
    <Box sx={{ display: 'flex' ,flexDirection: "column", gap: 4, marginBottom: 4 }}>
      <Box >
        <Typography variant="h3Bold">
          {type == "frontend" ? "Frontend" : "Backend"}
        </Typography>

        <Divider />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="titleBold" marginRight={marginRight}>
          Repositorio
        </Typography>
        <Input
          value={currentUrl}
          onChange={(e) => setCurrentUrl(e.target.value)}
          variant="secondary"
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="titleBold" marginRight={marginRight}>
          Tecnología
        </Typography>
        <CustomSelect
          variantDelta="secondary"
          value={currentTechnology}
          onChange={(e) => setCurrentTechnology(e.target.value as string)}
        >
          {technologies?.map(
            (technology, index) =>
              technology.type == type && (
                <MenuItem key={index} value={technology.id}>
                  {technology.text}
                </MenuItem>
              )
          )}
        </CustomSelect>
      </Box>
    </Box>
  );
};

export default Repositories;
