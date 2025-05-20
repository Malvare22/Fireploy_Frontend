import AlertDialog from "@modules/general/components/alertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { getCursos } from "@modules/materias/services/get.curso";
import { adaptCursoService } from "@modules/materias/utils/adapters/curso.service";
import { getProjectByIdSection } from "@modules/proyectos/services/get.project";
import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import { adaptProject, adaptProjectToCard } from "@modules/proyectos/utils/adapt.proyecto";
import { Alert, Grid2, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ProjectCard from "@modules/general/components/projectCard";
import SpringModal from "@modules/general/components/springModal";
import ModalProyectoPortafolio from "@modules/proyectos/components/modalProyectoPortafolio";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import useSearch from "@modules/general/hooks/useSearch";
import TextFieldSearch from "@modules/general/components/textFieldSearch";

export enum labelProyectosEstudiantes {
  curso = "Curso",
  actividad = "Actividad",
  puntuacion = "Puntuación",
  titulo = "Proyectos de mis estudiantes",
}

type LocalInputs = {
  curso: string;
  actividad: string;
};

function VistaProyectosDeMisEstudiantes() {
  const { id, token } = useAuth().accountInformation;

  const { control, watch, setValue } = useForm<LocalInputs>({
    defaultValues: {
      curso: "-1",
      actividad: "-1",
    },
  });

  const selectedCurso = watch("curso");
  const selectedActividad = watch("actividad");

  useEffect(() => {
    setValue("actividad", "-1");
  }, [selectedCurso]);

  const { handleAccept, handleCancel, isLoading, open, title, type, message, showDialog } =
    useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  const [projects, setProjects] = useState<Map<number, ProyectoCard[]> | null>(null);
  const [activities, setActivities] = useState<Map<string, [string, number][]> | null>(null);
  const [cursos, setCursos] = useState<Map<string, string> | null>(null);
  const [selectProject, setSelectProject] = useState<ProyectoCard | null>(null);
  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    open: openModal,
  } = useModal();

  function handleProject(p: ProyectoCard) {
    setSelectProject(p);
    handleOpenModal();
  }

  const {
    data,
    error,
    isLoading: isLoadingQuery,
  } = useQuery({
    queryFn: async () => {
      const cursos = (await getCursos(token, { docente: id })).map((curso) =>
        adaptCursoService(curso)
      );

      const projects = new Map<number, ProyectoCard[]>();
      const _cursos = new Map<string, string>();
      const _activities = new Map<string, [string, number][]>();

      for (const curso of cursos) {
        if (curso.id && curso.grupo && curso.materia) {
          _cursos.set(`${curso.materia.nombre} - ${curso.grupo}`, curso.id);
        }

        const cursoActivities = curso.secciones || [];
        const arrAct: [string, number][] = [];

        for (const activity of cursoActivities) {
          if (activity.id) {
            arrAct.push([activity.titulo, activity.id]);

            const p = await getProjectByIdSection(token, activity.id);
            projects.set(
              activity.id,
              p.map((x) => adaptProjectToCard(adaptProject(x)))
            );
          }
        }

        if (curso.id) _activities.set(curso.id, arrAct);
      }

      return { projects, cursos: _cursos, activities: _activities };
    },
    queryKey: ["Get Cursos by Teacher", token, id],
  });

  function searchFn(x: ProyectoCard[], s: string) {
    const _s = s.toLowerCase();
    return x.filter((p) => {
      p.titulo.toLowerCase().includes(_s);
    });
  }

  const { setSearchValue, searchValue, filteredData } = useSearch();

  const arrProjects = useMemo(() => {
    if (!projects) return [];

    const f = () => {
      if (selectedCurso === "-1") {
        return Array.from(projects).flatMap(([_i, ps]) => ps);
      }

      if (selectedActividad === "-1") {
        const ids = activities?.get(selectedCurso)?.map(([_, id]) => id) || [];
        return ids.flatMap((id) => projects.get(id) || []);
      }

      const id = parseInt(selectedActividad, 10);
      return projects.get(id) || [];
    };

    return filteredData(f(), searchFn);
  }, [projects, selectedCurso, selectedActividad, activities, searchValue]);

  useEffect(() => {
    if (error) setError(error);
  }, [error]);

  useEffect(() => {
    if (data) {
      const { activities, cursos, projects } = data;
      setActivities(activities);
      setCursos(cursos);
      setProjects(projects);
    }
  }, [data]);

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        isLoading={isLoading}
        type={type}
        textBody={message}
        handleCancel={handleCancel}
      />
      <SpringModal open={openModal} handleClose={handleCloseModal}>
        {selectProject && <ModalProyectoPortafolio proyecto={selectProject} />}
      </SpringModal>

      {isLoadingQuery ? (
        <LoaderElement />
      ) : (
        <Stack spacing={3}>
          <Typography variant="h4">{labelProyectosEstudiantes.titulo}</Typography>

          <Grid2 container>
            <Grid2 size={{ md: 4, xs: 12 }}>
              <TextFieldSearch fullWidth setSearchValue={setSearchValue} />
            </Grid2>
          </Grid2>

          {/* Filtros */}
          <Stack direction="row" spacing={2}>
            <Controller
              name="curso"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  size="small"
                  label={labelProyectosEstudiantes.curso}
                  sx={{ minWidth: 150 }}
                  {...field}
                >
                  <MenuItem value="-1">Ver todos</MenuItem>
                  {cursos &&
                    Array.from(cursos, ([label, id]) => (
                      <MenuItem value={id} key={id}>
                        {label}
                      </MenuItem>
                    ))}
                </TextField>
              )}
            />

            <Controller
              name="actividad"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  size="small"
                  label={labelProyectosEstudiantes.actividad}
                  {...field}
                  sx={{ minWidth: 150 }}
                  disabled={!selectedCurso || !activities?.get(selectedCurso)}
                >
                  <MenuItem value="-1">Ver todas</MenuItem>
                  {selectedCurso &&
                    activities?.get(selectedCurso)?.map(([titulo, id]) => (
                      <MenuItem key={id} value={String(id)}>
                        {titulo}
                      </MenuItem>
                    ))}
                </TextField>
              )}
            />
          </Stack>

          {/* Proyectos */}
          <Stack spacing={2}>
            {arrProjects && arrProjects.length > 0 ? (
              <Grid2 container spacing={3}>
                {arrProjects.map((p) => (
                  <Grid2 size={{ md: 4, xs: 12 }}>
                    <ProjectCard key={p.id} proyecto={p} handleOpen={() => handleProject(p)} />
                  </Grid2>
                ))}
              </Grid2>
            ) : (
              <Alert severity="warning">{"No hay proyectos disponibles"}</Alert>
            )}
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default VistaProyectosDeMisEstudiantes;
