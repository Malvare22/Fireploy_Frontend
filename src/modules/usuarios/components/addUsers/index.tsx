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
import { adaptUserServiceToCB } from "@modules/usuarios/utils/adapt.usuario";
import AlertDialog from "@modules/general/components/alertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";

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
 * `AddUsers` component allows users to be searched, selected, and added to a group or course.
 *
 * - Users can be searched and filtered using a search bar.
 * - Selected users are displayed as chips with avatars, and they can be removed from selection.
 * - Handles loading state, API errors, and confirmation actions through alert dialogs.
 * - Includes action buttons for saving the selection or cancelling the operation.
 *
 * @component
 * @param {Props} props - Component props
 * @param {UserTypeFullString} props.typeUsers - The type of users to fetch (e.g., "student", "teacher").
 * @param {UsuarioCampoBusqueda[]} props.selectUsers - A list of users currently selected.
 * @param {React.Dispatch<UsuarioCampoBusqueda[]>} props.setSelectUsers - Function to update the selected users list.
 * @param {() => void} props.handleAccept - Function to handle the "Accept" action.
 * @param {() => void} props.handleCancel - Function to handle the "Cancel" action.
 * @returns {JSX.Element} The rendered component
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

  // Fetch users of given type from backend
  const { data, isLoading, error, isSuccess } = useQuery({
    queryFn: () => getUsuariosByTypeService(typeUsers, token),
    queryKey: ["Load Users", typeUsers],
  });

  // Handles alert dialog logic
  const {
    showDialog,
    open,
    title,
    message,
    type,
    handleAccept: handleAcceptAlert,
  } = useAlertDialog();

  // Hook for handling API errors
  const { setError } = useErrorReader(showDialog);

  // Local list of all fetched users
  const [users, setUsers] = useState<UsuarioCampoBusqueda[]>([]);

  // Selected user from search input
  const { selectUser, setSelectUser } = useSearchUsers();

  /**
   * On successful fetch, adapt user data to search format.
   */
  useEffect(() => {
    if (isSuccess && data) {
      setUsers(data.map((user) => adaptUserServiceToCB(user)));
    }
  }, [isSuccess, data]);

  /**
   * If an error occurs during data fetching, show alert.
   */
  useEffect(() => {
    if (error) setError(error);
  }, [error]);

  /**
   * Adds a user to the selection if not already added.
   */
  useEffect(() => {
    if (selectUser) {
      setSelectUsers([...selectUsers.filter((u) => u.id !== selectUser.id), selectUser]);
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
      {/* Alert dialog for errors or confirmations */}
      <AlertDialog
        handleAccept={handleAcceptAlert}
        open={open}
        title={title}
        textBody={message}
        type={type}
      />

      {/* Show loading spinner while fetching users */}
      {isLoading ? (
        <LoaderElement />
      ) : (
        <>
          <Stack spacing={3} sx={{ width: "100%" }}>
            {/* Title */}
            <Typography variant="h4" sx={{ fontWeight: 500 }} textAlign="center">
              Añadir Estudiantes
            </Typography>

            {/* Search bar to find users */}
            <SearchUsers selectUser={selectUser} setSelectUser={setSelectUser} users={users} />

            {/* List of selected users displayed as chips */}
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

            {/* Action buttons */}
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
