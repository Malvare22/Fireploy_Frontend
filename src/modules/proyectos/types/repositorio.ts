export type Repositorio = {
  id?: number | undefined;
  proyecto?: string;
  url: string;
  tipo: "B" | "F" | "I";
  variables: string;
  docker?: { tecnologia: string | null; tag: string | null };
  dockerText: string | null;
};

export type VariableDeEntorno = {
  clave: string;
  valor: string;
};