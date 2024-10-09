import { z } from "zod";

export const codeSchema =  z.number({
        message: 'El número debe ser un mayor que cero'
    });