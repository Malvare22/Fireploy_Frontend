import { Button, Card, TextField, Typography } from "@mui/material"
import { styles } from "./styles"
import Grid from '@mui/material/Grid2';
import { ForgetPasswordLabel } from "../../enums/forgetPasswordLabel"
import { inputSize, labelSize } from "../../components/styles/generalStyles";
import { useForm } from "react-hook-form";
import { PasswordChangeSchemaType, passwordChangeSchema } from "../../utils/validations/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailSchemaObjectType, emailObjectSchema } from "../../utils/validations/email";
import React, { useState } from "react";

function ForgetPassword() {
  const [phase, setPhase] = useState(1);
  return (
    <>
      {phase == 1 ? <Phase1 setPhase={setPhase}></Phase1>: <Phase2></Phase2>}
    </>
  )
}

function Phase2(){

  const {register, handleSubmit, formState: {errors}} = useForm<PasswordChangeSchemaType>({
    resolver: zodResolver(passwordChangeSchema)
  });

  return (<>
    <Card sx={styles.container}>
      <form onSubmit={handleSubmit(data => console.log(data))}>
          <Grid container alignItems={'center'} alignContent={'center'}>
              <Grid size={labelSize}><Typography variant='label'>{ForgetPasswordLabel.newPassword}</Typography></Grid>
              <Grid size={inputSize}>
                <TextField {...register('passwords.password')}></TextField>
                {errors.passwords?.password?.message && <Typography variant="inputMessage">{errors.passwords?.password?.message}</Typography>}
              </Grid>
              <Grid size={labelSize}><Typography variant='label'>{ForgetPasswordLabel.confirmPassword}</Typography></Grid>
              <Grid size={inputSize}>
                <TextField {...register('passwords.passwordConfirm')}></TextField>
                {errors.passwords?.passwordConfirm?.message && <Typography variant="inputMessage">{errors.passwords?.passwordConfirm?.message}</Typography>}
              </Grid>
              <Grid size={12} justifyContent={'center'} textAlign={'center'}>
                <Button variant="cancel" href="/">{ForgetPasswordLabel.back}</Button>
                <Button variant="action" type="submit">{ForgetPasswordLabel.recovery}</Button>
              </Grid>
          </Grid>
      </form>
    </Card>
  </>)
}

function Phase1({setPhase}: {setPhase: React.Dispatch<number>}){

  const {register, handleSubmit, formState: {errors}} = useForm<EmailSchemaObjectType>({
    resolver: zodResolver(emailObjectSchema)
  });

  return (<>
    <Card sx={styles.container}>
      <form onSubmit={handleSubmit(()=> setPhase(2))}>
          <Grid container alignItems={'center'} alignContent={'center'}>
              <Grid size={labelSize}><Typography variant='label'>{ForgetPasswordLabel.email}</Typography></Grid>
              <Grid size={inputSize}>
                <TextField {...register('email')}></TextField>
                {errors.email?.message && <Typography variant="inputMessage">{errors.email?.message}</Typography>}
              </Grid>
              <Grid size={12} justifyContent={'center'} textAlign={'center'}>
                <Button variant="cancel" href="/">{ForgetPasswordLabel.back}</Button>
                <Button variant="action" type="submit">{ForgetPasswordLabel.recovery}</Button>
              </Grid>
          </Grid>
      </form>
    </Card>
  </>)
}



export default ForgetPassword
