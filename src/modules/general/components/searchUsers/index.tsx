import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { FC } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { UsuarioCampoBusqueda } from "../../hooks/useSearchUsers";

/**
 * Example list of users for testing purposes.
 */
export const exampleUsuarioCampoBusqueda: UsuarioCampoBusqueda[] = [
  {
    foto: "https://randomuser.me/api/portraits/men/1.jpg",
    nombreCompleto: "Juan Pérez",
    id: 1,
  },
  {
    foto: "https://randomuser.me/api/portraits/women/2.jpg",
    nombreCompleto: "María González",
    id: 2,
  },
  {
    foto: "https://randomuser.me/api/portraits/men/3.jpg",
    nombreCompleto: "Carlos Rodríguez",
    id: 3,
  },
  {
    foto: "https://randomuser.me/api/portraits/women/4.jpg",
    nombreCompleto: "Ana Martínez",
    id: 4,
  },
  {
    foto: "https://randomuser.me/api/portraits/men/5.jpg",
    nombreCompleto: "Luis Fernández",
    id: 5,
  },
];

interface Props {
  users: UsuarioCampoBusqueda[];
  setSelectUser: React.Dispatch<UsuarioCampoBusqueda | null>;
  selectUser: UsuarioCampoBusqueda | null;
  loading?: boolean;
}

const SearchUsers: FC<Props> = ({ users, setSelectUser, selectUser, loading }) => {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Autocomplete
        size="small"
        freeSolo
        options={users}
        loading={loading}
        renderOption={(props, option) => (
          <li {...props}>
            <UserFrame user={option} />
          </li>
        )}
        getOptionLabel={(option) => (typeof option === "string" ? option : option.nombreCompleto)}
        renderInput={(params) => (
          <TextField
            {...params}
          />
        )}
        onChange={(_e, value) => {
          setSelectUser(value as UsuarioCampoBusqueda);
        }}
        value={selectUser}
      />
    </Stack>
  );
};

/**
 * Properties for the `UserFrame` component.
 *
 * @typedef {Object} UserFrameProps
 * @property {UsuarioCampoBusqueda} user - The user data to display.
 */
type UserFrameProps = {
  user: UsuarioCampoBusqueda;
};

/**
 * `UserFrame` component: Displays a user's avatar and name in the search results.
 *
 * @component
 * @param {UserFrameProps} props - Component properties.
 * @param {UsuarioCampoBusqueda} props.user - User data to display.
 * @returns {JSX.Element} A box displaying the user's avatar and name.
 */
const UserFrame: FC<UserFrameProps> = ({ user }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Avatar src={user.foto} />
      <Box>
        <Typography>{user.nombreCompleto}</Typography>
      </Box>
    </Box>
  );
};

export default SearchUsers;
