import type { ServiceInsert } from "../schema";

export interface ISalonServicesRepository {
  create(data: ServiceInsert): Promise<void>;
  findById(id: number): Promise<ServiceInsert | null>;
  list(): Promise<ServiceInsert[]>;
}
