export class AppError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class EmailAlreadyUsedError extends AppError {
  constructor() {
    super(400, "Email already in use");
  }
}

export class CpfAlreadyUsedError extends AppError {
  constructor() {
    super(400, "Cpf already in use");
  }
}

export class CustomerNotFoundError extends AppError {
  constructor() {
    super(404, "Customer not found");
  }
}

export class WrongCredentialsError extends AppError {
  constructor() {
    super(401, "Wrong credentials");
  }
}

export class ServiceNotFoundError extends AppError {
  constructor() {
    super(404, "Service not found");
  }
}

export class OrderNotFoundError extends AppError {
  constructor() {
    super(404, "Order not found");
  }
}

export class NotAllowedError extends AppError {
  constructor() {
    super(403, "Not allowed");
  }
}

export class LessThanTwoDaysError extends AppError {
  constructor() {
    super(400, "Order date must be at least two days from today");
  }
}
