import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { UsuarioCampoBusqueda } from "../searchUsers/hook";

export const exampleUsuarioCampoBusqueda: UsuarioCampoBusqueda[] = [
  {
    foto: "https://randomuser.me/api/portraits/men/1.jpg",
    nombreCompleto: "Juan Pérez",
    id: 1
  },
  {
    foto: "https://randomuser.me/api/portraits/women/2.jpg",
    nombreCompleto: "María González",
    id: 2
  },
  {
    foto: "https://randomuser.me/api/portraits/men/3.jpg",
    nombreCompleto: "Carlos Rodríguez",
    id: 3
  },
  {
    foto: "https://randomuser.me/api/portraits/women/4.jpg",
    nombreCompleto: "Ana Martínez",
    id: 4
  },
  {
    foto: "https://randomuser.me/api/portraits/men/5.jpg",
    nombreCompleto: "Luis Fernández",
    id: 5
  }
];

interface Props {
  users: UsuarioCampoBusqueda[]; 
  setSelectUser: React.Dispatch<UsuarioCampoBusqueda | null>; 
  selectUser: UsuarioCampoBusqueda | null; 
}

/**
 * Componente de búsqueda con autocompletado para seleccionar usuarios.
 * 
 * @param {UsuarioCampoBusqueda[]} users - Lista de usuarios disponibles para la búsqueda.
 * @param {React.Dispatch<UsuarioCampoBusqueda | null>} setSelectUser - Función para actualizar el usuario seleccionado.
 * @param {UsuarioCampoBusqueda | null} selectUser - Usuario actualmente seleccionado.
 * @returns {JSX.Element} Elemento JSX del componente.
 */
const SearchUsers: FC<Props> = ({ users, setSelectUser, selectUser }) => {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Autocomplete
      size="small"
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
        renderInput={(params) => <TextField size="small" {...params} />}
        onChange={(_e, value) => {
          setSelectUser(value as UsuarioCampoBusqueda);
        }}
        value={selectUser}
      />
    </Stack>
  );
};

/**
 * Propiedades del componente `UserFrame`.
 * 
 * @property {UsuarioCampoBusqueda} user - Datos del usuario a mostrar.
 */
type UserFrameProps = {
  user: UsuarioCampoBusqueda;
};

/**
 * Componente que muestra el nombre y la imagen de un usuario en la lista de opciones.
 * 
 * @param {UsuarioCampoBusqueda} user - Datos del usuario a mostrar.
 * @returns {JSX.Element} Elemento JSX con la información del usuario.
 */
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
