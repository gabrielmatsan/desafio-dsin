ALTER TABLE "order_services" DROP CONSTRAINT "order_services_employee_id_employees_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "order_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "order_services" DROP COLUMN "employee_id";