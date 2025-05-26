import { ProyectoCard } from "../types/proyecto.card";
import { Proyecto } from "../types/proyecto.tipo";

export function getOptionsFrameworksPC(projects: ProyectoCard[]) {
    const st = new Set<string>();

    projects.forEach((p) => {
        if (p.backend) st.add(p.backend.framework);
        if (p.frontend) st.add(p.frontend.framework);
        if (p.integrado) st.add(p.integrado.framework);
    })

    return [...st];
}

export function getOptionsFrameworksLegacy(projects: Proyecto[]) {
    const st = new Set<string>();

    projects.forEach((p) => {
        if (p.backend && p.backend.informacion?.framework) st.add(p.backend.informacion?.framework);
        if (p.integrado && p.integrado.informacion?.framework) st.add(p.integrado.informacion?.framework);
        if (p.frontend && p.frontend.informacion?.framework) st.add(p.frontend.informacion?.framework);
    })

    return [...st];
}

export function filterByFrameworkPC(projects: ProyectoCard[], framework: string) {
    return projects.filter((x) => {
        return x.frontend?.framework === framework || x.backend?.framework === framework || x.integrado?.framework === framework;
    })
}

export function filterByFrameworkLegacy(projects: Proyecto[], framework: string) {
    return projects.filter((x) => {
        return x.frontend?.informacion?.framework == framework || x.backend?.informacion?.framework == framework || x.integrado?.informacion?.framework == framework
    })
}