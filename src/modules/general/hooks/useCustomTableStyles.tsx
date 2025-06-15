import { ConditionalStyles, TableStyles } from "react-data-table-component";
import { useTheme } from "@mui/material";

/**
 * useCustomTableStyles hook – Provides custom styles for data tables using the current MUI theme.
 *
 * This hook returns style configurations to be applied to a `react-data-table-component`, 
 * including head cell and row styling that adapts to the active MUI theme.
 * It also includes conditional styling for alternating row backgrounds.
 *
 * @hook
 *
 * @returns An object containing:
 * - `customStyles`: Styles for table headers and rows based on the MUI theme.
 * - `conditionalRowStyles`: Conditional styling for even rows to improve readability.
 *
 * @example
 * ```tsx
 * const { customStyles, conditionalRowStyles } = useCustomTableStyles();
 *
 * <DataTable
 *   data={data}
 *   columns={columns}
 *   customStyles={customStyles}
 *   conditionalRowStyles={conditionalRowStyles}
 * />
 * ```
 */
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
