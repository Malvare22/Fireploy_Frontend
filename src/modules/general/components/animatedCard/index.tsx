import { Card, CardProps, SxProps } from "@mui/material";

/**
 * AnimatedCard Component
 *
 * A reusable card component with a hover animation that scales it slightly.
 *
 * @component
 * @param {CardProps} props - Properties inherited from Material-UI's Card component.
 * @param {React.ReactNode} props.children - The content inside the card.
 * @param {SxProps} [props.sx] - Optional custom styles to override default styles.
 * @returns {JSX.Element} A card with a smooth scaling animation on hover.
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
