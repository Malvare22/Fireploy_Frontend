import { MenuItem, Rating, Stack, TextField } from "@mui/material";

const scores = [0, 0.5, 1.0, 1.5, 2, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

type Props = {
  value: number;
  setValue: (n: number) => void;
};

/**
 * Qualify component – A UI component allowing users to select a rating value from a predefined set of scores.
 * It displays a dropdown (using `TextField` and `MenuItem`) with a `Rating` component for each score.
 * The rating value is adjustable using the dropdown, and the current selected rating value is managed using state.
 * 
 * @component
 * 
 * @param {Object} props - The component props.
 * @param {number} props.value - The current rating value selected by the user.
 * @param {Function} props.setValue - A function to update the rating value state when the user selects a new rating.
 * 
 * @returns {JSX.Element} A dropdown list of scores with associated `Rating` components for each option.
 * 
 * @example
 * ```tsx
 * <Qualify value={ratingValue} setValue={setRatingValue} />
 * ```
 */
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
