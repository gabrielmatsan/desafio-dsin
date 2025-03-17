import z from "zod";

export const createOrderDto = z.object({
  customerId: z.string(),
  orderDate: z.date(),
  servicesId: z.array(z.number()),
});

export const createOrderControllerDto = z.object({
  orderDate: z.coerce.date(),
  servicesId: z.array(z.number()),
});

export type CreateOrderDTO = z.infer<typeof createOrderDto>;
