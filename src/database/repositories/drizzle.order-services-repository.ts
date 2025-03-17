import { db } from "..";
import type { IOrderServices } from "../interfaces/order-services.interface";
import { orderServices } from "../schema";

export class DrizzleOrderServicesRepository implements IOrderServices {
  async create(serviceId: number, orderId: number): Promise<void> {
    await db.insert(orderServices).values({
      serviceId,
      orderId,
    });
  }
}
