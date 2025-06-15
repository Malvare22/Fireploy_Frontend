/**
 * LogFileService type – Represents the structure of a log file entry retrieved from the backend.
 * 
 * This type is used to model log file data, typically returned by API responses, and includes:
 * 
 * - `id`: A numeric identifier for the log entry.
 * - `fecha_registro`: A string representing the date and time when the log was recorded.
 * - `log`: A string containing the actual log message or output.
 * 
 * Useful for displaying, filtering, or processing log data related to projects or system events.
 */
export type LogFileService = {
  id: number;
  fecha_registro: string;
  log: string;
};
