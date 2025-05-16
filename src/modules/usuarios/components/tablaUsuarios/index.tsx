import { labelUsuario } from "@modules/usuarios/enum/labelGestionUsuarios";
import { EstadoUsuario, Usuario } from "@modules/usuarios/types/usuario";
import DataTable, { ConditionalStyles } from "react-data-table-component";
import { TableColumn, TableStyles } from "react-data-table-component";
import { Chip, Stack, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { getUserTypes } from "@modules/usuarios/utils/usuario.map";
import SchoolIcon from "@mui/icons-material/School";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";
import { showSocialNetworks } from "@modules/usuarios/utils/showSocialNetworks";
import Status from "@modules/general/components/status";
import { useNavigate } from "react-router";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import AlertDialog from "@modules/general/components/alertDialog";
import { useAuth } from "@modules/general/context/accountContext";
import { useMutation } from "@tanstack/react-query";
import { postChangeUserStateService } from "@modules/usuarios/services/post.modificar.usuario";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { paginationComponentOptions } from "@modules/general/utils/pagination";

type TablaUsuariosProps = {
  usuarios: Usuario[];
};

/**
 * TablaUsuarios component – Displays a table of user data with their status and various actions.
 * 
 * This component renders a list of users, displaying their ID, names, role, status, and social network links. 
 * It includes action buttons for viewing, editing, enabling, or disabling users. Additionally, users' statuses 
 * can be toggled between active and inactive through a modal confirmation dialog. The table allows sorting and 
 * pagination.
 * 
 * @component
 * 
 * @param {Array} usuarios - An array of user objects. Each object contains information about a user, such as 
 *                            ID, name, role, status, and social networks.
 * 
 * @returns {JSX.Element} A Material UI DataTable displaying users' details with interactive actions.
 * 
 * @example
 * ```tsx
 * <TablaUsuarios usuarios={userList} />
 * ```
 */
const TablaUsuarios: React.FC<TablaUsuariosProps> = ({ usuarios }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [selectUsuario, setSelectUsuario] = useState<Usuario | undefined>(undefined);
  const { accountInformation } = useAuth();
  const { token } = accountInformation;
  const navigate = useNavigate();

  const { showDialog, open, title, message, handleCancel, type, handleAccept, isLoading } =
    useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  // Mutation to toggle user status (active/inactive)
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      postChangeUserStateService(
        token,
        selectUsuario?.id ?? -1,
        selectUsuario?.estado == "A" ? "I" : "A"
      ),
    mutationKey: ["Update User", selectUsuario?.id ?? -1, selectUsuario?.estado == "A" ? "I" : "A"],
    onError: (err) => setError(err),
    onSuccess: () => {
      showDialog({
        title: "Actualización de Usuario",
        message: "Se ha cambiado el estado del usuario correctamente",
        onAccept: () => {},
        reload: true,
        type: "success",
      });
    },
  });

  const {
    open: openHandleStatus,
    handleClose: handleCloseChangeStatus,
    handleOpen: handleOpenChangeStatus,
  } = useModal();

  useEffect(() => {
    if (!isPending) {
      handleCloseChangeStatus();
    }
  }, [isPending]);

  /**
   * Handles user selection and opens confirmation dialog.
   * @param {Usuario} usuario - The selected user.
   */
  const handleSelect = (usuario: Usuario) => {
    setSelectUsuario(usuario);
    handleOpenChangeStatus();
  };

  /**
   * Renders the modal content based on user status.
   * @param {EstadoUsuario} status - Current status of the selected user.
   * @returns {JSX.Element}
   */
  function ModalChangeStatus(status: EstadoUsuario) {
    const label = status == "I" ? "habilitar" : "deshabilitar";

    return (
      <Stack>
        <Typography>
          {`¿Estás seguro de que desear ${label} al usuario ${selectUsuario?.nombres} ${selectUsuario?.apellidos}?`}
        </Typography>
      </Stack>
    );
  }

  /**
   * Triggers user status change mutation.
   */
  function handleChangeStatus() {
    mutate();
  }

  /**
   * Table columns definition for DataTable
   */
  const columns: TableColumn<Usuario & { rowIndex: number }>[] = [
    {
      name: labelUsuario.id,
      selector: (row) => row.id ?? 0,
      width: "70px",
      sortable: true,
    },
    {
      name: labelUsuario.nombres,
      selector: (row) => row.nombres + " " + row.apellidos,
      sortable: true,
    },
    {
      name: labelUsuario.rol,
      cell: (row) => {
        const label = getUserTypes.get(row.tipo ?? "E");
        switch (row.tipo) {
          case "A":
            return renderChip(label as string, <ManageAccountsIcon />, "primary");
          case "D":
            return renderChip(label as string, <RecordVoiceOverIcon />, "error");
          case "E":
            return renderChip(label as string, <SchoolIcon />, "warning");
        }
      },
      width: matches ? "auto" : "70px",
    },
    {
      name: labelUsuario.estado,
      cell: (row) => <Status status={row.estado} />,
      sortable: true,
      sortFunction: (rowA, rowB) => rowA.estado.localeCompare(rowB.estado),
    },
    {
      name: "Social Networks",
      cell: (row) => {
        const redesSociales = showSocialNetworks(row.redSocial);
        if (redesSociales.length == 0)
          return (
            <Chip
              label="No Disponibles"
              icon={<ErrorOutlineIcon />}
              color="info"
              sx={{ padding: 1, color: "white" }}
            />
          );
        return redesSociales;
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <Stack direction={"row"}>
          <ActionButton
            mode={actionButtonTypes.ver}
            onClick={() =>
              navigate(rutasUsuarios.modificarPerfil.replace(":id", row.id!!.toString()))
            }
          />
          <ActionButton mode={actionButtonTypes.editar} />
          {row.estado == "A" ? (
            <ActionButton
              mode={actionButtonTypes.deshabilitarUsuario}
              onClick={() => handleSelect(row)}
              sx={{ color: theme.palette.error.main }}
            />
          ) : (
            <ActionButton
              mode={actionButtonTypes.habilitarUsuario}
              onClick={() => handleSelect(row)}
              sx={{ color: theme.palette.success.main }}
            />
          )}
        </Stack>
      ),
      ignoreRowClick: true,
      style: { display: "flex", justifyContent: "center" },
    },
  ];

  /**
   * Renders responsive Chip with tooltip icon for role.
   * @param {string} label - Role label.
   * @param {JSX.Element} icon - Icon for the role.
   * @param {"primary" | "error" | "warning"} color - MUI color scheme.
   * @returns {JSX.Element}
   */
  const renderChip = (label: string, icon: JSX.Element, color: "primary" | "error" | "warning") => (
    <>
      <Chip
        label={label}
        color={color}
        icon={icon}
        sx={{
          padding: 1,
          color: "white",
          display: { xs: "none", md: "flex" },
        }}
      />
      <Stack
        sx={{
          backgroundColor: theme.palette[color].main as string,
          color: "white",
          borderRadius: "100%",
          padding: 0.5,
          display: { md: "none", xs: "flex" },
        }}
      >
        <Tooltip title={label}>{icon}</Tooltip>
      </Stack>
    </>
  );

  // Custom table styles
  const customStyles: TableStyles = {
    headCells: {
      style: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
        fontFamily: theme.typography.body1.fontFamily,
      },
    },
    rows: {
      style: {
        color: theme.palette.text.primary,
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
        fontFamily: theme.typography.body1.fontFamily,
        backgroundColor: theme.palette.background.default,
      },
    },
  };

  // Alternating row styles for better readability
  const conditionalRowStyles: ConditionalStyles<Usuario & { rowIndex: number }>[] = [
    {
      when: (row) => row.rowIndex % 2 !== 0,
      style: {
        backgroundColor: theme.palette.background.paper,
      },
    },
  ];

  // Add row index for conditional styling
  const dataConIndice = useMemo(
    () =>
      usuarios.map((usuario, index) => ({
        ...usuario,
        rowIndex: index,
      })),
    [usuarios]
  );

  return (
    <>
      <AlertDialog
        open={openHandleStatus}
        handleAccept={handleChangeStatus}
        title="Cambiar estado del Usuario"
        body={ModalChangeStatus(selectUsuario?.estado!!)}
        isLoading={isPending}
        handleCancel={handleCloseChangeStatus}
      />
      <AlertDialog
        handleAccept={handleAccept}
        handleCancel={handleCancel}
        open={open}
        title={title}
        textBody={message}
        type={type}
        isLoading={isLoading}
      />
      <DataTable
        columns={columns}
        data={dataConIndice}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 50, 100]}
        paginationComponentOptions={paginationComponentOptions}
      />
    </>
  );
};

export default TablaUsuarios;
