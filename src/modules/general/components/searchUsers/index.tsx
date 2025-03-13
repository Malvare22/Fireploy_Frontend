import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { UsuarioCampoBusqueda } from "../searchUsers/hook";

interface Props {
  users: UsuarioCampoBusqueda[];
  setSelectUser: React.Dispatch<UsuarioCampoBusqueda | null>;
  selectUser: UsuarioCampoBusqueda | null
}

const SearchUsers: FC<Props> = ({ users, setSelectUser, selectUser }) => {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Autocomplete
        freeSolo
        options={users}
        renderOption={(props, option) => (
          <li {...props}>
            <UserFrame user={option} />
          </li>
        )}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.nombreCompleto
        }
        renderInput={(params) => <TextField {...params} />}
        onChange={(_e, value) => {
          setSelectUser(value as UsuarioCampoBusqueda);
        }}
        value={selectUser}
      />
    </Stack>
  );
};

type UserFrameProps = {
  user: UsuarioCampoBusqueda;
};
const UserFrame: React.FC<UserFrameProps> = ({ user }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box component={"img"} sx={{ width: 48, height: 48 }} />
      <Box>
        <Typography>{user.nombreCompleto}</Typography>
      </Box>
    </Box>
  );
};

export default SearchUsers;
