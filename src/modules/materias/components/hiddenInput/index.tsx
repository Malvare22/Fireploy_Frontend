import { styled } from '@mui/material/styles';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * HiddenButton component – a custom input button styled to be visually hidden but still accessible for screen readers and interaction.
 * 
 * This component is useful for scenarios where an input is needed for functionality but should not be visible on the page.
 * It uses CSS to hide the button while keeping it available for assistive technologies and interactions such as form submissions.
 * 
 * @component
 * 
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - Standard input element attributes, which are forwarded to the underlying `input` element.
 * 
 * @returns A visually hidden `input` element that remains functional, useful for situations like custom file uploads, where the default input is hidden.
 * 
 * @example
 * ```tsx
 * <HiddenButton type="file" onChange={handleFileChange} />
 * ```
 */
function HiddenButton(props: Props) {

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

  return (
    <VisuallyHiddenInput {...props}/>
  )
}

export default HiddenButton