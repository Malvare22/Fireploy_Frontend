import { useModal } from "@modules/general/components/modal";
import { Box, Typography } from "@mui/material";
import ModalModificarCurso from "../modalModificarCurso";
import { CursoMateria } from "@modules/materias/types/materia.curso";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";
import CustomTextArea from "@modules/general/components/customTextArea";
import SeccionEstudiantes from "./components/seccionEstudiantes";
import Secciones from "./components/secciones";
import useQuery from "@modules/general/hooks/useQuery";
import { obtenerSeccionesPorCurso } from "@modules/materias/services/obtener.secciones.curso";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "@modules/general/context/accountContext";
import { SeccionCurso } from "@modules/materias/types/curso.seccion";
import { adaptarSeccionServiceASeccion } from "@modules/materias/utils/adapters/adaptar.seccion";

type GestionCursoProps = {
  curso: CursoMateria;
  materiaId: number;
};

export const LabelTituloCurso = (id: string) => {
  return `Curso : ${id}`;
};

const GestionCurso: React.FC<GestionCursoProps> = ({ curso, materiaId }) => {
  const { handleClose, handleOpen, open } = useModal();

  const token = useContext(AccountContext)?.localUser?.token;

  const [secciones, setSecciones] = useState<SeccionCurso[]>([]);

  /**
   * Consulta de obtención de secciones
   */
  const { RenderAlertDialog, init, responseData } = useQuery(
    () =>
      obtenerSeccionesPorCurso(token ?? "", {
        curso: curso.id,
      }),
    "Gestión Secciones",
    false,
    false
  );

  useEffect(() => {
    if (!token) return;
    const response = async () => {
      await init();
    };

    response();
  }, [token]);

  useEffect(() => {
    if (!responseData) return;
    setSecciones(
      responseData.map((seccion) => adaptarSeccionServiceASeccion(seccion))
    );
  }, [responseData]);

  return (
    <Box>
      <RenderAlertDialog />
      <ModalModificarCurso
        tipo="editar"
        handleClose={handleClose}
        open={open}
        curso={curso}
        materiaId={materiaId}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h3Bold">
              {LabelTituloCurso(curso.id)}
            </Typography>
          </Box>
          <Box>
            <ActionButton
              mode={actionButtonTypes.editar}
              onClick={handleOpen}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <CustomTextArea value={curso.descripcion} disabled={true} />
        </Box>
        <SeccionEstudiantes estudiantes={curso.estudiantes} />
        <Secciones secciones={secciones} cursoId={curso.id}/>
      </Box>
    </Box>
  );
};

export default GestionCurso;
