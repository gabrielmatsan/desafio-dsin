import type { CustomerSelect, CustomerInsert } from "../schema";
import type { ICustomersRepository } from "../interfaces/users-repository.interface";
import { createId } from "@paralleldrive/cuid2";

export class InMemoryCustomersRepository implements ICustomersRepository {
  public items: CustomerSelect[] = [];

  async findById(id: string): Promise<CustomerSelect | null> {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<CustomerSelect | null> {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByCpf(cpf: string): Promise<CustomerSelect | null> {
    const user = this.items.find((item) => item.cpf === cpf);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: CustomerInsert): Promise<CustomerSelect> {
    const user: CustomerSelect = {
      id: createId(),
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      cpf: data.cpf,
      role: data.role ?? "customer",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(user);

    return user;
  }

  async getCustomer(id: string): Promise<CustomerSelect | null> {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }
}
