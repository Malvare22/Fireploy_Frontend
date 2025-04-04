import { Rating } from "@mui/material";

type ScoreProps = {
  value: number | null;
  setValue?: (newValue: number | null) => void;
};

/**
 * `Score` component that displays a rating system using Material UI's `Rating` component.
 *
 * @param {ScoreProps} props - Component props.
 * @param {number | null} props.value - The current rating value.
 * @param {(newValue: number | null) => void} [props.setValue] - Optional function to update the rating.
 *
 * @returns {JSX.Element} A rating component that is read-only by default.
 */
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
