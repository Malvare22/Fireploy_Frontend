import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component";
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { labelListarSecciones } from "@modules/materias/enums/labelListarSecciones";
import { useCustomTableStyles } from "@modules/general/hooks/useCustomTableStyles";
import { Fichero } from "@modules/proyectos/types/fichero";
import { RepositorioSchema } from "@modules/proyectos/utils/forms/repositorio.schema";
import { KeysOfRepository } from "@modules/proyectos/types/keysOfRepository";
import { ProyectoRepositoriesSchema } from "@modules/proyectos/utils/forms/proyecto.schema";
import HiddenButton from "@modules/materias/components/hiddenInput";
import DeleteIcon from "@mui/icons-material/Delete";
import { FileUpload } from "@mui/icons-material";
import { useAlertDialogContext } from "@modules/general/context/alertDialogContext";
import { onDownload } from "@modules/general/utils/inputs";
import {
  hasValidExtension,
  msgNoValidExtension,
} from "@modules/general/utils/form/validExtensions";

type Props = {
  field: KeysOfRepository;
  disabled: boolean;
};

const ficheroTemplate: Fichero = {
  contenido: null,
  nombre: "",
} as const;

/**
 * TablaGestionarFicheros component – renders and manages a list of configurable files (Fichero[]),
 * allowing users to upload, preview, and delete configuration files such as .json or .env.
 *
 * Integrates with react-hook-form and synchronizes the file list with a parent form context.
 * Used as part of project repository configuration.
 *
 * @component
 *
 * @param field - Key from the repository schema to identify where files are stored in the form.
 * @param disabled - Flag indicating whether the component is interactive or in read-only mode.
 *
 * @returns A file management UI allowing add, upload, preview, and delete actions on files.
 */
const TablaGestionarFicheros = ({ field, disabled }: Props) => {
  const { getValues: getValuesPrincipal, setValue: setValuesPrincipal } =
    useFormContext<ProyectoRepositoriesSchema>();
  const methods = useForm<RepositorioSchema>({
    defaultValues: getValuesPrincipal(`${field}`),
  });

  const [files, setFiles] = useState<Fichero[] | null>(null);

  useEffect(() => {
    setReset();
  }, [getValuesPrincipal(`${field}.ficheros`)]);

  function setReset() {
    setFiles(getValuesPrincipal(`${field}.ficheros`) ?? []);
  }

  function handleAdd() {
    if (!files) return;
    const aux = ficheroTemplate;
    const currentFicheros = files;
    setFiles([...currentFicheros, aux]);
    setValuesPrincipal(`${field}.ficheros`, [...currentFicheros, aux]);
  }

  const { showDialog, handleClose } = useAlertDialogContext();

  function handleDelete(i: number) {
    if (!files) return;
    const newerFicheros = files.filter((_y, index) => i != index) || [];
    setFiles(newerFicheros);
    setValuesPrincipal(`${field}.ficheros`, newerFicheros);
  }

  function handleEditFichero(i: number, nFichero: Fichero) {
    if (!files) return;
    const newerFicheros = [...files];
    newerFicheros[i] = nFichero;
    setFiles(newerFicheros);
    setValuesPrincipal(`${field}.ficheros`, newerFicheros);
  }

  function onDelete(i: number) {
    if (!files) return;
    showDialog({
      message: `¿Está seguro de que desea eliminar el fichero ${files[i].nombre}?`,
      type: "default",
      onAccept: () => {
        handleDelete(i);
        handleClose();
      },
      onCancel: handleClose,
    });
  }

  const columns: TableColumn<Fichero & { rowIndex: number }>[] = [
    {
      name: <Typography variant="body1">{"Nombre del fichero"}</Typography>,
      cell: (row) => (
        <Typography variant="body2">
          {row.nombre && row.nombre.trim().length > 0
            ? row.nombre
            : "Sin Nombre"}
        </Typography>
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: (
        <Typography variant="body1">{labelListarSecciones.acciones}</Typography>
      ),
      cell: (row) => {
        return (
          <Stack direction={"row"} spacing={2}>
            {files && (
              <>
                <FileInput
                  fichero={files[row.rowIndex]}
                  index={row.rowIndex}
                  setFichero={handleEditFichero}
                  disabled={false}
                  currentFiles={files}
                />
                <Tooltip title="Eliminar">
                  <IconButton onClick={() => onDelete(row.rowIndex)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Stack>
        );
      },
      center: true,
    },
  ];

  const dataConIndice = useMemo(() => {
    const ficherosCurrent = files ?? [];
    return ficherosCurrent.map((fichero, index) => ({
      ...fichero,
      rowIndex: index,
    }));
  }, [files]);

  const { conditionalRowStyles, customStyles } = useCustomTableStyles();

  return (
    <FormProvider {...methods}>
      <Typography variant="h5" sx={{ fontWeight: 500 }}>
        {"Archivos de configuración"}
      </Typography>
      <Typography>{"Archivos vinculados actualmente:"}</Typography>
      <Stack spacing={2}>
        {files && files.length != 0 ? (
          <>
            <Divider />
            <Alert severity="warning">
              {
                "Es necesario que los archivos dispongan de un nombre y su respectiva extensión"
              }
            </Alert>
            <Box sx={{ maxWidth: 500 }}>
              <DataTable
                columns={columns}
                data={dataConIndice}
                customStyles={customStyles}
                conditionalRowStyles={conditionalRowStyles}
                responsive
              ></DataTable>
            </Box>
          </>
        ) : (
          <Alert severity="warning">
            {"Sin ficheros de configuración vinculados"}
          </Alert>
        )}
        <Stack
          alignItems={!files || files.length == 0 ? "start" : "end"}
          sx={{ maxWidth: 500 }}
        >
          <Box>
            <GeneralButton
              onClick={handleAdd}
              disabled={disabled}
              mode={buttonTypes.add}
              size="small"
            />
          </Box>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

type FileInputProps = {
  setFichero: (i: number, f: Fichero) => void;
  fichero: Fichero;
  index: number;
  currentFiles: Fichero[] | null;
  disabled?: boolean;
};
function FileInput({
  setFichero,
  fichero,
  index,
  currentFiles,
  disabled = false,
}: FileInputProps) {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;

    if (!files || !files[0]) {
      setFichero(index, { ...ficheroTemplate });
      return;
    }

    const file = files[0];

    if (!hasValidExtension(file.name, "CONFIG_FILE")) {
      showError("extension");
      return;
    }

    if (currentFiles)
      for (const name of currentFiles) {
        if (name.nombre == file.name) {
          showError("repeat_value");
          return;
        }
      }

    const reader = new FileReader();

    reader.onload = (_event) => {
      setFichero(index, { contenido: file, nombre: file.name });
    };

    reader.readAsText(file);
  }

  const { handleClose, showDialog } = useAlertDialogContext();

  function showError(type: "extension" | "repeat_value") {
    showDialog({
      message:
        type == "repeat_value"
          ? "No se admiten archivos repetidos"
          : msgNoValidExtension("CONFIG_FILE"),
      type: "error",
      onAccept: handleClose,
      title: "Archivo no válido",
    });
  }

  return (
    <Stack direction={"row"} alignItems={"center"} spacing={1}>
      {fichero && fichero.contenido && (
        <Button
          onClick={() => onDownload(fichero.contenido as File)}
          variant="text"
          sx={{ textTransform: "note" }}
        >
          {"Ver"}
        </Button>
      )}
      <Button
        component="label"
        role={undefined}
        variant="contained"
        disabled={disabled}
        tabIndex={-1}
        endIcon={<FileUpload />}
        size="small"
        color="secondary"
      >
        {"Subir fichero"}
        <HiddenButton
          type="file"
          accept=".json,.env"
          onChange={onChange}
          multiple
        />
      </Button>
    </Stack>
  );
}

export default TablaGestionarFicheros;
