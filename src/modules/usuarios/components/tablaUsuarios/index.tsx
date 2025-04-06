import { labelUsuario } from "@modules/usuarios/enum/labelGestionUsuarios";
import { EstadoUsuario, Usuario } from "@modules/usuarios/types/usuario";
import DataTable, { ConditionalStyles } from "react-data-table-component";
import { TableColumn, TableStyles } from "react-data-table-component";
import {
  Chip,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext, useMemo, useState } from "react";
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
import useQuery from "@modules/general/hooks/useQuery";
import { UsuarioService } from "@modules/usuarios/types/services.usuario";
import { postModificarEstadoUsuarioService } from "@modules/usuarios/services/post.modificar.usuario";
import { useAuth } from "@modules/general/context/accountContext";

type TablaUsuariosProps = {
  usuarios: Usuario[];
};
const TablaUsuarios: React.FC<TablaUsuariosProps> = ({ usuarios }) => {
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [selectUsuario, setSelectUsuario] = useState<Usuario | undefined>(
    undefined
  );

  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  const {
    handleAlertClose: handleAlertCloseChangeStatus,
    initQuery: initQueryChangeStatus,
    message: messageChangeStatus,
    open: openChangeStatus,
  } = useQuery<UsuarioService>(
    () =>
      postModificarEstadoUsuarioService(
        selectUsuario?.id!!,
        token!!,
        selectUsuario?.estado == "A" ? "I" : "A"
      ),
    true,
    "Estado cambiado correctamente"
  );

  const handleSelect = (usuario: Usuario) => {
    setSelectUsuario(usuario);
    setOpenHandleStatus(true);
  };

  const navigate = useNavigate();

  const { open: openHandleStatus, setOpen: setOpenHandleStatus } =
    useAlertDialog();

  function ModalChangeStatus(status: EstadoUsuario) {
    const label = status == "I" ? "habilitar" : "deshabilitar";

    return (
      <Stack>
        <Typography>
          `¿Está seguro de que desea ${label} al usuario $
          {selectUsuario?.nombres} ${selectUsuario?.apellidos}?`
        </Typography>
      </Stack>
    );
  }

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
        const label = getUserTypes.get(row.tipo ?? 'E');
        switch (row.tipo) {
          case "A":
            return (
              <>
                <Chip
                  label={label}
                  color="primary"
                  icon={<ManageAccountsIcon />}
                  sx={{
                    padding: 1,
                    color: "white",
                    display: { xs: "none", md: "flex" },
                  }}
                />
                <Stack
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    borderRadius: "100%",
                    padding: 0.5,
                    display: { md: "none", xs: "flex" },
                  }}
                >
                  <Tooltip title={label}>
                    <ManageAccountsIcon />
                  </Tooltip>
                </Stack>
              </>
            );

          case "D":
            return (
              <>
                <Chip
                  label={label}
                  color="error"
                  icon={<RecordVoiceOverIcon />}
                  sx={{
                    padding: 1,
                    color: "white",
                    display: { xs: "none", md: "flex" },
                  }}
                />
                <Stack
                  sx={{
                    backgroundColor: theme.palette.error.main,
                    color: "white",
                    borderRadius: "100%",
                    padding: 0.5,
                    display: { md: "none", xs: "flex" },
                  }}
                >
                  <Tooltip title={label}>
                    <RecordVoiceOverIcon />
                  </Tooltip>
                </Stack>
              </>
            );

          case "E":
            return (
              <>
                <Chip
                  label={label}
                  color="warning"
                  icon={<SchoolIcon />}
                  sx={{
                    padding: 1,
                    color: "white",
                    display: { xs: "none", md: "flex" },
                  }}
                />
                <Stack
                  sx={{
                    backgroundColor: theme.palette.warning.main,
                    color: "white",
                    borderRadius: "100%",
                    padding: 0.5,
                    display: { md: "none", xs: "flex" },
                  }}
                >
                  <Tooltip title={label}>
                    <SchoolIcon />
                  </Tooltip>
                </Stack>
              </>
            );
        }
      },
      width: matches ? "auto" : "70px",
    },

    {
      name: labelUsuario.estado,
      cell: (row) => <Status status={row.estado} />,
      sortable: true,
      sortFunction: (rowA, rowB) => {
        return rowA.estado.localeCompare(rowB.estado); // Ordena alfabéticamente
      },
    },
    {
      name: "Redes Sociales", // Nueva columna con un botón
      cell: (row) => {
        const redesSociales = showSocialNetworks(row.redSocial);
        if (redesSociales.length == 0)
          return (
            <Chip
              label="No dispone"
              icon={<ErrorOutlineIcon />}
              color="info"
              sx={{ padding: 1, color: "white" }}
            />
          );
        return redesSociales;
      },
    },
    {
      name: "Acciones", // Nueva columna con un botón
      cell: (row) => (
        <Stack direction={"row"}>
          <ActionButton
            mode={actionButtonTypes.ver}
            onClick={() =>
              navigate(
                rutasUsuarios.modificarPerfil.replace(":id", row.id!!.toString())
              )
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
      ignoreRowClick: true, // Evita que la fila se seleccione al hacer clic en el botón
      style: { display: "flex", justifyContent: "center" },
    },
  ];

  const customStyles: TableStyles = {
    headCells: {
      style: {
        backgroundColor: theme.palette.background.paper, // override the row height
        color: theme.palette.text.primary,
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
        fontFamily: theme.typography.body1.fontFamily,
      },
    },
    // table: {
    //   style: {
    //     border: "1px solid red",
    //      borderRadius: '20px'
    //   },
    // },
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

  const conditionalRowStyles: ConditionalStyles<
    Usuario & { rowIndex: number }
  >[] = [
    {
      when: (row) => row.rowIndex % 2 !== 0, // Filas impares
      style: {
        color: theme.palette.text.primary,
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
        fontFamily: theme.typography.body1.fontFamily,
        backgroundColor: theme.palette.background.paper,
      },
    },
  ];

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
        handleAccept={() => {
          initQueryChangeStatus();
          setOpenHandleStatus(false);
        }}
        title="Cambiar Estado del Usuario"
        body={ModalChangeStatus(selectUsuario?.estado!!)}
        handleCancel={() => setOpenHandleStatus(false)}
      />
      <AlertDialog
        open={openChangeStatus}
        handleAccept={handleAlertCloseChangeStatus}
        title="Cambiar Estado del Usuario"
        textBody={messageChangeStatus}
      />
      <DataTable
        columns={columns}
        data={dataConIndice}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
      ></DataTable>
    </>
  );
};

export default TablaUsuarios;
