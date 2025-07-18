import { Box, GlobalStyles, useTheme } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

/**
 * LoaderElement component – a custom animated loader built with Material-UI components and a rocket icon.
 * 
 * This loader displays a central rocket icon with orbiting animated dots, creating a dynamic visual effect. 
 * It uses custom CSS keyframe animations for orbiting and blinking, applied globally using MUI's `GlobalStyles`.
 * 
 * This component does not accept props and is intended to fill its container (`100%` width and height).
 * 
 * @component
 * 
 * @returns {JSX.Element} An animated loader element with orbiting particles and a blinking rocket icon.
 * 
 * @example
 * ```tsx
 * <Box sx={{ width: 300, height: 300 }}>
 *   <LoaderElement />
 * </Box>
 * ```
 */
function LoaderElement() {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%',display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {/* Global styles for orbit and blink animations */}
      <GlobalStyles
        styles={{
          "@keyframes orbit": {
            from: {
              transform: "rotate(0deg) translateX(var(--radius)) rotate(0deg)",
            },
            to: {
              transform: "rotate(360deg) translateX(var(--radius)) rotate(-360deg)",
            },
          },
          "@keyframes blink": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0.5 },
          },
        }}
      />

      <Box
        sx={{
          width: 100,
          height: 100,
          position: 'relative',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // border: '1px solid red'
        }}
      >
        {/* Orbit paths */}
        {[70, 90, 110].map((size, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "50%",
              border: `1px dashed ${theme.palette.divider}`,
            }}
          />
        ))}

        {/* Orbiting circles */}
        {[35, 45, 55].map((radius, i) => (
          <Box
            key={`orbit-${i}`}
            sx={{
              "--radius": `${radius}px`,
              position: "absolute",
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: theme.palette.warning.main,

              transformOrigin: "0 0",
              animation: `orbit ${4 + i}s linear infinite`,
            }}
          />
        ))}

        {/* Rocket icon */}
        <RocketLaunchIcon
          sx={{
            fontSize: 36,
            color: "rgb(41, 61, 111)",
            animation: "blink 2s infinite",
          }}
        />
      </Box>
    </Box>
  );
}

export default LoaderElement;
