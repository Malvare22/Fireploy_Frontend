import { Box, Button } from "@mui/material";
import React, { useMemo } from "react";
import Database from "./baseDeDatos";
import { ProyectoContext } from "@modules/proyectos/context/proyectoContext";
import Adicionales from "./adicionales";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Repositorios from "./repositorios";
import { Proyecto } from "@modules/proyectos/types/proyecto";
import ArchivosLogs from "./archivosLogs";
import { EdicionProyectoSchema } from "@modules/proyectos/utils/zod/proyecto.edicion.schema";
import { adaptarProyectoAEdicion } from "@modules/proyectos/utils/zod/adaptar.proyecto.edicion";

interface ContentsProps {
  currentOption: number;
  setCurrentOption?: React.Dispatch<number>;
  proyecto: EdicionProyectoSchema;
}

const Contents: React.FC<ContentsProps> = ({ currentOption, proyecto }) => {
  const formSchema = EdicionProyectoSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    setValue,
    watch
  } = useForm<EdicionProyectoSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: proyecto,
  });

  // Manejo del envío del formulario
  const onSubmit: SubmitHandler<EdicionProyectoSchema> = (data) => {
    console.log("Datos enviados:", data);
    alert("Formulario enviado con éxito");
  };

  const handleCancelar = () => reset(proyecto);

  const comparator = () => {
    return isDirty;
  };

  const Content = useMemo(() => {
    switch (currentOption) {
      case 0:
        return <Repositorios />;

      // case 1:
      //   return <ArchivosLogs />;

      // case 2:
      //   return <Database />;

      // // case 3:
      // //   return <Collaborators />;

      // case 4:
      //   return <Adicionales />;

      default:
        return <Box />;
    }
  }, [currentOption]);

  return (
    <ProyectoContext.Provider
      value={{
        proyecto: proyecto,
        register: register,
        errors: errors,
        setValue: setValue,
        watch: watch,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            padding: { sm: 4, xs: 2 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* {JSON.stringify(watch(), null, 2)} */}
          {Content}
          {comparator() && (
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button variant="contained" color="warning" type="submit">
                Guardar
              </Button>
              <Button
                variant="contained"
                sx={{ marginLeft: 2 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleCancelar();
                }}
              >
                Cancelar
              </Button>
            </Box>
          )}
        </Box>
      </form>
    </ProyectoContext.Provider>
  );
};

export default Contents;
