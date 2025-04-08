import { ConditionalStyles, TableStyles } from "react-data-table-component";
import { useTheme } from "@mui/material";

// Estilos personalizados para la tabla
export const useCustomTableStyles = () => {
  const theme = useTheme();

  const customStyles: TableStyles = {
    headCells: {
      style: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
        fontFamily: theme.typography.body1.fontFamily,
      },
    },
    rows: {
      style: {
        color: theme.palette.text.primary,
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
        fontFamily: theme.typography.body1.fontFamily,
        backgroundColor: theme.palette.background.paper,
      },
    },
  };

  const conditionalRowStyles: ConditionalStyles<any>[] = [
    {
      when: (row) => row.rowIndex % 2 === 0,
      style: {
        backgroundColor: theme.palette.action.hover,
      },
    },
  ];

  return { customStyles, conditionalRowStyles };
};
