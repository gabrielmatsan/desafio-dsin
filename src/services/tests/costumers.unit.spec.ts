import { describe, expect, it, vi, beforeEach } from "vitest";

import { CustomersService } from "../costumers.service";
import {
  CpfAlreadyUsedError,
  EmailAlreadyUsedError,
  WrongCredentialsError,
} from "../../errors/app-error";

vi.mock("bcryptjs", () => ({
  hash: vi.fn().mockResolvedValue("hashed_password"),
  compare: vi.fn().mockResolvedValue(true),
}));
describe("Costumer Service: Unit Tests", () => {
  let customersService: CustomersService;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let mockCustomersRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();

    const findByEmail = vi.fn();
    const findByCpf = vi.fn();
    const create = vi.fn();
    const findById = vi.fn();
    const getCustomer = vi.fn();

    mockCustomersRepository = {
      findByEmail,
      findByCpf,
      create,
      findById,
      getCustomer,
    };

    customersService = new CustomersService(mockCustomersRepository);
  });

  it("should create a new costumer successfully", async () => {
    const data = {
      name: "John Doe",
      email: "Dh0wV@example.com",
      password: "123456",
      cpf: "12345678901",
      phone: "12345678901",
    };

    // Configurando os mocks para retornar null (usuário não existe)
    mockCustomersRepository.findByEmail.mockResolvedValue(null);
    mockCustomersRepository.findByCpf.mockResolvedValue(null);

    const createdCustomer = {
      id: "fake-id",
      name: data.name,
      email: data.email,
      password: "hashed_password",
      cpf: data.cpf,
      phone: data.phone,
      role: "customer",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Adicione um valor de retorno para create
    mockCustomersRepository.create.mockResolvedValue(createdCustomer);

    const result = await customersService.createCustomer(data);

    // Assertions
    expect(result).toEqual(createdCustomer);
    expect(mockCustomersRepository.findByEmail).toHaveBeenCalledWith(
      data.email
    );
    expect(mockCustomersRepository.findByCpf).toHaveBeenCalledWith(data.cpf);
    expect(mockCustomersRepository.create).toHaveBeenCalledWith({
      name: data.name,
      email: data.email,
      password: "hashed_password", // Verifica que a senha foi hasheada
      cpf: data.cpf,
      phone: data.phone,
    });
  });

  it("should not be able to create a new costumer with an existing email", async () => {
    const data = {
      name: "John Doe",
      email: "Dh0wV@example.com",
      password: "123456",
      cpf: "12345678901",
      phone: "12345678901",
    };

    // Configurando os mocks para retornar um usuário existente
    mockCustomersRepository.findByEmail.mockResolvedValue({
      id: "existing-id",
      name: data.name,
      email: data.email,
      password: "hashed_password",
      cpf: data.cpf,
      phone: data.phone,
      role: "customer",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(customersService.createCustomer(data)).rejects.toThrowError(
      EmailAlreadyUsedError
    );

    // Verificando que o método create do repositório não foi chamado
    expect(mockCustomersRepository.create).not.toHaveBeenCalled();
  });

  it("should not be able to create a new costumer with an existing cpf", async () => {
    const data = {
      name: "John Doe",
      email: "Dh0wV@example.com",
      password: "123456",
      cpf: "12345678901",
      phone: "12345678901",
    };

    // Configurando os mocks para retornar um usuário existente
    mockCustomersRepository.findByCpf.mockResolvedValue({
      id: "existing-id",
      name: data.name,
      email: "any-email@email",
      password: "hashed_password",
      cpf: data.cpf,
      phone: data.phone,
      role: "customer",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(customersService.createCustomer(data)).rejects.toThrowError(
      CpfAlreadyUsedError
    );

    // Verificando que o método create do repositório não foi chamado
    expect(mockCustomersRepository.create).not.toHaveBeenCalled();
  });

  it("should authenticate a customer successfully", async () => {
    const data = {
      email: "Dh0wV@example.com",
      password: "123456",
    };

    // Configurando os mocks para retornar um usuário existente
    mockCustomersRepository.findByEmail.mockResolvedValue({
      id: "existing-id",
      name: "John Doe",
      email: data.email,
      password: "hashed_password",
      cpf: "12345678901",
      phone: "12345678901",
      role: "customer",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await customersService.authenticateCustomer(data);

    // Assertions
    expect(result).toEqual({
      customer: {
        id: "existing-id",
        name: "John Doe",
        email: data.email,
        password: "hashed_password",
        cpf: "12345678901",
        phone: "12345678901",
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    expect(mockCustomersRepository.findByEmail).toHaveBeenCalledWith(
      data.email
    );
  });

  it("should not be able to authenticate a customer with a wrong email", async () => {
    const data = {
      email: "Dh0wV@example.com",
      password: "123456",
    };

    // Configurando os mocks para retornar um usuário existente
    mockCustomersRepository.findByEmail.mockResolvedValue(null);

    await expect(
      customersService.authenticateCustomer(data)
    ).rejects.toThrowError(new WrongCredentialsError());
  });

  it("should be able to get profile of a customer", async () => {
    const id = "existing-id";
    const data = {
      name: "John Doe",
      email: "Dh0wV@example.com",
      password: "123456",
      cpf: "12345678901",
      phone: "12345678901",
    };

    // Configurando os mocks para retornar um usuário existente
    mockCustomersRepository.findById.mockResolvedValue({
      id: id,
      name: data.name,
      email: data.email,
      password: "hashed_password",
      cpf: data.cpf,
      phone: data.phone,
      role: "customer",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await customersService.getPerfil(id);

    // Assertions
    expect(result).toEqual({
      id: id,
      name: data.name,
      email: data.email,
      password: "hashed_password",
      cpf: data.cpf,
      phone: data.phone,
      role: "customer",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    expect(mockCustomersRepository.findById).toHaveBeenCalledWith(id);
  });
});
