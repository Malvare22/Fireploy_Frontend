import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { styles } from "./styles";
import ImgLoader from "../../../general/components/imgLoader";
import useImgFileLoader from "../../../general/hooks/useImgFileLoader";

const ProfileLabel = {
  name: "Nombre",
  lastName: "Apellido",
  code: "Código",
  genre: "Género",
  date: "Fecha de Nacimiento",
  photo: "Foto",
  save: "Guardar",
  cancel: " Cancelar",
};

function Profile() {

  const imgValue = useImgFileLoader();

  return (
    <Card sx={styles.container}>
      <Box sx={styles.row}>
        <Box sx={styles.label}>
          <Typography variant="label">{ProfileLabel.name}</Typography>
        </Box>
        <Box sx={styles.input}>
          <TextField type="text"></TextField>
          <Typography variant="inputMessage"></Typography>
        </Box>
      </Box>

      <Box sx={styles.row}>
        <Box sx={styles.label}>
          <Typography variant="label">{ProfileLabel.lastName}</Typography>
        </Box>
        <Box sx={styles.input}>
          <TextField type="text"></TextField>
          <Typography variant="inputMessage"></Typography>
        </Box>
      </Box>

      <Box sx={styles.row}>
        <Box sx={styles.label}>
          <Typography variant="label">{ProfileLabel.code}</Typography>
        </Box>
        <Box sx={styles.input}>
          <TextField type="number"></TextField>
          <Typography variant="inputMessage"></Typography>
        </Box>
      </Box>

      <Box sx={styles.row}>
        <Box sx={styles.label}>
          <Typography variant="label">{ProfileLabel.date}</Typography>
        </Box>
        <Box sx={styles.input}>
          <TextField type="date"></TextField>
          <Typography variant="inputMessage"></Typography>
        </Box>
      </Box>

      <Box sx={styles.row}>
        <Box sx={styles.label}>
          <Typography variant="label">{ProfileLabel.photo}</Typography>
        </Box>
        <Box sx={styles.input}>
          <ImgLoader imgLoader={imgValue}/>
          <Typography variant="inputMessage"></Typography>
        </Box>
      </Box>
      <Box sx={styles.buttonContainer}>
        <Box>
          <Button variant="action">{ProfileLabel.save}</Button>
        </Box>
        <Box>
          <Button variant="cancel" sx={{ marginLeft: 4 }}>
            {ProfileLabel.cancel}
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default Profile;
