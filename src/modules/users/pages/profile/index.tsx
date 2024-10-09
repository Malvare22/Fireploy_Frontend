import {
  Box,
  Button,
  Card,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styles } from "./styles";
import ImgLoader from "../../../general/components/imgLoader";
import useImgFileLoader from "../../../general/hooks/useImgFileLoader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mappedGenres } from "../../../general/utils/validations/genre";
import { useState } from "react";
import { dummyUsers } from "../../utils/dataDummy/usersDataDummy";
import { mappedRoles } from "../../../general/utils/validations/rol";
import {
  UserSchemaType,
  userSchema,
} from "../../../general/utils/validations/userSchema";

const ProfileLabel = {
  name: "Nombre:",
  lastName: "Apellido:",
  email: "Correo:",
  rol: "Rol",
  code: "Código:",
  date: "Fecha de Nacimiento:",
  genre: "Género:",
  photo: "Foto:",
  save: "Guardar",
  edit: "Editar",
  cancel: " Cancelar",
};

interface Props {
  ableToEdit: boolean;
  initEditing?: boolean;
  isAdmin?: boolean;
}

function Profile({ ableToEdit, initEditing = false, isAdmin = false }: Props) {
  const imgValue = useImgFileLoader();

  const [isEditing, setIsEditing] = useState(true);

  const [user, setUser] = useState(dummyUsers[1]);

  const genreOptions = Object.entries(mappedGenres).map(([key, value], i) => (
    <MenuItem key={i} value={key}>
      {value}
    </MenuItem>
  ));

  const rolesOptions = Object.entries(mappedRoles).map(([key, value], i) => (
    <MenuItem key={i} value={key}>
      {value}
    </MenuItem>
  ));

  const handleEdit = () => {
    if (isEditing) {
      imgValue.setImg(null);
      reset();

    }
    setIsEditing(!isEditing);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: dummyUsers[1],
  });

  return (
    <Card sx={styles.container}>
        <form onSubmit={handleSubmit((d) => console.log(d))}>
        <Box sx={styles.imgContainer}>
          <Box component={"img"} src={user.img} sx={styles.img}></Box>
        </Box>
        <Box>
          <Box sx={styles.row}>
            <Box sx={styles.label}>
              <Typography variant="label">{ProfileLabel.name}</Typography>
            </Box>
            <Box sx={styles.input}>
              {isEditing ? (
                <>
                  <TextField type="text" {...register("name")} />
                  {errors.name?.message && (
                    <Typography variant="inputMessage">
                      {errors.name?.message}
                    </Typography>
                  )}
                </>
              ) : (
                <Box>
                  <Typography variant="body1">{user.name}</Typography>
                </Box>
              )}
            </Box>
          </Box>

          <Box sx={styles.row}>
            <Box sx={styles.label}>
              <Typography variant="label">{ProfileLabel.lastName}</Typography>
            </Box>
            <Box sx={styles.input}>
              {isEditing ? (
                <>
                  <TextField type="text" {...register("lastName")} />
                  {errors.lastName?.message && (
                    <Typography variant="inputMessage">
                      {errors.lastName?.message}
                    </Typography>
                  )}
                </>
              ) : (
                <Box>
                  <Typography variant="body1">{user.lastName}</Typography>
                </Box>
              )}
            </Box>
          </Box>

          <Box sx={styles.row}>
            <Box sx={styles.label}>
              <Typography variant="label">{ProfileLabel.email}</Typography>
            </Box>
            <Box sx={styles.input}>
              {isEditing ? (
                <>
                  <TextField type="text" {...register("email")} />
                  {errors.email?.message && (
                    <Typography variant="inputMessage">
                      {errors.email?.message}
                    </Typography>
                  )}
                </>
              ) : (
                <Box>
                  <Typography variant="body1">{user.email}</Typography>
                </Box>
              )}
            </Box>
          </Box>

          <Box sx={styles.row}>
            <Box sx={styles.label}>
              <Typography variant="label">{ProfileLabel.rol}</Typography>
            </Box>
            <Box sx={styles.input}>
              {isEditing ? (
                <>
                  <Select
                    type="text"
                    defaultValue={user.rol}
                    {...register("rol")}
                  >
                    {rolesOptions}
                  </Select>
                  {errors.rol?.message && (
                    <Typography variant="inputMessage">
                      {errors.rol?.message}
                    </Typography>
                  )}
                </>
              ) : (
                <Box>
                  <Typography variant="body1">{mappedRoles[user.rol]}</Typography>
                </Box>
              )}
            </Box>
          </Box>

          <Box sx={styles.row}>
            <Box sx={styles.label}>
              <Typography variant="label">{ProfileLabel.code}</Typography>
            </Box>
            <Box sx={styles.input}>
              {isEditing ? (
                <>
                  <TextField type="text" {...register("code")} />
                  {errors.code?.message && (
                    <Typography variant="inputMessage">
                      {errors.code?.message}
                    </Typography>
                  )}
                </>
              ) : (
                <Box>
                  <Typography variant="body1">{user.code}</Typography>
                </Box>
              )}
            </Box>
          </Box>

          <Box sx={styles.row}>
            <Box sx={styles.label}>
              <Typography variant="label">{ProfileLabel.date}</Typography>
            </Box>
            <Box sx={styles.input}>
              {isEditing ? (
                <>
                  <TextField type="date" {...register("date")} />
                  {errors.date?.message && (
                    <Typography variant="inputMessage">
                      {errors.date?.message}
                    </Typography>
                  )}
                </>
              ) : (
                <Box>
                  <Typography variant="body1">{user.date}</Typography>
                </Box>
              )}
            </Box>
          </Box>

          <Box sx={styles.row}>
            <Box sx={styles.label}>
              <Typography variant="label">{ProfileLabel.genre}</Typography>
            </Box>
            <Box sx={styles.input}>
              {isEditing ? (
                <>
                  <Select
                    type="text"
                    defaultValue={user.genre}
                    {...register("genre")}
                  >
                    {genreOptions}
                  </Select>
                  {errors.genre?.message && (
                    <Typography variant="inputMessage">
                      {errors.genre?.message}
                    </Typography>
                  )}
                </>
              ) : (
                <Box>
                  <Typography variant="body1">{mappedGenres[user.genre]}</Typography>
                </Box>
              )}
            </Box>
          </Box>

          {isEditing && (
            <Box sx={styles.row}>
              <Box sx={styles.label}>
                <Typography variant="label">{ProfileLabel.photo}</Typography>
              </Box>
              <Box sx={styles.input}>
                <ImgLoader imgLoader={imgValue} />
                <Typography variant="inputMessage"></Typography>
              </Box>
            </Box>
          )}

          <Box sx={styles.buttonContainer}>
            {ableToEdit && isEditing ? (
              <>
                <>
                  <Box>
                    <Button variant="action" type="submit">
                      {ProfileLabel.save}
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      variant="cancel"
                      onClick={handleEdit}
                      sx={{ marginLeft: 4 }}
                    >
                      {ProfileLabel.cancel}
                    </Button>
                  </Box>
                </>
              </>
            ) : (
              ableToEdit && (
                <Box>
                  <Button variant="action" onClick={handleEdit}>
                    {ProfileLabel.edit}
                  </Button>
                </Box>
              )
            )}
          </Box>
        </Box>
        </form>
      </Card>
  );
}

export default Profile;
