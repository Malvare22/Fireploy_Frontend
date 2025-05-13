import Perfil from "@modules/usuarios/components/perfil";
import { usuarioTemplate } from "@modules/usuarios/types/usuario";

/**
 * CrearUsuario component – A component for creating a new user.
 * 
 * This component renders a user profile form with default values from the `usuarioTemplate`. 
 * It passes the user template to the `Perfil` component to handle the creation of a new user.
 * The `type` prop is set to "crear" to indicate that the form is for creating a user.
 * 
 * @component
 * 
 * @returns {JSX.Element} A form to create a new user, rendered through the `Perfil` component.
 * 
 * @example
 * ```tsx
 * <CrearUsuario />
 * ```
 */
function CrearUsuario() {

    const usuario = usuarioTemplate;

    return (
        <>
          { <Perfil usuario={usuario} type="crear"/>}
        </>
      );
}

export default CrearUsuario;