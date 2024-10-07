export const passwordValidation = (password : string) : boolean =>  {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
}

export const passwordRequirements = `Requisitos para una contraseña:
1. Longitud mínima: Al menos 8 caracteres.
2. Contiene mayúsculas: Debe incluir al menos una letra mayúscula (A-Z).
3. Contiene minúsculas: Debe incluir al menos una letra minúscula (a-z).
4. Contiene números: Debe incluir al menos un dígito (0-9).
5. Contiene caracteres especiales: Debe incluir al menos un carácter especial (por ejemplo, !@#$%^&*).
`;


export const passwordConfirmMessage = 'Ambas contraseñas deben coincidir';