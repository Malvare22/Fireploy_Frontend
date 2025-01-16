import { usersDummy } from "@core/test/data/users";
import AutocompleteUsers from "@modules/general/components/autocompleteUsers";
import CellUser from "@modules/general/components/cellUsers";
import CustomSelect from "@modules/general/components/customSelect";
import { technologiesDummy, TypeTechnology } from "@modules/projects/utils/dataDummy/projects";
import { Box, Divider, Input, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

interface ContentsProps {
  currentOption: number;
  setCurrentOption: React.Dispatch<number>;
}

// const Repositories = () => {
//   return <RepositoryForm />;
// };

interface RepositoryFormProps {
  type: TypeTechnology['type'];
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
    <>
      <Box>
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
          {technologies?.map((technology, index) => (
            technology.type == type && <MenuItem key={index} value={technology.id}>
              {technology.text}
            </MenuItem>
          ))}
        </CustomSelect>
      </Box>
    </>
  );
};

const Contents: React.FC<ContentsProps> = () => {

  // const [currentUrlBackend, setCurrentUrlBackend] = useState('');
  // const [currentUrlFrontend, setCurrentUrlFrontend] = useState('');
  // const [currentBackend, setCurrentBackend] = useState(technologiesDummy[0].text);
  // const [currentFrontend, setCurrentFrontend] = useState(technologiesDummy[0].text);


  return (
    <Box
      sx={{
        margin: { sm: 4, xs: 2 },
        display: "flex",
        flexDirection: "column",
        gap: 4,
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

      <Collaborators/>
      </Box>
      {/* <RepositoryForm type="backend" technologies={technologiesDummy} currentUrl={currentUrlBackend} setCurrentUrl={setCurrentUrlBackend} currentTechnology={currentBackend} setCurrentTechnology={setCurrentBackend}/>
      <RepositoryForm type="frontend" technologies={technologiesDummy} currentUrl={currentUrlFrontend} setCurrentUrl={setCurrentUrlFrontend} currentTechnology={currentFrontend} setCurrentTechnology={setCurrentFrontend}/> */}
    </Box>
  );
};

const Collaborators = () => {
  return <>
    <Box>
        <Typography variant="h3Bold">
          Colaboradores
        </Typography>

        <Divider sx={{marginBottom: 3}}/>
        <Box sx={{display: 'flex', alignItems: 'center', marginBottom:3}}><SearchIcon sx={{marginRight: 2}}/><AutocompleteUsers/></Box>

        <Box sx={{backgroundColor: 'backgroundX.panel',}}>{usersDummy.map((user)=> <Box sx={{padding: 2,  border: '1px solid rgba(0, 0, 0, .1)'}}><CellUser usuario={user} type="list"/></Box>)}</Box>
      </Box>
  </>;
};

export default Contents;
