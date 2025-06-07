import AlertDialog from "@modules/general/components/alertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog, { ShowDialogParams } from "@modules/general/hooks/useAlertDialog";
import useErrorReader, { SpecialError } from "@modules/general/hooks/useErrorReader";
import CardSeccion from "@modules/materias/components/cardSeccion";
import { LabelCurso } from "@modules/materias/enums/labelCurso";
import { getCursoById, getCursos } from "@modules/materias/services/get.curso";
import { Curso } from "@modules/materias/types/curso";
import { CursoService } from "@modules/materias/types/curso.service";
import { adaptCursoService } from "@modules/materias/utils/adapters/curso.service";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { patchEstudiantesCurso } from "@modules/materias/services/patch.curso.estudiantes";
import { rutasProyectos } from "@modules/proyectos/router";
import EditIcon from "@mui/icons-material/Edit";
import { rutasMaterias } from "@modules/materias/router/routes";
import { AlertDialogProvider } from "@modules/general/context/alertDialogContext";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import { ActivityAndStudents } from "@modules/materias/components/cardCurso";

export const DialogContext = createContext({
  showDialog: (_x: ShowDialogParams) => {},
  setError: (_x: any) => {},
});

function VerInformacionCurso() {
  /** Get course ID from route parameters */
  const { idCurso } = useParams();

  const navigate = useNavigate();

  /** Get auth token from context */
  const { accountInformation } = useAuth();
  const { token, id: idUser, tipo } = accountInformation;

  const theme = useTheme();

  /** Dialog and loading management */
  const {
    showDialog,
    open,
    title,
    message,
    type,
    handleAccept,
    isLoading,
    setIsLoading,
    handleCancel,
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
    queryFn: async () => {
      const response = await getCursoById(token, idCurso ?? "-1");
      let myGroups: CursoService[] = [];
      if (tipo == "E") myGroups = await getCursos(token, { estudiantes: idUser });
      if (tipo == "D") myGroups = await getCursos(token, { docente: idUser });

      let flag = false;
      myGroups.forEach((course) => {
        if (course.id === idCurso) {
          flag = true;
          return;
        }
      });
      if (!(tipo == "A" || flag)) {
        throw new SpecialError("No te encuentras registrado en este curso", "FRONTEND_ERROR");
      }

      return { ...response, id: idCurso } as CursoService;
    },
    queryKey: ["Get Curso By Id", idCurso ?? "-1", token],
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

  function handleClickDocente() {
    if (curso && curso.docente && curso.docente.id)
      navigate(rutasUsuarios.portafolio.replace(":id", curso.docente.id.toString()));
  }

  function MenuCurso() {
    /**
     * Mutation to remove student to a course
     */
    const { mutate: logoutCourse } = useMutation({
      mutationFn: async ({ cursoId, studentId }: { cursoId: string; studentId: number }) => {
        setIsLoading(true);
        return await patchEstudiantesCurso(token, [studentId], "D", cursoId);
      },
      mutationKey: ["Register In Group", token],
      onSuccess: () => {
        showDialog({
          title: "Retirarse del curso",
          message: "Te has desvinculado en el curso correctamente",
          type: "success",
          onAccept: () => {
            navigate(rutasProyectos.menu);
          },
        });
      },
      onError: (error) => setError(error),
    });

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    function handleLeaveCourse() {
      showDialog({
        message: `¿Está seguro de que desea desvincularse del curso ${curso?.materia?.nombre ?? ""}: ${curso?.grupo ?? ""}?`,
        title: "Desvinculación de curso",
        onAccept: () => {
          logoutCourse({ cursoId: idCurso ?? "", studentId: idUser });
        },
        onCancel: () => handleClose(),
        type: "default",
      });
    }

    function handleEdit() {
      navigate(rutasMaterias.editarCurso.replace(":idCurso", idCurso ?? "-1"));
    }

    return (
      <div>
        <IconButton onClick={handleClick} size="large">
          <SettingsIcon sx={{ color: "white", fontSize: 42 }} />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuList>
            {tipo == "E" && (
              <MenuItem onClick={handleLeaveCourse}>
                <ListItemIcon>
                  <ExitToAppIcon fontSize="medium" color="error" />
                </ListItemIcon>
                <Typography variant="body2" color="error">
                  Desvincularse del curso
                </Typography>
              </MenuItem>
            )}
            {tipo != "E" && (
              <MenuItem onClick={handleEdit}>
                <ListItemIcon>
                  <EditIcon fontSize="medium" />
                </ListItemIcon>
                <Typography variant="body2">Editar Curso</Typography>
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </div>
    );
  }

  return (
    <AlertDialogProvider>
      {/* Generic alert dialog for success/error */}
      <AlertDialog
        handleAccept={handleAccept}
        handleCancel={handleCancel}
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
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
          {/* Render only if course is available */}
          {curso && (
            <>
              {/* Subject name and course group */}
              <Card
                sx={{
                  padding: 2,
                  color: "white",
                  backgroundColor: theme.palette.terciary.main,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 3,
                }}
              >
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography variant="h3">
                    {curso.materia?.nombre} - {curso.grupo}
                  </Typography>
                  <Box>
                    <MenuCurso />
                  </Box>
                </Stack>
                {/* Course description */}
                <Typography variant="h6" sx={{ maxWidth: 800 }}>
                  Cupidatat aute fugiat occaecat nostrud sunt proident magna non. Nulla aliqua amet
                  exercitation labore laboris eiusmod. Lorem excepteur deserunt officia incididunt
                  dolor ullamco commodo culpa. Occaecat voluptate officia velit officia sint est
                  esse mollit irure aliquip est non mollit veniam.
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                  <ActivityAndStudents
                  cntActities={(curso.estudiantes ?? []).length}
                  cntStudents={(curso.secciones ?? []).length}
                />
                  {curso.docente ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Tooltip title={curso.docente?.nombre}>
                      <Button onClick={handleClickDocente}>
                        <Avatar sx={{ width: 48, height: 48 }} src={curso.docente?.imagen} />
                      </Button>
                    </Tooltip>
                    <Typography variant="h5">{curso.docente?.nombre}</Typography>
                  </Box>
                ) : (
                  <Alert severity="info">
                    {"El curso actualmente no cuenta con un docente asignado"}
                  </Alert>
                )}
                </Box>
              </Card>
              {/* Section title */}
              <Typography variant="h4">{LabelCurso.secciones}</Typography>

              {/* Sections layout */}

              {/* List of course sections */}

              <Stack spacing={2}>
                {curso.secciones && curso.secciones.length > 0 ? (
                  curso.secciones?.map((seccion, key) => (
                    <CardSeccion
                      seccion={seccion}
                      idMateria={curso.materia?.id ?? 0}
                      idCurso={curso.id}
                      key={key}
                    />
                  ))
                ) : (
                  <Alert severity="info">Este curso actualmente no tiene secciones agregadas</Alert>
                )}
              </Stack>
            </>
          )}
        </Box>
      )}
    </AlertDialogProvider>
  );
}

export default VerInformacionCurso;

// /**
//  * Optional component to render teacher (docente) information.
//  * Uncomment and adapt if you need to display teacher cards in the future.
//  */

// type FrameDocenteProps = {
//   docente: Curso["docente"];
// };
// const FrameDocente: React.FC<FrameDocenteProps> = ({ docente }) => {
//   if (!docente) return <></>;
//   const theme = useTheme();

//   const navigate = useNavigate();

//   function nav() {
//     const ID: string = (docente?.id ?? "-1").toString();
//     navigate(rutasUsuarios.portafolio.replace(":id", ID));
//   }

//   return (
//     <Card
//       sx={{
//         height: "auto",
//         padding: 2,
//         color: "white",
//         backgroundColor: theme.palette.primary.main,
//       }}
//     >
//       <Stack spacing={1}>
//         <Button onClick={nav}>
//           <Avatar src={docente.imagen} sx={{ width: 64, height: 64 }} />
//         </Button>
//         <Button
//           sx={{ textTransform: "none", color: "white", textAlign: "left" }}
//           onClick={nav}
//           variant="text"
//         >
//           <Typography variant="h6">{docente.nombre}</Typography>
//         </Button>
//       </Stack>
//     </Card>
//   );
// };
