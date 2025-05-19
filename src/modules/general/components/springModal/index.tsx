import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import { Card, SxProps, useTheme } from "@mui/material";

/**
 * Props for the Fade component.
 */
interface FadeProps {
  /** The child element that will be wrapped with the transition. */
  children: React.ReactElement;

  /** Whether the modal is open (true) or closed (false). */
  in?: boolean;

  /** Optional click handler on the child. */
  onClick?: () => void;

  /** Callback fired when the transition starts (enter). */
  onEnter?: (node: HTMLElement | null, isAppearing: boolean) => void;

  /** Callback fired when the transition ends (exit). */
  onExited?: (node: HTMLElement | null, isAppearing: boolean) => void;

  /** Additional props for animation state or configuration. */
  ownerState?: Record<string, any>;
}

/**
 * Fade Component
 *
 * A custom transition component using `react-spring` to animate opacity.
 * Used for smooth fade-in/out effects when opening or closing the modal.
 *
 * @component
 * @param {FadeProps} props - Fade transition properties.
 * @returns {JSX.Element} Animated wrapper around children.
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
 * Props for the SpringModal component.
 */
interface SpringModalProps {
  /** The content to render inside the modal. */
  children: React.ReactNode;

  /** Whether the modal is open or not. */
  open: boolean;

  /** Function to close the modal. */
  handleClose: () => void;

  /** Optional additional styles to apply to the modal content. */
  sx?: SxProps;
}

/**
 * SpringModal Component
 *
 * A reusable modal component that wraps its content with a Material UI `Modal` and applies a spring animation on open/close.
 * Uses `@react-spring/web` for animated transitions and `@mui/material` for layout and theming.
 *
 * @component
 * @param {SpringModalProps} props - Component properties.
 * @returns {JSX.Element} A centered modal with smooth transitions.
 *
 * @example
 * ```tsx
 * <SpringModal open={isOpen} handleClose={() => setIsOpen(false)}>
 *   <YourComponent />
 * </SpringModal>
 * ```
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
    maxHeight: '90%', overflowY: 'scroll'
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
