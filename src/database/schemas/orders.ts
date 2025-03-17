import { pgEnum, text } from "drizzle-orm/pg-core";
import { pgTable, serial } from "drizzle-orm/pg-core";
import { customers } from "./customers";
import { timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { orderServices } from "./order-services";

export const orderStatusEnum = pgEnum("order_status", [
  "cancelled",
  "pending",
  "completed",
]);

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerId: text("customer_id")
    .notNull()
    .references(() => customers.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  orderDate: timestamp("order_date").notNull().defaultNow(),
  orderStatus: orderStatusEnum("order_status").default("pending"),
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
    relationName: "orderCustomer",
  }),
  order: many(orderServices),
}));

export type OrderInsert = typeof orders.$inferInsert;
export type OrderSelect = typeof orders.$inferSelect;
