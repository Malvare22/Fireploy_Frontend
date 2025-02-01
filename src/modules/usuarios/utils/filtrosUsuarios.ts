import { FilterLabels } from "@modules/general/types/filterLabels";
import { EstadoUsuario } from "../types/usuario.estado";
import { SexoUsuario } from "../types/usuario.sexo";
import { TiposUsuario } from "../types/usuario.tipos";
import { obtenerEstadoUsuario, obtenerSexo, obtenerTiposUsuario } from "./usuario.map";
import { UsuarioPlano } from "../types/usuario.plano";

export const filtrosUsuarios = () => {
    const valoresPosibles: {
      sexo: SexoUsuario[];
      estado: EstadoUsuario[];
      tipo: TiposUsuario[];
    } = {
      sexo: ["F", "M", "O"],
      estado: ["A", "I"],
      tipo: ["A", "E", "D"],
    };

    const arregloFiltros: FilterLabels<UsuarioPlano>[] = [
      {
        key: "sexo",
        text: 'Sexo',
        labels: valoresPosibles.sexo.map((valor) => {
          return {
            value: valor,
            text: obtenerSexo.get(valor),
          };
        }),
      },
      {
        key: "estado",
        text: 'Estado',
        labels: valoresPosibles.estado.map((valor) => {
          return {
            value: valor,
            text: obtenerEstadoUsuario.get(valor),
          };
        }),
      },
      {
        key: "tipo",
        text: 'Tipo',
        labels: valoresPosibles.tipo.map((valor) => {
          return {
            value: valor,
            text: obtenerTiposUsuario.get(valor),
          };
        }),
      },
    ];

    return arregloFiltros;
  };