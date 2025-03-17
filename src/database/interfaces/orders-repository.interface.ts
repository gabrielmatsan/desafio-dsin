import type { OrderSelect } from "../schema";

export interface IOrdersRepository {
  create(customerId: string, orderDate: Date): Promise<OrderSelect>;
  findAll(): Promise<OrderSelect[]>;
  findById(id: number): Promise<OrderSelect | null>;
  update(
    orderId: number,
    customerId: string,
    orderDate: Date
  ): Promise<OrderSelect>;
  findCustomerOrderInDateRange(
    customerId: string,
    startDate: Date,
    endDate: Date
  ): Promise<OrderSelect | null>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  weeklyStatistics(date: Date): Promise<any>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  getOrdersWeeklyPending(date: Date): Promise<any>;
}
