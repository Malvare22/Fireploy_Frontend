import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import { KeysOfRepository } from "@modules/proyectos/types/keysOfRepository";
import { UseFormSetValue } from "react-hook-form";
import {
  hasValidExtension,
  msgNoValidExtension,
  VALID_EXTENSIONS,
} from "@modules/general/utils/form/validExtensions";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import HiddenButton from "@modules/materias/components/hiddenInput";
import DeleteIcon from "@mui/icons-material/Delete";
import { Proyecto } from "@modules/proyectos/types/proyecto.tipo";
import { Button, IconButton, Stack, Tooltip } from "@mui/material";

export type FilesRepository = Record<KeysOfRepository, File | null>;

type ProyectoForm = Pick<Proyecto, "backend" | "frontend" | "integrado">;

type InputFileForRepositoryProps = {
  layer: KeysOfRepository;
  disabled: boolean;
  files: FilesRepository;
  setFiles: React.Dispatch<FilesRepository>;
  setValue: UseFormSetValue<ProyectoForm>;
  alertVariables: ReturnType<typeof useAlertDialog>;
};

function InputFileForRepository({
  layer,
  disabled,
  files,
  setFiles,
  setValue,
  alertVariables,
}: InputFileForRepositoryProps) {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { files: targetFiles } = e.target;

    if (!targetFiles || !targetFiles[0]) {
      setFiles({ ...files, [layer]: null });
    } else {
      setFiles({ ...files, [layer]: targetFiles[0] });
      if (hasValidExtension(targetFiles[0].name, "SOURCE_CODE")) setValue(`${layer}.file`, true);
      else {
        setValue(`${layer}.file`, null);
        setFiles({ ...files, [layer]: null });
        showError();
      }
    }
  }

  function handleDelete() {
    setValue(`${layer}.file`, null);
    setFiles({ ...files, [layer]: null });
  }

  function showError() {
    alertVariables.showDialog({
      message: msgNoValidExtension("SOURCE_CODE"),
      type: "error",
      onAccept: alertVariables.handleClose,
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
        startIcon={<FolderZipIcon />}
      >
        {!files[layer]?.name ? "Subir fichero" : files[layer]?.name}
        <HiddenButton
          type="file"
          accept={VALID_EXTENSIONS.SOURCE_CODE.join(", ")}
          onChange={onChange}
        />
      </Button>
      <Tooltip
        title={`Código fuente en formato comprimido (${VALID_EXTENSIONS.SOURCE_CODE.join(", ")})`}
      >
        <HelpOutlineIcon />
      </Tooltip>
      <Tooltip title="Eliminar Archivo">
        <IconButton onClick={handleDelete} disabled={files[layer] == null}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

export default InputFileForRepository;
