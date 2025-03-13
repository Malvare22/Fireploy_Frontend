import AccordionUsage from "@modules/general/components/accordionUsage";
import ActionButton from "@modules/general/components/actionButton";
import GeneralButton from "@modules/general/components/buttons";
import CustomTextArea from "@modules/general/components/customTextArea";
import { useModal } from "@modules/general/components/modal";
import { actionButtonTypes } from "@modules/general/types/actionButtons";
import { buttonTypes } from "@modules/general/types/buttons";
import { LabelCurso } from "@modules/materias/enums/labelCurso";
import { SeccionCurso } from "@modules/materias/types/curso.seccion";
import { proyectosPrueba } from "@modules/proyectos/test/datos/proyectos.prueba";
import { CardProyecto } from "@modules/usuarios/components/portafolio";
import { Box, Card, Divider, Typography } from "@mui/material";
import ModalSeccion from "../modalSecciones";
import React, { useState } from "react";

type SeccionesProps = {
  secciones: SeccionCurso[];
  cursoId: string;
};
const Secciones: React.FC<SeccionesProps> = ({ secciones, cursoId }) => {
  const { handleClose, handleOpen, open } = useModal();

  const handleCreateSection = () => {
    handleOpen();
  };

  const [selectSeccion, setSelectSeccion] = useState<SeccionCurso | undefined>(
    undefined
  );

  const {
    handleClose: handleCloseEditar,
    handleOpen: handleOpenEditar,
    open: openEditar,
  } = useModal();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <ModalSeccion
        cursoId={cursoId}
        handleClose={handleClose}
        open={open}
        tipo="crear"
      />
      {selectSeccion && (
        <ModalSeccion
          cursoId={cursoId}
          handleClose={handleCloseEditar}
          open={openEditar}
          tipo="editar"
          seccion={selectSeccion}
          key={selectSeccion.id}
        />
      )}
      <Box>
        <Typography variant="h3Bold">{LabelCurso.secciones}</Typography>
        <Divider />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {secciones.map((seccion, key) => (
          <AccordionUsage
            key={key}
            title={<Typography variant="h4">{seccion.titulo}</Typography>}
          >
            <Seccion
              seccion={seccion}
              key={seccion.id}
              setSelectSeccion={setSelectSeccion}
              handleOpenEditar={handleOpenEditar}
            />
          </AccordionUsage>
        ))}
        <GeneralButton mode={buttonTypes.add} onClick={handleCreateSection} />
      </Box>
    </Box>
  );
};

type SeccionProps = {
  seccion: SeccionCurso;
  setSelectSeccion: React.Dispatch<SeccionCurso>;
  handleOpenEditar: () => void;
};
const Seccion: React.FC<SeccionProps> = ({
  seccion,
  setSelectSeccion,
  handleOpenEditar,
}) => {
  const handleSelect = () => {
    setSelectSeccion(seccion);
    handleOpenEditar();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Divider />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CustomTextArea value={seccion.descripcion} disabled={true} />
        <ActionButton mode={actionButtonTypes.editar} onClick={handleSelect} />
      </Box>
        {proyectosPrueba.map((proyecto, key) => (
          <Card sx={{ padding: 2 }}>
            <CardProyecto proyecto={proyecto} tipo="básico" key={key} />
          </Card>
        ))}
    </Box>
  );
};

export default Secciones;
