export const allowedGenres = ['M', 'F', 'O'] as const;

export const mappedGenres: {[key in (typeof allowedGenres)[number]]: string} = {
    M : 'Masculino',
    F: 'Femenino',
    O: 'Otro'
}