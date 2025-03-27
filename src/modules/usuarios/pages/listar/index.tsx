import { useState, useEffect, useContext, useMemo } from "react";
import {
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AlertDialog from "@modules/general/components/alertDialog";
import { AccountContext } from "@modules/general/context/accountContext";
import useQuery from "@modules/general/hooks/useQuery";
import useSearch from "@modules/general/hooks/useSearch";
import TablaUsuarios from "@modules/usuarios/components/tablaUsuarios";
import { labelListarUsuarios } from "@modules/usuarios/enum/labelListarUsuarios";
import { getUsuariosPorTipo } from "@modules/usuarios/services/get.usuarios.[tipo]";
import { UsuarioService } from "@modules/usuarios/types/services.usuario";
import { Usuario } from "@modules/usuarios/types/usuario";
import { adapterUsuario } from "@modules/usuarios/utils/adaptar.usuario";
import SearchIcon from "@mui/icons-material/Search";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { useNavigate } from "react-router";
import { rutasUsuarios } from "@modules/usuarios/router/router";

function ListarUsuarios() {
  const token = useContext(AccountContext).localUser?.token;
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // 🔹 Estado temporal para capturar la entrada del usuario
  const [inputValue, setInputValue] = useState("");
  const { searchValue, setSearchValue } = useSearch();

  const navigate = useNavigate();

  const { error, handleAlertClose, initQuery, message, open, responseData } =
    useQuery<UsuarioService[]>(
      () => getUsuariosPorTipo("todos", token!!),
      false
    );

  useEffect(() => {
    if (token) {
      initQuery();
    }
  }, [token]);

  useEffect(() => {
    if (responseData) {
      setUsuarios(responseData.map((usuario) => adapterUsuario(usuario)));
    }
  }, [responseData]);

  const filteredData = useMemo(() => {
    if (!usuarios || searchValue.trim() === "") return usuarios;

    return usuarios.filter((usuario) =>
      `${usuario.apellidos} ${usuario.nombres}`
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
  }, [searchValue, usuarios]);

  // 🔹 Manejar el evento de presionar Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchValue(inputValue); // 🔹 Actualiza el estado de búsqueda solo al presionar Enter
    }
  };

  return (
    <>
      {error && (
        <AlertDialog
          handleAccept={handleAlertClose}
          open={open}
          title="Gestionar Usuarios"
          textBody={message}
        />
      )}
      <Stack spacing={3}>
        <Stack>
          <Typography variant="h4">{labelListarUsuarios.titulo}</Typography>
          <Divider />
        </Stack>
        <Stack direction={'row'} justifyContent={"space-between"}>
          <TextField
            size="small"
            value={inputValue} // 🔹 Vincula el input con `inputValue`
            onChange={(e) => setInputValue(e.target.value)} // 🔹 Guarda la entrada del usuario
            onKeyDown={handleKeyDown} // 🔹 Detecta la tecla Enter
            label="Buscar Usuario"
            sx={{
              maxWidth: 400,
            }}
            slotProps={{
              input: {
                endAdornment: <SearchIcon />,
              },
            }}
          />
          <GeneralButton mode={buttonTypes.add} onClick={() => navigate(rutasUsuarios.agregarUsuario)}/>
        </Stack>
        {filteredData && <TablaUsuarios usuarios={filteredData} />}
      </Stack>
    </>
  );
}

export default ListarUsuarios;
