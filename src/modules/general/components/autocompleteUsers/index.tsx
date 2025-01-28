import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import CellUser from "../cellUsers";
import { FC } from "react";
import { TypeUsuario, usersDummy } from "@modules/usuarios/test/data/usuarios.prueba";

interface Props {
  onChange?: (value: TypeUsuario) => void;
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
          if(onChange) onChange(value as TypeUsuario);
        }}
      />
    </Stack>
  );
};

export default AutocompleteUsers;
