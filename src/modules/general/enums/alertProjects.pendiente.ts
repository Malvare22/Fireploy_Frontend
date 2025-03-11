export const msgRemoveUser = (usuario: TypeUsuario, proyecto: TypeProject): string => (
    `¿Está seguro de que desea eliminar al usuario: ${usuario.apellidos} ${usuario.nombres} del proyecto: "${proyecto.titulo}"?`
)

export const msgAddUser = (usuario: TypeUsuario, proyecto: TypeProject): string => (
    `¿Está seguro de que desea añadir al usuario: ${usuario.apellidos} ${usuario.nombres} del proyecto: "${proyecto.titulo}"?`
)