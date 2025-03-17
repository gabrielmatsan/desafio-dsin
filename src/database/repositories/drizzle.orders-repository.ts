import { and, eq } from "drizzle-orm";
import { db } from "..";
import type { IOrdersRepository } from "../interfaces/orders-repository.interface";
import { orders, type OrderSelect } from "../schema";

export class DrizzleOrdersRepository implements IOrdersRepository {
  async create(customerId: string, orderDate: Date): Promise<OrderSelect> {
    const [order] = await db
      .insert(orders)
      .values({
        customerId,
        orderDate,
      })
      .returning();

    return order;
  }
  async findAll(): Promise<OrderSelect[]> {
    return db.select().from(orders).execute();
  }
  async findById(id: number): Promise<OrderSelect | null> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));

    if (!order) {
      return null;
    }

    return order;
  }
  async update(
    orderId: number,
    customerId: string,
    orderDate: Date
  ): Promise<OrderSelect> {
    const [order] = await db
      .update(orders)
      .set({
        // Usar os nomes exatos dos campos conforme definidos no schema
        customerId: customerId,
        orderDate: orderDate,
      })
      .where(and(eq(orders.id, orderId), eq(orders.customerId, customerId)))
      .returning()
      .execute();

    return order;
  }
}
