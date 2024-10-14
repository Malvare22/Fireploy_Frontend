import {
  Box,
  Card,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { styles } from "./styles";
import {
  StyledTableCell,
  StyledTableRow,
} from "@modules/general/components/tableStyled";
import DeleteIcon from "@mui/icons-material/Delete";
import useTable from "@modules/general/hooks/useTable";
import { useEffect } from "react";
import { HeadCell } from "@core/type/headCell";

enum GroupStudentsLabel {
  title = "Estudiantes",
  code = "Código",
  name = "Nombre",
  options = "Opciones",
}

interface Type {
  code: number;
  name: string;
}

const testData: Type[] = [
  { code: 1, name: "Apple" },
  { code: 2, name: "Banana" },
  { code: 3, name: "Cherry" },
  { code: 4, name: "Date" },
  { code: 5, name: "Elderberry" },
  { code: 6, name: "Fig" },
  { code: 7, name: "Grape" },
  { code: 8, name: "Honeydew" },
  { code: 9, name: "Kiwi" },
  { code: 10, name: "Lemon" },
];

const headCells: readonly HeadCell<Type>[] = [
  {
    id: "code",
    label: GroupStudentsLabel.code,
    sorteable: true,
  },
  {
    id: "name",
    label: GroupStudentsLabel.name,
    sorteable: true,
  },
];

function GroupStudents() {
  const {
    setData,
    page,
    rowsPerPage,
    filteredData,
    emptyRows,

    order,
    orderBy,
    handleRequestSort,
  } = useTable<Type>();

  useEffect(() => {
    setData(testData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card sx={styles.container}>
      <Typography variant="h5">{GroupStudentsLabel.title}</Typography>
      <TableContainer component={Paper} sx={{}}>
        <Table sx={{ width: "40%" }} aria-label="customized table">
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
              <StyledTableCell>{GroupStudentsLabel.options}</StyledTableCell>
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
                  <Box>
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
        </Table>
      </TableContainer>
    </Card>
  );
}

export default GroupStudents;
