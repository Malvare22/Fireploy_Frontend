import AnimatedCard from "@modules/general/components/animatedCard";
import { labelCardMateria } from "@modules/materias/enums/labelCardMateria";
import { Materia } from "@modules/materias/types/materia";
import { Box, Button, Card, Chip, Stack, Typography, useTheme } from "@mui/material";
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

  const nCursos = (materia.cursos || []).length;

  return (
    <Card sx={{ width: 300, height: "100%" }}>
      <Stack spacing={3}>
        <Box sx={{ backgroundColor: theme.palette.primary.main }}>
          <Typography sx={{ textAling: "center", color: "white" }}>{materia.nombre}</Typography>
        </Box>
        <Stack direction={"row"} alignItems={"center"}>
          <Chip color="secondary" label={`Semestre: S${materia.semestre}`} />
          {nCursos > 0 ? (
            <Chip color="info" label={`Cursos: S${nCursos}`} />
          ) : (
            <Chip color="default" label={`Cursos no disponibles`} />
          )}
        </Stack>
        <Stack><Box><Button variant="outlined">{"Ver más"}</Button></Box></Stack>
      </Stack>
    </Card>
  );
};

export default CardMateria;
// rutasMaterias.explorarCursos.replace(":idMateria", materia.id?.toString() || '404')
