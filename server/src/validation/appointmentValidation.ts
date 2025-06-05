import { z } from "zod";

export const appointmentSchema = z.object({
  dataHora: z.string().nonempty("dataHora é obrigatório").datetime("Formato inválido"),
  tipo: z.enum(["PRIMEIRA", "VACINA", "RETORNO", "AVALIACAO"], {
    required_error: "tipo é obrigatório",
    invalid_type_error: "tipo deve ser um dos seguintes: PRIMEIRA, VACINA, RETORNO, AVALIACAO",
  }),
  descricao: z.string().nonempty("descrição é obrigatória"),
  nomeVeterinario: z.string().nonempty("nome do veterinário é obrigatório"),
  pacienteId: z.number({
    required_error: "pacienteId é obrigatório",
    invalid_type_error: "pacienteId deve ser um número",
  }),
});