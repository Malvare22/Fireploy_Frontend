import DataTable, { ConditionalStyles } from "react-data-table-component";
import { TableColumn, TableStyles } from "react-data-table-component";
import {
  Alert,
  Box,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Status from "@modules/general/components/status";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";

import { getMateriaStatesArray } from "@modules/materias/utils/materias";

import {
  Controller,
  FieldError,
  get,
  useForm,
  useFormContext,
} from "react-hook-form";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { Seccion, seccionTemplate } from "@modules/materias/types/seccion";
import { SeccionSchema } from "@modules/materias/utils/forms/form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { labelListarSecciones } from "@modules/materias/enums/labelListarSecciones";
import { Curso } from "@modules/materias/types/curso";


const TablaGestionarSecciones = () => {
  const theme = useTheme();

  /**
   * Definición de estado de editar por fila
   */
  const {
    watch,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext<Curso>();

  const {
    register: registerSeccion,
    formState: { errors: errorsCurso },
    reset: resetSeccion,
    getValues: getValuesSeccion,
    control: controlSeccion,
  } = useForm<Seccion>({
    resolver: zodResolver(SeccionSchema), // 🔹 Resolver correcto para Zod
  });

  function handleAdd() {
    const aux = { ...seccionTemplate, cursoId: getValues("id") || "" }; // 🔹 Evita error si "id" es undefined
    const seccionesActuales = get("secciones") ?? [];
    setValue("secciones", [...seccionesActuales, aux]); // 🔹 Asegura que "secciones" no sea undefined
  }

  function handleSave() {
    setValue(`secciones.${currentEdit}`, getValuesSeccion());
    setCurrentEdit(-1);
  }

  function handleEdit(i: number) {
    resetSeccion(getValues(`secciones.${i}`));
    setCurrentEdit(i);
  }

  function handleCancel() {
    setCurrentEdit(-1);
  }

  function handleDelete() {
    setCurrentEdit(-1);
    const newerSeccion: Seccion[] =
      getValues("secciones")?.filter((_y, index) => index != currentEdit) || [];

    setValue("secciones", newerSeccion);
  }

  useEffect(() => {
    if (!getValues("secciones")) handleAdd();
  }, [watch("secciones")]);

  const [currentEdit, setCurrentEdit] = useState<number>(-1);

  const columns: TableColumn<Seccion & { rowIndex: number }>[] = [
    {
      name: labelListarSecciones.id,
      selector: (row) => row.id ?? 0,
      sortable: true,
      maxWidth: "120px",
    },
    {
      name: labelListarSecciones.titulo,
      cell: (row) => {
        if (currentEdit != row.rowIndex)
          return <Typography>{row.titulo}</Typography>;
        else {
          return (
            <TextField
              sx={{ marginLeft: -1 }}
              error={!!errorsCurso?.titulo}
              helperText={!!errorsCurso?.titulo?.message}
              {...registerSeccion("titulo")}
              size="small"
            />
          );
        }
      },
      sortable: true,
      maxWidth: "120px",
    },
    {
      name: labelListarSecciones.fechaDeInicio,
      cell: (row) => {
        if (currentEdit != row.rowIndex)
          return <Typography>{row.fechaDeInicio}</Typography>;
        else {
          return (
            <TextField
              sx={{ marginLeft: -1 }}
              error={!!errorsCurso?.fechaDeInicio}
              helperText={!!errorsCurso?.fechaDeInicio?.message}
              {...registerSeccion("fechaDeInicio")}
              size="small"
              type="date"
            />
          );
        }
      },
      sortable: true,
      maxWidth: "120px",
    },
    {
      name: labelListarSecciones.fechaLimite,
      cell: (row) => {
        if (currentEdit != row.rowIndex)
          return <Typography>{row.fechaDeCierre}</Typography>;
        else {
          return (
            <TextField
              sx={{ marginLeft: -1 }}
              error={!!errorsCurso?.fechaDeCierre}
              helperText={!!errorsCurso?.fechaDeCierre?.message}
              {...registerSeccion("fechaDeCierre")}
              size="small"
              type="date"
            />
          );
        }
      },
      sortable: true,
      maxWidth: "120px",
    },
    {
      name: labelListarSecciones.cantidadDeProyectos,
      cell: (row) => {
        return <Typography>{row.proyectos?.length ?? 0}</Typography>;
      },
      sortable: true,
      maxWidth: "120px",
    },
    {
      name: labelListarSecciones.descripcion,
      cell: (row) => {
        if (currentEdit != row.rowIndex)
          return <Typography>{row.descripcion}</Typography>;
        else {
          return (
            <TextField
              sx={{ marginLeft: -1 }}
              error={!!errorsCurso?.descripcion}
              helperText={!!errorsCurso?.descripcion?.message}
              {...registerSeccion("descripcion")}
              size="small"
            />
          );
        }
      },
      sortable: true,
      maxWidth: "120px",
    },
    {
      name: labelListarSecciones.estado,
      cell: (row) => {
        if (currentEdit != row.rowIndex) return <Status status={row.estado} />;
        else {
          return (
            <Controller
              name="estado"
              control={controlSeccion} // Pasamos el control de useFormContext o useForm
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
      maxWidth: "130px",
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
      maxWidth: "250px",
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
    Seccion & { rowIndex: number }
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
    const secciones = watch("secciones") ?? [];
    return secciones.map((seccion, index) => ({
      ...seccion,
      rowIndex: index,
    }));
  }, [watch("secciones"), currentEdit]);

  return (
    <>
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
        {errors?.secciones &&
          Array.isArray(errors.secciones) &&
          errors.secciones.map((seccionError, index) => (
            <div key={index}>
              {Object.entries(seccionError).map(([field, error]) => (
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

export default TablaGestionarSecciones;
