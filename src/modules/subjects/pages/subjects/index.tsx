import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  IconButton,
  Input,
  TableCell,
  TableFooter,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useModal from "@modules/general/hooks/useModal";
import useTable from "@modules/general/hooks/useTable";
import ModalAlert from "@modules/general/components/modalAlert";
import {
  StyledTableCell,
  StyledTableRow,
} from "@modules/general/components/tableStyled";
import TablePaginationActions from "@modules/general/components/tablePaginationActions";
import { SubjectListLabel } from "@modules/subjects/enums/subjectsListLabel";
import { HeadCell } from "@core/type/headCell";
import { SubjectType } from "@modules/subjects/types/subjectType";
import { subjectData } from "@modules/subjects/utils/data/subjectData";

// const titles = [
//   SubjectListLabel.code,
//   SubjectListLabel.name,
//   SubjectListLabel.group,
//   SubjectListLabel.students,
//   SubjectListLabel.sections,
//   SubjectListLabel.projects,
// ];

const headCells: readonly HeadCell<SubjectType>[] = [
  {
    id: "code",
    label: SubjectListLabel.code,
    sorteable: true,
  },
  {
    id: "name",
    label: SubjectListLabel.name,
    sorteable: true,
  },
  {
    id: "group",
    label: SubjectListLabel.group,
    sorteable: true,
  },
];

export default function SubjectsList() {
  const modalAddFile = useModal();

  const modalDelete = useModal();

  const navigate = useNavigate();

  const {
    data,
    setData,
    setSearch,
    page,
    rowsPerPage,
    filteredData,
    emptyRows,
    handleChangePage,
    handleChangeRowsPerPage,
    order,
    orderBy,
    handleRequestSort,
  } = useTable<SubjectType>();

  useEffect(() => {
    setData(subjectData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleRemove = (id: number) => {
  //   setCurrentId(id);
  //   modalDelete.setView(true);
  // };

  const handleRegister = () => {
    navigate("register", { state: { from: "/teachers" } });
  };

  const rol: string | null = localStorage.getItem("rol");

  return (
    <Box sx={{ width: { md: "70%", xs: "90%" } }}>
      {data && (
        <>
          <ModalAlert
            open={modalDelete.view}
            setOpen={modalDelete.setView}
            message={"`${SubjectListLabel.confirmDelete} (${currentId})`"}
          />
          <ModalAlert
            open={modalAddFile.view}
            setOpen={modalAddFile.setView}
            message={"`${SubjectListLabel.confirmAdd}`"}
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
                  {headCells.map((element, i) => (
                    <StyledTableCell key={i} align={"center"}>
                      {element.sorteable ? (
                        <TableSortLabel
                          active={orderBy === element.id}
                          direction={orderBy === element.id ? order : "asc"}
                          onClick={() => {
                            handleRequestSort(element.id);
                          }}
                        >
                          {element.label}
                        </TableSortLabel>
                      ) : (
                        <>{element.label}</>
                      )}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell>{SubjectListLabel.students}</StyledTableCell>
                  <StyledTableCell>{SubjectListLabel.projects}</StyledTableCell>
                  <StyledTableCell>{SubjectListLabel.sections}</StyledTableCell>
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
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.group}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton
                        component={Link}
                        to={`students?id=${row.code}`}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton
                        component={Link}
                        to={`projects?id=${row.code}`}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton
                        component={Link}
                        to={`sections?id=${row.code}`}
                      >
                        <VisibilityIcon />
                      </IconButton>
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
      {rol != null && rol == "A" && (
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
            <Button
              variant="action"
              onClick={handleRegister}
              endIcon={<AddCircleIcon />}
            >
              {"Agregar"}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
