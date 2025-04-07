import AlertDialogError from "@modules/general/components/alertDialogError";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import CardSeccion from "@modules/materias/components/cardSeccion";
import { LabelCurso } from "@modules/materias/enums/labelCurso";
import { getCursoById } from "@modules/materias/services/get.curso";
import { Curso } from "@modules/materias/types/curso";
import { exampleSecciones } from "@modules/materias/types/seccion";
import { adaptCursoService } from "@modules/materias/utils/adapters/curso.service";
import { Card, Grid2, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

/**
 * Component to view detailed information about a specific course (Curso).
 *
 * This component fetches the course by its ID using `getCursoById` and displays
 * information such as the course's group, description, related subject (Materia),
 * and its sections (Secciones). Errors and loading states are also handled.
 *
 * @component
 */
function VerInformacionCurso() {
  // Get course ID from route parameters
  const { idCurso } = useParams();

  // Get auth token from context
  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  // Query to fetch course data by ID
  const { data, isLoading, error } = useQuery({
    queryFn: () => getCursoById(token, idCurso ?? "-1"),
    queryKey: [],
  });

  // Hook to manage error dialog state
  const { handleClose: handleCloseFailFetch, open: openFailFetch } = useAlertDialog();

  // Local state to store the adapted course data
  const [curso, setCurso] = useState<Curso | undefined>(undefined);

  // Adapt fetched course data and update state
  useEffect(() => {
    if (data) setCurso(adaptCursoService(data));
  }, [data]);

  return (
    <>
      {/* Error dialog shown if fetching the course fails */}
      {error && (
        <AlertDialogError
          error={error}
          handleClose={handleCloseFailFetch}
          open={openFailFetch}
          title="Consultar Grupo"
        />
      )}

      {/* Show loader while fetching data, else show main content */}
      {isLoading ? (
        <LoaderElement />
      ) : (
        <>
          {/* Render course info only when curso is defined */}
          {curso && (
            <Stack spacing={3} paddingX={{ lg: 5 }}>
              {/* Display course name and group */}
              <Stack direction={"row"} spacing={2}>
                <Typography variant="h3">{curso.materia?.nombre}</Typography>
                <Card>
                  <Typography variant="h3" paddingX={2}>
                    {curso.grupo}
                  </Typography>
                </Card>
              </Stack>

              {/* Display course description */}
              <Typography variant="h5">{curso.descripcion}</Typography>

              {/* Section title */}
              <Typography variant="h4">{LabelCurso.secciones}</Typography>

              {/* Section and (optional) docente panel */}
              <Grid2 container spacing={3} direction={{ xs: "column-reverse", xl: "row" }}>
                {/* List of course sections */}
                <Grid2 size={{ xs: 12 }}>
                  <Stack spacing={2}>
                    {exampleSecciones.map((seccion, key) => (
                      <CardSeccion seccion={seccion} key={key} />
                    ))}
                  </Stack>
                </Grid2>

                {/* Placeholder for docente info (currently commented) */}
                <Grid2 size={{ xl: 2, xs: 10, sm: 4 }}>
                  {/* <FrameDocente docente={docenteAdapt}/> */}
                </Grid2>
              </Grid2>
            </Stack>
          )}
        </>
      )}
    </>
  );
}

export default VerInformacionCurso;

// type FrameDocenteProps = {
//   docente: UsuarioPortafolioCard;
// };
// const FrameDocente: React.FC<FrameDocenteProps> = ({ docente }) => {
//   const theme = useTheme();

//   return (
//     <Card
//       sx={{
//         height: "auto",
//         padding: 2,
//         color: "white",
//         backgroundColor: theme.palette.terciary.main,
//       }}
//     >
//       <Stack>
//         <Typography variant="h5">{labelCardCurso.docente}</Typography>
//         <Stack>
//           <ProjectCardAvatar usuario={docente} sx={{ width: 64, height: 64 }} />
//           <Typography variant="h6">{docente.nombres}</Typography>
//         </Stack>
//       </Stack>
//     </Card>
//   );
// };