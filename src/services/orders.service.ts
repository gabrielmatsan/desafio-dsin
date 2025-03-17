import dayjs from "dayjs";
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
    const { orderId, customerId, orderDate, role } = data;

    const isOrderExists = await this.ordersRepository.findById(orderId);
    if (!isOrderExists) {
      throw new OrderNotFoundError();
    }

    const isAdmin = role === "admin";
    const isOrderOwner = isOrderExists.customerId === customerId;

    // Verificar se o usuário é um administrador ou o proprietário do pedido
    if (!isAdmin && !isOrderOwner) {
      throw new NotAllowedError();
    }

    // Usar a nova data proposta pelo usuário (não a existente)
    const currentDate = dayjs();
    const newDate = dayjs(orderDate);

    // Verificar se a nova data está no passado
    if (newDate.isBefore(currentDate)) {
      throw new NotAllowedError();
    }

    // Calcular a diferença entre a nova data e a data atual
    const diffDays = newDate.diff(currentDate, "days");

    if (diffDays < 2 && !isAdmin) {
      throw new LessThanTwoDaysError();
    }

    return this.ordersRepository.update(orderId, customerId, orderDate);
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async getWeeklyStatistics(date: Date): Promise<any> {
    return this.ordersRepository.weeklyStatistics(date);
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async getOrdersWeeklyPending(date: Date): Promise<any> {
    return this.ordersRepository.getOrdersWeeklyPending(date);
  }

  /**
   * Verifica se o cliente já possui um agendamento na mesma semana
   */
  private async checkExistingAppointmentInSameWeek(
    customerId: string,
    date: Date
  ): Promise<OrderSelect | null> {
    const targetDate = dayjs(date);

    // Obter início da semana (domingo)
    const startOfWeek = targetDate.startOf("week");

    // Obter fim da semana (sábado)
    const endOfWeek = targetDate.endOf("week");

    // Buscar agendamentos do cliente nesta semana
    return await this.ordersRepository.findCustomerOrderInDateRange(
      customerId,
      startOfWeek.toDate(),
      endOfWeek.toDate()
    );
  }
}
