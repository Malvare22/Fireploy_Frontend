import {
  StyledTableCell,
  StyledTableRow,
} from "@modules/general/components/tabla";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import useTabla from "@modules/general/hooks/useTabla";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  labelAvisoCambioEstadoMateria,
  labelTablaMaterias,
} from "@modules/materias/enums/tablaMaterias";
import { filtrosMaterias } from "@modules/materias/utils/filtros.materias";
import {
  MateriaTabla,
  materiaTablaBase,
} from "@modules/materias/types/materia";
import useQuery from "@modules/general/hooks/useQuery";
import { AccountContext } from "@modules/general/context/accountContext";
import { MateriaService } from "@modules/materias/types/materia.service";
import {
  adaptarMateriaServiceAMateriaTabla,
  adaptarMateriaTablaAMateriaService,
} from "@modules/materias/utils/adapters/adaptar.materiaService.materia";
import { obtenerMateriasService } from "@modules/materias/services/obtener.materias.services";
import SourceIcon from "@mui/icons-material/Source";
import { rutasMaterias } from "@modules/materias/router/router";
import GeneralButton from "@modules/general/components/buttons";
import { useModal } from "@modules/general/components/modal";
import ModalModificarMateria from "@modules/materias/components/modificarMateria";
import { editarEstadoMateriaService } from "@modules/materias/services/editar.materia.services";
import { buttonTypes } from "@modules/general/types/buttons";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";

export const LabelTablaMaterias = {
  codigo: "Código",
  nombreCompleto: "Nombre Completo",
  tipoUsuario: "Tipo de Usuario",
  estado: "Estado",
  proyectos: "Proyectos",
  porfolio: "Portafolio",
  listaMaterias: "Lista Materias",
};

function ListarMaterias() {
  const {
    handleRequestSort,
    order,
    orderBy,
    setData,
    renderData,
    FillEmptyRows,
    Pagination,
    RenderSearchInput,
    setFilterLabels,
    RenderFilters,
  } = useTabla<MateriaTabla>();

  const token = useContext(AccountContext)?.localUser?.token ?? "";

  const {
    RenderAlertDialog: RenderAlertGetList,
    init: initGetList,
    responseData: responseGetList,
  } = useQuery<MateriaService[]>(
    () => obtenerMateriasService(token),
    LabelTablaMaterias.listaMaterias,
    false,
    false
  );

  const [materias, setMaterias] = useState<MateriaTabla[]>([]);

  useEffect(() => {
    if (token == "") return;
    const consulta = async () => {
      await initGetList();
    };
    consulta();
  }, [token]);

  useEffect(() => {
    if (responseGetList == undefined) return;
    setMaterias(
      responseGetList.map((materia) =>
        adaptarMateriaServiceAMateriaTabla(materia)
      )
    );
  }, [responseGetList]);

  useEffect(() => {
    setData(materias);
    setFilterLabels(filtrosMaterias(materias));
  }, [materias]);

  const navigate = useNavigate();

  const [selectMateria, setSelectMateria] =
    useState<MateriaTabla>(materiaTablaBase);

  const handleVer = (materiaId: number) => {
    navigate(rutasMaterias.editar.replace(":id", materiaId.toString()));
  };

  const { handleClose, handleOpen, open } = useModal();

  const { RenderAlertDialog, init } = useQuery<MateriaService>(
    () =>
      editarEstadoMateriaService(
        token,
        adaptarMateriaTablaAMateriaService(selectMateria)
      ),
      labelTablaMaterias.cambiarEstado,
      true,
      true,
      labelAvisoCambioEstadoMateria(selectMateria.nombre, selectMateria.estado),
      true
  );

  const handleEstadoMateria = (materia: MateriaTabla) => {
    setSelectMateria(materia);
    init();
  };

  return (
    <>
      {/* {selectUsuario != undefined && (
        <ModalEstadoUsuario
          handleClose={estadoHandleClose}
          open={estadoOpen}
          usuario={selectUsuario}
        />
      )} */}
      {/* <ModalUsuario
        handleClose={handleClose}
        open={open}
        handleQuery={() => alert(":D")}
        tipo="editar"
        usuario={selectUsuario}
      /> */}
      <RenderAlertGetList />
      <RenderAlertDialog />
      <ModalModificarMateria
        handleClose={handleClose}
        open={open}
        tipo="crear"
      />
      <Box>
        <Box
          sx={{ display: "flex", flexDirection: { xl: "row", xs: "column" } }}
        >
          <RenderFilters />
          <Box sx={{ marginY: 0, flex: 1 }}>{RenderSearchInput}</Box>
        </Box>
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
                    {labelTablaMaterias.idMateria}
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>{labelTablaMaterias.nombre}</StyledTableCell>
                <StyledTableCell>{labelTablaMaterias.semestre}</StyledTableCell>
                <StyledTableCell align="center">
                  <TableSortLabel
                    active={orderBy === "cantidadDeCursos"}
                    direction={orderBy === "cantidadDeCursos" ? order : "asc"}
                    onClick={() => {
                      handleRequestSort("cantidadDeCursos");
                    }}
                  >
                    {labelTablaMaterias.cursos}
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {labelTablaMaterias.acciones}
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {renderData.map((materia, key) => (
                <StyledTableRow key={key}>
                  <StyledTableCell>{materia.id}</StyledTableCell>
                  <StyledTableCell>{materia.nombre}</StyledTableCell>
                  <StyledTableCell>{materia.semestre}</StyledTableCell>
                  <StyledTableCell>{materia.id}</StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      <Stack
                        alignContent={"center"}
                        direction={"row"}
                        justifyContent={"center"}
                      >
                        <ActionButton
                          mode={actionButtonTypes.ver}
                          icon={<SourceIcon />}
                          onClick={() => handleVer(materia.id)}
                        />
                        {materia.estado == "A" ? (
                          <ActionButton
                            mode={actionButtonTypes.deshabilitar}
                            onClick={() => handleEstadoMateria(materia)}
                          />
                        ) : (
                          <ActionButton
                            mode={actionButtonTypes.habilitar}
                            onClick={() => handleEstadoMateria(materia)}
                          />
                        )}
                      </Stack>
                    }
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {FillEmptyRows}
            </TableBody>
            <TableFooter>
              <Pagination />
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
      <Box marginY={2}>
        <GeneralButton mode={buttonTypes.add} onClick={handleOpen} />
      </Box>
    </>
  );
}

export default ListarMaterias;
