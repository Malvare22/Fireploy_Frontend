import AnimatedCard from "@modules/general/components/animatedCard";
import { labelCardMateria } from "@modules/materias/enums/labelCardMateria";
import { Materia } from "@modules/materias/types/materia";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import StyleIcon from "@mui/icons-material/Style";
import { useNavigate } from "react-router-dom";
import { rutasMaterias } from "@modules/materias/router/router";

type CardMateriaProps = {
  materia: Materia;
};

/**
 * CardMateria component – displays a subject (materia) card with its name, semester, 
 * and a button to explore its related courses.
 * 
 * This component presents the subject's basic information and includes a button 
 * that redirects the user to the list of courses associated with the subject.
 * Styling is applied based on the MUI theme, including a highlighted semester badge.
 * 
 * @component
 * 
 * @param {Object} materia - The subject object containing the name, semester, and unique identifier.
 * 
 * @returns {JSX.Element} A styled subject card component with navigation to its courses.
 * 
 * @example
 * ```tsx
 * <CardMateria materia={materiaObject} />
 * ```
 */
const CardMateria: React.FC<CardMateriaProps> = ({ materia }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <AnimatedCard>
      <Stack justifyContent={"space-between"} sx={{ padding: 3 }} spacing={3}>
        <Typography variant="h4" fontWeight={"500"}>
          {materia.nombre}
        </Typography>
        <Box>
          <Typography
            padding={1}
            fontWeight={"500"}
            display={"inline-block"}
            sx={{
              backgroundColor: theme.palette.warning.main,
              color: "white",
              borderRadius: 1,
            }}
          >{`${materia.semestre} semestre`}</Typography>
        </Box>
        <Stack alignItems={"end"}>
          <Button
            endIcon={<StyleIcon />}
            onClick={() =>
              navigate(
                rutasMaterias.explorarCursos.replace(":idMateria", materia.id?.toString() || '404')
              )
            }
          >
            {labelCardMateria.verGrupos}
          </Button>
        </Stack>
      </Stack>
    </AnimatedCard>
  );
};

export default CardMateria;
