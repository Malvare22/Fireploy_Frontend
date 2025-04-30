import ProjectForList from "@modules/proyectos/components/projectForList";
import { labelProjectForList } from "@modules/proyectos/enum/labelProjectForList";
import { Proyecto } from "@modules/proyectos/types/proyecto.tipo";
import { getExecutionStateArray } from "@modules/proyectos/utils/getExecutionState";
import {  Box, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjectByUserId } from "@modules/proyectos/services/get.project";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import { adaptProject } from "@modules/proyectos/utils/adapt.proyecto";
import AlertDialog from "@modules/general/components/alertDialog";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import { labelSelects } from "@modules/general/enums/labelSelects";
import {
  FilterOptions,
  SelectFilters,
  SelectOrders,
  SorterOptions,
} from "@modules/general/components/selects";

function MisProyectos() {
    
  const proyectosSectionRef = useRef<HTMLDivElement>(null);

  const { token, id } = useAuth().accountInformation;

  const { data, isLoading, error } = useQuery({
    queryFn: () => getProjectByUserId(token, id),
    queryKey: ["Get All Project by User Id", id],
  });

  const [projects, setProjects] = useState<Proyecto[]>([]);

  useEffect(() => {
    if (data) {
      setProjects(data.map(adaptProject));
    }
  }, [data]);

  const { handleAccept, message, open, showDialog, type } = useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  useEffect(() => {
    if (error) setError(error);
  }, [error]);

  // const sorterOptions: SorterOptions = [
  //   {
  //     key: "calificacion",
  //     label: 'Calificación',
  //     options: {
  //       asc: labelSelects.mayor,
  //       desc: labelSelects.menor,
  //       defaultValue: labelSelects.noAplicar
  //     }
        
  //   },
  //   {
  //     key: "fechaUltimaModificacion",
  //     label: 'Última Calificación',
  //     options: {
  //       asc: labelSelects.mayor,
  //       desc: labelSelects.menor,
  //       defaultValue: labelSelects.noAplicar
  //     }
  //   },
  // ];

  // const filterOptions: FilterOptions = [
  //   {
  //     key: "Estado",
  //     label: "estado",
  //     options: getExecutionStateArray.map(
  //       ([value, key]) => [key, (x: any) => x.value == value] as [string, (x: any) => boolean]
  //     ),
  //   },
  // ];

  
  // const [buffer, setBuffer] = useState<Proyecto[]>(projects);
  
  // console.log(data, projects, buffer)
  // const [bufferSort, setBufferSort] = useState<Proyecto[]>(buffer);

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title="Consultar Proyectos"
        textBody={message}
        type={type}
      />
      {isLoading ? (
        <LoaderElement />
      ) : (
        <Stack spacing={4}>
          <Box id="misProyectos" ref={proyectosSectionRef}>
            <Stack spacing={2} paddingX={2}>
              <Typography variant="h4" textTransform={"capitalize"}>
                {labelProjectForList.titulo}
              </Typography>
            </Stack>
          </Box>
          {/* <SelectFilters<Proyecto>
            data={projects}
            filterOptions={filterOptions}
            setRefineData={setBuffer}
          />
          <SelectOrders<Proyecto>
            data={buffer}
            sorterOptions={sorterOptions}
            setRefineData={setBufferSort}
          /> */}
          <Stack alignItems={"center"} width={"100%"}>
            <Stack spacing={2}>
              {projects.map((proyecto, key) => (
                <ProjectForList proyecto={proyecto} key={key} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default MisProyectos;
