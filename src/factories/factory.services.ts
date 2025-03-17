import { CustomersService } from "../services/costumers.service";
import { OrdersService } from "../services/orders.service";
import { SalonServicesService } from "../services/salon-services.service";
import { databases } from "./factory.databases";

const customersService = new CustomersService(databases.customersRepository);
const salonServicesService = new SalonServicesService(
  databases.salonServicesRepository
);
const ordersService = new OrdersService(
  databases.ordersRepository,
  databases.orderServicesRepository
);

export const services = {
  customersService,
  salonServicesService,
  ordersService,
};
