import type { FastifyInstance } from "fastify";
import { controllers } from "../factories/factory.controllers";
import { verifyJWT } from "../middlewares/verify.jwt";
import { verifyUserRole } from "../middlewares/verify.role";

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

  app.register(async (adminRoutes) => {
    adminRoutes.addHook("onRequest", verifyUserRole("admin"));

    adminRoutes.get(
      "/weekly-stats",
      controllers.ordersControllers.getWeeklyStatistics.bind(
        controllers.ordersControllers
      )
    );
  });
};
