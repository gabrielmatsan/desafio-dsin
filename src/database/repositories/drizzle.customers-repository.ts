import { eq } from "drizzle-orm";
import { db } from "..";
import type { ICustomersRepository } from "../interfaces/users-repository.interface";
import { customers, type CustomerSelect } from "../schema";
import type { CreateCostumerSchemaType } from "../../dtos/customers/create-customer.dto";

export class DrizzleCustomersRepository implements ICustomersRepository {
  async create(data: CreateCostumerSchemaType): Promise<CustomerSelect> {
    const { name, email, cpf, password, phone } = data;
    const [user] = await db
      .insert(customers)
      .values({
        name,
        email,
        cpf,
        password,
        phone,
      })
      .returning()
      .execute();

    return user;
  }
  async findByCpf(cpf: string): Promise<CustomerSelect | null> {
    const [user] = await db
      .select()
      .from(customers)
      .where(eq(customers.cpf, cpf))
      .execute();

    if (!user) {
      return null;
    }

    return user;
  }
  async findByEmail(email: string): Promise<CustomerSelect | null> {
    const [user] = await db
      .select()
      .from(customers)
      .where(eq(customers.email, email))
      .execute();

    if (!user) {
      return null;
    }

    return user;
  }
  async findById(id: string): Promise<CustomerSelect | null> {
    const [user] = await db
      .select()
      .from(customers)
      .where(eq(customers.id, id))
      .execute();

    if (!user) {
      return null;
    }

    return user;
  }

  async getCustomer(id: string): Promise<CustomerSelect | null> {
    const [customer] = await db
      .select()
      .from(customers)
      .where(eq(customers.id, id))
      .execute();

    if (!customer) {
      return null;
    }

    return customer;
  }
}
