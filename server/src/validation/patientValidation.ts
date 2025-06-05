import { z } from "zod";

// Enum values based on your Prisma schema
export const EspeciePacienteEnum = z.enum([
  "OVELHA",
  "GATO",
  "PORCO",
  "VACA",
  "CAVALO",
  "CACHORRO",
]);

export const pacienteSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  nomeTutor: z.string().min(1, "Nome do tutor é obrigatório"),
  idade: z.number().int().nonnegative("Idade deve ser positiva"),
  especie: EspeciePacienteEnum,
});

// For use in controllers:
export type PacienteInput = z.infer<typeof pacienteSchema>;
export const pacienteUpdateSchema = pacienteSchema.partial();