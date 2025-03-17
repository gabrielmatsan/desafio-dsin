import type { FastifyReply, FastifyRequest } from "fastify";
import type { SalonServicesService } from "../../services/salon-services.service";
import { createServiceDto } from "../../dtos/salon-services/create-service.dto";
import { AppError } from "../../errors/app-error";

export class SalonServicesControllers {
  constructor(private salonServices: SalonServicesService) {}

  async createService(req: FastifyRequest, reply: FastifyReply) {
    try {
      const result = createServiceDto.safeParse(req.body);

      if (!result.success) {
        return reply.status(400).send({
          message: "Invalid data",
          errors: result.error.errors,
        });
      }

      const { name, priceInCents, durationInMinutes } = result.data;

      const service = await this.salonServices.createService({
        name,
        priceInCents,
        durationInMinutes,
      });

      return reply.status(201).send({ service });
    } catch (err) {
      if (err instanceof AppError) {
        return reply.status(err.statusCode).send({ message: err.message });
      }

      console.error(err);
      return reply.status(500).send({ message: "Internal server error" });
    }
  }
}
