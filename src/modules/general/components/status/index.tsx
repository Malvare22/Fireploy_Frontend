import { Box, Stack, useTheme } from "@mui/material";

/**
 * Props for the Status component.
 */
export type StatusProps = {
  /**
   * The status value indicating whether the user is active ("A") or inactive ("I").
   */
  status: "A" | "I";
};

/**
 * Status Component
 *
 * Displays a colored circle and label representing a user's status.
 * A green circle with "Active" indicates status "A", and a red circle with "Inactive" indicates status "I".
 * Includes a blinking animation to draw subtle attention to the status.
 *
 * @component
 * @param {StatusProps} props - Component props.
 * @returns {JSX.Element} Status display with icon and text.
 *
 * @example
 * ```tsx
 * <Status status="A" />  // Shows green dot and "Active"
 * <Status status="I" />  // Shows red dot and "Inactive"
 * ```
 */
const Status: React.FC<StatusProps> = ({ status }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
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
 * Converts a status code into human-readable text.
 *
 * @param {StatusProps["status"]} status - The status code ("A" or "I").
 * @returns {string} The corresponding label ("Active" or "Inactive").
 */
function getStatusText(status: StatusProps["status"]): string {
  return status === "A" ? "Activo" : "Inactivo";
}

export default Status;
