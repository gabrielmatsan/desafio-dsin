import type { FastifyInstance } from "fastify";
import { controllers } from "../factories/factory.controllers";

export const customersRoutes = (app: FastifyInstance) => {
  app.post(
    "/sign-in",
    controllers.customersControllers.create.bind(
      controllers.customersControllers
    )
  );

  app.post(
    "/sign-up",
    controllers.customersControllers.authenticate.bind(
      controllers.customersControllers
    )
  );
};
