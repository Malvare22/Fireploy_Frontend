import { useAuth } from "@modules/general/context/accountContext";
import { useAlertDialogContext } from "@modules/general/context/alertDialogContext";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import {
  postStarProject,
  postUnStarProject,
} from "@modules/proyectos/services/post.calificar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Rating, RatingProps, Tooltip, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

type Props = {
  check: boolean;
  callback: () => Promise<unknown>;
  projectId: number;
  count: number;
} & RatingProps;
export default function StarButton({
  check,
  callback,
  projectId,
  count,
  ...props
}: Props) {
  const { token, id } = useAuth().accountInformation;

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
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Tooltip title="Puntuar">
        <Rating
          value={check || id == -1 ? 1 : 0}
          max={1}
          onChange={() => mutate()}
          {...props}
          disabled={id == -1}
        />
      </Tooltip>
      {count != null && count > 0 && (
        <Typography variant="h6">({count})</Typography>
      )}
    </Box>
  );
}
