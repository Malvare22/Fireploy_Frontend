import { Editor, OnMount, useMonaco } from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import { Divider, Stack, Typography } from "@mui/material";
import { labelConfiguracion } from "@modules/proyectos/enum/labelConfiguracion";
import { Repositorio } from "@modules/proyectos/types/repositorio";
import { useFormContext } from "react-hook-form";
import { ProyectoSchema } from "@modules/proyectos/utils/forms/proyecto.schema";

type Props = {
  type: Repositorio["tipo"];
};

export default function EnviromentVariablesEditor({ type }: Props) {
  const monaco = useMonaco();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const { setValue, getValues } = useFormContext<ProyectoSchema>();

  const keyProp = (): keyof ProyectoSchema => {
    switch (type) {
      case "B":
        return "backend";
      case "F":
        return "frontend";
      case "I":
        return "integrado";
    }
  };

  const getRepoValue = (key: keyof ProyectoSchema): Repositorio | undefined => {
    const value = getValues()[key];
    return typeof value === "object" && value !== null && "variables" in value
      ? (value as Repositorio)
      : undefined;
  };

  useEffect(() => {
    if (monaco) {
      console.log("Monaco instance loaded:", monaco);
    }
  }, [monaco]);

  const handleEditorDidMount: OnMount = (editor, _monacoInstance) => {
    editorRef.current = editor;

    const key = keyProp();
    const repo = getRepoValue(key);
    const initialValue = repo?.variables;

    editor.setValue(initialValue ?? '');
  };

  const handleEditorChange = () => {
    const value = editorRef.current?.getValue() || "";

    const key = keyProp();
    const repo = getRepoValue(key);

    // if (repo) {
    //   setValue(key, {
    //     ...repo,
    //     variables: value,
    //   });
    // }
  };

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
          {"Archivo .env"}
        </div>

        <div style={{ height: "300px" }}>
          <Editor
            defaultLanguage="ini"
            theme="vs-dark"
            onMount={handleEditorDidMount}
            options={{ fontSize: 14 }}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    </Stack>
  );
}
