import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Grid,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useMemo } from "react";
import { Curso, UsuarioCurso } from "@modules/materias/types/curso";
import { useNavigate } from "react-router";
import { AccountInformation, useAuth } from "@modules/general/context/accountContext";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import { rutasMaterias } from "@modules/materias/router/routes";
import SchoolIcon from "@mui/icons-material/School";
import EditNoteIcon from "@mui/icons-material/EditNote";

type CardCursoProps = {
  curso: Curso;
  userType: AccountInformation["tipo"];
  isRegister: boolean;
  materiaNombre: string;
  onClick?: () => void;
};

/**
 * CardCurso component – renders a Material UI card displaying course details,
 * including group, subject name, activity and student counts, and the assigned teacher.
 * 
 * Depending on the user type and registration status, it conditionally enables interaction
 * to access, register, or request a course. It also styles the card accordingly.
 * 
 * @component
 * 
 * @param {object} curso - The course object containing group, assigned teacher, sections, and student data.
 * @param {string} userType - The type of user viewing the card ("E", "D", or "A").
 * @param {boolean} isRegister - Indicates if the user is already registered to the course.
 * @param {string} materiaNombre - The name of the subject associated with the course.
 * @param {Function} [onClick] - Optional click handler used for registration or request actions.
 * 
 * @returns {JSX.Element} A card component presenting the course overview with context-sensitive actions.
 * 
 * @example
 * ```tsx
 * <CardCurso
 *   curso={cursoData}
 *   userType="E"
 *   isRegister={false}
 *   materiaNombre="Matemáticas I"
 *   onClick={() => handleInscription(cursoData)}
 * />
 * ```
 */
const CardCurso: React.FC<CardCursoProps> = ({
  curso,
  onClick,
  userType,
  isRegister,
  materiaNombre,
}) => {
  const navigate = useNavigate();

  const { id } = useAuth().accountInformation;

  const theme = useTheme();

  const showDocentOwnerStyle = !(userType != "D" || (userType == "D" && !isRegister));

  const buttonElements = useMemo((): { color: "primary" | "info"; text: string } => {
    if (userType == "D" && curso.docente != null) {
      return { text: "Solicitar Curso", color: "info" };
    }
    if (userType == "E" && !isRegister) {
      return { text: "Inscribirme", color: "info" };
    }

    return { text: "Acceder", color: "primary" };
  }, [userType, isRegister]);

  function handleButton() {
    if (isRegister || userType == "A")
      navigate(rutasMaterias.verCurso.replace(":idCurso", curso.id ?? "-1"));
    else if (onClick) onClick();
  }

  /**
   * Un docente no puede solicitar un curso ya ocupado por otro docente
   */
  const buttonDisable = () => {
    return userType == "D" && curso.docente != null && curso.docente.id != id;
  };

  return (
    <Card sx={{ width: "100%" }}>
      {/* o cualquier altura deseada */}
      <Grid container spacing={1}>
        <Grid
          sx={{
            backgroundColor: theme.palette.primary.main,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingY: 2,
          }}
          size={{ md: 3, xs: 12 }}
        >
          <Typography variant="h1" sx={{ fontWeight: 500 }} color="white">
            {curso.grupo}
          </Typography>
        </Grid>

        <Grid
          size={{ md: 9, xs: 12 }}
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 1,
          }}
        >
          <Stack spacing={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5">{materiaNombre}</Typography>
            </Box>

            <ActivityAndStudents
              cntActities={(curso.estudiantes ?? []).length}
              cntStudents={(curso.secciones ?? []).length}
            />
            {!showDocentOwnerStyle && (
              <FrameDocente docente={!curso.docente ? null : (curso.docente as UsuarioCurso)} />
            )}
          </Stack>
          <Box sx={{ display: "flex", justifyContent: "end", marginTop: 2 }}>
            <Button
              disabled={buttonDisable()}
              size="small"
              variant="contained"
              color={buttonElements.color}
              onClick={handleButton}
            >
              {buttonElements.text}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardCurso;

type PropsFrameDocente = {
  docente: UsuarioCurso | undefined | null;
};

/**
 * FrameDocente component – displays the assigned teacher for the course,
 * including their avatar and name, with a link to their portfolio.
 * 
 * If no teacher is assigned, it shows an informational message instead.
 * 
 * @component
 * 
 * @param {object|null|undefined} docente - The teacher assigned to the course. If not available, a message is shown.
 * 
 * @returns {JSX.Element} A box showing teacher information or a fallback message.
 * 
 * @example
 * ```tsx
 * <FrameDocente docente={curso.docente} />
 * ```
 */
function FrameDocente({ docente }: PropsFrameDocente) {
  const navigate = useNavigate();

  function onClick() {
    if (docente) navigate(rutasUsuarios.portafolio.replace(":id", docente.id.toString()));
  }

  if (!docente) {
    return (
      <Alert severity="info">
        <Typography variant="caption">{"No se ha asignado un docente a este curso"}</Typography>
      </Alert>
    );
  } else
    return (
      <Box sx={{ display: "flex", gap: 0, alignItems: "center" }}>
        <Tooltip title={docente.nombre}>
          <Button onClick={onClick}>
            <Avatar src={docente.imagen} sx={{ width: 48, height: 48 }} />
          </Button>
        </Tooltip>
        <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
          {docente.nombre}
        </Typography>
      </Box>
    );
}

/**
 * ActivityAndStudents component – shows a summary of the course's activities and enrolled students.
 * 
 * It visually represents counts using Material UI chips with icons.
 * 
 * @component
 * 
 * @param {number} cntActities - Number of activities in the course.
 * @param {number} cntStudents - Number of students enrolled in the course.
 * 
 * @returns {JSX.Element} A horizontal stack with labeled chips for activities and students.
 * 
 * @example
 * ```tsx
 * <ActivityAndStudents cntActities={5} cntStudents={30} />
 * ```
 */
export function ActivityAndStudents({
  cntActities,
  cntStudents,
}: {
  cntStudents: number;
  cntActities: number;
}) {
  return (
    <Stack direction={"row"} spacing={2}>
      <Chip
        label={`Actividades: ${cntActities}`}
        icon={<EditNoteIcon />}
        size={"medium"}
        color="primary"
      />
      <Chip
        label={`Estudiantes: ${cntStudents}`}
        color="info"
        size={"medium"}
        icon={<SchoolIcon />}
      />
    </Stack>
  );
}
