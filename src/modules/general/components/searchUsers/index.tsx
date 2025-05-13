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

/**
 * SearchUsers component – a searchable autocomplete input for selecting a user from a list.
 * 
 * This component integrates Material-UI's Autocomplete with a custom user list. It allows the user to 
 * search through available users and select one. The selected user is stored in the `selectUser` state,
 * and the `setSelectUser` function is used to update the selected user. The component supports a loading state
 * to display a loading indicator while users are being fetched.
 * 
 * @component
 * 
 * @param {UsuarioCampoBusqueda[]} users - The list of users to display in the autocomplete options.
 * @param {React.Dispatch<UsuarioCampoBusqueda | null>} setSelectUser - Function to update the selected user state.
 * @param {UsuarioCampoBusqueda | null} selectUser - The currently selected user.
 * @param {boolean} [loading=false] - Optional prop to indicate if the user data is loading.
 * 
 * @returns {JSX.Element} A searchable autocomplete input with user options and selection.
 * 
 * @example
 * ```tsx
 * <SearchUsers
 *   users={users}
 *   setSelectUser={setSelectUser}
 *   selectUser={selectUser}
 *   loading={isLoading}
 * />
 * ```
 */
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


type UserFrameProps = {
  user: UsuarioCampoBusqueda;
};

/**
 * UserFrame component – displays a user's avatar and full name in a horizontal layout.
 * 
 * This component is typically used to present user information in a compact UI element,
 * such as a list or search result. It shows the user's photo alongside their full name.
 * 
 * @component
 * 
 * @param {UsuarioCampoBusqueda} user - The user object containing `foto` and `nombreCompleto`.
 * 
 * @returns {JSX.Element} A horizontal layout with the user's avatar and name.
 * 
 * @example
 * ```tsx
 * <UserFrame user={usuario} />
 * ```
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
