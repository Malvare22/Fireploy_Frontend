import DataTable, { ConditionalStyles } from "react-data-table-component";
import { TableColumn, TableStyles } from "react-data-table-component";
import { Chip, Stack, Typography, useTheme } from "@mui/material";
import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import useQuery from "@modules/general/hooks/useQuery";
import { AccountContext } from "@modules/general/context/accountContext";
import AlertDialog from "@modules/general/components/alertDialog";
import Status from "@modules/general/components/status";
import InfoIcon from "@mui/icons-material/Info";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";
import { CursoTabla } from "@modules/materias/types/curso.tabla";
import { labelListarCursos } from "@modules/materias/enums/labelListarCursos";

type TablaCursosProps = {
  cursos: CursoTabla[];
};
const TablaCursos: React.FC<TablaCursosProps> = ({ cursos }) => {
  const theme = useTheme();

  const [selectCurso, setSelectCurso] = useState<CursoTabla | undefined>(
    undefined
  );

  const handleSelect = (materia: CursoTabla) => {
    setSelectCurso(materia);
    setOpenHandleStatus(true);
  };

  function ModalChangeStatus(status: CursoTabla['estado']) {
    const label = status == "I" ? "habilitar" : "deshabilitar";

    return (
      <Stack>
        <Typography>
          {`¿Está seguro de que desea ${label} el curso: ${selectCurso?.grupo}?`}
        </Typography>
      </Stack>
    );
  }

  const { open: openHandleStatus, setOpen: setOpenHandleStatus } =
    useAlertDialog();

  const navigate = useNavigate();

  const token = useContext(AccountContext)!!.localUser?.token;

  const columns: TableColumn<CursoTabla & { rowIndex: number }>[] = [
    {
      name: labelListarCursos.id,
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: labelListarCursos.grupo,
      selector: (row) => row.grupo,
      sortable: true,
    },
    {
      name: labelListarCursos.semestre,
      selector: (row) => row.semestre,
      sortable: true,
    },
    {
      name: labelListarCursos.estado,
      cell: (row) => {
        return <Status status={row.estado} />;
      },
      sortFunction: (rowA, rowB) => {
        return rowA.estado.localeCompare(rowB.estado); // Ordena alfabéticamente
      },
      sortable: true,
    },
    {
      name: labelListarCursos.cantidad,
      selector : row => row.cantidadEstudiantes,
      sortable: true,
    },
    {
      name: labelListarCursos.acciones,
      cell: (row) => {
        return (
          <Stack direction={"row"} justifyContent={"center"}>
            <ActionButton mode={actionButtonTypes.ver} />
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
    CursoTabla & { rowIndex: number }
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
    return cursos
      ? cursos.map((curso, index) => ({
          ...curso,
          rowIndex: index,
        }))
      : [];
  }, [cursos]);

  // const bodyQuery = useMemo(() => {
  //   return {
  //     nombre: selectCurso?.nombre as string,
  //     estado: selectCurso?.estado == "A" ? "I" : ("A" as string),
  //     semestre: selectCurso?.semestre as string,
  //   };
  // }, [selectCurso]);

  // const { error, handleAlertClose, initQuery, message, open } = useQuery(
  //   () => postEstadocursoservice(token!!, bodyQuery, selectCurso?.codigo!!),
  //   true,
  //   "Materia Modificada Exitosamente"
  // );

  return (
    <>
      <AlertDialog
        open={openHandleStatus}
        handleAccept={() => {
          setOpenHandleStatus(false);
        }}
        title="Cambiar Estado de Materia"
        body={ModalChangeStatus(selectCurso?.estado!!)}
        handleCancel={() => setOpenHandleStatus(false)}
      />
      {/* {
        <AlertDialog
          open={open}
          handleAccept={handleAlertClose}
          title="Cambiar Estado de Materia"
          textBody={message}
        />
      } */}
      <DataTable
        columns={columns}
        data={dataConIndice}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
      ></DataTable>
    </>
  );
};

export default TablaCursos;
