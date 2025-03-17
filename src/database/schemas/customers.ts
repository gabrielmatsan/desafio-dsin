import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgEnum, timestamp, varchar } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { orders } from "./orders";

export const userRoleEnum = pgEnum("user_role", ["admin", "customer"]);

export const customers = pgTable("customers", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: text("email").unique().notNull(),
  cpf: varchar("cpf", { length: 11 }).unique().notNull(),
  password: text("password").notNull(),
  phone: text("phone").unique().notNull(),
  role: userRoleEnum("role").notNull().default("customer"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const customersRelations = relations(customers, ({ many }) => ({
  orders: many(orders),
}));

export type CustomerInsert = typeof customers.$inferInsert;
export type CustomerSelect = typeof customers.$inferSelect;
