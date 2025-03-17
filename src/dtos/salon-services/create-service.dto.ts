import z from "zod";

export const createServiceDto = z.object({
  name: z.string(),
  priceInCents: z.number(),
  durationInMinutes: z.number(),
})

export type CreateServiceSchemaType = z.infer<typeof createServiceDto>;
