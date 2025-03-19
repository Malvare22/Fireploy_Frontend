import { Box, TableCell, TablePagination, TableRow } from "@mui/material";
import { useMemo, useState } from "react";
import { StyledTableRow } from "../components/tabla";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import InputDeBusqueda from "../components/inputDeBusqueda";
import { useFiltros } from "./useFilters";

/**
 * Hook para manejar tablas con filtros, búsqueda, paginación y ordenamiento.
 *
 * @template T - Tipo de datos esperados en la tabla.
 *
 * @returns {{
 *   data: T[] | undefined;
 *   setData: React.Dispatch<React.SetStateAction<T[] | undefined>>;
 *   currentId: number;
 *   setCurrentId: React.Dispatch<React.SetStateAction<number>>;
 *   search: string;
 *   setSearch: React.Dispatch<React.SetStateAction<string>>;
 *   page: number;
 *   setPage: React.Dispatch<React.SetStateAction<number>>;
 *   rowsPerPage: number;
 *   setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
 *   filteredData: T[];
 *   emptyRows: number;
 *   handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
 *   handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
 *   order: "asc" | "desc";
 *   orderBy: keyof T | null;
 *   handleRequestSort: (property: keyof T) => void;
 *   renderData: T[];
 *   FillEmptyRows: JSX.Element;
 *   Pagination: () => JSX.Element;
 *   setFilterLabels: (labels: string[]) => void;
 *   RenderSearchInput: JSX.Element;
 *   RenderFilters: JSX.Element;
 * }}
 */
function useTabla<T extends object>() {
  /**
   * Estado que almacena los datos de la tabla.
   */
  const [data, setData] = useState<T[] | undefined>(undefined);

  /**
   * Estado que almacena el ID seleccionado actualmente.
   */
  const [currentId, setCurrentId] = useState(-1);

  /**
   * Estado para la búsqueda en la tabla.
   */
  const [search, setSearch] = useState("");

  /**
   * Estado para la página actual de la tabla.
   */
  const [page, setPage] = useState(0);

  /**
   * Estado para el número de filas por página.
   * Si es `-1`, se muestran todas las filas.
   */
  const [rowsPerPage, setRowsPerPage] = useState(-1);

  

  /**
   * Maneja el evento de ordenamiento al hacer clic en una cabecera de la tabla.
   *
   * @param {keyof T} property - Propiedad sobre la que se debe ordenar.
   */
  const handleRequestSort = (property: keyof T) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  /**
   * Calcula la cantidad de filas vacías necesarias para mantener el diseño de la tabla.
   *
   * @returns {number} - Número de filas vacías necesarias.
   */
  const emptyRows = useMemo(() => {
    return page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length)
      : 0;
  }, [rowsPerPage, filteredData]);

  /**
   * Cambia la página actual de la tabla.
   *
   * @param {React.MouseEvent<HTMLButtonElement> | null} _event - Evento del botón de cambio de página.
   * @param {number} newPage - Número de la nueva página.
   */
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  /**
   * Cambia la cantidad de filas mostradas por página y reinicia la paginación.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event - Evento del cambio de selección.
   */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /**
   * Obtiene los datos a renderizar en la tabla, considerando la paginación.
   *
   * @returns {T[]} - Datos que se mostrarán en la página actual.
   */
  const renderData = useMemo(() => {
    return rowsPerPage > 0
      ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : filteredData;
  }, [rowsPerPage, filteredData, page]);

  /**
   * Renderiza las filas vacías para mantener la estructura de la tabla.
   *
   * @returns {JSX.Element} - Filas vacías si es necesario.
   */
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

  /**
   * Renderiza el campo de búsqueda de la tabla.
   *
   * @returns {JSX.Element} - Caja de búsqueda.
   */
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

  /**
   * Renderiza la paginación de la tabla.
   *
   * @returns {JSX.Element} - Componente de paginación.
   */
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
