import IconoRedondo, {
  IconoRedondoProps,
} from "@modules/general/components/iconoRedondo";
import { RedSocialUsuario } from "@modules/usuarios/types/usuario.redSocial";
import { obtenerImagenRedSocial } from "@modules/usuarios/utils/redSocial.obtenerImagen";

interface RedSocialProps extends Omit<IconoRedondoProps, "nombre"> {
  nombre: keyof RedSocialUsuario;
}

const RedSocial: React.FC<RedSocialProps> = ({
  nombre,
  imagen: _imagen,
  ...props
}) => {
  const imagen = obtenerImagenRedSocial(nombre);

  return <IconoRedondo {...props} imagen={imagen} nombre={nombre} />;
};

export default RedSocial;
