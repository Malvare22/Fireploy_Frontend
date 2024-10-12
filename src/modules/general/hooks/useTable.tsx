import { useState } from "react";

function useTable<T extends Record<string, any>>() {

  const [data, setData] = useState<T[] | undefined>(undefined);


  const [currentId, setCurrentId] = useState(-1);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredData = () => {
    const searchLowerCase = search.toLowerCase();
    if(data != null)
    return data.filter((d) => {
      const total = JSON.stringify(d, null, 2);;
      return total.toLowerCase().includes(searchLowerCase);
    });
    return [];
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
   data, setData, currentId, setCurrentId, search, setSearch, page, setPage, rowsPerPage, setRowsPerPage, filteredData, emptyRows, handleChangePage, handleChangeRowsPerPage
  };
}

export default useTable;
