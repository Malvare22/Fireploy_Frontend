import DataTable, { ConditionalStyles } from "react-data-table-component";
import { TableColumn, TableStyles } from "react-data-table-component";
import {
  Alert,
  Box,
  Chip,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Status from "@modules/general/components/status";
import InfoIcon from "@mui/icons-material/Info";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";
import { CursoTabla } from "@modules/materias/types/curso.tabla";
import { labelListarCursos } from "@modules/materias/enums/labelListarCursos";
import SearchUsers, {
  exampleUsuarioCampoBusqueda,
} from "@modules/general/components/searchUsers";
import { useSearchUsers } from "@modules/general/components/searchUsers/hook";
import { getMateriaStatesArray } from "@modules/materias/utils/materias";
import SchoolIcon from "@mui/icons-material/School";
import {
  Controller,
  FieldError,
  get,
  useForm,
  useFormContext,
} from "react-hook-form";
import { Curso, cursoTemplate } from "@modules/materias/types/curso";
import { Materia } from "@modules/materias/types/materia";
import { adaptCursoToCursoTabla } from "@modules/materias/utils/adapters/curso";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";

const TablaGestionarCursos = () => {
  const theme = useTheme();

  /**
   * Definición de estado de editar por fila
   */
  const {
    register,
    watch,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext<Materia>();

  const {
    register: registerCurso,
    formState: { errors: errorsCurso },
    reset: resetCurso,
    getValues: getValuesCurso,
    setValue: setValuesCurso,
    handleSubmit: handleSubmitCurso,
    control: controlCurso,
  } = useForm<Curso>();

  function handleAdd() {
    setValue("cursos", [
      ...(getValues("cursos") ?? []),
      {
        ...cursoTemplate,
        grupo: (getValues("cursos")?.length ?? 0).toString(),
      },
    ]);
  }

  function handleSave() {
    setValue(`cursos.${currentEdit}`, getValuesCurso());
    setCurrentEdit(-1);
  }

  function handleEdit(i: number) {
    resetCurso(getValues(`cursos.${i}`));
    setCurrentEdit(i);
  }

  function handleCancel() {
    setCurrentEdit(-1);
  }

  function handleDelete() {
    setCurrentEdit(-1);
    const newerCursos: Curso[] =
      getValues("cursos")?.filter((_y, index) => index != currentEdit) || [];

    setValue("cursos", newerCursos);
  }

  useEffect(() => {
    if (!getValues("cursos")) handleAdd();
  }, [watch("cursos")]);

  const [currentEdit, setCurrentEdit] = useState<number>(-1);

  const columns: TableColumn<CursoTabla & { rowIndex: number }>[] = [
    {
      name: labelListarCursos.grupo,
      cell: (row) => {
        if (currentEdit != row.rowIndex)
          return <Typography>{row.grupo}</Typography>;
        else {
          return (
            <TextField
              sx={{ marginLeft: -1 }}
              error={!!errorsCurso?.grupo}
              helperText={!!errorsCurso?.grupo?.message}
              {...registerCurso("grupo")}
              size="small"
            />
          );
        }
      },
      sortable: true,
    },
    {
      name: labelListarCursos.estado,
      cell: (row) => {
        if (currentEdit != row.rowIndex) return <Status status={row.estado} />;
        else {
          return (
            <Controller
              name="estado"
              control={controlCurso} // Pasamos el control de useFormContext o useForm
              defaultValue={row.estado} // Valor por defecto cuando se inicia la edición
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  error={!!errorsCurso?.estado}
                  helperText={errorsCurso?.estado?.message}
                >
                  {getMateriaStatesArray.map(([clave, valor]) => (
                    <MenuItem value={clave} key={clave}>
                      {valor}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          );
        }
      },
      sortFunction: (rowA, rowB) => {
        return rowA.estado.localeCompare(rowB.estado); // Ordena alfabéticamente
      },
      sortable: true,
    },
    {
      name: labelListarCursos.docente,
      cell: (row) => {
        const { selectUser, setSelectUser } = useSearchUsers();

        useEffect(() => {
          if (selectUser && selectUser?.nombreCompleto)
            setValuesCurso("docente.id", (selectUser?.id).toString());
          setValuesCurso("docente.nombre", selectUser?.nombreCompleto!!);
        }, [selectUser]);

        if (currentEdit != row.rowIndex) {
          if (row.docente == null)
            return <Chip icon={<InfoIcon />} label={"Docente sin asignar"} />;
          else {
            return (
              <Chip
                sx={{ width: 150 }}
                icon={<SchoolIcon />}
                color="info"
                label={row.docente.nombre}
              />
            );
          }
        } else {
          return (
            <SearchUsers
              selectUser={selectUser}
              setSelectUser={setSelectUser}
              users={exampleUsuarioCampoBusqueda}
            />
          );
        }
      },
      sortFunction: (rowA, rowB) => {
        return rowA.estado.localeCompare(rowB.estado); // Ordena alfabéticamente
      },
      sortable: true,
    },
    {
      cell: (row) => {
        if (currentEdit == row.rowIndex) {
          return (
            <Stack direction={"row"}>
              <ActionButton
                mode={actionButtonTypes.guardar}
                onClick={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                type="button"
              />
              <ActionButton
                mode={actionButtonTypes.eliminar}
                onClick={() => handleDelete()}
              />
              <ActionButton
                mode={actionButtonTypes.cancelar}
                onClick={handleCancel}
              />
            </Stack>
          );
        } else {
          return (
            <ActionButton
              mode={actionButtonTypes.editar}
              disabled={currentEdit != -1}
              onClick={() => handleEdit(row.rowIndex)}
            />
          );
        }
      },
      sortFunction: (rowA, rowB) => {
        return rowA.estado.localeCompare(rowB.estado); // Ordena alfabéticamente
      },
      sortable: true,
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
    const cursos = watch("cursos") ?? [];
    return cursos.map((curso, index) => ({
      ...adaptCursoToCursoTabla(curso),
      rowIndex: index,
    }));
  }, [watch("cursos"), currentEdit]);

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

  const onSubmit = () => {
    // data contiene los valores validados del formulario
    // handleSave(currentEdit);
  };

  return (
    <>
      {/* {
        <AlertDialog
          open={open}
          handleAccept={handleAlertClose}
          title="Cambiar Estado de Materia"
          textBody={message}
        />
      } */}
      <form onSubmit={(e) => e.preventDefault()}>
        <DataTable
          columns={columns}
          data={dataConIndice}
          customStyles={customStyles}
          conditionalRowStyles={conditionalRowStyles}
        ></DataTable>
        <Stack alignItems={"end"} padding={3}>
          <Box>
            <GeneralButton
              onClick={handleAdd}
              mode={buttonTypes.add}
              size="small"
            />
          </Box>
        </Stack>
        {errors?.cursos &&
          Array.isArray(errors.cursos) &&
          errors.cursos.map((cursoError, index) => (
            <div key={index}>
              {Object.entries(cursoError).map(([field, error]) => (
                <Alert severity="error" key={`${index}-${field}`}>
                  {`${field}: ${(error as FieldError)?.message || "Error desconocido"}`}
                </Alert>
              ))}
            </div>
          ))}
      </form>
    </>
  );
};

export default TablaGestionarCursos;
