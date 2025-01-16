import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { usersDummy } from "@core/test/data/users";
import CellUser from "../cellUsers";

export default function AutocompleteUsers() {


  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Autocomplete
        freeSolo
        options={usersDummy}
        renderOption={(props, option) => (
          <li {...props}>
            <CellUser usuario={option} type="autocomplete"/>
          </li>
        )}
        getOptionLabel={(option) => (typeof option === "string" ? option : option.nombres)}
        renderInput={(params) => <TextField {...params} />}
      />
    </Stack>
  );
}
