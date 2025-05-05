import { MenuItem, Rating, Stack, TextField } from "@mui/material";

const scores = [0, 0.5, 1.0, 1.5, 2, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

type Props = {
  value: number;
  setValue: (n: number) => void;
};

function Qualify({ setValue, value }: Props) {
  return (
    <Stack>
      <TextField
        select
        label="Rating"
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
      >
        {scores.map((score) => (
          <MenuItem key={score} value={score}>
            <Rating name="half-rating-read" defaultValue={score} precision={0.5} readOnly />
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}

export default Qualify;
