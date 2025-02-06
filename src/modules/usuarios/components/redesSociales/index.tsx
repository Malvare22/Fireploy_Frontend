import IconoRedondo from '@modules/general/components/iconoRedondo';
import { Usuario } from '@modules/usuarios/types/usuario'
import { RedSocialUsuario } from '@modules/usuarios/types/usuario.redSocial';
import React, { ReactNode } from 'react'
import Facebook from "@modules/general/assets/redesSociales/facebook.png";
import Instagram from "@modules/general/assets/redesSociales/instagram.png";
import Linkedin from "@modules/general/assets/redesSociales/linkedin.png";
import { LabelRedesSociales } from "@modules/usuarios/enum/LabelRedesSociales";

const RedesSociales: React.FC<{usuario: Usuario}> = ({usuario}) => {
  
    const RenderRedesSociales = () => {
        let redesSociales: ReactNode[] = [];
        for (let key in usuario.redSocial) {
          const validKey = key as keyof RedSocialUsuario;
          let elemento: any;
          switch (validKey) {
            case "facebook":
              elemento = (
                <IconoRedondo
                  imagen={Facebook}
                  nombre={LabelRedesSociales.facebook}
                />
              );
              break;
    
            case "linkedin":
              elemento = (
                <IconoRedondo
                  imagen={Linkedin}
                  nombre={LabelRedesSociales.linkedin}
                />
              );
              break;
    
            case "instagram":
              elemento = (
                <IconoRedondo
                  imagen={Instagram}
                  nombre={LabelRedesSociales.instagram}
                />
              );
              break;
          }
    
          redesSociales.push(elemento);
        }
    
        return redesSociales;
      };
  
    return (
    <RenderRedesSociales/>
  )
}

export default RedesSociales