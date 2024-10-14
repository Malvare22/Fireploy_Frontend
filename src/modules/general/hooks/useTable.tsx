import { useState } from "react";

function useTable<T>() {

  const [data, setData] = useState<T[] | undefined>(undefined);

  const [currentId, setCurrentId] = useState(-1);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  type Order = 'asc' | 'desc';

  const [order, setOrder] = useState<Order>('asc');

  const [orderBy, setOrderBy] = useState<keyof T | null>(null);

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
    orderBy: keyof T,
  ): (
    a: T,
    b: T,
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const filteredData = () => {
    const searchLowerCase = search.toLowerCase();
    let bufferData = data ? data : [];
    if(data != null && search != "")
      bufferData = data.filter((d) => {
      const total = JSON.stringify(d, null, 2);;
      return total.toLowerCase().includes(searchLowerCase);
    });

    if(orderBy != null){
      bufferData.sort(getComparator(order, orderBy));
    }

    return bufferData;
  };

  const handleRequestSort = (
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredData().length)
      : 0;

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


  return {
   data, setData, currentId, setCurrentId, search, setSearch, page, setPage, rowsPerPage, setRowsPerPage, filteredData, emptyRows, handleChangePage, handleChangeRowsPerPage, order, orderBy, handleRequestSort
  };
}

export default useTable;
