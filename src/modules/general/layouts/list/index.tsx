import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";

type LayoutListProps = {
  options: ReactNode;
  children: ReactNode;
};

/**
 * LayoutList is a reusable layout component that arranges a sidebar (options)
 * and main content (children) in a responsive row-column structure.
 *
 * On medium screens and up, it displays options and content side by side (row).
 * On smaller screens, it stacks them vertically (column).
 *
 * @component
 * @param {ReactNode} options - The sidebar or filter panel to render.
 * @param {ReactNode} children - The main content to be displayed.
 * @returns {JSX.Element} A responsive layout for list-based pages.
 */
const LayoutList: React.FC<LayoutListProps> = ({ options, children }) => {
  return (
    <Stack direction={{ md: "row", xs: "column" }} spacing={6}>
      <Box sx={{ width: 300, height: 400 }}>{options}</Box>
      {children}
    </Stack>
  );
};

export default LayoutList;
