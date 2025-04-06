import AlertDialog from "@modules/general/components/alertDialog";
import GeneralButton from "@modules/general/components/button";
import SearchUsers from "@modules/general/components/searchUsers";
import {
  useSearchUsers,
  UsuarioCampoBusqueda,
} from "@modules/general/hooks/useSearchUsers";
import useQuery from "@modules/general/hooks/useQuery";
import { buttonTypes } from "@modules/general/types/buttons";
import { getUsuariosPorTipo } from "@modules/usuarios/services/get.usuarios.[tipo]";
import { UsuarioService } from "@modules/usuarios/types/services.usuario";
import { adaptarUsuarioServiceAUsuarioCampoDeBusqueda } from "@modules/usuarios/utils/adaptar.usuario";
import { UserTypeFullString } from "@modules/usuarios/utils/usuario.map";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Grid2,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "@modules/general/context/accountContext";

type Props = {
  typeUsers: UserTypeFullString;
  selectUsers: UsuarioCampoBusqueda[];
  setSelectUsers: React.Dispatch<UsuarioCampoBusqueda[]>;
  handleAccept: () => void,
  handleCancel: () => void
};

const AddUsers: React.FC<Props> = ({
  typeUsers,
  selectUsers,
  setSelectUsers,
  handleAccept,
  handleCancel
}) => {
  const { accountInformation } = useAuth();
  const { token } = accountInformation;
  const { selectUser, setSelectUser } = useSearchUsers();

  const {
    error,
    handleAlertClose,
    initQuery,
    message,
    open: openAlertDialog,
    responseData,
  } = useQuery<UsuarioService[]>(
    () => getUsuariosPorTipo(typeUsers, token!!),
    false
  );

  const [users, setUsers] = useState<UsuarioCampoBusqueda[]>([]);

  useEffect(() => {
    if (selectUser) {
      setSelectUsers([
        ...selectUsers.filter((u) => u.id != selectUser.id),
        selectUser,
      ]);
    }
  }, [selectUser]);

  useEffect(() => {
    if (token) {
      initQuery();
    }
  }, [token]);

  useEffect(() => {
    if (responseData) {
      setUsers(
        responseData.map((user) =>
          adaptarUsuarioServiceAUsuarioCampoDeBusqueda(user)
        )
      );
    }
  }, [responseData]);

  function handleDelete(id: number) {
    setSelectUsers([...selectUsers.filter((u) => u.id != id)]);
  }

  const theme = useTheme();

  return (
    <>
      {error && (
        <AlertDialog
          handleAccept={handleAlertClose}
          open={openAlertDialog}
          title="Consultar Usuarios"
          textBody={message}
        />
      )}
      <Card sx={{ padding: 2 }}>
        <Stack spacing={3}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 500 }}
            textAlign={"center"}
          >
            Agregar Usuarios
          </Typography>
          <SearchUsers
            selectUser={selectUser}
            setSelectUser={setSelectUser}
            users={users}
          />
          <Box sx={{ display: "flex", justifyContent: "center" , width: '100%'}}>
            <Grid2
              container
              sx={{
                backgroundColor: theme.palette.action.hover,
                maxWidth: 600,
                minHeight: 150,
                padding: 2,
                flexGrow: 1
              }}
            >
              {selectUsers.map((user) => (
                <Grid2 size={{ xs: 6, md: 4 }}>
                  <Chip
                    onDelete={() => handleDelete(user.id)}
                    avatar={<Avatar src={user.foto}></Avatar>}
                    label={user.nombreCompleto}
                    color="info"
                  />
                </Grid2>
              ))}
            </Grid2>
          </Box>
          <Stack direction={"row"} spacing={2} justifyContent={"center"}>
            <GeneralButton mode={buttonTypes.save} onClick={handleAccept}/>
            <GeneralButton color="inherit" mode={buttonTypes.cancel} onClick={handleCancel}/>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

export default AddUsers;
