import { Editor, OnMount, useMonaco } from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import { Alert, Stack, Typography } from "@mui/material";
import { labelConfiguracion } from "@modules/proyectos/enum/labelConfiguracion";
import { ProyectoRepositoriesSchema } from "@modules/proyectos/utils/forms/proyecto.schema";
import { KeysOfRepository } from "@modules/proyectos/types/keysOfRepository";
import * as monaco from "monaco-editor";
import { useFormContext, Controller } from "react-hook-form";

type Props = {
  type: KeysOfRepository; // "frontend" | "backend" | "integrado"
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
export default function EnviromentVariablesEditor({ type }: Props) {
  const monacoInstance = useMonaco();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const {
    getValues,
    formState: { errors },
  } = useFormContext<ProyectoRepositoriesSchema>();

  useEffect(() => {
    if (monacoInstance) {
      console.log("Monaco instance loaded:", monacoInstance);
    }
  }, [monacoInstance]);

  const handleEditorDidMount: OnMount = (editor, _monacoInstance) => {
    editorRef.current = editor;
    const initialValue = getValues(`${type}.variables`) || "";
    editor.setValue(initialValue);
  };

  const fieldError = errors?.[type]?.variables;

  return (
    <Stack spacing={0}>
      <Stack>
        <Stack marginBottom={2} direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h6">{labelConfiguracion.variablesDeEntorno}</Typography>
        </Stack>
        <Typography variant="body1" marginBottom={3}>
          {labelConfiguracion.variablesDeEntornoParrafo}
        </Typography>
      </Stack>

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
