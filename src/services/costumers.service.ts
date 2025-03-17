import { compare, hash } from "bcryptjs";
import type { ICustomersRepository } from "../database/interfaces/users-repository.interface";
import type { CustomerSelect } from "../database/schema";

import type { CreateCostumerSchemaType } from "../dtos/customers/create-customer.dto";
import type { AuthenticateCustomerSchema } from "../dtos/customers/authenticate-customer.dto";
import {
  CpfAlreadyUsedError,
  EmailAlreadyUsedError,
  WrongCredentialsError,
} from "../errors/app-error";

export class CustomersService {
  constructor(private customersRepository: ICustomersRepository) {}

  async createCustomer(
    data: CreateCostumerSchemaType
  ): Promise<CustomerSelect> {
    const { name, email, password, cpf, phone } = data;

    const isEmailAlreadyInUse =
      await this.customersRepository.findByEmail(email);
    if (isEmailAlreadyInUse) {
      throw new EmailAlreadyUsedError();
    }

    const isCpfAlreadyInUse = await this.customersRepository.findByCpf(cpf);
    if (isCpfAlreadyInUse) {
      throw new CpfAlreadyUsedError();
    }

    const hashedPassword = await hash(password, 8);

    const customer = await this.customersRepository.create({
      name,
      email,
      password: hashedPassword,
      cpf,
      phone,
    });

    return customer;
  }

  async authenticateCustomer(data: AuthenticateCustomerSchema) {
    const { email, password } = data;

    const customer = await this.customersRepository.findByEmail(email);
    if (!customer) {
      throw new WrongCredentialsError();
    }

    const isPasswordCorrect = await compare(password, customer.password);
    if (!isPasswordCorrect) {
      throw new WrongCredentialsError();
    }

    return { customer };
  }

  async getPerfil(id: string) {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new WrongCredentialsError();
    }

    return customer;
  }
}
