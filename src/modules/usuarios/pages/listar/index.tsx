import {
  StyledTableCell,
  StyledTableRow,
} from "@modules/general/components/tabla";
import { LabelGeneral } from "@modules/general/enums/labelGeneral";
import { usuariosPrueba } from "@modules/usuarios/test/data/usuarios.prueba";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import IconosAccionesBasicas from "@modules/general/components/iconosAccionesBasicas";
import {
  obtenerEstadoUsuario,
  obtenerTiposUsuario,
} from "@modules/usuarios/utils/usuario.map";
import useTabla from "@modules/general/hooks/useTabla";
import { UsuarioPlano } from "@modules/usuarios/types/usuario.plano";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Usuario } from "@modules/usuarios/types/usuario";
import { adaptarUsuario } from "@modules/usuarios/utils/usuario.adapter";
import { useModal } from "@modules/general/components/modal";
import ModalUsuario from "@modules/usuarios/components/modalUsuario";
import { filtrosUsuarios } from "@modules/usuarios/utils/filtrosUsuarios";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import ModalEstadoUsuario from "@modules/usuarios/components/modalEstadoUsuario";

export const LabelTablaUsuarios = {
  codigo: "Código",
  nombreCompleto: "Nombre Completo",
  tipoUsuario: "Tipo de Usuario",
  estado: "Estado",
  proyectos: "Proyectos",
  porfolio: "Portafolio",
};

function ListarUsuarios() {
  const usuarios = usuariosPrueba;

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
  } = useTabla<UsuarioPlano>();

  useEffect(() => {
    setData(usuarios);
    setFilterLabels(filtrosUsuarios());
  }, []);

  const navigate = useNavigate();

  const [selectUsuario, setSelectUsuario] = useState<Usuario | undefined>(
    undefined
  );

  const {handleClose: estadoHandleClose, handleOpen: estadoHandleOpen, open: estadoOpen} = useModal();

  const { open, handleOpen, handleClose } = useModal();

  const handleVentanaEstado = (usuario: UsuarioPlano) => {
    setSelectUsuario(adaptarUsuario(usuario));
    estadoHandleOpen();
  };

  const handleEditar = (usuario: UsuarioPlano) => {
    setSelectUsuario(adaptarUsuario(usuario));
    handleOpen();
  };

  console.log(estadoOpen)

  return (
    <>
      {selectUsuario != undefined && <ModalEstadoUsuario handleClose={estadoHandleClose} open={estadoOpen} usuario={selectUsuario}/>}
      <ModalUsuario
        handleClose={handleClose}
        open={open}
        handleQuery={() => alert(":D")}
        tipo="editar"
        usuario={selectUsuario}
      />
      <Box sx={{ width: { md: "100%", xs: "90%" } }}>
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
                    {LabelTablaUsuarios.codigo}
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  {LabelTablaUsuarios.nombreCompleto}
                </StyledTableCell>
                <StyledTableCell>
                  {LabelTablaUsuarios.tipoUsuario}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {LabelTablaUsuarios.estado}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {LabelTablaUsuarios.proyectos}
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
                  <StyledTableCell>
                    {obtenerTiposUsuario.get(usuario.tipo)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {obtenerEstadoUsuario.get(usuario.estado)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Tooltip title={LabelTablaUsuarios.proyectos}>
                      <IconButton>
                        <FolderZipIcon />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Tooltip title={LabelTablaUsuarios.porfolio}>
                      <IconButton>
                        <DocumentScannerIcon />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconosAccionesBasicas
                      ver={true}
                      handleVer={() =>
                        navigate(
                          rutasUsuarios.verPerfilPorId.replace(
                            ":id",
                            usuario.id.toString()
                          )
                        )
                      }
                      editar={true}
                      handleEditar={() => handleEditar(usuario)}
                      habilitar={usuario.estado == 'I'}
                      deshabilitar={usuario.estado == 'A'}
                      handleEstado={() => handleVentanaEstado(usuario)}
                    />
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
    </>
  );
}

export default ListarUsuarios;
