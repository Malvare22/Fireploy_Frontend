import { Usuario } from "../types/usuario";
import { UsuarioPlano } from "../types/usuario.plano";
import { RedSocialUsuario } from "../types/usuario.redSocial";

const adaptarRedSocial = (redSocialPlana: string) : RedSocialUsuario => {
    return JSON.parse(redSocialPlana) as RedSocialUsuario;
};

export const adaptarUsuario = (usuario: UsuarioPlano): Usuario => {
    let usuarioNuevo: Usuario = {
        correo: usuario.correo,
        id: usuario.id,
        fechaDeNacimiento: usuario.fechaDeNacimiento,
        estado: usuario.estado,
        tipo: usuario.tipo,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        contrasenia: usuario.contrasenia,
        sexo: usuario.sexo,
        fotoDePerfil: usuario.fotoDePerfil,
        redSocial: adaptarRedSocial(usuario.redSocial),
        descripcion: usuario.descripcion,
        proyectos: usuario.proyectos
    };
    return usuarioNuevo;
};
