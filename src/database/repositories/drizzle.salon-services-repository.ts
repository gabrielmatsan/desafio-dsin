import { eq } from "drizzle-orm";
import { db } from "..";
import type { ISalonServicesRepository } from "../interfaces/salon-services-repository.interface";
import { services, type ServiceInsert } from "../schema";

export class DrizzleSalonServicesRepository
  implements ISalonServicesRepository
{
  async create(data: ServiceInsert): Promise<void> {
    const { name, priceInCents, durationInMinutes } = data;

    await db.insert(services).values({
      name,
      priceInCents,
      durationInMinutes,
    });
  }
  async findById(id: number): Promise<ServiceInsert | null> {
    const [service] = await db
      .select()
      .from(services)
      .where(eq(services.id, id));

    if (!service) {
      return null;
    }

    return service;
  }
  async list(): Promise<ServiceInsert[]> {
    return db.select().from(services);
  }
}
