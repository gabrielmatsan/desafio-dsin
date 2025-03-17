import type { FastifyInstance } from "fastify";
import { controllers } from "../factories/factory.controllers";
import { verifyJWT } from "../middlewares/verify.jwt";

export const ordersRoutes = (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJWT);
  app.post(
    "/create-order",
    controllers.ordersControllers.createOrder.bind(
      controllers.ordersControllers
    )
  );
  app.patch(
    "/update-order/:id",
    controllers.ordersControllers.updateOrder.bind(
      controllers.ordersControllers
    )
  );
};
