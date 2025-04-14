import GeneralButton from "@modules/general/components/button";
import SearchUsers from "@modules/general/components/searchUsers";
import { useSearchUsers, UsuarioCampoBusqueda } from "@modules/general/hooks/useSearchUsers";
import { buttonTypes } from "@modules/general/types/buttons";
import { getUsuariosByTypeService } from "@modules/usuarios/services/get.usuarios.[tipo]";
import { UserTypeFullString } from "@modules/usuarios/utils/usuario.map";
import { Avatar, Box, Chip, Grid2, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import { useQuery } from "@tanstack/react-query";
import LoaderElement from "@modules/general/components/loaderElement";
import AlertDialogError from "@modules/general/components/alertDialogError";
import { adaptUserServiceToCB } from "@modules/usuarios/utils/adapt.usuario";

type Props = {
  /**
   * Type of users to fetch (e.g., "student", "teacher").
   */
  typeUsers: UserTypeFullString;

  /**
   * List of users currently selected.
   */
  selectUsers: UsuarioCampoBusqueda[];

  /**
   * Function to update the selected users list.
   */
  setSelectUsers: React.Dispatch<UsuarioCampoBusqueda[]>;

  /**
   * Function to handle the "Accept" action.
   */
  handleAccept: () => void;

  /**
   * Function to handle the "Cancel" action.
   */
  handleCancel: () => void;
};

/**
 * AddUsers component allows the selection of multiple users from a predefined list
 * based on user type. Users can be searched, selected, visualized in a chip list,
 * and either confirmed or canceled.
 *
 * Features:
 * - Fetches users by type from backend
 * - Integrates live search and filtering
 * - Displays selected users as deletable chips
 * - Handles loading and error states gracefully
 *
 * @component
 * @param {Props} props - Props containing user type and selection handlers
 * @returns {JSX.Element} A user selection UI with confirmation actions
 */
const AddUsers: React.FC<Props> = ({
  typeUsers,
  selectUsers,
  setSelectUsers,
  handleAccept,
  handleCancel,
}) => {
  const theme = useTheme();
  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryFn: () => getUsuariosByTypeService(typeUsers, token),
    queryKey: [],
  });

  const {
    handleClose: handleCloseFailFetch,
    open: openFailFetch,
    handleOpen: handleOpenFailFetch,
  } = useAlertDialog();

  const [users, setUsers] = useState<UsuarioCampoBusqueda[]>([]);
  const { selectUser, setSelectUser } = useSearchUsers();

  useEffect(() => {
    if (isSuccess && data) {
      setUsers(data.map((user) => adaptUserServiceToCB(user)));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) handleOpenFailFetch();
  }, [isError]);

  useEffect(() => {
    if (selectUser) {
      setSelectUsers([
        ...selectUsers.filter((u) => u.id !== selectUser.id),
        selectUser,
      ]);
    }
  }, [selectUser]);

  /**
   * Removes a user from the selected list.
   * 
   * @param {number} id - ID of the user to remove
   */
  function handleDelete(id: number) {
    setSelectUsers(selectUsers.filter((u) => u.id !== id));
  }

  return (
    <>
      {error && (
        <AlertDialogError
          error={error}
          handleClose={handleCloseFailFetch}
          open={openFailFetch}
          title="Fetch Users"
        />
      )}
      {isLoading ? (
        <LoaderElement />
      ) : (
        <>
          <Stack spacing={3} sx={{width: '100%'}}>
            <Typography variant="h4" sx={{ fontWeight: 500 }} textAlign="center">
              Añadir Estudiantes
            </Typography>
            <SearchUsers selectUser={selectUser} setSelectUser={setSelectUser} users={users} />
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <Grid2
              spacing={2}
                container
                sx={{
                  backgroundColor: theme.palette.action.hover,
                  minHeight: 150,
                  padding: 2,
                  flexGrow: 1,
                }}
              >
                {selectUsers.map((user) => (
                  <Grid2 key={user.id}>
                    <Chip
                      onDelete={() => handleDelete(user.id)}
                      avatar={<Avatar src={user.foto} />}
                      label={user.nombreCompleto}
                      color="info"
                    />
                  </Grid2>
                ))}
              </Grid2>
            </Box>
            <Stack direction="row" spacing={2} justifyContent="center">
              <GeneralButton mode={buttonTypes.save} onClick={handleAccept} />
              <GeneralButton color="inherit" mode={buttonTypes.cancel} onClick={handleCancel} />
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
};

export default AddUsers;
