import { Box } from "@mui/material";
import CustomInput from "../customInput";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

interface Props {
  search: string,
  setSearch: React.Dispatch<string>;
}
const InputDeBusqueda: React.FC<Props> = ({ search, setSearch }) => {

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CustomInput value={search} onChange={(e) => setSearch(e.currentTarget.value)} variant="secondary"/>
      <SearchIcon />
    </Box>
  );
};

export default InputDeBusqueda;
