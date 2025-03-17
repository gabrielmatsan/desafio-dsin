import { authenticateCustomerDTO } from "./../../dtos/customers/authenticate-customer.dto";
import { createCostumerSchema } from "./../../dtos/customers/create-customer.dto";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { CustomersService } from "../../services/costumers.service";
import { AppError } from "../../errors/app-error";

export class CustomersControllers {
  constructor(private customersServices: CustomersService) {}

  async create(req: FastifyRequest, reply: FastifyReply) {
    try {
      const result = createCostumerSchema.safeParse(req.body);

      if (!result.success) {
        return reply.status(400).send({
          message: "Invalid data",
          errors: result.error.errors,
        });
      }

      const { name, email, password, cpf, phone } = result.data;

      const customer = await this.customersServices.createCustomer({
        name,
        email,
        password,
        cpf,
        phone,
      });

      const { password: customerPassword, ...customerWithoutPassword } =
        customer;

      return reply.status(201).send({ customer: customerWithoutPassword });
    } catch (err) {
      if (err instanceof AppError) {
        return reply.status(err.statusCode).send({ message: err.message });
      }
      console.error(err);
      return reply.status(500).send({ message: "Internal server error" });
    }
  }

  async authenticate(req: FastifyRequest, reply: FastifyReply) {
    try {
      const result = authenticateCustomerDTO.safeParse(req.body);

      if (!result.success) {
        return reply.status(400).send({
          message: "Invalid data",
          errors: result.error.errors,
        });
      }

      const { email, password } = result.data;

      const { customer } = await this.customersServices.authenticateCustomer({
        email,
        password,
      });

      const token = await reply.jwtSign(
        {
          role: customer.role,
        },
        {
          sign: {
            sub: customer.id,
          },
        }
      );

      return reply
        .setCookie("token", token, {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: true,
        })
        .status(200)
        .send({ token });
    } catch (err) {
      if (err instanceof AppError) {
        return reply.status(err.statusCode).send({ message: err.message });
      }
      console.error(err);
      return reply.status(500).send({ message: "Internal server error" });
    }
  }
}
