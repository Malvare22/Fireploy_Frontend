import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import CustomTextArea from "@modules/general/components/customTextArea";
import {
  StyledTableCell,
  StyledTableRow,
} from "@modules/general/components/tabla";
import { LabelGeneral } from "@modules/general/enums/labelGeneral";
import useTabla from "@modules/general/hooks/useTabla";
import {
  EstudianteEjemplo,
  estudiantesEjemplo,
} from "@modules/materias/types/estudiantes.ejemplo";
import {
  CursoMateria,
} from "@modules/materias/types/materia.curso";
import { LabelTablaUsuarios } from "@modules/usuarios/enum/LabelTablaUsuarios";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import {
  Box,
  Card,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";
import { useContext, useEffect, useState } from "react";
import {
  SeccionCurso,
  seccionesCurso,
} from "@modules/materias/types/curso.seccion";
import { proyectosPrueba } from "@modules/proyectos/test/datos/proyectos.prueba";
import { CardProyecto } from "@modules/usuarios/components/portafolio";
import AccordionUsage from "@modules/general/components/accordionUsage";
import { LabelCurso } from "@modules/materias/enums/labelCurso";
import useQuery from "@modules/general/hooks/useQuery";
import { obtenerMateriaPorIdService } from "@modules/materias/services/obtenerPorId.materia.services";
import { Materia } from "@modules/materias/types/materia";
import { AccountContext } from "@modules/general/context/accountContext";
import { MateriaService } from "@modules/materias/types/materia.service";
import {  obtenerMultiplesCursoPorIdService } from "@modules/materias/services/obtenerPorId.curso.services";
import { unirMateriaServiceConCursoService } from "@modules/materias/utils/adapters/adaptar.materiaService.materia";



export const LabelTituloCurso = (id: string) => {
  return `Curso : ${id}`;
};

export const LabelConfirmarEliminarEstudianteCurso = (
  estudiante: EstudianteEjemplo
) => {
  return `¿Está seguro de que desea eliminar al estudiante ${estudiante.apellidos} ${estudiante.nombres} del curso?`;
};

export const VistaGestionMateria = () =>{

  const {id} = useParams();

  const token = useContext(AccountContext)?.localUser?.token ?? '';

  const [materia, setMateria] = useState<Materia | undefined>(undefined);

  const {RenderAlertDialog: RenderGet, init: initGet, responseData: responseDataGet} = useQuery<MateriaService>(() => obtenerMateriaPorIdService(token, id ?? ''), 'Consulta Materia', false, false);

  console.log(materia)

  useEffect(
    () => {
      if(id == undefined || token == '') return;
      const consulta = async () => {
        initGet();
      };

      consulta();
    },[id, token]
  );

  useEffect(
    () => {
      console.log(responseDataGet)
      if(responseDataGet == undefined) return;
      const consulta = async () => {
        const idCursos =  responseDataGet.cursos?.map((_curso) => _curso.id);
        if(idCursos == undefined) return;
        const _cursos = await obtenerMultiplesCursoPorIdService(token, idCursos);
        console.log(_cursos)
        if(_cursos) setMateria(unirMateriaServiceConCursoService(responseDataGet, _cursos));
      };

      consulta();
    }, [responseDataGet]
  );

  return <Box>
    <RenderGet/>
  </Box>
}

type VistaGestionCursoProps = {
  curso?: CursoMateria;
};

const VistaGestionCurso: React.FC<VistaGestionCursoProps> = ({ curso }) => {
  return (<></>
    // <Box>
    //   <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
    //     <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    //       <Box>
    //         <Typography variant="h3Bold">{LabelTituloCurso(curso.id)}</Typography>
    //       </Box>
    //       <Box>
    //         <ActionButton mode={actionButtonTypes.editar} />
    //       </Box>
    //     </Box>
    //     <Box sx={{ display: "flex" }}>
    //       <CustomTextArea value={curso.descripcion} disabled={true} />
    //     </Box>
    //     <SeccionEstudiantes />
    //     <Secciones />
    //   </Box>
    // </Box>
  );
};


const SeccionEstudiantes = () => {
  const {
    orderBy,
    order,
    handleRequestSort,
    renderData,
    setData,
    RenderSearchInput,
  } = useTabla<EstudianteEjemplo>();

  useEffect(() => {
    setData(estudiantesEjemplo);
  }, []);

  const navigate = useNavigate();

  return (
    <Box>
      <Box>
        <Typography variant="h3Bold">
          {LabelCurso.estudiantes}
        </Typography>
        <Divider />
      </Box>
      {RenderSearchInput}
      <TableContainer component={Paper} sx={{ width: 500, height: 500 }}>
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
                  {LabelTablaUsuarios.codigo}
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                {LabelTablaUsuarios.nombreCompleto}
              </StyledTableCell>
              <StyledTableCell align="center">
                {LabelTablaUsuarios.porfolio}
              </StyledTableCell>
              <StyledTableCell align="center">
                {LabelGeneral.acciones}
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {renderData.map((usuario, key) => (
              <StyledTableRow key={key}>
                <StyledTableCell>{usuario.id}</StyledTableCell>
                <StyledTableCell>{`${usuario.apellidos} ${usuario.nombres}`}</StyledTableCell>
                <StyledTableCell align="center">
                  <Tooltip title={LabelTablaUsuarios.porfolio}>
                    <IconButton
                      onClick={() =>
                        navigate(
                          rutasUsuarios.verPortafolio.replace(
                            ":id",
                            usuario.id.toString()
                          )
                        )
                      }
                    >
                      <DocumentScannerIcon />
                    </IconButton>
                  </Tooltip>
                </StyledTableCell>
                <StyledTableCell>
                  <ActionButton mode={actionButtonTypes.eliminar} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

type SeccionesProps = {
  secciones?: SeccionCurso[];
};
const Secciones: React.FC<SeccionesProps> = ({
  secciones = seccionesCurso,
}) => {
  return (
    <Box>
      <Typography variant="h3Bold">
        {LabelCurso.secciones}
      </Typography>
      <Divider />
      <Box>
        {secciones.map((seccion, key) => (
          <AccordionUsage
            key={key}
            title={<Typography variant="h4">{seccion.titulo}</Typography>}
          >
            <Seccion seccion={seccion} key={key} />
          </AccordionUsage>
        ))}
      </Box>
    </Box>
  );
};

type SeccionProps = {
  seccion: SeccionCurso;
};
const Seccion: React.FC<SeccionProps> = ({ seccion }) => {
  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <CustomTextArea value={seccion.descripcion} disabled={true} />
        <ActionButton mode={actionButtonTypes.editar} />
      </Box>
      <Divider />
      <Box>
        {proyectosPrueba.map((proyecto, key) => (
          <Card sx={{ border: "1px solid black" }}>
            <CardProyecto proyecto={proyecto} tipo="básico" key={key} />
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default VistaGestionMateria;
