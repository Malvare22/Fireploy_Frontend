import {
  Autocomplete,
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useMemo, useState } from "react";
import { userInputDataTest } from "@modules/general/utils/userInputData";
import Grid from '@mui/material/Grid2';

interface Type{
    code: number,
    name: string
}

export default function AddUserInput() {

    const data = (userInputDataTest);

    const [users, setUsers] = useState<Type[]>([]);

    const getCode = useMemo(() => {
        const mp = new Map<string, number>();
        data.forEach(user => {
            mp.set(user.name, user.code);
        });
        return mp;
    }, [data]);

    const handleRemove = (code: number) => {
        const aux: Type[] = [];
        users.forEach(element => {
            if(element.code != code) aux.push(element);
        });
        setUsers(aux);
    }

  return (
    <Box>
      <Autocomplete
        disablePortal
        options={data.map((obj) => obj.name)}
        onChange={(_event, value: string | null) => {
          if (value && getCode.get(value) && !users.some(user => user.code === getCode.get(value) as number)) {
            setUsers([...users, {name: value, code: getCode.get(value) as number}]); 
          }
        }}
        sx={{ width: "100%" }}
        renderInput={(params) => <TextField {...params} />}
      />
      <Grid container
        sx={{
          width: "auto",
          minHeight: 200,
          display: "flex",
          backgroundColor: "secondary.main",
          marginTop: 2,
          padding: 1,
        }}
      >
        {users.map((u) => (
          <Grid size={4} height={1}><UserPreview user={u} handleClick={() => handleRemove(u.code)} /></Grid>
        ))}
      </Grid>
    </Box>
  );
}

function UserPreview({user, handleClick}: {user: Type, handleClick: () => void}){
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black",
        padding: 2,
        minHeight: 10,
        borderRadius: 20,
        backgroundColor: "primary.main",
        margin:1
      }}
    >
      <Box
        component={"img"}
        src="https://static.thenounproject.com/png/1279714-200.png"
        sx={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: "1px solid black",
        }}
      ></Box>
      <Box sx={{ marginLeft: 1, marginRight: 1 }}>
        <Typography variant="body2" sx={{fontSize: 12, wordBreak: 'break-word'}}>{user.name}</Typography>
      </Box>
      <IconButton sx={{ padding: 0 }} onClick={handleClick}>
        <CancelRoundedIcon />
      </IconButton>
    </Box>
  );
};
