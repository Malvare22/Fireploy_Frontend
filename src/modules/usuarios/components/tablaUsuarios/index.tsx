import { labelUsuario } from "@modules/usuarios/enum/labelGestionUsuarios";
import { usuariosEjemplo } from "./usuariosEjemplo";
import { Usuario } from "@modules/usuarios/types/usuario";
import DataTable, { ConditionalStyles } from "react-data-table-component";
import { TableColumn, TableStyles } from "react-data-table-component";
import { adaptarUsuario } from "@modules/usuarios/utils/adaptar.usuario";
import { Box, Button, Chip, Stack, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  obtenerEstadoUsuario,
  obtenerTiposUsuario,
} from "@modules/usuarios/utils/usuario.map";
import SchoolIcon from "@mui/icons-material/School";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { EstadoCurso } from "@modules/materias/types/estado.curso";
import { RedSocialUsuario } from "@modules/usuarios/types/usuario.redSocial";
import {
  Facebook,
  Instagram,
  LinkedIn,
  GitHub,
  Twitter,
} from "@mui/icons-material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import GeneralButton from "@modules/general/components/buttons";
import { buttonTypes } from "@modules/general/types/buttons";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";

type PropsEstado = {
  estado: EstadoCurso;
};

const Estado: React.FC<PropsEstado> = ({ estado }) => {
  const theme = useTheme();
  return (
    <Stack direction={"row"} alignItems={"center"} spacing={1}>
      <Box
        sx={{
          width: 16,
          height: 16,
          backgroundColor:
            estado == "A"
              ? theme.palette.success.main
              : theme.palette.error.main,
          borderRadius: "100%",
          animation: "blink 1s infinite alternate",
          "@keyframes blink": {
            "0%": { opacity: 1 },
            "50%": { opacity: 0.7 },
            "100%": { opacity: 1 },
          },
        }}
      />
      <Box>{obtenerEstadoUsuario.get(estado)}</Box>
    </Stack>
  );
};

type SocialProfileProps = {
  redSocial: keyof RedSocialUsuario;
};
const SocialProfile: React.FC<SocialProfileProps> = ({ redSocial }) => {
  const getSocialIcon = () => {
    switch (redSocial) {
      case "facebook":
        return <Facebook />;
      case "instagram":
        return <Instagram />;
      case "linkedin":
        return <LinkedIn />;
      case "x":
        return <Twitter />;
      case "github":
        return <GitHub />;
      default:
        return null;
    }
  };
  return <>{getSocialIcon()}</>;
};

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
      const label = obtenerTiposUsuario.get(row.tipo);
      switch (row.tipo) {
        case "A":
          return (
            <Chip
              label={label}
              color="primary"
              icon={<ManageAccountsIcon />}
              sx={{ padding: 1, color: "white" }}
            />
          );

        case "D":
          return (
            <Chip
              label={label}
              color="error"
              icon={<RecordVoiceOverIcon />}
              sx={{ padding: 1, color: "white" }}
            />
          );

        case "E":
          return (
            <Chip
              label={label}
              color="warning"
              icon={<SchoolIcon />}
              sx={{ padding: 1, color: "white" }}
            />
          );
      }
    },
  },

  {
    name: labelUsuario.estado,
    cell: (row) => <Estado estado={row.estado} />,
    sortable: true,
    sortFunction: (rowA, rowB) => {
      return rowA.estado.localeCompare(rowB.estado); // Ordena alfabéticamente
    },
  },
  {
    name: "Redes Sociales", // Nueva columna con un botón
    cell: (row) => {
      const iconos = [];
      for (const key in row.redSocial) {
        const validKey = key as keyof RedSocialUsuario;
        if (row.redSocial[validKey] && row.redSocial[validKey] != "") {
          iconos.push(<SocialProfile redSocial={validKey} />);
        }
      }
      if (iconos.length == 0)
        return (
          <Chip
            label="No dispone"
            icon={<ErrorOutlineIcon />}
            color="info"
            sx={{ padding: 1, color: "white" }}
          />
        );
      return iconos;
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
    width: "200px",
    style: { display: "flex", justifyContent: "center" },
  },
];

function TablaUsuarios() {
  const theme = useTheme();

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
        ...adaptarUsuario(usuario),
        rowIndex: index,
      })),
    [usuariosEjemplo]
  );

  return (
    <Stack spacing={2} direction={"row"}>
      <Box sx={{ border: "1px solid black", width: 400 }}></Box>
      <DataTable
        columns={columns}
        data={dataConIndice}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
      ></DataTable>
    </Stack>
  );
}

export default TablaUsuarios;
