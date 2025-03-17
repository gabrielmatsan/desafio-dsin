import type { FastifyInstance } from "fastify";
import { verifyUserRole } from "../middlewares/verify.role";
import { controllers } from "../factories/factory.controllers";
import { verifyJWT } from "../middlewares/verify.jwt";

export const salonServicesRoutes = (app: FastifyInstance) => {
  app.register(async (adminRoutes) => {
    adminRoutes.addHook("onRequest", verifyJWT);
    adminRoutes.addHook("onRequest", verifyUserRole("admin"));

    adminRoutes.post(
      "/new-service",
      controllers.salonServicesControllers.createService.bind(
        controllers.salonServicesControllers
      )
    );
  });
};
