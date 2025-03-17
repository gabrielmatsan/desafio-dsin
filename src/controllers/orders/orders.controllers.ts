import type { FastifyReply, FastifyRequest } from "fastify";
import type { OrdersService } from "../../services/orders.service";
import {
  createOrderControllerDto,
  createOrderDto,
} from "../../dtos/orders/create-order.dto";
import { AppError } from "../../errors/app-error";
import {
  updateOrderController,
  updateOrderDTO,
} from "../../dtos/orders/update-order.dto";

export class OrdersControllers {
  constructor(private ordersService: OrdersService) {}

  async createOrder(req: FastifyRequest, reply: FastifyReply) {
    try {
      const result = createOrderControllerDto.safeParse(req.body);

      if (!result.success) {
        return reply.status(400).send({
          message: "Invalid data",
          errors: result.error.errors,
        });
      }

      const customerId = req.user.sub;

      const { orderDate, servicesId } = result.data;

      await this.ordersService.create({
        customerId,
        orderDate,
        servicesId,
      });

      reply.code(201).send({ message: "Order created successfully" });
    } catch (error) {
      if (error instanceof AppError) {
        return reply.code(error.statusCode).send({ message: error.message });
      }
      reply.code(500).send({ message: "Internal server error" });
    }
  }

  async updateOrder(
    req: FastifyRequest<{
      Params: { id: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const orderId = Number.parseInt(req.params.id, 10);

      const result = updateOrderController.safeParse(req.body);

      const customerId = req.user.sub;

      if (!result.success) {
        return reply.status(400).send({
          message: "Invalid data",
          errors: result.error.errors,
        });
      }

      const { orderDate } = result.data;

      await this.ordersService.update({
        orderId,
        customerId,
        orderDate,
      });

      reply.code(200).send({ message: "Order updated successfully" });
    } catch (error) {
      if (error instanceof AppError) {
        return reply.code(error.statusCode).send({ message: error.message });
      }

      reply.code(500).send({ message: "Internal server error" });
    }
  }
}
