import { labelUsuario } from "@modules/usuarios/enum/labelGestionUsuarios";
import { usuariosEjemplo } from "./usuariosEjemplo";
import { Usuario } from "@modules/usuarios/types/usuario";
import DataTable, { ConditionalStyles } from "react-data-table-component";
import { TableColumn, TableStyles } from "react-data-table-component";
import { Box, Chip, Stack, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { useMemo } from "react";
import { getUserTypes } from "@modules/usuarios/utils/usuario.map";
import SchoolIcon from "@mui/icons-material/School";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";
import { showSocialNetworks } from "@modules/usuarios/utils/showSocialNetworks";
import Status from "@modules/general/components/status";
import { adapterUsuario } from "@modules/usuarios/utils/adaptar.usuario";

function TablaUsuarios() {
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const columns: TableColumn<Usuario & { rowIndex: number }>[] = [
    {
      name: labelUsuario.id,
      selector: (row) => row.id,
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
        const label = getUserTypes.get(row.tipo);
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
      width: matches ? 'auto' : '70px'
    },

    {
      name: labelUsuario.estado,
      cell: (row) => <Status estado={row.estado} />,
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
          <ActionButton mode={actionButtonTypes.ver} />
          <ActionButton mode={actionButtonTypes.editar} />
          <ActionButton mode={actionButtonTypes.habilitar} />
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
      usuariosEjemplo.map((usuario, index) => ({
        ...adapterUsuario(usuario),
        rowIndex: index,
      })),
    [usuariosEjemplo]
  );

  return (
    <DataTable
      columns={columns}
      data={dataConIndice}
      customStyles={customStyles}
      conditionalRowStyles={conditionalRowStyles}
    ></DataTable>
  );
}

export default TablaUsuarios;
