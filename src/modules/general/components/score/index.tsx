import { Rating } from "@mui/material";

type ScoreProps = {
  value: number | null;
  setValue?: (newValue: number | null) => void;
};

function Score({ value, setValue }: ScoreProps) {
  return (
    <Rating
      name="simple-controlled"
      value={value}
      onChange={(_event, newValue) => {
        if (setValue) setValue(newValue);
      }}
      readOnly
    />
  );
}

export default Score;
