import { Box, Button } from "@mui/material";
import React, { useMemo, useState } from "react";
import Collaborators from "./collaborators";
import Repositories from "./repositories";
import Database from "./database";
import { ProyectoContext } from "@modules/projects/context/proyectoContext";
import Logs from "./logs";
import Adicionales from "./adicionales";
import { TypeProyecto } from "@modules/general/utils/data/proyectos";
import { ProyectoSchema } from "@modules/projects/utils/zod/proyectoSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ContentsProps {
  currentOption: number;
  setCurrentOption?: React.Dispatch<number>;
  proyecto: TypeProyecto | undefined;
}

const Contents: React.FC<ContentsProps> = ({ currentOption, proyecto }) => {
  const formSchema = ProyectoSchema;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<TypeProyecto>({
    resolver: zodResolver(formSchema),
    defaultValues: proyecto,
  });

  // Manejo del envío del formulario
  const onSubmit: SubmitHandler<TypeProyecto> = (data) => {
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
        return <Repositories />;

      case 1:
        return <Logs />;

      case 2:
        return <Database />;

      // case 3:
      //   return <Collaborators />;

      case 4:
        return <Adicionales />;

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
