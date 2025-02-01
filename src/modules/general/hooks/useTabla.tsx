import {
  Box,
  TableCell,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useMemo, useState } from "react";
import { StyledTableRow } from "../components/tabla";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import InputDeBusqueda from "../components/inputDeBusqueda";

import { useFiltros } from "./useFiltros";

function useTabla<T extends object>() {
  const [data, setData] = useState<T[] | undefined>(undefined);

  const [currentId, setCurrentId] = useState(-1);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(-1);

  type Order = "asc" | "desc";

  const [order, setOrder] = useState<Order>("asc");

  const [orderBy, setOrderBy] = useState<keyof T | null>(null);

  const { RenderFilters, filterData, setFilterLabels, toggleFilter } = useFiltros<T>();

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(
    order: Order,
    orderBy: keyof T
  ): (a: T, b: T) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const filteredData = useMemo(() => {
    const searchLowerCase = search.toLowerCase();
    let bufferData = data ? data : [];
    if (data != null && search != "")
      bufferData = data.filter((d) => {
        const total = JSON.stringify(d, null, 2);
        return total.toLowerCase().includes(searchLowerCase);
      });

    if (orderBy != null) {
      bufferData.sort(getComparator(order, orderBy));
    }

    bufferData = filterData(bufferData);

    return bufferData;
  }, [search, data, orderBy, order, toggleFilter]);

  const handleRequestSort = (property: keyof T) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const emptyRows = useMemo(() => {
    return page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length)
      : 0;
  }, [rowsPerPage, filteredData]);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
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

  const renderData = useMemo(() => {
    return rowsPerPage > 0
      ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : filteredData;
  }, [rowsPerPage, filteredData, page]);

  const FillEmptyRows = useMemo(
    () =>
      emptyRows > 0 ? (
        <TableRow style={{ height: 81 * emptyRows }}>
          <TableCell colSpan={0} />
        </TableRow>
      ) : (
        <></>
      ),
    [rowsPerPage]
  );

  const RenderSearchInput = useMemo(() => {
    return (
      <Box
        sx={{
          marginY: 4,
          backgroundColor: "backgroundX.primary",
          padding: 1,
          borderRadius: 2,
        }}
      >
        <InputDeBusqueda search={search} setSearch={setSearch} />
      </Box>
    );
  }, [search]);

  const Pagination = () => {
    return (
      <StyledTableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={0}
          count={filteredData.length}
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
          align="center"
        />
      </StyledTableRow>
    );
  };

  return {
    data,
    setData,
    currentId,
    setCurrentId,
    search,
    setSearch,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    filteredData,
    emptyRows,
    handleChangePage,
    handleChangeRowsPerPage,
    order,
    orderBy,
    handleRequestSort,
    renderData,
    FillEmptyRows,
    Pagination,
    setFilterLabels,
    RenderSearchInput,
    RenderFilters,
  };
}

export default useTabla;
