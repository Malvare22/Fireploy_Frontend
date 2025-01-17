import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { usersDummy, Usuario } from "@core/test/data/users";
import CellUser from "../cellUsers";
import { FC } from "react";

interface Props {
  onChange?: (value: Usuario) => void;
}

const AutocompleteUsers: FC<Props> = ({onChange}) => {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Autocomplete
        freeSolo
        options={usersDummy}
        renderOption={(props, option) => (
          <li {...props}>
            <CellUser usuario={option} type="autocomplete" />
          </li>
        )}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.nombres
        }
        renderInput={(params) => <TextField {...params} />}
        onChange={(_e, value) => {
          if(onChange) onChange(value as Usuario);
        }}
      />
    </Stack>
  );
};

export default AutocompleteUsers;
