import DataTable, { ConditionalStyles } from "react-data-table-component";
import { TableColumn, TableStyles } from "react-data-table-component";
import { Chip, Stack, Typography, useTheme } from "@mui/material";
import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import useQuery from "@modules/general/hooks/useQuery";
import { MateriaTabla } from "@modules/materias/types/materia.tabla";
import { labelTablaMaterias } from "@modules/materias/enums/labelTablaMaterias";
import AlertDialog from "@modules/general/components/alertDialog";
import Status from "@modules/general/components/status";
import InfoIcon from "@mui/icons-material/Info";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";
import { patchChangeStatusMateria } from "@modules/materias/services/patch.change.materia";
import { rutasMaterias } from "@modules/materias/router/router";
import { useAuth } from "@modules/general/context/accountContext";

type TablaMateriasProps = {
  materias: MateriaTabla[];
};
const TablaMaterias: React.FC<TablaMateriasProps> = ({ materias }) => {
  const theme = useTheme();

  const [selectMateria, setSelectMateria] = useState<MateriaTabla | undefined>(
    undefined
  );

  const handleSelect = (materia: MateriaTabla) => {
    setSelectMateria(materia);
    setOpenHandleStatus(true);
  };

  function ModalChangeStatus(status: MateriaTabla["estado"]) {
    const label = status == "I" ? "habilitar" : "deshabilitar";

    return (
      <Stack>
        <Typography>
          {`¿Está seguro de que desea ${label} la materia: ${selectMateria?.nombre}?`}
        </Typography>
      </Stack>
    );
  }

  const { open: openHandleStatus, setOpen: setOpenHandleStatus } =
    useAlertDialog();

  const navigate = useNavigate();

  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  const columns: TableColumn<MateriaTabla & { rowIndex: number }>[] = [
    {
      name: labelTablaMaterias.idMateria,
      selector: (row) => row.codigo,
      sortable: true,
    },
    {
      name: labelTablaMaterias.nombre,
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: labelTablaMaterias.semestre,
      selector: (row) => row.semestre,
      sortable: true,
    },
    {
      name: labelTablaMaterias.estado,
      cell: (row) => {
        return <Status status={row.estado} />;
      },
      sortFunction: (rowA, rowB) => {
        return rowA.estado.localeCompare(rowB.estado); // Ordena alfabéticamente
      },
      sortable: true,
    },
    {
      name: labelTablaMaterias.cantidadCursos,
      cell: (row) => {
        if (!row.cantidadGruposActivos)
          return (
            <Chip
              color="primary"
              label={labelTablaMaterias.noDispone}
              icon={<InfoIcon />}
            />
          );
        else
          return (
            <Typography textAlign={"center"}>
              {row.cantidadGruposActivos}
            </Typography>
          );
      },
      sortable: true,
      sortFunction: (rowA, rowB) => {
        return rowA.cantidadGruposActivos - rowB.cantidadGruposActivos;
      },
    },
    {
      name: labelTablaMaterias.acciones,
      cell: (row) => {
        return (
          <Stack direction={"row"} justifyContent={"center"}>
            <ActionButton
              mode={actionButtonTypes.ver}
              onClick={() =>
                navigate(
                  rutasMaterias.listarCursos.replace(":idMateria", (row.codigo).toString())
                )
              }
            />
            {row.estado == "A" ? (
              <ActionButton
                sx={{ color: theme.palette.error.main }}
                mode={actionButtonTypes.deshabilitar}
                onClick={() => handleSelect(row)}
              />
            ) : (
              <ActionButton
                sx={{ color: theme.palette.warning.main }}
                mode={actionButtonTypes.habilitar}
                onClick={() => handleSelect(row)}
              />
            )}
          </Stack>
        );
      },
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
    MateriaTabla & { rowIndex: number }
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

  const dataConIndice = useMemo(() => {
    return materias
      ? materias.map((materia, index) => ({
          ...materia,
          rowIndex: index,
        }))
      : [];
  }, [materias]);

  const bodyQuery = useMemo(() => {
    return {
      nombre: selectMateria?.nombre as string,
      estado: selectMateria?.estado == "A" ? "I" : ("A" as string),
      semestre: selectMateria?.semestre?.toString(),
    };
  }, [selectMateria]);

  const { handleAlertClose, initQuery, message, open } = useQuery(
    () => patchChangeStatusMateria(token!!, bodyQuery, selectMateria?.codigo!!),
    true,
    "Materia Modificada Exitosamente"
  );

  return (
    <>
      <AlertDialog
        open={openHandleStatus}
        handleAccept={() => {
          initQuery();
          setOpenHandleStatus(false);
        }}
        title="Cambiar Estado de Materia"
        body={ModalChangeStatus(selectMateria?.estado!!)}
        handleCancel={() => setOpenHandleStatus(false)}
      />
      {
        <AlertDialog
          open={open}
          handleAccept={handleAlertClose}
          title="Cambiar Estado de Materia"
          textBody={message}
        />
      }
      <DataTable
        columns={columns}
        data={dataConIndice}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
      ></DataTable>
    </>
  );
};

export default TablaMaterias;
