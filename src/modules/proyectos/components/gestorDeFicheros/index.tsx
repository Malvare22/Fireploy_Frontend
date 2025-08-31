import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Fichero } from "@modules/proyectos/types/fichero";
import { RepositorioSchema } from "@modules/proyectos/utils/forms/repositorio.schema";
import { KeysOfRepository } from "@modules/proyectos/types/keysOfRepository";
import { ProyectoRepositoriesSchema } from "@modules/proyectos/utils/forms/proyecto.schema";
import HiddenButton from "@modules/materias/components/hiddenInput";
import DeleteIcon from "@mui/icons-material/Delete";
import { FileUpload } from "@mui/icons-material";
import { useAlertDialogContext } from "@modules/general/context/alertDialogContext";
import {
  hasValidExtension,
  msgNoValidExtension,
} from "@modules/general/utils/form/validExtensions";
import {
  FileCarmarkFillIcon,
  FiletypeJsIcon,
  FiletypeJsonIcon,
  FiletypePhpIcon,
  FiletypePyIcon,
  FiletypeShIcon,
  FiletypeXmlIcon,
  FiletypeYmlIcon,
  JournalCodeIcon,
} from "@modules/general/components/customIcons";
import EditIcon from "@mui/icons-material/Edit";
import { stringToFile } from "@modules/proyectos/utils/castingFiles";
import EditorExtraFiles from "../configuracion/repositories/components/editorExtraFiles";
import { TECNOLOGIES } from "@modules/proyectos/utils/technologies";

type Props = {
  field: KeysOfRepository;
  disabled: boolean;
};

const GestorDeFicheros = ({ field, disabled }: Props) => {
  const { getValues: getValuesPrincipal, setValue: setValuesPrincipal } =
    useFormContext<ProyectoRepositoriesSchema>();
  const methods = useForm<RepositorioSchema>({
    defaultValues: getValuesPrincipal(`${field}`),
  });

  const [files, setFiles] = useState<Fichero[]>([]);

  const [bufferModify, setBufferModify] = useState<Set<string>>();

  const [editingFileIndex, setEditingFileIndex] = useState<number>();

  const ENV_FILE = useMemo((): Fichero => {
    return {
      contenido: stringToFile(getValuesPrincipal(`${field}.variables`), ".env"),
      nombre: ".env",
    };
  }, [getValuesPrincipal(`${field}.variables`)]);

  useEffect(() => {
    setReset();
    const FICHEROS: Fichero[] = getValuesPrincipal(`${field}.ficheros`) ?? [];
    setFiles([ENV_FILE].concat(FICHEROS));
  }, [getValuesPrincipal(`${field}.ficheros`), getValuesPrincipal(`${field}.variables`)]);

  function setReset() {
    setFiles(getValuesPrincipal(`${field}.ficheros`) ?? []);
  }

  const FRAMEWORK = useMemo(() => {
    return getValuesPrincipal(`${field}.informacion.framework`) ?? TECNOLOGIES.Angular;
  }, [getValuesPrincipal(`${field}.informacion.framework`)]);

  const { showDialog, handleClose } = useAlertDialogContext();

  function handleDelete(i: number) {
    if (!files) return;
    if (i == editingFileIndex) {
      setEditingFileIndex(undefined);
    }
    const newerFicheros = files.filter((_y, index) => i != index) || [];
    setFiles(newerFicheros);
    setValuesPrincipal(`${field}.ficheros`, newerFicheros);
  }

  function handleEditFichero(i: number) {
    setEditingFileIndex(i);
  }

  function handleSave(i: number, contenido: string) {

    const currentBufferStrings = !bufferModify ? new Set<string>(): bufferModify;

    if (i == 0) {
      setValuesPrincipal(`${field}.variables`, contenido);
      setBufferModify(currentBufferStrings.add(files[0].nombre));
    } else {
      let ficheros = [...files];
      ficheros[i].contenido = stringToFile(contenido, ficheros[i].nombre);
      setValuesPrincipal(`${field}.ficheros`, ficheros);
      setBufferModify(currentBufferStrings.add(ficheros[i].nombre));
    }
    setEditingFileIndex(undefined);
  }

  function confirmDelete(i: number) {
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

  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>
        {files.map((file, index) => (
          <Grid size={{ md: 3, xs: 6 }}>
            <FicheroCard
              key={file.nombre}
              fichero={file}
              handleDelete={index != 0 ? () => confirmDelete(index) : undefined}
              handleEdit={() => handleEditFichero(index)}
              status={bufferModify?.has(file.nombre) ? 'update' : undefined}
            />
          </Grid>
        ))}
      </Grid>
      <AddButton disabled={disabled} ficheros={files} setFicheros={setFiles} />
      {editingFileIndex != undefined && (
        <EditorExtraFiles
          disabled={disabled}
          fichero={files[editingFileIndex]}
          framework={FRAMEWORK}
          handleSave={handleSave}
          index={editingFileIndex}
          handleClose={() => setEditingFileIndex(undefined)}
        />
      )}
    </FormProvider>
  );
};

type FileInputProps = {
  ficheros: Fichero[];
  setFicheros: React.Dispatch<Fichero[]>;
  disabled: boolean;
};

function AddButton({ setFicheros, ficheros, disabled }: FileInputProps) {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;

    if (!files || !files[0]) {
      return;
    }

    const file = files[0];

    if (!hasValidExtension(file.name, "CONFIG_FILE")) {
      showError("extension");
      return;
    }

    setFicheros([...ficheros]);

    if (ficheros)
      for (const name of ficheros) {
        if (name.nombre == file.name) {
          showError("repeat_value");
          return;
        }
      }

    const reader = new FileReader();

    const nFichero: Fichero = {
      contenido: files[0],
      nombre: files[0].name,
    };

    reader.onload = (_event) => {
      setFicheros(ficheros.concat(nFichero));
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
        <HiddenButton type="file" accept=".json,.env" onChange={onChange} multiple />
      </Button>
    </Stack>
  );
}

export default GestorDeFicheros;

type FicheroCardProps = {
  fichero: Fichero;
  handleDelete?: () => void | undefined;
  handleEdit: () => void;
  status?: "update" | undefined;
};

function GetIconFichero({ extension }: { extension: string }) {
  const iconSx = { fontSize: 64 };

  switch (extension) {
    case ".js":
      return <FiletypeJsIcon sx={iconSx} />;
    case ".json":
      return <FiletypeJsonIcon sx={iconSx} />;
    case ".php":
      return <FiletypePhpIcon sx={iconSx} />;
    case ".py":
      return <FiletypePyIcon sx={iconSx} />;
    case ".sh":
      return <FiletypeShIcon sx={iconSx} />;
    case ".xml":
      return <FiletypeXmlIcon sx={iconSx} />;
    case ".yml":
      return <FiletypeYmlIcon sx={iconSx} />;
    case ".env":
      return <JournalCodeIcon sx={iconSx} />;
    default:
      return <FileCarmarkFillIcon sx={iconSx} />;
  }
}

function FicheroCard({ fichero, handleDelete, handleEdit, status }: FicheroCardProps) {
  const { error, extension } = useMemo(() => {
    try {
      const parts = fichero.nombre.split(".");
      if (parts.length < 2) throw new Error("Sin extensión");
      const EXTENSION = "." + parts.pop();
      return { extension: EXTENSION, error: false };
    } catch {
      return { extension: null, error: true };
    }
  }, [fichero]);

  return (
    <Card>
      <Stack spacing={1} p={2} alignItems={"center"}>
        {error ? (
          <Alert severity="error">Hubo un error cargando este archivo</Alert>
        ) : (
          <>
            <GetIconFichero extension={extension!} />
            <Typography variant="h6">{fichero.nombre}</Typography>
          </>
        )}

        {status === "update" && <Alert severity="warning">Cambios pendientes por guardar</Alert>}

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Tooltip title="Editar">
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          {handleDelete && (
            <Tooltip title="Eliminar">
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Stack>
    </Card>
  );
}
