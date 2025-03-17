import z from "zod";

export const createCostumerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  password: z.string(),
  phone: z.string(),
});

export type CreateCostumerSchemaType = z.infer<typeof createCostumerSchema>;
