/**
 * Component to view detailed information about a specific course (Curso).
 *
 * This component fetches a course by ID using `getCursoById` and displays:
 * - Subject name (Materia)
 * - Course group
 * - Course description
 * - Associated sections (Secciones)
 *
 * It handles API loading, error states, and displays dialogs as needed.
 *
 * @component
 */

import AlertDialog from "@modules/general/components/alertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import CardSeccion from "@modules/materias/components/cardSeccion";
import { LabelCurso } from "@modules/materias/enums/labelCurso";
import { getCursoById } from "@modules/materias/services/get.curso";
import { Curso } from "@modules/materias/types/curso";
import { adaptCursoService } from "@modules/materias/utils/adapters/curso.service";
import { Card, Grid2, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

/**
 * VerInformacionCurso displays the details of a selected course (Curso),
 * including sections and its corresponding subject.
 *
 * @returns {JSX.Element} The rendered component
 */
function VerInformacionCurso() {
  /** Get course ID from route parameters */
  const { idCurso } = useParams();

  /** Get auth token from context */
  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  /** Dialog and loading management */
  const {
    showDialog,
    open,
    title,
    message,
    type,
    handleAccept,
    isLoading,
  } = useAlertDialog();

  /** Error handling with alert dialog */
  const { setError } = useErrorReader(showDialog);

  /**
   * Fetch course data using the course ID
   */
  const {
    data,
    isLoading: isLoadingFetch,
    error,
  } = useQuery({
    queryFn: () => getCursoById(token, idCurso ?? "-1"),
    queryKey: [], // No cache key provided (consider improving this)
  });

  /** State to store adapted course */
  const [curso, setCurso] = useState<Curso | undefined>(undefined);

  /**
   * Handle fetch error using error dialog
   */
  useEffect(() => {
    if (error) setError(error);
  }, [error]);

  /**
   * Adapt fetched course to internal format
   */
  useEffect(() => {
    if (data){ setCurso(adaptCursoService(data))};
  }, [data]);

  console.log(curso)

  return (
    <>
      {/* Generic alert dialog for success/error */}
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
        isLoading={isLoading}
      />

      {/* Loader during data fetching */}
      {isLoadingFetch ? (
        <LoaderElement />
      ) : (
        <>
          {/* Render only if course is available */}
          {curso && (
            <Stack spacing={3} paddingX={{ lg: 5 }}>
              {/* Subject name and course group */}
              <Stack direction={"row"} spacing={2}>
                <Typography variant="h3">{curso.materia?.nombre}</Typography>
                <Card>
                  <Typography variant="h3" paddingX={2}>
                    {curso.grupo}
                  </Typography>
                </Card>
              </Stack>

              {/* Course description */}
              <Typography variant="h5">{curso.descripcion}</Typography>

              {/* Section title */}
              <Typography variant="h4">{LabelCurso.secciones}</Typography>

              {/* Sections layout */}
              <Grid2 container spacing={3} direction={{ xs: "column-reverse", xl: "row" }}>
                {/* List of course sections */}
                <Grid2 size={{ xs: 12 }}>
                  <Stack spacing={2}>
                    {curso.secciones?.map((seccion, key) => (
                      <CardSeccion seccion={seccion} key={key} />
                    ))}
                  </Stack>
                </Grid2>

                {/* Placeholder for docente info */}
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

/**
 * Optional component to render teacher (docente) information.
 * Uncomment and adapt if you need to display teacher cards in the future.
 */

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
