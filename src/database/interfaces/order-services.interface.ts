export interface IOrderServices {
  create(serviceId: number, orderId: number): Promise<void>;
}
