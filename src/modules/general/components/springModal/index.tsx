import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import { Card, SxProps, useTheme } from "@mui/material";

/**
 * Props for the `Fade` animation component.
 */
interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: () => void;
  onEnter?: (node: HTMLElement | null, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement | null, isAppearing: boolean) => void;
  ownerState?: Record<string, any>;
}

/**
 * Custom `Fade` animation for modal transitions.
 */
const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  { children, in: open, onClick, onEnter, onExited, ownerState = {}, ...other },
  ref
) {
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => open && onEnter?.(null, true),
    onRest: () => !open && onExited?.(null, true),
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

interface SpringModalProps {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  sx: SxProps
}


const SpringModal: React.FC<SpringModalProps> = ({
  children,
  open,
  handleClose,
  sx
}) => {
  const theme = useTheme();

  const sxStyle: SxProps = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.default,
    boxShadow: 24,
    paddingX: 4,
    paddingY: 3,
    borderRadius: 2,
  };

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop} // ✅ Explicitly set BackdropComponent
      BackdropProps={{
        timeout: 500, // ✅ Ensure smooth animation
      }}
    >
      <Fade in={open}>
        <Card sx={{...sxStyle, ...sx}}>{children}</Card>
      </Fade>
    </Modal>
  );
};

export default SpringModal;
