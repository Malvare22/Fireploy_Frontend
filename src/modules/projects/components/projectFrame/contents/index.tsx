import {
  Box,
  Divider,
  Input,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";

interface ContentsProps {
  currentOption: number;
  setCurrentOption: React.Dispatch<number>;
}

const Repositories = () => {
  return <RepositoryForm />;
};

interface RepositoryFormProps {
  type: "frontend" | "backend";
  currentUrl: string;
  setCurrentUrl: React.Dispatch<string>;
  currentTechnology: string;
  technologies: { id: string; text: string }[];
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: { md: "70%" },
      }}
    >
      <Box>
        <Typography variant="h3Bold">
          {type == "frontend" ? "Frontend" : "Backend"}
        </Typography>

        <Divider />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6" marginRight={marginRight}>
          Repositorio
        </Typography>
        <Input
          value={currentUrl}
          onChange={(e) => setCurrentUrl(e.target.value)}
          variant="secondary"
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6" marginRight={marginRight}>
          Tecnología
        </Typography>
        <Select
          value={currentTechnology}
          onChange={(e) => setCurrentTechnology(e.target.value)}
          variant=""
        >
          {technologies?.map((technology, index) => (
            <MenuItem key={index} value={technology.id}>
              {technology.text}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

const Contents: React.FC<ContentsProps> = ({
  currentOption,
  setCurrentOption,
}: ContentsProps) => {
  return (
    <Box
      sx={{
        padding: {sm: 4, xs: 2},
        display: "flex",
        flexDirection: "column",
        gap: 4,
        width: "100%",
      }}
    >
      <Repositories />
      <Repositories />
    </Box>
  );
};

export default Contents;
