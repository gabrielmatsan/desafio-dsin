import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { timestamp, varchar, text, pgTable } from "drizzle-orm/pg-core";
import { employeeServices } from "./employee-services";

export const employees = pgTable("employees", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
  cpf: varchar("cpf", { length: 11 }).unique().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const employeesRelations = relations(employees, ({ many }) => ({
  employeeServices: many(employeeServices),
}));
