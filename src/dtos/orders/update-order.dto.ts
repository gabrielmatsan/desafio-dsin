import z from "zod";

export const updateOrderDTO = z.object({
  orderId: z.number(),
  customerId: z.string(),
  orderDate: z.coerce.date(),
});

export const updateOrderController = z.object({
  orderDate: z.coerce.date(),
});

export type UpdateOrderDTO = z.infer<typeof updateOrderDTO>;
