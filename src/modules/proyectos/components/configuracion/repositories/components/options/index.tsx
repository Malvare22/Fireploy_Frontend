import { ToggleButton, useTheme } from "@mui/material";
import { Stack, Box } from "@mui/material";

type KeysOfRepository = "frontend" | "backend" | "integrado";

interface SelectLayerProps {
  selectLayer: KeysOfRepository | null;
  setSelectLayer: (layer: KeysOfRepository) => void;
}

export default function SelectorLayer({ selectLayer, setSelectLayer }: SelectLayerProps) {
  const theme = useTheme();

  function Option({ layer }: { layer: KeysOfRepository }) {
    const LABEL = layer === "backend" ? "Backend" : layer === "frontend" ? "Frontend" : "Integrado";

    const isSelected = selectLayer === layer;

    return (
      <ToggleButton
        value={layer}
        onClick={() => setSelectLayer(layer)}
        selected={isSelected}
        sx={{
          "&.Mui-selected, &.Mui-selected:hover": {
            color: "white",
            backgroundColor: theme.palette.info.main,
          },
        }}
      >
        {LABEL}
      </ToggleButton>
    );
  }

  return (
    <Stack direction={"row"} spacing={2}>
      <Box>
        <Option layer="frontend" />
      </Box>
      <Box>
        <Option layer="backend" />
      </Box>
    </Stack>
  );
}
