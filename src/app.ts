import cookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";

import { env } from "./env/env";
import { customersRoutes } from "./routes/customers.routes";
import { ordersRoutes } from "./routes/order.routes";
import { salonServicesRoutes } from "./routes/services.routes";

export const app = fastify({
  logger: env.NODE_ENV === "development",
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: "1h" },
  cookie: {
    cookieName: "token",
    signed: false,
  },
});

app.register(cookie);
app.register(customersRoutes, { prefix: "/customers" });
app.register(salonServicesRoutes, { prefix: "/services" });
app.register(ordersRoutes, { prefix: "/orders" });
