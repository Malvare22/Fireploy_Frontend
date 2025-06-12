import { useAuth } from "@modules/general/context/accountContext";
import { useAlertDialogContext } from "@modules/general/context/alertDialogContext";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { postStarProject, postUnStarProject } from "@modules/proyectos/services/post.calificar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Rating, RatingProps, Tooltip, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

type Props = {
  check: boolean;
  callback: () => Promise<unknown>;
  projectId: number;
  count: number;
} & RatingProps;

/**
 * StarButton component – allows authenticated users to rate (star/unstar) a project.
 * It toggles the user's rating state and triggers a callback to refresh the state after the action.
 *
 * This component also shows the current number of stars and includes a tooltip for guidance.
 *
 * @component
 *
 * @param check - Indicates whether the current user has already rated the project (true = starred).
 * @param callback - A function that is called after the rating action to update external state.
 * @param projectId - The unique identifier of the project to rate.
 * @param count - The total number of users who have rated the project.
 * @param props - Additional props passed to the Material UI Rating component (e.g., fontSize, sx).
 *
 * @returns A star icon button component that toggles rating state and displays total ratings.
 *
 * @example
 * ```tsx
 * <StarButton
 *   check={true}
 *   callback={refreshData}
 *   projectId={42}
 *   count={15}
 * />
 * ```
 */
export default function StarButton({ check, callback, projectId, count, ...props }: Props) {
  const { token } = useAuth().accountInformation;

  const { showDialog } = useAlertDialogContext();
  const { setError } = useErrorReader(showDialog);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (check) {
        await postUnStarProject(projectId, token);
      } else {
        await postStarProject(projectId, token);
      }

      await callback();
    },
    onError: (err) => setError(err),
  });

  if (isPending) {
    return <AccessTimeIcon />;
  }
  return (
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <Tooltip title="Puntuar">
        <Rating
          value={check ? 1 : 0}
          max={1}
          onChange={() => mutate()}
          {...props}
        />
      </Tooltip>
      {count != null && count >0 && <Typography variant="h5">({count})</Typography>}
    </Box>
  );
}
