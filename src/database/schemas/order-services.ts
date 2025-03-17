import { integer, text } from "drizzle-orm/pg-core";
import { serial } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { orders } from "./orders";
import { employees } from "./employees";
import { services } from "./services";

export const orderServices = pgTable("order_services", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  serviceId: integer("service_id")
    .notNull()
    .references(() => services.id, {
      onDelete: "cascade",
    }),
});

export const orderServicesRelations = relations(orderServices, ({ one }) => ({
  order: one(orders, {
    fields: [orderServices.orderId],
    references: [orders.id],
  }),
  service: one(services, {
    fields: [orderServices.serviceId],
    references: [services.id],
  }),
}));
