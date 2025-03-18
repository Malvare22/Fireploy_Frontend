import { adaptarUsuario } from "../utils/adaptar.usuario";
import { UsuarioService } from "./services.usuario";
import { EstadoUsuario } from "./usuario.estado";
import {  RedSocialUsuario } from "./usuario.redSocial";
import { SexoUsuario } from "./usuario.sexo";
import { TiposUsuario } from "./usuario.tipos";

export type Usuario = {
    correo: string;
    id: number;
    fechaDeNacimiento: string;
    estado: EstadoUsuario,
    tipo: TiposUsuario,
    nombres: string,
    apellidos: string,
    contrasenia?: string;
    sexo: SexoUsuario,
    fotoDePerfil: string;
    redSocial: RedSocialUsuario;
    descripcion: string;
    estFechaInicio: string;
};

const usuarioServiceEjemplo: UsuarioService = {
    "estado": "A",
    "id": 6,
    "nombre": "YA",
    "apellido": "YA",
    "fecha_nacimiento": "2002-04-22T00:00:00.000Z",
    "sexo": "M",
    "descripcion": "",
    "correo": "rodrigo.admiSn@gmail.com",
    "contrasenia": "$2b$10$ZCxiGXQANpB7wL/j2xEGP.7pU3AfOlA46Rkzqd2NuD3DZFPzw2Vna",
    "red_social": "{\"facebook\":\"aaaa\",\"instagram\":\"aaaa\",\"linkedin\":\"aa\",\"x\":\"aaaa\"}",
    "foto_perfil": "https://storage.googleapis.com/fireploy-57702.firebasestorage.app/uploads/User_Image_6.png",
    "tipo": "Docente"
};
export const usuarioEjemplo: Usuario = adaptarUsuario(usuarioServiceEjemplo); 

export type UsuarioRegistro = Usuario & {confirmarContrasenia: string};