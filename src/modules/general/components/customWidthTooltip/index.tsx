import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

/**
 * CustomWidthTooltip component – a styled Material-UI Tooltip with increased maximum width.
 * 
 * This component wraps the default MUI Tooltip and overrides its internal tooltip style to allow
 * a wider content area, useful for displaying long messages or rich content.
 * 
 * @component
 * 
 * @param {TooltipProps} props - All standard Tooltip props supported by MUI Tooltip.
 * 
 * @returns {JSX.Element} A Tooltip component with a custom max width of 500px.
 * 
 * @example
 * ```tsx
 * <CustomWidthTooltip title="This is a very long tooltip message that needs more space.">
 *   <span>Hover over me</span>
 * </CustomWidthTooltip>
 * ```
 */
const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
});

export default CustomWidthTooltip;