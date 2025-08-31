import { Editor, OnMount } from "@monaco-editor/react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Stack,
  Typography,
} from "@mui/material";
import * as monaco from "monaco-editor";
import {
  getFrameworkEnvAlert,
  keyOfTechnologiesForAlert,
} from "@modules/proyectos/utils/technologies";
import { openInNewTab } from "@modules/general/utils/openTab";
import { Fichero } from "@modules/proyectos/types/fichero";
import { fileToString } from "@modules/proyectos/utils/castingFiles";
import { EnvValidator } from "@modules/proyectos/utils/forms/repositorio.schema";
import { z } from "zod";

type Props = {
  fichero: Fichero;
  disabled: boolean;
  handleSave: (i: number, contenido: string) => void;
  framework: string;
  index: number;
  handleClose: Function;
};

export default function EditorExtraFiles({
  fichero,
  disabled,
  framework,
  index,
  handleSave,
  handleClose,
}: Props) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const loadFile = async () => {
      if (fichero.contenido) {
        const text = await fileToString(fichero.contenido);
        setValue(text);
      }
    };

    loadFile();
  }, [fichero]);

  const IS_ENV_FILE = useMemo(() => {
    return fichero.nombre.endsWith(".env");
  }, [fichero]);

  useEffect(() => {
    // debug
    console.log("Monaco instance loaded:", editorRef.current);
  }, []);

  const handleEditorDidMount: OnMount = async (editor, _monacoInstance) => {
    if (fichero.contenido == null) return;
    editorRef.current = editor;
    const initialValue = await fileToString(fichero.contenido);
    editor.updateOptions({ readOnly: disabled });
    editor.setValue(initialValue);
  };

  const onSave = () => {
    const currentValue = value ?? "";
    if (!IS_ENV_FILE) {
      setValidationError("Este archivo no es un .env, no requiere validación.");
      return;
    }

    try {
      console.log(currentValue, framework);
      EnvValidator.parse({
        variables: currentValue,
        framework: framework,
      });
      console.log("flag");

      setValidationError(null);
      handleSave(index, value);
    } catch (e) {
      if (e instanceof z.ZodError) {
        setValidationError(e.errors[0].message);
      } else {
        setValidationError("Error inesperado al validar el archivo .env");
      }
    }
  };

  return (
    <Card sx={{ padding: 2}}>
      <Stack spacing={2}>
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{fichero.nombre}</span>
            <div style={{ display: "flex" }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={onSave}
                disabled={disabled}
              >
                Guardar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => handleClose(undefined)}
                sx={{ ml: 2 }}
              >
                {"Cerrar"}
              </Button>
            </div>
          </div>

          <div style={{ height: "300px" }}>
            <Editor
              value={value}
              onChange={(next_val) => setValue(next_val ?? "")}
              onMount={handleEditorDidMount}
              defaultLanguage="ini"
              theme="vs-dark"
              options={{ fontSize: 14 }}
            />
          </div>
        </div>

        {validationError && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {validationError}
          </Alert>
        )}
      </Stack>
    </Card>
  );
}

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

