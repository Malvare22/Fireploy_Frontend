import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import CustomTextArea from "@modules/general/components/customTextArea";
import {
  StyledTableCell,
  StyledTableRow,
} from "@modules/general/components/tabla";
import { LabelGeneral } from "@modules/general/enums/labelGeneral";
import useTabla from "@modules/general/hooks/useTabla";
import { EstudianteEjemplo, estudiantesEjemplo } from "@modules/materias/types/estudiantes.ejemplo";
import {
  CursoMateria,
  ejemploCurso,
} from "@modules/materias/types/materia.curso";
import { LabelTablaUsuarios } from "@modules/usuarios/enum/LabelTablaUsuarios";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import {
  Box,
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
import { useNavigate } from "react-router-dom";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";
import { useEffect } from "react";

export enum LabelInformacionMateria {}

const _curso = ejemploCurso;

export const LabelTituloCurso = (id: string) => {
  return `Curso : ${id}`;
};

type GestionCursoProps = {
  curso?: CursoMateria;
};

const GestionCurso: React.FC<GestionCursoProps> = ({ curso = _curso }) => {
  return (
    <Box>
      <Box>
        <Typography>{LabelTituloCurso(curso.id)}</Typography>
        <Box>
          <CustomTextArea value={curso.descripcion} />
        </Box>
        <SeccionEstudiantes/>
      </Box>
    </Box>
  );
};

const SeccionEstudiantes = () => {
  const { orderBy, order, handleRequestSort, renderData, setData } =
    useTabla<EstudianteEjemplo>();

    useEffect(
      () => {
        setData(estudiantesEjemplo);
      }, []
    )

  const navigate = useNavigate();

  return (
    <Box sx={{width: 500}}>
      <TableContainer component={Paper}>
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
                  <ActionButton
                    mode={actionButtonTypes.eliminar}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GestionCurso;
