import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.customGrey.main,
    color: theme.palette.common.white,
    fontSize: theme.typography.titleBold?.fontSize,
    fontWeight: theme.typography.titleBold?.fontWeight,
    padding: 6,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: theme.typography.title2?.fontSize,
    fontWeight: theme.typography.title2?.fontWeight,
    padding: 6,

    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
    ["& svg"]: {
      fontSize: 32,
      [theme.breakpoints.down("md")]: {
        fontSize: 24,
      },
    },
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
