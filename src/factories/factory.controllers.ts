import { SalonServicesControllers } from "./../controllers/salom-services/services.controllers";
import { CustomersControllers } from "../controllers/customers/customers.controllers";
import { SalonServicesService } from "../services/salon-services.service";
import { services } from "./factory.services";
import { OrdersControllers } from "../controllers/orders/orders.controllers";

const customersControllers = new CustomersControllers(
  services.customersService
);

const salonServicesControllers = new SalonServicesControllers(
  services.salonServicesService
);

const ordersControllers = new OrdersControllers(services.ordersService);

export const controllers = {
  customersControllers,
  salonServicesControllers,
  ordersControllers,
};
