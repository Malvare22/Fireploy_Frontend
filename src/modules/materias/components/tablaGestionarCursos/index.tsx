import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component";
import {
  Alert,
  Box,
  capitalize,
  Chip,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Status from "@modules/general/components/status";
import InfoIcon from "@mui/icons-material/Info";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";
import { CursoTabla } from "@modules/materias/types/curso.tabla";
import { labelListarCursos } from "@modules/materias/enums/labelListarCursos";
import SearchUsers from "@modules/general/components/searchUsers";
import {
  useSearchUsers,
  UsuarioCampoBusqueda,
} from "@modules/general/hooks/useSearchUsers";
import { getMateriaStatesArray } from "@modules/materias/utils/materias";
import SchoolIcon from "@mui/icons-material/School";
import {
  Controller,
  FieldError,
  useForm,
  useFormContext,
} from "react-hook-form";
import { Curso, cursoTemplate } from "@modules/materias/types/curso";
import { Materia } from "@modules/materias/types/materia";
import { adaptCursoTabla } from "@modules/materias/utils/adapters/curso";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { useAuth } from "@modules/general/context/accountContext";
import { adaptUserServiceToCB } from "@modules/usuarios/utils/adapt.usuario";
import { getUsuariosByTypeService } from "@modules/usuarios/services/get.usuarios.[tipo]";
import { useQuery } from "@tanstack/react-query";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import { useCustomTableStyles } from "@modules/general/styles";
import AlertDialog from "@modules/general/components/alertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { letterOptionsForGroup } from "@modules/materias/utils/groupLetters";

/**
 * TablaGestionarCursos Component – Displays a table for managing courses, including features such as editing course information,
 * assigning instructors, and handling course actions (e.g., add, delete, save).
 *
 * The table includes features like row editing, selecting instructors from a search list, and managing course states (active, inactive, etc.).
 * It also integrates form handling with `react-hook-form` to manage the course data.
 *
 * @component
 *
 * @returns A `DataTable` component for managing courses, along with actions for adding, editing, saving, and deleting courses.
 *
 * @example
 * ```tsx
 * <TablaGestionarCursos />
 * ```
 */
const TablaGestionarCursos = () => {
  /**
   * Definición de estado de editar por fila
   */
  const {
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useFormContext<Materia>();

  const {
    formState: { errors: errorsCurso },
    reset: resetCurso,
    getValues: getValuesCurso,
    setValue: setValuesCurso,
    control: controlCurso,
  } = useForm<Curso>();

  function handleAdd() {
    setValue("cursos", [
      ...(getValues("cursos") ?? []),
      {
        ...cursoTemplate,
      },
    ]);
  }

  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  const {
    data: dataFetchDocentes,
    isLoading: isLoadingFetchDocentes,
    error: errorFetchDocentes,
  } = useQuery({
    queryFn: () => getUsuariosByTypeService("Docente", token),
    queryKey: ["Get Docentes", token],
  });

  const {
    showDialog,
    open,
    title,
    message,
    handleCancel: handleCancelAlert,
    type,
    handleAccept,
    isLoading,
  } = useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  useEffect(() => {
    if (errorFetchDocentes) {
      setError(errorFetchDocentes);
    }
  }, [errorFetchDocentes]);

  const [docentes, setDocentes] = useState<UsuarioCampoBusqueda[]>([]);

  useEffect(() => {
    if (dataFetchDocentes)
      setDocentes(
        dataFetchDocentes.map((docente) => adaptUserServiceToCB(docente))
      );
  }, [dataFetchDocentes]);

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
      name: <Typography>{labelListarCursos.grupo}</Typography>,
      cell: (row) => {
        if (currentEdit != row.rowIndex)
          return <Typography>{row.grupo}</Typography>;
        else {
          return (
            <Controller
              name="grupo"
              control={controlCurso}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  fullWidth
                  label="Grupo"
                  error={!!errorsCurso.grupo}
                  helperText={errorsCurso.grupo?.message}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: 150,
                        },
                      },
                    },
                  }}
                >
                  {letterOptionsForGroup().map((option) => {
                    return (
                      <MenuItem value={option} key={option}>
                        {option}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
            />
          );
        }
      },
      sortable: true,
      maxWidth: "120px",
    },
    {
      name: <Typography>{labelListarCursos.estado}</Typography>,
      cell: (row) => {
        if (currentEdit != row.rowIndex) return <Status status={row.estado} />;
        else {
          return (
            <Controller
              name="estado"
              control={controlCurso}
              defaultValue={row.estado}
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
        return rowA.estado.localeCompare(rowB.estado);
      },
      sortable: true,
      maxWidth: "130px",
    },
    {
      name: <Typography>{labelListarCursos.docente}</Typography>,
      cell: (row) => {
        const { selectUser, setSelectUser } = useSearchUsers();

        useEffect(() => {
          if (selectUser && selectUser?.nombreCompleto)
            setValuesCurso("docente.id", selectUser?.id);
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
              loading={isLoadingFetchDocentes}
              selectUser={selectUser}
              setSelectUser={setSelectUser}
              users={docentes}
            />
          );
        }
      },
      sortFunction: (rowA, rowB) => {
        return rowA.estado.localeCompare(rowB.estado);
      },
      sortable: true,
      maxWidth: "250px",
    },
    {
      name: <Typography>{labelListarCursos.acciones}</Typography>,
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
        return rowA.estado.localeCompare(rowB.estado);
      },
      sortable: true,
      maxWidth: "250px",
    },
  ];

  const { conditionalRowStyles, customStyles } = useCustomTableStyles();

  const dataConIndice = useMemo(() => {
    const cursos = watch("cursos") ?? [];
    return cursos.map((curso, index) => ({
      ...adaptCursoTabla(curso),
      rowIndex: index,
    }));
  }, [watch("cursos"), currentEdit]);

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        handleCancel={handleCancelAlert}
        open={open}
        title={title}
        textBody={message}
        type={type}
        isLoading={isLoading}
      />
      <form onSubmit={(e) => e.preventDefault()}>
        <DataTable
          columns={columns}
          data={dataConIndice}
          customStyles={customStyles}
          conditionalRowStyles={conditionalRowStyles}
          responsive
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
                  {`${capitalize(field)}: ${(error as FieldError)?.message || "Error desconocido"}`}
                </Alert>
              ))}
            </div>
          ))}
      </form>
    </>
  );
};

export default TablaGestionarCursos;
