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
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import SpringModal from "@modules/general/components/springModal";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog, { ShowDialogParams } from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import CardSeccion from "@modules/materias/components/cardSeccion";
import { LabelCurso } from "@modules/materias/enums/labelCurso";
import { getCursoById } from "@modules/materias/services/get.curso";
import { Curso } from "@modules/materias/types/curso";
import { adaptCursoService } from "@modules/materias/utils/adapters/curso.service";
import ModalProyectoPortafolio from "@modules/proyectos/components/modalProyectoPortafolio";
import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import {
  Avatar,
  Button,
  Card,
  Grid2,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export const DialogContext = createContext({
  showDialog: (_x: ShowDialogParams) => {},
  setError: (_x: any) => {},
});

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
    queryFn: () => getCursoById(token, idCurso ?? "-1"),
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
                      <CardSeccion seccion={seccion} idMateria={curso.materia?.id ?? 0} handleCard={handleCard} key={key} />
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
        <Button sx={{ textTransform: "none", color: 'white', textAlign: 'left' }} onClick={nav} variant="text">
          <Typography variant="h6">{docente.nombre}</Typography>
        </Button>
      </Stack>
    </Card>
  );
};
