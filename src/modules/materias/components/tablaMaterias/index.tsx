import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component";
import { Chip, Stack, Typography, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
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
import { useMutation } from "@tanstack/react-query";
import LoaderElement from "@modules/general/components/loaderElement";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import EditarMateria from "@modules/materias/pages/editarMateria";
import SpringModal from "@modules/general/components/springModal";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { useCustomTableStyles } from "@modules/general/styles";

type TablaMateriasProps = {
  materias: MateriaTabla[];
};
const TablaMaterias: React.FC<TablaMateriasProps> = ({ materias }) => {
  const theme = useTheme();

  const [selectMateria, setSelectMateria] = useState<MateriaTabla | undefined>(undefined);

  const handleSelect = (materia: MateriaTabla) => {
    setSelectMateria(materia);
    handleOpenStatus();
  };

  const { handleClose: handleCloseEdit, handleOpen: handleOpenEdit, open: openEdit } = useModal();

  const handleEditMateria = (materia: MateriaTabla) => {
    setSelectMateria(materia);
    handleOpenEdit();
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

  const { showDialog, open, title, message, type, handleAccept } = useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  const navigate = useNavigate();

  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  const columns: TableColumn<MateriaTabla & { rowIndex: number }>[] = [
    {
      name: labelTablaMaterias.id,
      cell: (row) => <Typography>{row.codigo}</Typography>,
      sortable: true,
      width: "90px",
    },
    {
      name: labelTablaMaterias.nombre,
      cell: (row) => <Typography>{row.nombre}</Typography>,
      sortable: true,
    },
    {
      name: labelTablaMaterias.semestre,
      cell: (row) => <Typography>{row.semestre}</Typography>,
      sortable: true,
      center: true,
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
      name: <Typography>{labelTablaMaterias.cantidadCursos}</Typography>,
      center: true,
      cell: (row) => {
        if (!row.cantidadGruposActivos)
          return <Chip color="primary" label={labelTablaMaterias.noDispone} icon={<InfoIcon />} />;
        else
          return (
            <Typography textAlign={"center"} width={"100%"}>
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
                navigate(rutasMaterias.listarCursos.replace(":idMateria", row.codigo.toString()))
              }
            />
            <ActionButton mode={actionButtonTypes.editar} onClick={() => handleEditMateria(row)} />
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

  const {
    handleOpen: handleOpenStatus,
    handleClose: handleCloseStatus,
    open: openStatus,
  } = useModal();

  const { isPending, mutate } = useMutation({
    mutationFn: () => patchChangeStatusMateria(token, bodyQuery, selectMateria?.codigo ?? -1),
    mutationKey: ["Change Status Subject", selectMateria?.codigo],
    onSuccess: () =>
      showDialog({
        message: "Materia Actualizada Correctamente",
        onAccept: () => {},
        reload: true,
        type: "success",
        title: "Actualización Materia",
      }),
    onError: (error) => {setError(error)},
  });

  const {conditionalRowStyles, customStyles} = useCustomTableStyles();

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
      />
      <AlertDialog
        open={openStatus}
        handleAccept={async () => {
          await mutate();
          handleCloseStatus();
        }}
        title="Cambiar Estado de Materia"
        body={ModalChangeStatus(selectMateria?.estado!!)}
        handleCancel={handleCloseStatus}
      />
      <SpringModal handleClose={handleCloseEdit} open={openEdit}>
        <EditarMateria id={selectMateria?.codigo ?? -1} handleCloseModal={handleCloseEdit} />
      </SpringModal>
      {isPending ? (
        <LoaderElement />
      ) : (
        <DataTable
          columns={columns}
          data={dataConIndice}
          customStyles={customStyles}
          conditionalRowStyles={conditionalRowStyles}
        ></DataTable>
      )}
    </>
  );
};

export default TablaMaterias;
