import { and, count, eq, gte, lte, sql, sum } from "drizzle-orm";
import { db } from "..";
import type { IOrdersRepository } from "../interfaces/orders-repository.interface";
import {
  customers,
  orders,
  orderServices,
  services,
  type OrderSelect,
} from "../schema";
import dayjs from "dayjs";

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

  async findCustomerOrderInDateRange(
    customerId: string,
    startDate: Date,
    endDate: Date
  ) {
    const [order] = await db
      .select()
      .from(orders)
      .where(
        and(
          eq(orders.customerId, customerId),
          gte(orders.orderDate, startDate),
          lte(orders.orderDate, endDate)
        )
      )
      .limit(1)
      .execute();

    if (!order) {
      return null;
    }

    return order;
  }

  async weeklyStatistics(date: Date) {
    const startOfWeek = dayjs(date).startOf("week");
    const endOfWeek = dayjs(date).endOf("week");

    // Obter a quantidade de pedidos na semana e o dinheiro total gasto
    const result = await db
      .select({
        service: services.name,
        totalOrders: count(orders.id),
        totalAmount: sum(services.priceInCents).mapWith((value) => value ?? 0),
      })
      .from(orders)
      .innerJoin(orderServices, eq(orders.id, orderServices.orderId))
      .innerJoin(services, eq(orderServices.serviceId, services.id))
      .where(
        and(
          gte(orders.orderDate, startOfWeek.toDate()),
          lte(orders.orderDate, endOfWeek.toDate()),
          eq(orders.orderStatus, "completed")
        )
      )
      .groupBy(services.id);

    return result;
  }

  async getOrdersWeeklyPending(date: Date) {
    const startOfWeek = dayjs(date).startOf("week");
    const endOfWeek = dayjs(date).endOf("week");

    const result = await db
      .select({
        clientName: customers.name,
        orderId: orders.id,
        orderServiceId: orderServices.id,
        serviceId: services.id,
        serviceName: services.name,
      })
      .from(orders)
      .innerJoin(customers, eq(orders.customerId, customers.id))
      .innerJoin(orderServices, eq(orders.id, orderServices.orderId))
      .innerJoin(services, eq(orderServices.serviceId, services.id))
      .where(
        and(
          gte(orders.orderDate, startOfWeek.toDate()),
          lte(orders.orderDate, endOfWeek.toDate()),
          eq(orders.orderStatus, "pending")
        )
      )
      .execute();

    return result;
  }
}
