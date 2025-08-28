import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component";
import { Avatar, AvatarGroup, Button, Chip, Tooltip, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useNavigate } from "react-router";
import { useCustomTableStyles } from "@modules/general/hooks/useCustomTableStyles";
import { paginationComponentOptions } from "@modules/general/utils/pagination";
import { Proyecto } from "@modules/proyectos/types/proyecto.tipo";
import { ChangeStatusForTable, ChipExecutionState } from "../executionState";
import { rutasProyectos } from "@modules/proyectos/router/routes";
import { useAlertDialogContext } from "@modules/general/context/alertDialogContext";
import AlertDialog from "@modules/general/components/alertDialog";
import { ProjectTagsForList } from "@modules/general/components/projectTags";
import { adaptProjectToCard } from "@modules/proyectos/utils/adapt.proyecto";

type TablaProyectosProps = {
  proyectos: Proyecto[];
  trigger: Function;
};

const TablaProyectos: React.FC<TablaProyectosProps> = ({ proyectos, trigger }) => {
  const { handleAccept, handleCancel, isLoading, message, open, title, type } =
    useAlertDialogContext();

  const navigate = useNavigate();
  /**
   * @constant columns
   * @description Defines the columns for the data table displaying course information.
   * Includes columns for ID, group, semester, status, number of students, and actions (view, edit, change status).
   */
  const columns: TableColumn<Proyecto & { rowIndex: number }>[] = [
    {
      name: <Typography>{"Titulo del proyecto"}</Typography>,
      cell: (row) => (
        <Button
          onClick={() => navigate(rutasProyectos.ver.replace(":id", `${row.id}`))}
          variant="text"
        >
          {row.titulo}
        </Button>
      ),
      sortable: true,
      sortFunction: (rowA, rowB) => {
        const [a, b] = [rowA.titulo, rowB.titulo];
        return a.localeCompare(b);
      },
    },
    {
      name: <Typography>{"Integrantes"}</Typography>,
      cell: (row) => (
        <AvatarGroup max={6}>
          {row.integrantes.concat(row.propietario ?? []).map((x) => (
            <Avatar alt={`foto_de_${x.nombre}`} src={x.imagen} />
          ))}
        </AvatarGroup>
      ),
    },
    {
      name: <Typography>{"Materia"}</Typography>,
      cell: (row) => (
        <Tooltip title={row.materiaInformacion.nombre} arrow>
          <Chip
            label={
              <Typography
                variant="caption"
                sx={{
                  overflowWrap: "anywhere",
                  textAlign: "center",
                }}
              >
                {row.materiaInformacion.nombre}
              </Typography>
            }
            sx={{ maxWidth: 150, paddingY: 1 }}
          />
        </Tooltip>
      ),
      sortFunction: (rowA, rowB) => {
        const [a, b] = [rowA.materiaInformacion.nombre ?? "", rowB.materiaInformacion.nombre ?? ""];
        return a.localeCompare(b);
      },
      sortable: true,
    },
    {
      name: <Typography>{"Estado"}</Typography>,
      cell: (row) => <ChipExecutionState projectStatus={row.estadoDeEjecucion ?? "E"} />,
      sortFunction: (rowA, rowB) => {
        const [a, b] = [rowA.estadoDeEjecucion ?? "E", rowB.estadoDeEjecucion ?? "E"];
        return a.localeCompare(b);
      },
      width: "180px",
      sortable: true,
    },
    {
      name: <Typography>{"Tecnología"}</Typography>,
      cell: (row) => <ProjectTagsForList proyecto={adaptProjectToCard(row)} />,
      width: "260px",
    },
    {
      name: <Typography>{"Acciones"}</Typography>,
      center: true,
      cell: (row) => (
        <ChangeStatusForTable
          id={row.id ?? 0}
          hasUrl={(row.url.trim() ?? "") != ""}
          currentStatus={row.estadoDeEjecucion ?? "E"}
          refetch={trigger}
          urlOfSite={row.url}
        />
      ),
    },
  ];

  const { conditionalRowStyles, customStyles } = useCustomTableStyles();

  const dataConIndice = useMemo(() => {
    return proyectos
      ? proyectos.map((proyecto, index) => ({
          ...proyecto,
          rowIndex: index,
        }))
      : [];
  }, [proyectos]);

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        handleCancel={handleCancel}
        open={open}
        title={title}
        textBody={message}
        isLoading={isLoading}
        type={type}
      />
      <DataTable
        columns={columns}
        data={dataConIndice}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 15, 20]}
        paginationComponentOptions={paginationComponentOptions}
      ></DataTable>
    </>
  );
};

export default TablaProyectos;
