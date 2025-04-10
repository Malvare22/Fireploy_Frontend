import { Stack, Paper, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PolylineIcon from "@mui/icons-material/Polyline";
import { labelCreateProject } from "@modules/proyectos/enum/labelCrear"; // Ajusta el path
import { ProyectoSchema } from "@modules/proyectos/utils/forms/proyecto.schema";
import { Information } from "@modules/proyectos/components/configuracion/information";
import { Repositories } from "@modules/proyectos/components/configuracion/repositories";
import { DataBase } from "@modules/proyectos/components/configuracion/database";
import StepperStandard from "@modules/general/components/stepper";
import { useStepper } from "@modules/general/hooks/useStepper";
import { StepperContext } from "@modules/general/context/stepper.Contex";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { adaptProject } from "@modules/proyectos/utils/adapt.proyecto";
import { getProjectById } from "@modules/proyectos/services/get.project";
import { useAuth } from "@modules/general/context/accountContext";

export default function CrearProyecto() {


  const [idProject] = useState(() => {
    const stored = localStorage.getItem("PROJECT_ID_CREATE");
    return parseInt(stored ?? '10');
  });
  

  const { token } = useAuth().accountInformation;

  const { data: project, error: errorProject } = useQuery({
    queryFn: () => getProjectById(token, idProject),
    queryKey: ["Get Project In Create Proccess"],
    enabled: idProject !== -1,
    retry: 2,
  });

  const methods = useForm<ProyectoSchema>({
    resolver: zodResolver(ProyectoSchema),
    defaultValues: {
      integrado: { url: "", tipo: "B" },
      baseDeDatos: {
        nombre: "",
        contrasenia: "",
        tipo: "S",
      },
      titulo: "",
      descripcion: "",
    },
  });

  console.log(idProject);

  const { reset } = methods;

  useEffect(() => {
    if (project) {
      reset(adaptProject(project));
    }
  }, [project]);

  const { activeStep, handleNext, isStepSkipped } = useStepper();

  const contents: [string, React.ReactNode][] = [
    ["Definir Información Básica", <Information />],
    ["Registrar Proyectos", <Repositories />],
    ["Definir Base de Datos", <DataBase />],
  ];

  return (
    <FormProvider {...methods}>
      <StepperContext.Provider value={{ handleNext: handleNext }}>
        <Stack spacing={3} component={Paper} padding={{ xs: 1, md: 3 }}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography variant="h4" sx={{ fontWeight: "500" }}>
              {labelCreateProject.crearProyecto}
            </Typography>
            <PolylineIcon sx={{ fontSize: 32 }} />
          </Stack>
          <StepperStandard activeStep={1} isStepSkipped={isStepSkipped} contents={contents} />
        </Stack>
      </StepperContext.Provider>
    </FormProvider>
  );
}
