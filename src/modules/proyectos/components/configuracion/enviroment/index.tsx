import { Editor, OnMount, useMonaco } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { labelConfiguracion } from "@modules/proyectos/enum/labelConfiguracion";
import { ProyectoRepositoriesSchema } from "@modules/proyectos/utils/forms/proyecto.schema";
import { KeysOfRepository } from "@modules/proyectos/types/keysOfRepository";
import * as monaco from "monaco-editor";
import { useFormContext, Controller } from "react-hook-form";
import {
  getFrameworkEnvAlert,
  keyOfTechnologiesForAlert,
} from "@modules/proyectos/utils/technologies";
import { openInNewTab } from "@modules/general/utils/openTab";
import CloseIcon from "@mui/icons-material/Close";
import { RESERVED_VARIABLES } from "@modules/proyectos/utils/technologies";

type Props = {
  type: KeysOfRepository; // "frontend" | "backend" | "integrado"
  disabled: boolean;
};

/**
 * EnviromentVariablesEditor Component – A component that renders a Monaco code editor for editing environment variables in a `.env` file format.
 *
 * This component uses Monaco editor to provide a rich text editor for the environment variables associated with a specific repository type (`frontend`, `backend`, or `integrado`). The editor's content is tied to a specific field in a form, and it supports error handling if the field validation fails.
 *
 * @param {Props} props - The props for the EnviromentVariablesEditor component.
 * @param {KeysOfRepository} props.type - The type of repository (either "frontend", "backend", or "integrado") that determines which environment variable field is rendered.
 *
 * @returns {JSX.Element} The rendered environment variables editor with Monaco, including form field integration and error handling.
 *
 * @example
 * <EnviromentVariablesEditor type="frontend" />
 * <EnviromentVariablesEditor type="backend" />
 * <EnviromentVariablesEditor type="integrado" />
 */
export default function EnviromentVariablesEditor({ type, disabled }: Props) {
  const monacoInstance = useMonaco();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  function TransitionAlert() {
    const [open, setOpen] = useState(true);

    return (
      <Box sx={{ width: "100%" }}>
        <Collapse in={open}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            <AlertTitle>{"Restricciones de variables de entorno"}</AlertTitle>
            <Typography>
              {
                "El siguiente es un listado de las variables no permitidas para el correcto funcionamiento del sistema de despliegues:"
              }
            </Typography>
            <Typography>{`Cualquier tipo de proyecto: ${RESERVED_VARIABLES.GENERAL.join(", ")}`}</Typography>
            <Typography>{`Proyectos con base de datos SQL: ${RESERVED_VARIABLES.SQL.join(", ")}`}</Typography>
            <Typography>{`Proyectos con base de datos  NoSQL: ${RESERVED_VARIABLES.NO_SQL.join(", ")}`}</Typography>
          </Alert>
        </Collapse>
      </Box>
    );
  }

  const {
    getValues,
    formState: { errors },
  } = useFormContext<ProyectoRepositoriesSchema>();

  const framework = getValues(`${type}.informacion.framework`);

  useEffect(() => {
    if (monacoInstance) {
      console.log("Monaco instance loaded:", monacoInstance);
    }
  }, [monacoInstance]);

  const handleEditorDidMount: OnMount = (editor, _monacoInstance) => {
    editorRef.current = editor;
    const initialValue = getValues(`${type}.variables`) || "";
    editor.updateOptions({ readOnly: disabled });
    editor.setValue(initialValue);
  };

  const fieldError = errors?.[type]?.variables;

  function getAlertInformation(framework: string | null) {
    if (framework && keyOfTechnologiesForAlert.includes(framework)) {
      return (
        <Alert sx={{ display: "flex", alignItems: "center" }} severity="warning">
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Typography>{getFrameworkEnvAlert[framework].message}</Typography>
            <Button
              variant="outlined"
              onClick={() => openInNewTab(getFrameworkEnvAlert[framework].myDocUrl)}
            >
              Ver más detalles
            </Button>
          </Stack>
        </Alert>
      );
    }
    return <></>;
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h6">{labelConfiguracion.variablesDeEntorno}</Typography>
      <Typography variant="body1" marginBottom={3}>
        {labelConfiguracion.variablesDeEntornoParrafo}
      </Typography>
      <TransitionAlert />
      {getAlertInformation(framework)}
      <div>
        <div
          style={{
            backgroundColor: "#1e1e1e",
            color: "white",
            padding: "8px 12px",
            fontFamily: "monospace",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
          }}
        >
          Fichero .env
        </div>

        <div style={{ height: "300px" }}>
          <Controller
            name={`${type}.variables`}
            render={({ field }) => (
              <Editor
                value={field.value}
                onChange={(value) => field.onChange(value ?? "")}
                onMount={handleEditorDidMount}
                defaultLanguage="ini"
                theme="vs-dark"
                options={{ fontSize: 14 }}
              />
            )}
          />
        </div>
      </div>
      {fieldError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {fieldError.message?.toString()}
        </Alert>
      )}
    </Stack>
  );
}
