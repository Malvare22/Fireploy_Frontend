import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import { Card, SxProps, useTheme } from "@mui/material";

/**
 * Props for the `Fade` animation component.
 *
 * @interface FadeProps
 * @property {React.ReactElement} children - The component to animate.
 * @property {boolean} [in] - Controls the fade-in and fade-out state.
 * @property {() => void} [onClick] - Optional click handler.
 * @property {(node: HTMLElement | null, isAppearing: boolean) => void} [onEnter] - Called when animation starts.
 * @property {(node: HTMLElement | null, isAppearing: boolean) => void} [onExited] - Called when animation ends.
 * @property {Record<string, any>} [ownerState] - Optional owner state object.
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
 * Custom `Fade` animation using react-spring for modal transitions.
 *
 * @component
 * @param {FadeProps} props - Animation configuration and children.
 * @returns {JSX.Element} - Returns an animated div wrapping the child component.
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

/**
 * Props for the `SpringModal` component.
 *
 * @interface SpringModalProps
 * @property {React.ReactNode} children - Content inside the modal.
 * @property {boolean} open - Controls whether the modal is visible.
 * @property {() => void} handleClose - Function to handle modal close event.
 * @property {SxProps} [sx] - Optional styles to override default card styles.
 */
interface SpringModalProps {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  sx?: SxProps;
}

/**
 * `SpringModal` is a reusable modal component that uses a spring-based fade transition.
 *
 * @component
 * @param {SpringModalProps} props - Modal control and content.
 * @returns {JSX.Element} - A modal window with animated appearance and custom styling.
 */
const SpringModal: React.FC<SpringModalProps> = ({ children, open, handleClose, sx = {} }) => {
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
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Card sx={{ ...sxStyle, ...sx }}>{children}</Card>
      </Fade>
    </Modal>
  );
};

export default SpringModal;
