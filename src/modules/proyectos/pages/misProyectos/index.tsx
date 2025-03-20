import { useFilters } from "@modules/general/hooks/useFilters";
import useOrderSelect from "@modules/general/hooks/useOrderSelect";
import LayoutList from "@modules/general/layouts/list";
import ProjectForList from "@modules/proyectos/components/projectForList";
import { labelProjectForList } from "@modules/proyectos/enum/labelProjectForList";
import { Proyecto, proyectos } from "@modules/proyectos/types/proyecto.tipo";
import { Box, Card, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useState } from "react";

function MisProyectos() {

  const OrderMenuItems = () => {
    return (
      <>
        <MenuItem value='asc'>{'Mayor'}</MenuItem>
        <MenuItem value='desc'>{'Menor'}</MenuItem>
      </>
    );
  };

  const { filterData, toggleFilter } = useFilters<Proyecto>();

  const {} = useOrderSelect();

  const localProyectos = proyectos;

  const Filters = () => {
    return (
      <Card>
        <Stack>
          <Typography>{labelProjectForList.ordenarPor}</Typography>
          <Typography>{labelProjectForList.puntuacion}</Typography>
          <Select onChange={(e) => {toggleFilter('calificacion', e.target.value as string)}}>
            <OrderMenuItems/>
          </Select>
        </Stack>
      </Card>
    );
  };

  return (
    <LayoutList options={<Filters />}>
      <Stack spacing={2}>
        {filterData(pro)}
      </Stack>
    </LayoutList>
  );
}

export default MisProyectos;
