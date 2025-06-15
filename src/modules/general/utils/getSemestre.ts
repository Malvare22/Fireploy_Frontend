/**
 * transformSemestre function – converts a numeric semester string into its corresponding
 * full-text Spanish description.
 * 
 * This function is useful for displaying user-friendly labels based on semester codes,
 * typically received as string values from a backend or form input.
 * 
 * @function
 * 
 * @param {string} semestre - A string representing the semester number (e.g., "1", "2", ..., "10").
 * 
 * @returns {string} A Spanish label describing the semester (e.g., "Primer semestre"). Returns
 * "Semestre desconocido" if the input does not match a known semester.
 * 
 * @example
 * ```ts
 * transformSemestre("3");
 * // Returns: "Tercer semestre"
 * ```
 */
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