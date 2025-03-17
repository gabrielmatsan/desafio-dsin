import z from "zod";

export const authenticateCustomerDTO = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type AuthenticateCustomerSchema = z.infer<
  typeof authenticateCustomerDTO
>;
