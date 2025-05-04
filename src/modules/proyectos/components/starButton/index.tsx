import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Rating, Tooltip } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

type Props = {
  mutate: () => void;
  isLoading: boolean;
  value: number;
  modal: boolean;
};
export default function StarButton({ isLoading, mutate, value, modal }: Props) {
  if (isLoading) {
    return <AccessTimeIcon />;
  }
  return (
    <Tooltip title="Puntuar">
      <Rating
        value={value ? 1 : 0}
        max={1}
        size="large"
        onChange={() => mutate()}
        sx={{ stroke: "red 1px" }}
        emptyIcon={<StarBorderIcon fontSize="inherit" sx={{ color: !modal ? "white" : "gray" }} />}
      />
    </Tooltip>
  );
}
