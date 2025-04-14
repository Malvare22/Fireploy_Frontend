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
import { ParamsContext } from "@modules/general/context/paramasContext";
import { useParamsCustom } from "@modules/general/hooks/useParamsContext";

export default function CrearProyecto() {
  const [projectId, setProjectId] = useState<number | null>(null);

  const {searchParams,  setSearchParams, updateSearchParams} = useParamsCustom();

  useEffect(() => {
    const id = parseInt(searchParams.get("id") ?? "-1");
    setProjectId(id);
  }, [searchParams]);

  const { token } = useAuth().accountInformation;

  const { data: project, error: _errorProject } = useQuery({
    queryFn: () => getProjectById(token, projectId ?? -1),
    queryKey: ["Get Project In Create Proccess"],
    enabled: projectId !== -1,
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
    shouldFocusError: true
  });

  const { reset } = methods;

  useEffect(() => {
    if (project) {
      reset(adaptProject(project));
    }
  }, [project]);

  const { activeStep, handleNext, isStepSkipped } = useStepper();

  const contents: [string, React.ReactNode][] = [
    ["Definir Información Básica", <Information type="create"/>],
    ["Registrar Proyectos", <Repositories type="create"/>],
    ["Definir Base de Datos", <DataBase type="create"/>],
  ];

  return (
    <FormProvider {...methods}>
      <StepperContext.Provider value={{ handleNext: handleNext }}>
      <ParamsContext.Provider value={{searchParams: searchParams, setSearchParams: setSearchParams, updateSearchParams: updateSearchParams}}>
        <Stack spacing={3} component={Paper} padding={{ xs: 1, md: 3 }}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography variant="h4" sx={{ fontWeight: "500" }}>
              {labelCreateProject.crearProyecto}
            </Typography>
            <PolylineIcon sx={{ fontSize: 32 }} />
          </Stack>
          <StepperStandard
            activeStep={activeStep}
            isStepSkipped={isStepSkipped}
            contents={contents}
          />
        </Stack>
        </ParamsContext.Provider>
      </StepperContext.Provider>
    </FormProvider>
  );
}
