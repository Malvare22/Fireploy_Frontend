import { EstadoUsuario } from "./usuario.estado";
import {  RedSocialUsuario } from "./usuario.redSocial";
import { SexoUsuario } from "./usuario.sexo";
import { TiposUsuario } from "./usuarios.tipos";

export type Usuario = {
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
    redSocial: RedSocialUsuario;
    descripcion: string;
};