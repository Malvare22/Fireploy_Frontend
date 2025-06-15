import { ProyectoCard } from "../types/proyecto.card";
import { Proyecto } from "../types/proyecto.tipo";

/**
 * `getOptionsFrameworksPC` – Extracts a unique list of frameworks used in an array of simplified project cards.
 * 
 * This function scans through the frontend, backend, and integrated repositories of each project card,
 * collecting all the distinct framework names.
 * 
 * @param projects - An array of simplified project card objects.
 * @returns An array of unique framework names used across all projects.
 */
export function getOptionsFrameworksPC(projects: ProyectoCard[]) {
    const st = new Set<string>();

    projects.forEach((p) => {
        if (p.backend) st.add(p.backend.framework);
        if (p.frontend) st.add(p.frontend.framework);
        if (p.integrado) st.add(p.integrado.framework);
    })

    return [...st];
}

/**
 * `getOptionsFrameworksLegacy` – Retrieves a unique list of frameworks from legacy full project objects.
 * 
 * Similar to `getOptionsFrameworksPC`, but works with the full `Proyecto` objects, accessing
 * the nested `informacion.framework` values from each repository type.
 * 
 * @param projects - An array of full project objects.
 * @returns An array of unique framework names found in the project's repositories.
 */
export function getOptionsFrameworksLegacy(projects: Proyecto[]) {
    const st = new Set<string>();

    projects.forEach((p) => {
        if (p.backend && p.backend.informacion?.framework) st.add(p.backend.informacion?.framework);
        if (p.integrado && p.integrado.informacion?.framework) st.add(p.integrado.informacion?.framework);
        if (p.frontend && p.frontend.informacion?.framework) st.add(p.frontend.informacion?.framework);
    })

    return [...st];
}

/**
 * `filterByFrameworkPC` – Filters simplified project cards by a specific framework.
 * 
 * It returns only those projects that contain the given framework in any of their frontend,
 * backend, or integrated repositories.
 * 
 * @param projects - An array of simplified project card objects.
 * @param framework - The framework name to filter by.
 * @returns A filtered array of projects that use the specified framework.
 */
export function filterByFrameworkPC(projects: ProyectoCard[], framework: string) {
    return projects.filter((x) => {
        return x.frontend?.framework === framework || x.backend?.framework === framework || x.integrado?.framework === framework;
    })
}

/**
 * `filterByFrameworkLegacy` – Filters full project objects by a specific framework.
 * 
 * Works similarly to `filterByFrameworkPC`, but it checks the `informacion.framework` property
 * inside each repository type to determine if the framework is used.
 * 
 * @param projects - An array of full project objects.
 * @param framework - The framework name to filter by.
 * @returns A filtered array of projects that include the specified framework.
 */
export function filterByFrameworkLegacy(projects: Proyecto[], framework: string) {
    return projects.filter((x) => {
        return x.frontend?.informacion?.framework == framework || x.backend?.informacion?.framework == framework || x.integrado?.informacion?.framework == framework
    })
}