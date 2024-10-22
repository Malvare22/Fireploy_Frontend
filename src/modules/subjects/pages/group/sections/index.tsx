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
  TextField,
  Typography,
} from "@mui/material";
import { styles } from "./styles";
import {
  StyledTableCell,
  StyledTableRow,
} from "@modules/general/components/tableStyled";
import DeleteIcon from "@mui/icons-material/Delete";
import useTable from "@modules/general/hooks/useTable";
import { useEffect, useState } from "react";
import { HeadCell } from "@core/type/headCell";
import AddButton from "@modules/general/components/buttons/add";
import { useSearchParams } from "react-router-dom";
import { subjectData } from "@modules/subjects/utils/data/subjectData";
import { SectionType } from "@modules/subjects/types/subjectType";
import Generic from "@modules/general/layouts/generic";

enum GroupSectionsLabel {
  name = "Nombre",
  title = 'Secciones',
  options = 'Opciones'
}

const headCells: readonly HeadCell<SectionType>[] = [
  {
    id: "name",
    label: GroupSectionsLabel.name,
    sorteable: true,
  },
];

export default function GroupSections() {
  // const [toRegister, setToRegister] = useState<string[]>([]);

  // console.log(toRegister);

  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  const [title, setTitle] = useState('');

  const {
    setData,
    page,
    rowsPerPage,
    filteredData,
    emptyRows,
    order,
    orderBy,
    handleRequestSort,
  } = useTable<SectionType>();

  useEffect(() => {
    if (!id) return;
    const _id = parseInt(id);
    const _subject = subjectData.find((s) => s.code == _id);
    if(_subject){
      setData(_subject?.sections);
      setTitle(_subject.name + ' ' + _subject.group);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Generic title={title}>
      <Card sx={styles.container}>
        <Typography variant="h5">{GroupSectionsLabel.title}</Typography>
        <Box sx={{ display: { sm: "flex" }, width: "100%", marginTop: 2 }}>
          <Box sx={{ width: { sm: "50%" } }}>
            <TableContainer component={Paper} sx={{ width: "100%" }}>
              <Table aria-label="customized table">
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
                    <StyledTableCell align="center">
                      {GroupSectionsLabel.options}
                    </StyledTableCell>
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
                    <StyledTableRow key={row.name}>
                      <StyledTableCell>{row.name}</StyledTableCell>
                      <StyledTableCell align="center">
                          <IconButton>
                            <DeleteIcon />
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
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              marginLeft: { sm: 4 },
              width: { sm: "50%" },
              marginTop: { sm: 0, xs: 4 },
            }}
          >
            <Box sx={{    display: 'flex', alignItems: 'center'}}>
            <TextField></TextField>
            <Box>
              <AddButton sx={{marginLeft: 2}}/>
            </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </Generic>
  );
}