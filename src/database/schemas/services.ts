import { relations } from "drizzle-orm";
import { varchar } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { serial } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { employeeServices } from "./employee-services";
import { orderServices } from "./order-services";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  priceInCents: integer("price_in_cents").notNull(),
  durationInMinutes: integer("duration_in_minutes").notNull(),
});

export const servicesRelations = relations(services, ({ many }) => ({
  employeeServices: many(employeeServices),
  orderServices: many(orderServices),
}));

export type ServiceSelect = typeof services.$inferSelect;
export type ServiceInsert = typeof services.$inferInsert;
