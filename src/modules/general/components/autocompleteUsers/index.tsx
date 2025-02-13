import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import CellUser from "../../../usuarios/components/VistaPreviaUsuario";
import { FC } from "react";
import { usuariosPrueba } from "@modules/usuarios/test/data/usuarios.prueba";
import { UsuarioPlano } from "@modules/usuarios/types/usuario.plano";
import { Box } from "@mui/material";

interface Props {
  onChange?: (value: UsuarioPlano) => void;
}

const AutocompleteUsers: FC<Props> = ({onChange}) => {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Autocomplete
        freeSolo
        options={usuariosPrueba}
        renderOption={(props, option) => (
          <li {...props}>
            <Box sx={{flex: 1}}><CellUser usuario={option} type="autocomplete" /></Box>
          </li>
        )}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.nombres
        }
        renderInput={(params) => <TextField {...params} />}
        onChange={(_e, value) => {
          if(onChange) onChange(value as UsuarioPlano);
        }}
      />
    </Stack>
  );
};

export default AutocompleteUsers;
