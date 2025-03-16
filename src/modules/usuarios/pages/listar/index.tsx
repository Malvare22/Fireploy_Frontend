import {
  StyledTableCell,
  StyledTableRow,
} from "@modules/general/components/tabla";
import { LabelGeneral } from "@modules/general/enums/labelGeneral";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import {
  Box,
  Button,
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
import {
  obtenerEstadoUsuario,
  obtenerTiposUsuario,
} from "@modules/usuarios/utils/usuario.map";
import useTabla from "@modules/general/hooks/useTabla";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Usuario } from "@modules/usuarios/types/usuario";
import ModalUsuario from "@modules/usuarios/components/modalUsuario";
import { filtrosUsuarios } from "@modules/usuarios/utils/filtrosUsuarios";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import ModalEstadoUsuario from "@modules/usuarios/components/modalEstadoUsuario";
import { AccountContext } from "@modules/general/context/accountContext";
import { adaptarUsuario } from "@modules/usuarios/utils/adaptar.usuario";
import { UsuarioBase } from "@modules/usuarios/utils/form/usuario.base";
import useQuery from "@modules/general/hooks/useQuery";
import { UsuarioService } from "@modules/usuarios/types/services.usuario";
import { LabelTablaUsuarios } from "@modules/usuarios/enum/LabelTablaUsuarios";
import { obtenerUsuariosPorTipoService } from "@modules/usuarios/services/obtenerUsuariosPorTipo";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";

function ListarUsuarios() {
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
  } = useTabla<Usuario>();

  const token = useContext(AccountContext)?.localUser?.token ?? "";

  const { RenderAlertDialog, init, responseData } = useQuery<UsuarioService[]>(
    () => obtenerUsuariosPorTipoService("todos", token),
    "Consulta Usuarios",
    false,
    false
  );

  useEffect(() => {
    if (token == "") return;

    const handleQuery = async () => {
      await init();
    };
    handleQuery();
    setFilterLabels(filtrosUsuarios());
  }, [token]);

  useEffect(() => {
    if (responseData == undefined) {
      setData([]);
    } else {
      setData(responseData?.map((usuario) => adaptarUsuario(usuario)));
    }
  }, [responseData]);

  const navigate = useNavigate();

  const [selectUsuario, setSelectUsuario] = useState<Usuario | undefined>(
    undefined
  );

  const {
    handleClose: estadoHandleClose,
    handleOpen: estadoHandleOpen,
    open: estadoOpen,
  } = useModal();

  const { open, handleOpen, handleClose } = useModal();

  const [modo, setModo] = useState<"crear" | "editar">("editar");

  const handleVentanaEstado = (usuario: Usuario) => {
    setSelectUsuario(usuario);
    estadoHandleOpen();
  };

  const handleEditar = (usuario: Usuario) => {
    setSelectUsuario(usuario);
    setModo("editar");
    handleOpen();
  };

  const handleCrear = () => {
    setSelectUsuario(UsuarioBase);
    setModo("crear");
    handleOpen();
  };

  return (
    <>
      <RenderAlertDialog />
      {selectUsuario != undefined && (
        <ModalEstadoUsuario
          handleClose={estadoHandleClose}
          open={estadoOpen}
          usuario={selectUsuario}
        />
      )}
      {selectUsuario != undefined && (
        <ModalUsuario
          handleClose={handleClose}
          open={open}
          tipo={modo}
          usuario={selectUsuario}
        />
      )}
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
                      mode={actionButtonTypes.ver}
                      onClick={() =>
                        navigate(
                          rutasUsuarios.verPerfilPorId.replace(
                            ":id",
                            usuario.id.toString()
                          )
                        )
                      }
                    />
                    <ActionButton
                      mode={actionButtonTypes.editar}
                      onClick={() => handleEditar(usuario)}
                    />
                    {usuario.estado == "I" ? (
                      <ActionButton
                        mode={actionButtonTypes.habilitarUsuario}
                        onClick={() => handleVentanaEstado(usuario)}
                      />
                    ) : (
                      <ActionButton
                        mode={actionButtonTypes.deshabilitarUsuario}
                        onClick={() => handleVentanaEstado(usuario)}
                      />
                    )}
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
      <Button color="warning" variant="contained" onClick={handleCrear}>
        {LabelTablaUsuarios.agregarUsuario}
      </Button>
    </>
  );
}

export default ListarUsuarios;
