import { Card, CardProps, SxProps } from "@mui/material";

const AnimatedCard: React.FC<CardProps> = ({ children, sx, ...props }) => {
  const styles: SxProps = {
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
    border: '1px solid rgba(0, 0, 0, 0.3)'
  };

  return (
    <Card
      sx={{ ...styles, ...sx }} // Combina los estilos correctamente
      {...props}
    >
      {children}
    </Card>
  );
};

export default AnimatedCard;
