import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { dummyUsers } from "../../../users/utils/dataDummy/usersDataDummy";
import { UserListLabel } from "../../../users/enums/userListLabel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  IconButton,
  TableCell,
  TableFooter,
  TablePagination,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../general/components/tableStyled";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import TablePaginationActions from "../../../general/components/tablePaginationActions";
import { studentsData } from "../../utils/dataDummy/studentsDummy";

const titles = [
  UserListLabel.code,
  UserListLabel.name,
  UserListLabel.lastName,
  UserListLabel.actions,
];

export default function StudentList() {
  const [users, setUsers] = useState(studentsData);

  const [search, setSearch] = useState("");

  const filteredData = () => {
    const searchLowerCase = search.toLowerCase();
    return users.filter((user) => {
      const total = user.code + "" + user.lastName + "" + user.name;
      return total.toLowerCase().includes(searchLowerCase);
    });
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredData().length)
      : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: { md: "70%", xs: "90%" } }}>
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
                    <IconButton>
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
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
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
    </Box>
  );
}
