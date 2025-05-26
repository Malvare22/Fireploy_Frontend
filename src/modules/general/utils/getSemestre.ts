export function transformSemestre(semestre: string) {
    switch (semestre) {
        case '1':
            return 'Primer semestre'
        case '2':
            return 'Segundo semestre'
        case '3':
            return 'Tercer semestre'
        case '4':
            return 'Cuarto semestre'
        case '5':
            return 'Quinto semestre'
        case '6':
            return 'Sexto semestre'
        case '7':
            return 'Séptimo semestre'
        case '8':
            return 'Octavo semestre'
        case '9':
            return 'Noveno semestre'
        case '10':
            return 'Décimo semestre'

        default:
            return 'Semestre desconocido';
    }
}