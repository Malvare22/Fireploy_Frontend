import ProjectCard, { AddProjectCard } from '@modules/projects/components/projectCard';
import Grid from '@mui/material/Grid2';

function MyProjects() {
  return (
    <Grid container sx={{alignItems: 'center'}}>
      <Grid size={{md: 6, xs:12}} sx={{display: {md: 'flex'}, justifyContent: 'end'}}><ProjectCard/></Grid>
      <Grid size={{md: 6, xs:12}}><ProjectCard/></Grid>
      <Grid size={{md: 6, xs:12}} sx={{display: {md: 'flex'}, justifyContent: 'end'}}><ProjectCard/></Grid>
      <Grid size={{md: 6, xs:12}}><ProjectCard/></Grid>
      <Grid size={{md: 6, xs:12}} sx={{display: 'flex', justifyContent: 'end'}}><AddProjectCard/></Grid>

    </Grid>
  )
}

export default MyProjects
