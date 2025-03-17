import type { IOrderServices } from "../database/interfaces/order-services.interface";
import type { IOrdersRepository } from "../database/interfaces/orders-repository.interface";
import type { OrderSelect } from "../database/schema";
import type { CreateOrderDTO } from "../dtos/orders/create-order.dto";
import type { UpdateOrderDTO } from "../dtos/orders/update-order.dto";
import {
  LessThanTwoDaysError,
  NotAllowedError,
  OrderNotFoundError,
} from "../errors/app-error";

export class OrdersService {
  constructor(
    private ordersRepository: IOrdersRepository,
    private orderServices: IOrderServices
  ) {}

  async create(
    data: CreateOrderDTO
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ): Promise<{ order: any; services: any[]; suggestedDate?: Date }> {
    const { customerId, orderDate, servicesId } = data;

    const createdOrder = await this.ordersRepository.create(
      customerId,
      orderDate
    );

    // Cria as associações na tabela intermediária usando o ID do pedido criado
    const orderServicesPromises = servicesId.map((serviceId) =>
      this.orderServices.create(serviceId, createdOrder.id)
    );

    // Espera o retorno das promessas
    await Promise.all(orderServicesPromises);

    return {
      order: createdOrder,
      services: servicesId,
    };
  }

  async update(data: UpdateOrderDTO): Promise<OrderSelect> {
    const { orderId, customerId, orderDate } = data;

    const isOrderExists = await this.ordersRepository.findById(orderId);
    if (!isOrderExists) {
      throw new OrderNotFoundError();
    }

    if (isOrderExists.customerId !== customerId) {
      throw new NotAllowedError();
    }

    // Usar a nova data proposta pelo usuário (não a existente)
    const currentDate = new Date();
    const newDate = new Date(orderDate); // Renomeada para evitar conflito com o parâmetro

    // Verificar se a nova data está no passado
    if (newDate.getTime() < currentDate.getTime()) {
      throw new NotAllowedError();
    }

    // Calcular a diferença entre a nova data e a data atual
    const diffTime = newDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 2) {
      throw new LessThanTwoDaysError();
    }

    return this.ordersRepository.update(orderId, customerId, orderDate);
  }
}
