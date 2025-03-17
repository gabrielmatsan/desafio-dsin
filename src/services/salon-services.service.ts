import type { ISalonServicesRepository } from "../database/interfaces/salon-services-repository.interface";
import type { CreateServiceSchemaType } from "../dtos/salon-services/create-service.dto";
import { ServiceNotFoundError } from "../errors/app-error";

export class SalonServicesService {
  constructor(private salonServicesRepository: ISalonServicesRepository) {}
  async createService(data: CreateServiceSchemaType) {
    const { name, priceInCents, durationInMinutes } = data;

    if (priceInCents < 0) {
      throw new Error("Price must be greater than 0");
    }

    if (durationInMinutes < 0) {
      throw new Error("Duration must be greater than 0");
    }

    return this.salonServicesRepository.create({
      name,
      priceInCents,
      durationInMinutes,
    });
  }

  async getAllServices() {
    return this.salonServicesRepository.list();
  }

  async getServiceById(id: number) {
    const service = this.salonServicesRepository.findById(id);

    if (!service) {
      throw new ServiceNotFoundError();
    }
    return service;
  }
}
