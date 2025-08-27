import { Materia } from "@modules/materias/types/materia";
import { Box, Button, Card, Chip, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { rutasMaterias } from "@modules/materias/router/routes";

type CardMateriaProps = {
  materia: Materia;
};

/**
 * CardMateria component – a visual card representation of a subject (materia),
 * showing its name, semester, and number of associated courses.
 *
 * This component includes a styled header, chips for metadata, and a button
 * that navigates to the detail view for available courses related to the subject.
 *
 * @component
 *
 * @param {Object} materia - An object representing the subject, including its ID, name,
 * semester number, and an optional list of courses.
 *
 * @returns {Visual element} A Material UI Card that displays subject information and
 * provides navigation to its course list if available.
 *
 * @example
 * ```tsx
 * <CardMateria
 *   materia={{
 *     id: 1,
 *     nombre: "Matemáticas Discretas",
 *     semestre: 2,
 *     cursos: [/* array de cursos *\/]
 *   }}
 * />
 * ```
 */
const CardMateria: React.FC<CardMateriaProps> = ({ materia }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  function handleButton() {
    navigate(rutasMaterias.explorarCursos.replace(":idMateria", (materia.id ?? -1).toString()));
  }

  const nCursos = (materia.cursos?.filter((curso) => curso.estado == "A") || []).length;

  return (
    <Card sx={{ padding: 0 }}>
      <Stack spacing={3}>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            textAling: "center",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: { md: 150, xs: 0 },
            padding: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              color: "white",
              display: "inline-block",
              whiteSpace: "pre-line",
            }}
          >
            {materia.nombre}
          </Typography>
        </Box>
        <Stack
          direction={"row"}
          alignItems={"center"}
          paddingX={2}
          flexWrap={"wrap"}
          spacing={2}
          justifyContent={"center"}
        >
          <Chip color="secondary" label={`Semestre: ${materia.semestre}`} />
          {nCursos > 0 ? (
            <Chip
              color="info"
              label={nCursos == 1 ? "1 Curso disponible" : `${nCursos} Cursos disponibles`}
            />
          ) : (
            <Chip color="default" label={`Cursos no disponibles`} />
          )}
        </Stack>
        <Stack alignItems={"center"} paddingBottom={2}>
          <Box>
            <Button onClick={handleButton} variant="outlined">
              {"Ver más"}
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CardMateria;
// rutasMaterias.explorarCursos.replace(":idMateria", materia.id?.toString() || '404')
