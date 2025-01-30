import { EstadoUsuario } from "./usuario.estado";
import { SexoUsuario } from "./usuario.sexo";
import { TiposUsuario } from "./usuario.tipos";

export type UsuarioPlano = {
    correo: string;
    id: number;
    fechaDeNacimiento: string;
    estado: EstadoUsuario,
    tipo: TiposUsuario,
    nombres: string,
    apellidos: string,
    contrasenia: string;
    sexo: SexoUsuario,
    fotoDePerfil: string;
    redSocial: string;
    descripcion: string;
};