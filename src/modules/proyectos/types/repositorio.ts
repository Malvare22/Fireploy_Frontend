export type Repositorio = {
  id?: number | undefined;
  proyectoId?: number;
  url: string;
  tipo: "B" | "F" | "I";
  variables: VariableDeEntorno[];
  docker?: { tecnologia: string; tag: string };
  dockerText: string;
};

export type VariableDeEntorno = {
  clave: string;
  valor: string;
};

export const exampleRepositorios: Repositorio[] = [
  {
    id: 1,
    proyecto: "Frontend Web",
    url: "https://github.com/org/frontend-web",
    tipo: "F",
    variables: [
      { nombre: "API_URL", valor: "https://api.example.com" },
      { nombre: "NODE_ENV", valor: "production" },
    ],
    docker: {
      tecnologia: "NodeJS",
      tag: "1.0",
    },
    dockerText: "",
  },
  {
    id: 2,
    proyecto: "Backend API",
    url: "https://github.com/org/backend-api",
    tipo: "B",
    variables: [
      { nombre: "DB_HOST", valor: "db.example.com" },
      { nombre: "DB_USER", valor: "admin" },
    ],
    dockerText: "",
  },
  {
    id: 3,
    proyecto: "Infraestructura",
    url: "https://github.com/org/infra",
    tipo: "I",
    variables: [
      { nombre: "CLOUD_PROVIDER", valor: "AWS" },
      { nombre: "REGION", valor: "us-east-1" },
    ],
    dockerText: "",
  },
  {
    id: 4,
    proyecto: "Mobile App",
    url: "https://github.com/org/mobile-app",
    tipo: "F",
    variables: [
      { nombre: "API_URL", valor: "https://api.example.com" },
      { nombre: "APP_ENV", valor: "staging" },
    ],
    dockerText: "",
  },
];
