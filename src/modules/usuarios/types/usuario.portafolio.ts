export type Logro = {
  titulo: string;
  valor: string;
};

export type UsuarioPortafolioCard = {
  nombres: string;
  foto: string;
  rol?: string;
  logros?: Logro[];
  id: string;
};

export const usuarioPrueba: UsuarioPortafolioCard = {
  nombres: "Carlos Pérez",
  id: "1",
  foto: "https://img.freepik.com/vector-premium/iconos-usuario-incluye-iconos-usuario-icones-personas-simbolos-elementos-diseno-grafico-calidad-premium_981536-526.jpg",
  rol: "Desarrollador Full Stack",
  logros: [{ titulo: "Repositorios en GitHub", valor: "50+" }],
};
