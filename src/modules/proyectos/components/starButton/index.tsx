import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Rating, Tooltip } from "@mui/material";

type Props = {
  mutate: () => void;
  isLoading: boolean;
  value: boolean;
  modal: boolean;
};

/**
 * StarButton component – A button for rating a project or item using a star icon. 
 * The component uses the `Rating` component from Material-UI, allowing users to give a rating of 0 or 1 star.
 * The component also shows a loading icon when the rating is being submitted, and uses a tooltip to indicate the action.
 * 
 * @component
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.isLoading - A flag indicating whether the component is in a loading state (i.e., submitting the rating).
 * @param {Function} props.mutate - A function that will be called when the user changes the rating (e.g., submit the rating).
 * @param {boolean} props.value - The current rating value (0 or 1). Determines the star rating's visual representation.
 * 
 * @returns {JSX.Element} A button with a star icon that serves as a rating control, with a tooltip for additional information.
 * 
 * @example
 * ```tsx
 * <StarButton isLoading={isSubmitting} mutate={handleRatingChange} value={currentRating} modal={isModalContext} />
 * ```
 */
export default function StarButton({ isLoading, mutate, value }: Props) {
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
      />
    </Tooltip>
  );
}
