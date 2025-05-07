import AlertDialog from "@modules/general/components/alertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import SpringModal from "@modules/general/components/springModal";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog, { ShowDialogParams } from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import CardSeccion from "@modules/materias/components/cardSeccion";
import { LabelCurso } from "@modules/materias/enums/labelCurso";
import { getCursoById } from "@modules/materias/services/get.curso";
import { Curso } from "@modules/materias/types/curso";
import { CursoService } from "@modules/materias/types/curso.service";
import { adaptCursoService } from "@modules/materias/utils/adapters/curso.service";
import ModalProyectoPortafolio from "@modules/proyectos/components/modalProyectoPortafolio";
import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import { Avatar, Button, Card, Grid2, Stack, Typography, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export const DialogContext = createContext({
  showDialog: (_x: ShowDialogParams) => {},
  setError: (_x: any) => {},
});

/**
 * VerInformacionCurso component – Displays detailed information about a specific course (Curso).
 * 
 * This component fetches the course details using `getCursoById` API call and displays:
 * - The subject (Materia) name
 * - The course group name
 * - The course description
 * - Sections associated with the course
 * 
 * It manages loading and error states, displaying loading spinners and dialogs for feedback.
 * 
 * @component
 * 
 * @example
 * ```tsx
 * <VerInformacionCurso />
 * ```
 * 
 * @returns {JSX.Element} The rendered component displaying the detailed course information.
 *
 * @notes
 * - Displays information about the selected course, its sections, and related subject.
 * - Shows a loading spinner while fetching data and error messages if something goes wrong.
 * - Allows interaction with course sections, opening modals with project details if available.
 */
function VerInformacionCurso() {
  /** Get course ID from route parameters */
  const { idCurso } = useParams();

  /** Get auth token from context */
  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  /** Dialog and loading management */
  const { showDialog, open, title, message, type, handleAccept, isLoading } = useAlertDialog();

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
    queryFn: async () => {
      const response = await getCursoById(token, idCurso ?? "-1");
      return { ...response, id: idCurso } as CursoService;
    },
    queryKey: ["Get Curso By Id", idCurso ?? "-1"],
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
    if (data) {
      setCurso(adaptCursoService(data));
    }
  }, [data]);

  const [projectSelect, setProjectSelect] = useState<ProyectoCard | null>(null);

  function handleCard(project: ProyectoCard) {
    setProjectSelect(project);
    handleOpenModal();
  }

  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    open: openModal,
  } = useModal();

  return (
    <DialogContext.Provider value={{ showDialog: showDialog, setError: setError }}>
      {/* Generic alert dialog for success/error */}
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
        isLoading={isLoading}
      />

      <SpringModal handleClose={handleCloseModal} open={openModal}>
        <>{projectSelect && <ModalProyectoPortafolio proyecto={projectSelect} />}</>
      </SpringModal>

      {/* Loader during data fetching */}
      {isLoadingFetch ? (
        <LoaderElement />
      ) : (
        <>
          {/* Render only if course is available */}
          {curso && (
            <Stack spacing={3} paddingX={{ lg: 5 }}>
              {/* Subject name and course group */}
              <Typography variant="h3">
                {curso.materia?.nombre} - {curso.grupo}
              </Typography>

              {/* Course description */}
              <Typography variant="h6" sx={{ maxWidth: 600 }}>
                {curso.descripcion}
              </Typography>

              {/* Section title */}
              <Typography variant="h4">{LabelCurso.secciones}</Typography>

              {/* Sections layout */}
              <Grid2 container spacing={3} direction={{ xs: "column-reverse", xl: "row" }}>
                {/* List of course sections */}
                <Grid2 size={{ xs: 12, lg: 8 }}>
                  <Stack spacing={2}>
                    {curso.secciones?.map((seccion, key) => (
                      <CardSeccion
                        seccion={seccion}
                        idMateria={curso.materia?.id ?? 0}
                        idCurso={curso.id}
                        handleCard={handleCard}
                        key={key}
                      />
                    ))}
                  </Stack>
                </Grid2>

                <Grid2 size={{ xs: 12, lg: 4 }}>
                  <FrameDocente docente={curso.docente} />
                </Grid2>
              </Grid2>
            </Stack>
          )}
        </>
      )}
    </DialogContext.Provider>
  );
}

export default VerInformacionCurso;

/**
 * Optional component to render teacher (docente) information.
 * Uncomment and adapt if you need to display teacher cards in the future.
 */

type FrameDocenteProps = {
  docente: Curso["docente"];
};
const FrameDocente: React.FC<FrameDocenteProps> = ({ docente }) => {
  if (!docente) return <></>;
  const theme = useTheme();

  const navigate = useNavigate();

  function nav() {
    const ID: string = (docente?.id ?? "-1").toString();
    navigate(rutasUsuarios.portafolio.replace(":id", ID));
  }

  return (
    <Card
      sx={{
        height: "auto",
        padding: 2,
        color: "white",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Stack spacing={1}>
        <Button onClick={nav}>
          <Avatar src={docente.imagen} sx={{ width: 64, height: 64 }} />
        </Button>
        <Button
          sx={{ textTransform: "none", color: "white", textAlign: "left" }}
          onClick={nav}
          variant="text"
        >
          <Typography variant="h6">{docente.nombre}</Typography>
        </Button>
      </Stack>
    </Card>
  );
};
