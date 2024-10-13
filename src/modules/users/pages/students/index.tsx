import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { UserListLabel } from "../../../users/enums/userListLabel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  IconButton,
  Input,
  TableCell,
  TableFooter,
  TablePagination,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../general/components/tableStyled";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import TablePaginationActions from "../../../general/components/tablePaginationActions";
import { usersData } from "../../utils/dataDummy/usersDataDummy";
import ModalUsersList from "../../components/modalUsersList";
import useModal from "../../../general/hooks/useModal";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useTable from "../../../general/hooks/useTable";

const titles = [
  UserListLabel.code,
  UserListLabel.name,
  UserListLabel.lastName,
  UserListLabel.actions,
];

export default function StudentList() {
  
  const modalAddFile = useModal();

  const modalDelete = useModal();

  const navigate = useNavigate();

  const {
    data,
    setData,
    currentId,
    setCurrentId,
    setSearch,
    page,
    rowsPerPage,
    filteredData,
    emptyRows,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useTable();

  useEffect(() => {
    setData(usersData.filter((d) => d.rol == "E"));
  }, []);

  const handleRemove = (id: number) => {
    setCurrentId(id);
    modalDelete.setView(true);
  };

  const handleRegister = () => {
    navigate('register', { state: { from: '/students' } });
  };

  return (
    <Box sx={{ width: { md: "70%", xs: "90%" } }}>
      {data && (
        <>
          <ModalUsersList
            open={modalDelete.view}
            setOpen={modalDelete.setView}
            message={`${UserListLabel.confirmDelete} (${currentId})`}
          />
          <ModalUsersList
            open={modalAddFile.view}
            setOpen={modalAddFile.setView}
            message={`${UserListLabel.confirmAdd}`}
          />
          <Box sx={{ marginBottom: 4 }}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: { md: 400 },
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                inputProps={{ "aria-label": "search google maps" }}
                onChange={(e) => setSearch(e.currentTarget.value)}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
          <TableContainer component={Paper} sx={{}}>
            <Table sx={{ width: "100%" }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {titles.map((title, i) => (
                    <StyledTableCell
                      key={i}
                      align={i == titles.length - 1 ? "center" : "left"}
                    >
                      {title}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredData().slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredData()
                ).map((row) => (
                  <StyledTableRow key={row.code}>
                    <StyledTableCell align="left">{row.code}</StyledTableCell>
                    <StyledTableCell>{row.lastName}</StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Box>
                        <IconButton component={Link} to={`view?id=${row.code}`}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton component={Link} to={`edit?id=${row.code}`}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleRemove(row.code)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={filteredData().length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                      select: {
                        inputProps: {
                          "aria-label": "Filas por página",
                        },
                        native: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          marginTop: 4,
        }}
      >
        <Box>
          <Button
            component="label"
            variant="action"
            sx={{
              marginRight: 4,
            }}
            endIcon={<NoteAddIcon />}
          >
            {"Cargar .CSV"}
            <Input
              sx={{
                display: "none",
              }}
              type="file"
            />
          </Button>
        </Box>
        <Box>
          <Button variant="action" onClick={handleRegister} endIcon={<AddCircleIcon />}>
            {"Agregar"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
