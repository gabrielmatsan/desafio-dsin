import { DrizzleCustomersRepository } from "../database/repositories/drizzle.customers-repository";
import { DrizzleOrderServicesRepository } from "../database/repositories/drizzle.order-services-repository";
import { DrizzleOrdersRepository } from "../database/repositories/drizzle.orders-repository";
import { DrizzleSalonServicesRepository } from "../database/repositories/drizzle.salon-services-repository";

const customersRepository = new DrizzleCustomersRepository();
const salonServicesRepository = new DrizzleSalonServicesRepository();
const ordersRepository = new DrizzleOrdersRepository();
const orderServicesRepository = new DrizzleOrderServicesRepository();

export const databases = {
  customersRepository,
  salonServicesRepository,
  ordersRepository,
  orderServicesRepository,
};
