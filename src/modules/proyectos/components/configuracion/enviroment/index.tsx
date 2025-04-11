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

  // 🧠 Obtener error del campo actual (frontend.variables, etc)
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
          Archivo .env
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
                {/* 🔥 Mostrar error si existe */}
                {fieldError && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {fieldError.message?.toString()}
            </Alert>
          )}
    </Stack>
  );
}
