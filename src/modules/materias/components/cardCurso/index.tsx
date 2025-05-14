import AnimatedCard from "@modules/general/components/animatedCard";
import { Alert, Button, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import React from "react";
import { labelCardCurso } from "@modules/materias/enums/labelCardCurso";
import InputIcon from "@mui/icons-material/Input";
// import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import { Curso } from "@modules/materias/types/curso";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router";
import { rutasMaterias } from "@modules/materias/router/router";
import { AccountInformation, useAuth } from "@modules/general/context/accountContext";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";

type CardCursoProps = {
  curso: Curso;
  onClick: () => void;
  userType: AccountInformation["tipo"];
  isRegister?: boolean;
};

/**
 * CardCurso component – displays a course card with key details and an action button
 * tailored to the user's role (student, teacher, or administrator).
 * 
 * This component shows the course group and assigned teacher, and includes an action button
 * that adapts its label and behavior based on the user type. It also handles logic for when
 * a teacher can or cannot request a course.
 * 
 * @component
 * 
 * @param {Object} curso - The course object that includes group, teacher, and identifier data.
 * @param {Function} onClick - A callback function executed when the action button is clicked (if allowed).
 * @param {string} userType - The type of the user (e.g., "E" for student, "D" for teacher, "A" for admin).
 * @param {boolean} [isRegister] - Indicates whether the component is being used in a registration context.
 * 
 * @returns {JSX.Element} A styled course card component with group and teacher details, and a conditional action button.
 * 
 * @example
 * ```tsx
 * <CardCurso 
 *   curso={cursoObject} 
 *   onClick={handleCourseAccess} 
 *   userType="E" 
 *   isRegister={true} 
 * />
 * ```
 */
const CardCurso: React.FC<CardCursoProps> = ({ curso, onClick, userType, isRegister }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const { id } = useAuth().accountInformation;

  const labelText = () => {
    if (userType == "E") return isRegister ? 'Acceder' : labelCardCurso.inscribirme;

    if (userType == "D" && curso.docente == null) {
      return "Solicitar Curso";
    }

    return "Acceder";
  };

  /**
   * Un docente no puede solicitar un curso ya ocupado por otro docente
   */
  const buttonDisable = () => {
    return userType == "D" && curso.docente != null && curso.docente.id != id;
  };

  return (
    <AnimatedCard sx={{height: '100%'}}>
      <Stack justifyContent={"space-between"} sx={{ padding: 3, height: '100%' }} spacing={3}>
        <Typography variant="h4" fontWeight={"500"} sx={{}}>
          {`${labelCardCurso.grupo}: ${curso.grupo}`}
        </Typography>
        <Alert
          iconMapping={{
            info: <Tooltip title='Docente del grupo'><CastForEducationIcon fontSize="medium" /></Tooltip>,
          }}
          severity="info"
        >
          <Typography>
            {curso.docente != null ? curso.docente.nombre : labelCardCurso.docenteSinAsignar}
          </Typography>
        </Alert>
        <Stack alignItems={"end"}>
          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: isRegister
                ? theme.palette.terciary.main
                : theme.palette.primary.main,
            }}
            disabled={buttonDisable()}
            endIcon={isRegister ? <LoginIcon /> : <InputIcon />}
            onClick={
              isRegister || userType == "A"
                ? () => navigate(rutasMaterias.verCurso.replace(":idCurso", curso.id ?? "-1"))
                : onClick
            }
          >
            {labelText()}
          </Button>
        </Stack>
      </Stack>
    </AnimatedCard>
  );
};

export default CardCurso;
