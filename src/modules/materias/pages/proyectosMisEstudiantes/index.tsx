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
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function ProyectosDeMisEstudiantesView() {
  const { id, token } = useAuth().accountInformation;

  const { handleAccept, handleCancel, isLoading, open, title, type, message, showDialog } =
    useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  const [projects, setProjects] = useState<Map<number, ProyectoCard[]> | null>(null);

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

      for (const curso of cursos) {
        const cursoActivities = curso.secciones || [];
        for (const activity of cursoActivities) {
          if (activity.id) {
            const p = await getProjectByIdSection(token, activity.id);
            projects.set(
              activity.id,
              p.map((x) => adaptProjectToCard(adaptProject(x)))
            );
          }
        }
      }

      return projects;
    },
    queryKey: ["Get Cursos by Teacher", token, id],
  });

  useEffect(() => {
    if (error) setError(error);
  }, [error]);

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
      {isLoadingQuery ? <LoaderElement /> : <></>}
    </>
  );
}

export default ProyectosDeMisEstudiantesView;
