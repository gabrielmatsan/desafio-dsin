import type { CreateCostumerSchemaType } from "./../../dtos/customers/create-customer.dto";
import type { CustomerSelect } from "../schema";

export interface ICustomersRepository {
  create(data: CreateCostumerSchemaType): Promise<CustomerSelect>;
  findByCpf(cpf: string): Promise<CustomerSelect | null>;
  findByEmail(email: string): Promise<CustomerSelect | null>;
  findById(id: string): Promise<CustomerSelect | null>;
  getCustomer(id: string): Promise<CustomerSelect | null>;
}
