import { Card, CardProps, SxProps } from "@mui/material";

/**
 * AnimatedCard Component
 *
 * A reusable card component that adds a smooth hover animation. The card slightly scales up when hovered, 
 * providing a visually engaging effect.
 *
 * @component
 * @param {CardProps} props - Properties inherited from Material-UI's `Card` component.
 * @param {React.ReactNode} props.children - The content inside the card.
 * @param {SxProps} [props.sx] - Optional custom styles to override or extend the default styles applied to the card.
 * @returns {JSX.Element} A Material-UI Card component with a hover scaling animation.
 * 
 * @example
 * ```tsx
 * <AnimatedCard sx={{ maxWidth: 300 }}>
 *   <Typography variant="h5">Card Title</Typography>
 *   <Typography>Some content inside the card</Typography>
 * </AnimatedCard>
 * ```
 */
const AnimatedCard: React.FC<CardProps> = ({ children, sx, ...props }) => {
  /** Default styles with hover animation */
  const styles: SxProps = {
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
    border: "1px solid rgba(0, 0, 0, 0.3)",
  };

  return (
    <Card
      sx={{ ...styles, ...sx }} // Correctly merges default and custom styles
      {...props}
    >
      {children}
    </Card>
  );
};

export default AnimatedCard;
