import { BaseDeDatos } from "./baseDeDatos";

/**
 * DataBaseService type – represents a partially defined database service.
 * 
 * This type is derived from the BaseDeDatos type, allowing any subset of its properties.
 * It is typically used in scenarios where not all database fields are required,
 * such as during partial updates or form bindings.
 * 
 * @typedef
 * 
 * @see BaseDeDatos
 */
export type DataBaseService = Partial<BaseDeDatos>