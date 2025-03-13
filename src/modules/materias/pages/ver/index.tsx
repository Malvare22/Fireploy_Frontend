
import { EstudianteEjemplo } from "@modules/materias/types/estudiantes.ejemplo";
import {
  Box,
} from "@mui/material";
import useQuery from "@modules/general/hooks/useQuery";
import { obtenerMateriaPorIdService } from "@modules/materias/services/obtenerPorId.materia.services";
import { Materia } from "@modules/materias/types/materia";
import { AccountContext } from "@modules/general/context/accountContext";
import { MateriaService } from "@modules/materias/types/materia.service";
import { obtenerMultiplesCursoPorIdService } from "@modules/materias/services/obtenerPorId.curso.services";
import { unirMateriaServiceConCursoService } from "@modules/materias/utils/adapters/adaptar.materiaService.materia";
import GestionCurso from "@modules/materias/components/gestionCurso";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

export const LabelConfirmarEliminarEstudianteCurso = (
  estudiante: EstudianteEjemplo
) => {
  return `¿Está seguro de que desea eliminar al estudiante ${estudiante.apellidos} ${estudiante.nombres} del curso?`;
};

export const VistaGestionMateria = () => {
  const { id } = useParams();

  const token = useContext(AccountContext)?.localUser?.token ?? "";

  const [materia, setMateria] = useState<Materia | undefined>(undefined);

  const {
    RenderAlertDialog: RenderGet,
    init: initGet,
    responseData: responseDataGet,
  } = useQuery<MateriaService>(
    () => obtenerMateriaPorIdService(token, id ?? ""),
    "Consulta Materia",
    false,
    false
  );

  useEffect(() => {
    if (id == undefined || token == "") return;
    const consulta = async () => {
      initGet();
    };

    consulta();
  }, [id, token]);

  useEffect(() => {
    if (responseDataGet == undefined) return;
    const consulta = async () => {
      const idCursos = responseDataGet.cursos?.map((_curso) => _curso.id);
      if (idCursos == undefined) return;
      const _cursos = await obtenerMultiplesCursoPorIdService(token, idCursos);
      if (_cursos)
        setMateria(unirMateriaServiceConCursoService(responseDataGet, _cursos));
    };

    consulta();
  }, [responseDataGet]);

  return (
    <Box>
      <RenderGet />
      {materia && materia.cursos && (
        <GestionCurso curso={materia.cursos[0]} materiaId={materia.id} />
      )}
    </Box>
  );
};

export default VistaGestionMateria;
