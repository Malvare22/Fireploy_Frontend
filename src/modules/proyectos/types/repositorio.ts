export type Repositorio = {
  id?: number | undefined;
  proyecto?: string;
  url: string;
  tipo: "B" | "F" | "I";
  variables: string;
  docker?: { tecnologia: string; version: string; framework: string };
  tecnologyToShow?: string | null ;
};

export type VariableDeEntorno = {
  clave: string;
  valor: string;
};
