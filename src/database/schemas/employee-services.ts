import { relations } from "drizzle-orm";
import { serial } from "drizzle-orm/pg-core";
import { pgTable, text } from "drizzle-orm/pg-core";
import { employees } from "./employees";
import { services } from "./services";
import { integer } from "drizzle-orm/pg-core";

export const employeeServices = pgTable("employee_services", {
  id: serial("id").primaryKey(),
  employeeId: text("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  serviceId: integer("service_id")
    .notNull()
    .references(() => services.id, {
      onDelete: "cascade",
    }),
});

export const employeeServicesRelations = relations(
  employeeServices,
  ({ one }) => ({
    employee: one(employees, {
      fields: [employeeServices.employeeId],
      references: [employees.id],
      relationName: "employeeService",
    }),

    service: one(services, {
      fields: [employeeServices.serviceId],
      references: [services.id],
      relationName: "serviceEmployee",
    }),
  })
);
