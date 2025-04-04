import { Box, Stack, useTheme } from "@mui/material";

/**
 * Properties for the `Status` component.
 * @typedef {Object} StatusProps
 * @property {"A" | "I"} status - The status of the element, "A" for Active and "I" for Inactive.
 */
export type StatusProps = {
  status: "A" | "I";
};

/**
 * Component that displays a status indicator with a colored circle and text.
 * @param {StatusProps} props - Component properties.
 * @param {"A" | "I"} props.status - The current status, where "A" is Active (green) and "I" is Inactive (red).
 * @returns {JSX.Element} JSX element with the status indicator.
 */
const Status: React.FC<StatusProps> = ({ status }) => {
  const theme = useTheme();

  return (
    <Stack direction={"row"} alignItems={"center"} spacing={1}>
      <Box
        sx={{
          width: 16,
          height: 16,
          backgroundColor:
            status === "A"
              ? theme.palette.success.main
              : theme.palette.error.main,
          borderRadius: "100%",
          animation: "blink 1s infinite alternate",
          "@keyframes blink": {
            "0%": { opacity: 1 },
            "50%": { opacity: 0.7 },
            "100%": { opacity: 1 },
          },
        }}
      />
      <Box>{getStatusText(status)}</Box>
    </Stack>
  );
};

/**
 * Returns the text representation of the status.
 * @param {"A" | "I"} status - The status code.
 * @returns {string} The corresponding status text.
 */
function getStatusText(status: StatusProps["status"]): string {
  return status === "A" ? "Active" : "Inactive";
}

export default Status;
