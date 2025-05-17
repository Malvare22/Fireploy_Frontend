import { KeysOfRepository } from "./keysOfRepository";

export type LogFile = {
    id: number,
    fecha: string,
    log: string;
    instancia: KeysOfRepository;
} 