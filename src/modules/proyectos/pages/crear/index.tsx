import { Stack, Paper, Typography} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PolylineIcon from "@mui/icons-material/Polyline";
import { labelCreateProject } from "@modules/proyectos/enum/labelCrear"; // Ajusta el path
import { ProyectoSchema } from "@modules/proyectos/utils/forms/proyecto.schema";
import { Information } from "@modules/proyectos/components/configuracion/information";
import { Repositories } from "@modules/proyectos/components/configuracion/repositories";
import { DataBase } from "@modules/proyectos/components/configuracion/database";
import { useAuth } from "@modules/general/context/accountContext";
import StepperStandard from "@modules/general/components/stepper";
import { useStepper } from "@modules/general/hooks/useStepper";
import { StepperContext } from "@modules/general/context/stepper.Contex";

export default function CrearProyecto() {
  const methods = useForm<ProyectoSchema>({
    resolver: zodResolver(ProyectoSchema),
    defaultValues: {
      frontend: { url: "" },
      backend: { url: "" },
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


  const token = useAuth().accountInformation.token;

  const { activeStep, handleNext, isStepSkipped } = useStepper();


  const contents: [string, React.ReactNode][] = [
    ["Definir Información Básica", <Information />],
    ["Registrar Proyectos", <Repositories />],
    ["Definir Base de Datos", <DataBase />],
  ];

  return (
    <FormProvider {...methods}>
      <StepperContext.Provider value={{ handleNext: handleNext }}>
        <Stack spacing={3} component={Paper} padding={{xs: 1, md: 3}}>
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
      </StepperContext.Provider>
    </FormProvider>
  );
}
