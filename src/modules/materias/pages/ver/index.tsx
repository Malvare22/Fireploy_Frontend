import { EstudianteEjemplo } from "@modules/materias/types/estudiantes.ejemplo";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableSortLabel,
  Typography,
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
import { actionButtonTypes } from "@modules/general/types/actionButtons";
import ActionButton from "@modules/general/components/actionButton";
import useTabla from "@modules/general/hooks/useTabla";
import {
  adaptarGruposMateria,
  GrupoTabla,
  LabelGrupoTabla,
} from "@modules/materias/types/grupo.tabla";
import {
  StyledTableCell,
  StyledTableRow,
} from "@modules/general/components/tabla";
import { CursoMateria } from "@modules/materias/types/materia.curso";
import { useModal } from "@modules/general/components/modal";
import ModalModificarMateria from "@modules/materias/components/modificarMateria";

export const LabelConfirmarEliminarEstudianteCurso = (
  estudiante: EstudianteEjemplo
) => {
  return `¿Está seguro de que desea eliminar al estudiante ${estudiante.apellidos} ${estudiante.nombres} del curso?`;
};

export const VistaGestionMateria = () => {
  const { id } = useParams();

  const token = useContext(AccountContext)?.localUser?.token ?? "";

  const [materia, setMateria] = useState<Materia | undefined>(undefined);

  const { orderBy, order, handleRequestSort, renderData, setData } =
    useTabla<GrupoTabla>();

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

  const [currentGrupo, setCurrentGrupo] = useState<CursoMateria | undefined>(
    undefined
  );

  const handleGrupo = (id: string) => {
    if (!materia || !materia.cursos) return;
    const buffer = materia.cursos.find((grupo) => grupo.id == id);
    if (buffer) setCurrentGrupo(buffer);
  };

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
      if (_cursos) {
        const aux = unirMateriaServiceConCursoService(responseDataGet, _cursos);
        setMateria(aux);
        setData(adaptarGruposMateria(aux));
      }
    };

    consulta();
  }, [responseDataGet]);

  const { handleClose, handleOpen, open } = useModal();

  return (
    <Box>
      <RenderGet />
      {materia && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <ModalModificarMateria
            handleClose={handleClose}
            open={open}
            tipo="editar"     
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Contenido Materia */}
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alingItems: "center",
                }}
              >
                <Typography variant="h3Bold">{materia.nombre}</Typography>
                <ActionButton mode={actionButtonTypes.editar} onClick={handleOpen}/>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <TableContainer component={Paper} sx={{ width: "80%" }}>
                <Table>
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell>
                        <TableSortLabel
                          active={orderBy === "id"}
                          direction={orderBy === "id" ? order : "asc"}
                          onClick={() => {
                            handleRequestSort("id");
                          }}
                        >
                          {LabelGrupoTabla.id}
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell>
                        {LabelGrupoTabla.semestre}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {LabelGrupoTabla.grupo}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {LabelGrupoTabla.docente}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {LabelGrupoTabla.cantidad}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {LabelGrupoTabla.acciones}
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {renderData.map((grupo, key) => (
                      <StyledTableRow key={key}>
                        <StyledTableCell align="center">
                          {grupo.id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {grupo.semestre}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {grupo.grupo}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {grupo.docente}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {grupo.cantidadEstudiantes}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <ActionButton
                            mode={actionButtonTypes.ver}
                            onClick={() => handleGrupo(grupo.id)}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>

          {currentGrupo && (
            <GestionCurso
              curso={currentGrupo}
              materiaId={materia.id}
              key={currentGrupo.id}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default VistaGestionMateria;
